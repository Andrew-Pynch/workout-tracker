
import {  User } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { IPrisma } from "~/server/db";
import { StripeHelpers } from "./stripeHelpers";

export const UserHelpers = {
  
  getUserById: async (prisma: IPrisma, userId: string) => {
    return await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  },

  createStripeCustomer: async (
    prisma: IPrisma,
    userId: string,
    email: string
  ) => {
    const newStripeCustomer = await StripeHelpers.createCustomer(userId, email);

    if (!newStripeCustomer)
      throw new TRPCError({
        message: "Could not create Stripe customer",
        code: "INTERNAL_SERVER_ERROR",
      });

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        stripeCustomerId: newStripeCustomer.id,
      },
    });

    const updatedUser = await UserHelpers.getUserById(prisma, userId);

    return updatedUser;
  },
  
  getProfilePictureFromUserId: async (
    prisma: IPrisma,
    userId: string
  ): Promise<string> => {
    const user: User | null = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    }

    if (!user.image) {
      throw new TRPCError({
        message: "Profile picture not found",
        code: "NOT_FOUND",
      });
    }

    // Assuming that the image field in your user schema has a property 'url' that contains the image URL.
    return user.image;
  },
};
