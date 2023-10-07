
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import { UserHelpers } from "../helpers/userHelpers";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";


export const userRouter = createTRPCRouter({
  getUserById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<User | null> => {
      const isExtraAllowed =
        ctx.session.user.id == input.userId ||
        ctx.session.user.isManager ||
        ctx.session.user.role === "ADMIN"
          ? true
          : false;

      return ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
        include: {
          managedCommunities: isExtraAllowed,
          hostedEvents: isExtraAllowed,
        },
      });
    }),

  getProfile: protectedProcedure
    .input(z.string().optional())
    .query(async ({ ctx, input }) => {
      const where: Prisma.UserWhereInput = (() => {
        if (input) {
          // if input slug is provided
          // we need to be smart who can access what
          // to avoid leakage of PIIs

          const userIdSuffix = input?.split("-").pop();
          const name = input?.replace(`-${userIdSuffix}`, "").replace("-", " ");

          if (!userIdSuffix)
            throw new TRPCError({
              message: "Could not find user",
              code: "NOT_FOUND",
            });
          if (userIdSuffix.length < 4)
            throw new TRPCError({
              message: "Suffix too short",
              code: "BAD_REQUEST",
            });

          if(!name)
            console.warn("Used ID suffix provided", userIdSuffix, "but name is empty");

          // admins can query whoever they want
          if (ctx.session.user.role === "ADMIN") {
            return {
              id: { endsWith: userIdSuffix || "" },
              name: name ? {
                equals: name || "",
                mode: "insensitive",
              } : undefined,
            };
          }
          // non-admins
          // 1. host can view if they host an event that the user is attending
          // 1. community admin can if user is attending an event in the community
          // 2. anyone can view (2a) hosts and (2b) community managers
          return {
            AND: [
              {
                id: { endsWith: userIdSuffix || "" },
                name: name ? {
                  equals: name || "",
                  mode: "insensitive",
                } : undefined,
              },
              {
                OR: [
                  // #1
                  {
                    attendedEvents: {
                      some: {
                        event: {
                          OR: [
                            {
                              hosts: {
                                some: {
                                  userId: ctx.session.user.id,
                                },
                              },
                            },
                            {
                              community: {
                                managers: {
                                  some: {
                                    id: ctx.session.user.id,
                                  },
                                },
                              },
                            },
                          ],
                        },
                      },
                    },
                  },
                  // #2a (is host)
                  {
                    hostedEvents: { some: {} },
                  },
                  // #2b (is community manager)
                  {
                    managedCommunities: { some: {} },
                  },
                ],
              },
            ],
          };
        }
        // otherwise (no slug provider) just return current user profile
        return { id: ctx.session.user.id };
      })();

      const profiles = await ctx.prisma.user.findMany({
        where,
        include: {
          badges: {
            select: {
              badgeId: true,
              badge: {
                include: {
                  validCommunities: {
                    select: {
                      id: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

      const profile = profiles[0];
      if (!profile) {
        throw new TRPCError({
          message: "Could not find user",
          code: "NOT_FOUND",
        });
      } else if (profiles.length != 1) {
        throw new TRPCError({
          message: "Found multiple users matching criteria",
          code: "NOT_FOUND",
        });
      }

      const { socialLinks } = profile;
      const badgeCounts: Record<string, number> = {};

      // Iterate through the badges and count them based on their IDs
      profile.badges.forEach((userBadge) => {
        const badgeId = userBadge.badgeId;
        if (!badgeCounts[badgeId]) {
          badgeCounts[badgeId] = 0;
        }
        badgeCounts[badgeId]++;
      });

      // Create an array to store badges with their respective counts
      const badgesWithCounts: (Partial<Badge> & {
        count?: number;
        validCommunities: { id: string; name: string }[];
      })[] = [];

      // Iterate through the array of unique badges and add them to the result array
      for (const badgeId of Object.keys(badgeCounts)) {
        const userBadge = profile.badges.find((ub) => ub.badgeId === badgeId);
        if (userBadge) {
          const badge = userBadge.badge;
          const badgeCount = badgeCounts[badgeId];
          badgesWithCounts.push({
            ...badge,
            count: badgeCount,
          });
        }
      }

      return {
        ...profile,
        // hide PII: if not API call not made by the owner
        ...(input ? { email: undefined, phone: undefined } : {}),
        badges: [...badgesWithCounts],
        socialLinks: socialLinks as SocialLinks,
      };
    }),

  getUserImgById: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<string | null> => {
      const img = await UserHelpers.getProfilePictureFromUserId(
        ctx.prisma,
        input.userId
      );
      return img;
    }),
  isAdmin: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<boolean> => {
      return await ctx.prisma.user
        .findUnique({
          where: {
            id: input.userId,
          },
        })
        .then((user) => {
          if (user?.role === "ADMIN") return true;
          return false;
        });
    }),

  update: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
        name: z.string().nullable().optional(),
        email: z.string().nullable().optional(),
        socialLinks: socialLinksValidator.optional(),
        bio: z.string().nullable().optional(),
        image: z.string().nullable().optional(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<User | null> => {
      if (ctx.session.user.id !== input.userId) {
        throw new TRPCError({
          message: "You are not authorized to update this user",
          code: "UNAUTHORIZED",
        });
      }

      // Exclude null values from input
      const nonNullInput = omitBy(input, isNull);

      // Remove the userId property from the nonNullInput object
      delete nonNullInput.userId;

      return await ctx.prisma.user.update({
        where: {
          id: input.userId,
        },
        data: nonNullInput,
      });
    }),
  upsertPhoneNumber: protectedProcedure
    .input(
      z.object({
        phone: z.string(),
        countryCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<User | null> => {
      // Update user with phone and countryCode
      const user = await ctx.prisma.user.upsert({
        where: {
          id: ctx.session.user.id,
        },
        update: {
          phone: input.phone,
          countryCode: input.countryCode,
        },
        create: {
          id: ctx.session.user.id,
          phone: input.phone,
          countryCode: input.countryCode,
        },
      });

      // Generate a verification code
      const verificationCode = generateVerificationCode();

      // Save the verification code in the PhoneNumberVerifications table

      const expirationTime = new Date(Date.now() + 15 * 60 * 1000);

      await ctx.prisma.phoneNumberVerifications.create({
        data: {
          userId: user.id,
          verificationCode: verificationCode,
          expirationTime: expirationTime,
        },
      });

      // Send the verification code to the user's phone
      if (user.phone && user.countryCode) {
        await sendText(
          `+${user.countryCode}${user.phone}`,
          env.VONAGE_PHONE_NUMBER,
          `Your River Platform verification code is ${verificationCode}. Reply STOP to unsubscribe.`
        );
      }

      return user;
    }),
  verifyPhoneNumber: protectedProcedure
    .input(
      z.object({
        verificationCode: z.string(),
      })
    )
    .mutation(async ({ ctx, input }): Promise<boolean | null> => {
      // Look up the PhoneNumberVerifications record
      const verification = await ctx.prisma.phoneNumberVerifications.findFirst({
        where: {
          userId: ctx.session.user.id,
          verificationCode: input.verificationCode,
          expirationTime: {
            gte: new Date(), // Check that the code hasn't expired
          },
        },
      });

      // If a matching record is found, set phoneVerified to the current date and time
      if (!verification) return false;

      await ctx.prisma.phoneNumberVerifications.update({
        where: {
          id: verification.id,
        },
        data: {
          phoneVerified: new Date(),
        },
      });

      return true;
    }),

  isUserPhoneNumberVerified: protectedProcedure
    .input(
      z.object({
        phone: z.string(),
        countryCode: z.string(),
      })
    )
    .query(async ({ ctx, input }): Promise<boolean | null> => {
      const user = await UserHelpers.getUserById(
        ctx.prisma,
        ctx.session.user.id
      );

      if (!user?.phone || !user?.countryCode) return false;

      return await UserHelpers.isUserPhoneVerified(
        ctx.prisma,
        user?.phone,
        user?.countryCode,
        user.id
      );
    }),

  getUserEventHostApplicationIds: protectedProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.hostApplication.findMany({
      where: {
        userId: ctx.session.user.id,
        type: HostApplicationType.EVENT,
      },
      select: {
        event: {
          select: {
            id: true,
          },
        },
      },
    });

    // only return the array of event ids
    if (result && result.length) {
      return result.map((r) => {
        if (!r || !r.event) return null;
        else return r.event.id;
      });
    }
    return [];
  }),
});
