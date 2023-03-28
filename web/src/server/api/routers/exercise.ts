import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const exerciseRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    try {
      return await ctx.prisma.exercise.findMany({});
    } catch (error) {
      console.error("error", error);
    }
  }),
  getAllByUserId: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.findMany({
          where: {
            userId: input.userId,
          },
          orderBy: {
            date: "desc",
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  getAllByUserIdAndBodyGroup: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        bodyGroup: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.findMany({
          where: {
            userId: input.userId,
            ...(input.bodyGroup !== null ? { bodyGroup: input.bodyGroup } : {}),
          },
          distinct: ["exercise"],
          orderBy: {
            date: "desc",
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  getAllNamesByUserIdAndBodyGroup: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        bodyGroup: z.string().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.findMany({
          select: {
            exercise: true,
          },
          where: {
            userId: input.userId,
            ...(input.bodyGroup !== null ? { bodyGroup: input.bodyGroup } : {}),
          },
          distinct: ["exercise"],
          orderBy: {
            date: "desc",
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  get3MostRecentExercisesByExerciseAndBodyGroup: protectedProcedure
    .input(
      z.object({
        bodyGroup: z.string(),
        exercise: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.findMany({
          where: { bodyGroup: input.bodyGroup, exercise: input.exercise },
          orderBy: {
            date: "desc",
          },
          take: 3,
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  add: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        date: z.date(),
        bodyGroup: z.string(),
        exercise: z.string(),
        weight: z.number(),
        sets: z.number(),
        reps: z.number(),
        specialModifier: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.create({
          data: {
            ...input,
          },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        date: z.date().optional(),
        bodyGroup: z.string().optional(),
        exercise: z.string().optional(),
        weight: z.number().optional(),
        sets: z.number().optional(),
        reps: z.number().optional(),
        specialModifier: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        const { id, ...updateData } = input;
        return await ctx.prisma.exercise.update({
          where: { id },
          data: updateData,
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
  deleteById: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        return await ctx.prisma.exercise.delete({
          where: { id: input.id },
        });
      } catch (error) {
        console.error("error", error);
      }
    }),
});
