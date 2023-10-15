import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { User } from "@prisma/client";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      }),
    )
    .query(async ({ ctx, input }): Promise<User | null> => {
      return ctx.db.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
});
