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
// import AppleProvider from "next-auth/providers/apple";
// import tokenService from '@/utils/services/token.service';
// import jwt from "jsonwebtoken";

db.connectDb();
export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const email = credentials.email;
        const password = credentials.password;

        //   const { data } = await axios.post('/api/login', JSON.stringify({
        //     email:credentials.email,
        //     password:credentials.password,
        // }), {
        //     headers: { "Content-Type": "application/json" },
        //     withCredentials: true,
        //   });

        //const user = await client.db("mydb").collection("users").findOne({email:email});
        const user = await User.findOne({ email: email });
        if (user) {
          if (user.email_verified == true) {
            // Any object returned will be saved in `user` property of the JWT
            return SingnInUser({ password, user });
          } else {
            throw new Error(
              "Email не верифіковано, будь ласка пройдіть валідацію"
            );
          }
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("Incorrect email or password");
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      async profile(profile) {
        return {
          id: profile.sub, // I'd prefer not to have this but not supplying an id causes a TypeScript error
          email: profile.email,
          email_verified: profile.email_verified ? true : false,
          name: profile.name,
          image: profile.picture,
          firstName: profile.given_name,
          lastName: profile.family_name,
          role: "user",
          uniqueString: await emailService.createUniqueString(),
          //locale
        };
      },
      // async signIn(user, account, metadata) {
      //   if (!user.email_verified) {
      //     throw new Error('Email не верифіковано, будь ласка пройдіть валідацію');
      //   }

      //   // Add emailVerified to user object
      //   user.emailVerified = true;

      //   return true;
      // }
      // callbacks: {
      //   async jwt(token, user, account) {
      //     if (account.provider === 'google' && user.email_verified) {
      //      console.log("76");

      //       // Add emailVerified: true to the user object saved in the JWT
      //       return {
      //         ...token,
      //         user: {
      //           ...token.user,
      //           emailVerified: true,
      //           firstName: user.given_name,
      //           lastName: user.family_name,
      //           email: user.email,
      //           image: user.picture
      //         }
      //       };
      //     }}}
      // scope: 'name email',
      //   // Функція, яка приймає на вхід токен, видає додаткові дані користувача
      //   profile: async (token) => {
      //     const decoded = jwt.decode(token.sub, { complete: true });
      //     if (!decoded) {
      //       throw new Error('Failed to decode ID token from Google');
      //     }

      //     const { email, sub } = decoded.payload;
      //     const firstName = decoded.payload?.given_name + ' ' + decoded.payload?.family_name;
      //     const emailVerified = decoded.payload?.email_verified;
      //     // Save the user to the database with the emailVerified field
      // const user = await User.findOneAndUpdate({ email: email }, { emailVerified: emailVerified }, { upsert: true, new: true });

      // return {
      //   id: sub,
      //   firstName: firstName,
      //   lastName: lastName,
      //   email: email,
      //   emailVerified: emailVerified,
      // };
      //   },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile, options) {
        console.log("profileFacebook", JSON.stringify(profile), JSON.stringify(options));
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

        // add additional fields from Facebook profile
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
    // AppleProvider({
    //   clientId: process.env.APPLE_CLIENT_ID,
    //   teamId: process.env.APPLE_TEAM_ID,
    //   privateKey: process.env.APPLE_PRIVATE_KEY,
    //   keyId: process.env.APPLE_KEY_ID,
    //   scope: 'name email',
    //   // Функція, яка приймає на вхід токен, видає додаткові дані користувача
    //   profile: async (token) => {
    //     console.log("gogleProviderToken: ", token);
    //     const decoded = jwt.decode(token.id_token, { complete: true });
    //     if (!decoded) {
    //       throw new Error('Failed to decode ID token from Apple');
    //     }

    //     const { email, sub } = decoded.payload;
    //     const name = decoded.payload?.name?.given_name + ' ' + decoded.payload?.name?.family_name;
    //    const verified=decoded.payload?.email_verified;
    //    console.log("verifiedEmail",verified);
    //     const user = await User.findOne({ email: email });
    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       throw new Error("Incorrect email or password")
    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //     // return {
    //     //   id: sub,
    //     //   name: name,
    //     //   email: email,
    //     // };
    //   },
    // }),
  ],
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   if (account.provider === "google") {
    //         if (profile.email_verified && profile.email.endsWith("@gmail.com")) {
    //           user.email_verified = true;
    //           user.firstName=profile.given_name;
    //           user.lastName=profile.family_name;
    //           user.role="user";
    //         }
    //         return true;
    //  }
    //  },
    async session({ session, token, account }) {
      let user = await User.findById(token.sub);
      if (token) {
        //  console.log("tokenInApiAuthnextjs", token);
        // console.log("accountInApiAuthnextjsExpires", account);
        // console.log("sessionInApiAuthnextjs", session);
      }
      // if (token) {
      //   session.user = token.user;
      //   session.accessToken = token.accessToken;
      //   session.idToken = token.idToken;
      //   session.expiresIn = token.expiresIn;
      // }
      session.user.id = token.sub || user._id.toString();
      session.user.role = user.role || "user";
      session.user.name = user.firstName || user.name || "";
      token.role = user.role || "user";

      return session;
    },
    //  async jwt(token, user, account) {
    //     if (account.provider === 'google' && user.email_verified) {
    //       // Add emailVerified: true to the user object saved in the JWT
    //       return {
    //         ...token,
    //         user: {
    //           ...token.user,
    //           emailVerified: true,
    //           firstName: user.given_name,
    //           lastNAme: user.family_name,
    //           email: user.email,
    //           image: user.image
    //         }
    //       };
    //     }},
  },
  // pages: {
  //   signIn: '/signin',
  //   signOut: '/signout',
  // },
  session: {
    strategy: "jwt",
  },
  secret: process.env.JWT_SECRET,
});

const SingnInUser = async ({ password, user }) => {
  if (!user.password) {
    throw new Error("Будь ласка введіть пароль");
  }
  const testPassword = await bcrypt.compare(password, user.password);
  if (!testPassword) {
    throw new Error("Пароль введено не вірно");
  }
  return user;
};
const createUniqueString = async () => {
  const uniqueString = await emailService.createUniqueString();
  return uniqueString;
}
// const login = async ({ password, user }) => {

// console.log("33", user);
//   if (user && (await bcrypt.compare(password, user.password))) {
//     console.log("35" );
//     const token = await tokenService.createToken({
//       userId: user._id,
//       email,
//     });
//     console.log("40",token );
//     return token;
//   } else {
//     throw new Error(`Користувач ${email} не існує або пароль вказано не вірно`);
//   }
// };
