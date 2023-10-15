import { BodyGroup } from "@prisma/client";
import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const bodyGroupValidtor = z.enum([
  BodyGroup.CHEST,
  BodyGroup.ARMS,
  BodyGroup.SHOULDERS,
  BodyGroup.BACK,
  BodyGroup.CORE,
  BodyGroup.LEGS,
  BodyGroup.NONE,
]);

export const exerciseAddValidator = z.object({
  date: z.date(),
  bodyGroup: bodyGroupValidtor,
  exercise: z.string(),
  sets: z.number(),
  reps: z.number(),
  weight: z.number(),
});

export const exerciseRouter = createTRPCRouter({
  getThreeMostRecentForBodyGroupAndExercise: protectedProcedure
    .input(
      z.object({
        bodyGroup: bodyGroupValidtor,
        exercise: z.string(),
      }),
    )
    .query(async ({ ctx, input }) => {
      return await ctx.db.exercise.findMany({
        where: {
          userId: ctx.session.user.id,
          bodyGroup: input.bodyGroup,
          exercise: input.exercise,
        },
        orderBy: {
          date: "desc",
        },
        take: 3,
      });
    }),

  getAllDistinctForBodyGroup: protectedProcedure
    .input(z.object({ bodyGroup: bodyGroupValidtor }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.exercise.findMany({
        where: {
          bodyGroup: input.bodyGroup,
        },
        distinct: ["exercise"],
      });
    }),

  add: protectedProcedure
    .input(exerciseAddValidator)
    .mutation(async ({ ctx, input }) => {
      const result = await ctx.db.exercise.create({
        data: {
          userId: ctx.session.user.id,
          date: input.date,
          bodyGroup: input.bodyGroup,
          exercise: input.exercise,
          sets: input.sets,
          reps: input.reps,
          weight: input.weight,
        },
      });

      return result;
    }),
});
