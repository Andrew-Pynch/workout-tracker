import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env.mjs";

export const CheckoutSessionInput = z.object({
  eventId: z.string(),
  customerId: z.string(),
  clientReferenceId: z.string(),
  stripePriceId: z.string(),
});

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" });

export const StripeHelpers = {
  getCustomerByEmail: async (
    email: string
  ): Promise<Stripe.Customer | null> => {
    let customers = await stripe.customers.list({ email: email });

    if (customers.data.length === 0) return null;

    const result = customers.data[0];

    if (result === undefined)
      throw new TRPCError({
        message: "No customer found with email: " + email,
        code: "NOT_FOUND",
      });

    return result;
  },

  createCustomer: async (
    userId: string,
    email: string
  ): Promise<Stripe.Customer> => {
    // First, search for a customer with the provided email
    const existingCustomer = await StripeHelpers.getCustomerByEmail(email);

    // TODO: not sure if there is a risk here...
    if (existingCustomer) return existingCustomer;

    const params: Stripe.CustomerCreateParams = {
      email: email,
    };

    let newCustomer: Stripe.Customer;
    try {
      newCustomer = await stripe.customers.create(params);
    } catch (e: any) {
      throw new TRPCError({
        message:
          "Error creating stripe customer for user: " +
          userId +
          " with email: " +
          email +
          "Error: \n" +
          e,
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    if (!newCustomer)
      throw new TRPCError({
        message: "Error creating stripe customer",
        code: "INTERNAL_SERVER_ERROR",
      });

    return newCustomer;
  },

  createProduct: async (
    name: string,
    priceDollars: number,
    priceCents: number
  ): Promise<Stripe.Product> => {
    const params: Stripe.ProductCreateParams = {
      name: name,
      default_price_data: {
        unit_amount: priceDollars * 100 + priceCents,
        currency: "usd",
      },
    };

    try {
      return await stripe.products.create(params);
    } catch (e: any) {
      throw new TRPCError({
        message: "Error creating product: " + e,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  },

  updateProduct: async (
    productId: string,
    name: string,
    priceDollars: number,
    priceCents: number
  ): Promise<Stripe.Product> => {
    const params: Stripe.ProductUpdateParams = {
      name: name,
      active: true,
      metadata: {
        priceDollars: priceDollars,
        priceCents: priceCents,
      },
    };

    try {
      return await stripe.products.update(productId, params);
    } catch (e: any) {
      throw new TRPCError({
        message: "Error updating product: " + e,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  },

  createCheckoutSession: async (
    input: z.infer<typeof CheckoutSessionInput>
  ): Promise<Stripe.Checkout.Session> => {
    const result = CheckoutSessionInput.safeParse(input);

    if (!result.success) {
      console.error(
        "Validation error creating checkout session: ",
        result.error
      );
      throw new TRPCError({
        message: "Validation error creating checkout session",
        code: "INTERNAL_SERVER_ERROR",
      });
    }

    let baseUrl: string = "https://app.getriver.io";
    if (env.NODE_ENV === "development") baseUrl = "http://localhost:3000";

    const params: Stripe.Checkout.SessionCreateParams = {
      customer: input.customerId,
      client_reference_id: input.clientReferenceId,
      payment_method_types: ["card"],
      payment_intent_data: {
        capture_method: "manual",
      },
      line_items: [
        {
          price: input.stripePriceId,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { priceId: input.stripePriceId },
      success_url: `${baseUrl}/eventId/${input.eventId}/success`,
      cancel_url: `${baseUrl}/eventId/${input.eventId}/cancel`,
    };

    try {
      const session: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);
      return session;
    } catch (e) {
      throw new TRPCError({
        message: "Error creating checkout session: " + e,
        code: "INTERNAL_SERVER_ERROR",
      });
    }
  },
  hasUserPaid: async (
    customerId: string,
    productId: string
  ): Promise<boolean> => {
    // Get the priceId associated with the product
    const productPriceId = await StripeHelpers.getProductPriceId(productId);

    // Get all checkout sessions
    const checkoutSessions = await stripe.checkout.sessions.list({
      customer: customerId,
    });

    // Filter checkout sessions with successful payment and correct priceId and customer id
    const sessions = await Promise.all(
      checkoutSessions.data.map(async (s) => {
        const piId = s.payment_intent;
        const pi = piId
          ? await stripe.paymentIntents.retrieve(piId as string)
          : null;
        return { s, pi };
      })
    );

    const fullyPaid = sessions.filter(
      (e) =>
        e.s.customer === customerId &&
        e.s.payment_status === "paid" &&
        e.s.metadata &&
        e.s.metadata.priceId === productPriceId
    );
    const defferedPayment = sessions.filter(
      (e) =>
        e.s.status === "complete" &&
        e.s.customer === customerId &&
        e.pi &&
        e.pi.amount_capturable === e.pi.amount &&
        e.s.metadata &&
        e.s.metadata.priceId === productPriceId
    );

    // If any successful sessions, user has paid
    if (fullyPaid.length > 0 || defferedPayment.length > 0) return true;

    return false;
  },

  getProductPriceId: async (productId: string): Promise<string> => {
    const prices = await stripe.prices.list({ product: productId });

    // If prices for the product exist, return the first price's ID
    if (prices.data && prices.data.length > 0) {
      const data = prices.data;
      const firstItem = data[0];
      if (firstItem === undefined) {
        throw new TRPCError({
          message: "No prices found for product: " + productId,
          code: "NOT_FOUND",
        });
      } else return firstItem.id;
    }

    // If no prices found, log and throw an error
    throw new TRPCError({
      message: "No prices found for product: " + productId,
      code: "NOT_FOUND",
    });
  },
};
