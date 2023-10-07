import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { type GetServerSidePropsContext } from "next";
import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
  DefaultUser,
  User,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "~/env.mjs";
import { prisma } from "~/server/db";
import * as z from "zod";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // role: Role;
    } & DefaultSession["user"];
  }
  interface User extends DefaultUser {
    // role: Role;
  }
}

const IS_NOT_PROD = env.NODE_ENV !== "production";
/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    ...(IS_NOT_PROD
      ? {
        jwt: async ({ token, user }) => {
          if (user) {
            token.userId = user.id;
          }
          return token;
        },
      }
      : {}),
    session: async ({ session, token, user }) => {
      let userDetails = await prisma.user.findUnique({
        where: {
          id: user?.id || (token.userId as string) || undefined,
        },
      });

      console.log("\n\nSESSION CHANGED: \n\n", session, "\n\n", userDetails);

      return {
        ...session,
        user: {
          ...session.user,
          id: user?.id || token.userId,
          // role: userDetails?.role,
        },
      };
    },
  },
  events: {
    signIn({ user }) {
    },
  },
  theme: {
    colorScheme: "dark",
    brandColor: "#e5fd30",
    logo: "https://app.getriver.io/Icon_Neon%20Green.svg",
    buttonText: "#000000",
  },
  adapter: PrismaAdapter(prisma),
  ...(IS_NOT_PROD ? { session: { strategy: "jwt" } } : {}),
  ...(IS_NOT_PROD ? { secret: "this-is-very-secret" } : {}),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // EmailProvider({
    //   server: {
    //     host: env.SMTP_HOST,
    //     port: Number(env.SMTP_PORT),
    //     auth: {
    //       user: env.SMTP_USER,
    //       pass: env.SEND_GRID_API_KEY,
    //     },
    //   },
    //   from: env.SMTP_FROM,
    //   async sendVerificationRequest(params) {
    //     const { identifier, url, provider, theme } = params;
    //     const { host } = new URL(url);
    //     const transport = createTransport(provider.server);
    //     const result = await transport.sendMail({
    //       to: identifier,
    //       from: provider.from,
    //       subject: `[River] Your sign in link`,
    //       text: emailText({ url, host }),
    //       html: emailHtml({ url, host, theme }),
    //     });
    //     const failed = result.rejected.concat(result.pending).filter(Boolean);
    //     if (failed.length) {
    //       throw new Error(`Email (${failed.join(", ")}) could not be sent`);
    //     }
    //   },
    // }),
    ...(IS_NOT_PROD
      ? [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            username: {
              label: "Email",
              type: "text",
              placeholder: "email",
            },
            password: { label: "Password", type: "password" },
          },
          authorize: async (credentials, request): Promise<User | null> => {
            // async authorize(credentials, req) {
            const loginSchema = z.object({
              username: z.string().email(),
              password: z.string(),
            });
            const creds = await loginSchema.parseAsync(credentials);
            const user = await prisma.user.findFirst({
              where: { email: creds.username },
            });

            if (user && creds.password === "this-is-testing-env") {
              // Any object returned will be saved in `user` property of the JWT
              return {
                ...user,
              };
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null;
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          },
        }),
      ]
      : []),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
