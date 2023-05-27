import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import Auth0Provider from "next-auth/providers/auth0";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/User";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";
import db from "../../../utils/db";
import emailService from "@/utils/services/email.service";


// db.connectDb();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;
        await db.connectDb();
        const user = await User.findOne({ email: email });
        if (user) {
          if (user.email_verified == true) {
            return SingnInUser({ password, user });
          } else {
            throw new Error(
              "Email не верифіковано, будь ласка пройдіть валідацію"
            );
          }
        } else {
          throw new Error("Email або пароль вказано невірно");
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        await db.connectDb();
        return {
          id: profile.sub,
          email: profile.email,
          email_verified: profile.email_verified ? true : false,
          name: profile.name,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          role: "user",
          uniqueString: await emailService.createUniqueString(),
        };
      },
    }),
    FacebookProvider({
      
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile, options) {
        await db.connectDb();
        const userProfile = {
          id: profile.id,
          email: profile.email,
          email_verified: true,
          name: profile.name,
          image: profile.picture.data.url,
          firstName: profile.first_name,
          lastName: profile.last_name,
          role: "user",
          uniqueString: await emailService.createUniqueString(),
        };
        if (options.fields && options.fields.length > 0) {
          options.fields.forEach(field => {
            userProfile[field] = profile[field];
          });
        }
        return userProfile;
      },
    }),
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer: process.env.AUTH0_ISSUER
    }),
  ],
  callbacks: {
    async session({ session, token, account }) {
      await db.connectDb();
      let user = await User.findById(token.sub);
      if (token) {
      }
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      session.user.name = user.firstName || user.name || "";
      token.role = user.role || "user";

      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const SingnInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Будь ласка введіть пароль");
  }
  await db.connectDb();
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Пароль введено не вірно");
  }
  return user;
};
const createUniqueString = async () => {
  const uniqueString = emailService.createUniqueString();
  return uniqueString;
}
