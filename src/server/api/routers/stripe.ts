
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
});
