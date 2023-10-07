
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { StripeHelpers } from "../helpers/stripeHelpers";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2023-08-16" });
const URL_EVENT_ID = /(http[s]?:\/\/)?([^\/\s]+\/)eventId\/(.*)\/success/;

export const stripeRouter = createTRPCRouter({
  getByEmail: protectedProcedure
    .input(z.object({ email: z.string() }))
    .query(async ({ input }) => {
      return await StripeHelpers.getCustomerByEmail(input.email);
    }),

  createCustomer: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await UserHelpers.createStripeCustomer(
        ctx.prisma,
        input.userId,
        input.email
      );
    }),

  createProduct: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        priceDollars: z.number(),
        priceCents: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const newProduct = await StripeHelpers.createProduct(
        input.name,
        input.priceDollars,
        input.priceCents
      );

      if (!newProduct)
        throw new TRPCError({
          message: "Could not create product",
          code: "INTERNAL_SERVER_ERROR",
        });

      // Add any additional actions needed after creating a product
    }),

  updateProduct: protectedProcedure
    .input(
      z.object({
        productId: z.string(),
        name: z.string(),
        priceDollars: z.number(),
        priceCents: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const updatedProduct = await StripeHelpers.updateProduct(
        input.productId,
        input.name,
        input.priceDollars,
        input.priceCents
      );

      if (!updatedProduct)
        throw new TRPCError({
          message: "Could not update product",
          code: "INTERNAL_SERVER_ERROR",
        });

      // Add any additional actions needed after updating a product
    }),

  getPaymentHolds: adminProcedure.query(async ({ ctx }) => {
    // Get all checkout sessions
    const checkoutSessions = await stripe.checkout.sessions.list();

    // Filter checkout sessions with successful payment and correct priceId and customer id
    const sessions = await Promise.all(
      checkoutSessions.data
        .filter((s) => !!s.payment_intent)
        .map(async (s) => {
          const pi = await stripe.paymentIntents.retrieve(
            s.payment_intent as string
          );
          return { s, pi };
        })
    );

    const holds = sessions.filter(
      (e) =>
        e.s.status === "complete" &&
        // e.s.customer === customerId &&
        e.pi &&
        e.pi.amount_capturable === e.pi.amount //&&
      // e.s.metadata &&
      // e.s.metadata.priceId === productPriceId
    );

    return Promise.all(
      holds.map(async (h) => {
        const expiry = h.s.created * 1000 + 7 * 24 * 60 * 60 * 1000;
        const price = h.pi?.amount_capturable / 100;

        const user = await UserHelpers.getUserById(
          ctx.prisma,
          h.s.client_reference_id as string
        );

        let event = undefined;
        const eventId = (h.s.success_url as string).match(URL_EVENT_ID);

        try {
          event = await EventHelpers.getEventById(
            ctx.prisma,
            (eventId && eventId[3]) || ""
          );
        } catch (error) {}

        const userLink = user
          ? `${env.NEXTAUTH_URL}/profile/${slugifyUser(user)}`
          : "";
        const eventLink = event
          ? `${env.NEXTAUTH_URL}/events/${event.slug}`
          : "";

        return {
          user: {
            name: user?.name,
            link: userLink,
            email: user?.email,
            image: user?.image,
          },
          event: {
            hasHost: event && event.hosts.length > 0,
            name: event?.name,
            link: eventLink,
            price,
          },
          expiry,
          intentId: h.pi.id,
        };
      })
    );
  }),

  updatePaymentIntent: adminProcedure
    .input(
      z.object({
        piId: z.string(),
        action: z.union([z.literal("CHARGE"), z.literal("CANCEL")]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (input.action === "CHARGE") {
        const resp = await stripe.paymentIntents.capture(input.piId);
        return { status: resp.status };
      } else if (input.action === "CANCEL") {
        const cancel = await stripe.paymentIntents.cancel(input.piId);

        // remove user from attendees if we cancel
        const sessions = await stripe.checkout.sessions.list({
          payment_intent: cancel.id,
        });
        for (const session of sessions.data) {
          // find event and user and remove user from attendees
          const user = await UserHelpers.getUserById(
            ctx.prisma,
            session.client_reference_id as string
          );

          let event = undefined;
          const eventId = (session.success_url as string).match(URL_EVENT_ID);
          try {
            event = await EventHelpers.getEventById(
              ctx.prisma,
              (eventId && eventId[3]) || ""
            );
          } catch (error) {}
          if (!user || !event) {
            console.error("Unable to rm attendee", user?.id, event?.id, "PI", cancel.id);
            continue;
          }

          await ctx.prisma.attendee.delete({
            where: {
              userId_eventId: {
                userId: user.id,
                eventId: event.id,
              },
            },
          });
        }
        return { status: "succeeded" };
      }
      throw new TRPCError({
        message: "Could not update payment session",
        code: "INTERNAL_SERVER_ERROR",
      });
    }),
});
