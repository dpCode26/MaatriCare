import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { connectDB } from './db';
import User from '@/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectDB();
        const user = await User.findOne({ email: credentials.email });
        if (!user) throw new Error('No user found');
        const isValid = await user.comparePassword(credentials.password as string);
        if (!isValid) throw new Error('Invalid password');
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
          district: user.district,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.id = (user as any).id;
        token.district = (user as any).district;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role as string;
      session.user.id = token.id as string;
      session.user.district = token.district as string;
      return session;
    }
  },
  pages: {
    signIn: '/login',
    error: '/login',
  }
});