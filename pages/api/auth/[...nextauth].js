import NextAuth from "next-auth/next";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { clientPromise } from "../../../lib/mongo";
import dbConnect from "../../../lib/mongo";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import { verifyPassword } from "../../../lib/authHelpers";

export const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // set expire time to 24 hours
  },
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    error: "/auth",
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token = { ...token, user: user };
      }
      return token;
    },
    async session({ session, token, user }) {
      if (token) {
        session = { ...session, user: token.user };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { role, password } = credentials;
        //admin sign in
        if (role === "admin") {
          const { name } = credentials;
          if (name !== process.env.ADMIN_USERNAME) {
            throw new Error("该账号非管理员账号");
          }
          if (password !== process.env.ADMIN_PASSWORD) {
            throw new Error("所输入的密码不正确");
          }
          return { role: "admin" };
        } else if (role === "customer") {
          //api call for sign in
          const { email } = credentials;
          await dbConnect();
          const user = await User.findOne({ email: email });
          if (!user) {
            throw new Error("该邮箱尚未进行注册");
          }
          const checkPassword = await verifyPassword(password, user.password);
          if (!checkPassword) {
            throw new Error("所输入密码不正确");
          }
          return {
            name: user.name,
            email: user.email,
            cart: user.cart,
            role: role,
          };
        }
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
};

export default NextAuth(authOptions);
