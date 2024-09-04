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
        name: { label: "name", type: "string"},
        password: { label: "password", type: "password" }
      },
      async authorize(credentials) {
        if(!credentials?.name || !credentials?.password) {
          return null
        }
        const existingUser = await prisma.admin.findFirst({ where: { name: credentials.name } });
 // Aqui foi corrigido
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
        };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          name: token.name,
        };
      }
      return session;
    }
  }
}
