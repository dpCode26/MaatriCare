import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { User } from "next-auth";

import { connectDB } from "@/lib/db";
import UserModel from "@/models/User";

const nextAuth = NextAuth as any;

const authConfig = {
  session: {
    strategy: "jwt",
  },

  trustHost: true,

  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials): Promise<User | null> {
        await connectDB();

        const email = credentials?.email as string;
        const user = await UserModel.findOne({
          email,
        });

        if (!user) {
          throw new Error("No user found");
        }

        const isValid = await user.comparePassword(
          credentials?.password as string
        );

        if (!isValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          district: user.district ?? "",
        } as User;
      },
    }),
  ],

  callbacks: {
    async jwt(
      { token,
        user }: {
          token: any;
          user?: any;
        }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.district = (user as any).district;
      }

      return token;
    },

    async session({
      session,
      token }: {
        session: any;
        token: any;
      }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.district = token.district as string;
      }

      return session;
    },
  },
};
export const {
  handlers,
  auth,
  signIn,
  signOut,
} = nextAuth(authConfig);

// export const { handlers, auth, signIn, signOut } = NextAuth({
//   session: { strategy: "jwt" },
//   trustHost: true,
//   providers: [
//     Credentials({
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials): Promise<User | null> {
//         await connectDB();

//         const user = await UserModel.findOne({
//           email: credentials?.email,
//         });

//         if (!user) {
//           throw new Error("No user found");
//         }

//         const isValid = await user.comparePassword(
//           credentials?.password as string
//         );

//         if (!isValid) {
//           throw new Error("Invalid password");
//         }
//         console.log("User role from DB:", user.role);

//         return {
//           id: user._id.toString(),
//           name: user.name,
//           email: user.email,
//           role: user.role,
//           district: user.district ?? "",
//         };
//       }
//     }),
//   ],

//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.role = user.role;
//         token.id = user.id;
//         token.district = user.district;
//       }
//       return token;
//     },

//     async session({ session, token }) {
//       if (session.user) {
//         session.user.role = token.role as string;
//         session.user.id = token.id as string;
//         session.user.district = token.district as string;
//       }
//       return session;
//     },
//   },
// });