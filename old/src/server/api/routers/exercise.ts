import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const exerciseRouter = createTRPCRouter({
  getAllForUser: protectedProcedure.query(async ({ ctx }) => {
    const exercises = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.session.user.id
      },
      orderBy: {
        date: 'desc'
      }
    })

    if (!exercises) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No exercises found"
      })
    }

    return exercises;
  }),

  getAllForUserByBodyGroup: protectedProcedure.input(
    z.object({
      bodyGroup: z.string()
    })
  ).query(async ({ ctx, input }) => {
    const exercises = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.session.user.id,
        bodyGroup: input.bodyGroup
      },
      orderBy: {
        date: 'desc'
      }
    })

    if (!exercises) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No exercises found"
      })
    }

    return exercises;
  }),

  getNamesForUserByBodyGroup: protectedProcedure.input(
    z.object({
      bodyGroup: z.string().optional()
    })).query(async ({ ctx, input }) => {
      const exercises = await ctx.prisma.exercise.findMany({
        select: {
          exercise: true,
        },
        where: {
          userId: ctx.session.user.id,
          ...(input.bodyGroup !== null ? { bodyGroup: input.bodyGroup } : {}),
        },
        distinct: ["exercise"],
        orderBy: {
          date: "desc",
        },
      });

      if (!exercises) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "No exercises found"
        })
      }

      return exercises;
    }),

  getNMostRecentForUserByExerciseAndBodyGroup: protectedProcedure.input(
    z.object({
      bodyGroup: z.string(),
      exercise: z.string(),
      n: z.number()
    })
  ).query(async ({ ctx, input }) => {
    const exercises = await ctx.prisma.exercise.findMany({
      where: {
        userId: ctx.session.user.id,
        bodyGroup: input.bodyGroup,
        exercise: input.exercise
      },
      orderBy: {
        date: 'desc'
      },
      take: input.n
    })

    if (!exercises) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No exercises found"
      })
    }

    return exercises;
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
})
