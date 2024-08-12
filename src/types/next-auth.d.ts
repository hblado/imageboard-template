import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface User {
        admin?: boolean;
    }
    interface Session {
        user: User & {
            admin?: boolean;
        },
        token: {
            admin: boolean
        }
    }
}