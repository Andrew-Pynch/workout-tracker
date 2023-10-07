import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { User } from "@prisma/client";

export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<User | null> => {

      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });
    }),
})
