import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";
import bcrypt from 'bcrypt'

export const authOptions:NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  pages: {
      signIn: '/auth/login'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email"},
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password) {
          return null
        }
        const existingUser = await prisma.user.findUnique({where: {email: credentials?.email}})
        if(!existingUser){
          return null
        }
        const passwordMatch = await bcrypt.compare(credentials.password, existingUser.password)
        if(!passwordMatch){
          return null
        }
        return {
          id: `${existingUser.id}`,
          name: existingUser.name,
          email: existingUser.email,
          admin: existingUser.admin
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          name: user.name,
          email: user.email,
          admin: user.admin ?? false,
        };
      }
      console.log("JWT Callback - Token After:", token);
      return token;
    },
    async session({ session, token }) {
      session.user.admin = token.admin ?? false;
      return session;
    }
  }
}