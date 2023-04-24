import * as React from "react"
import { Inter } from "next/font/google"
import styles from '../styles/Home.module.scss'
import { getSession } from "next-auth/react"
import User from "@/models/User";
import Cart from "@/models/Cart";
import Header from '@/components/header'
import "bootstrap/dist/css/bootstrap.min.css";
import db from "@/utils/db";
import CheckoutOrder from '@/components/checkoutorder'
import { getCountryData } from "@/utils/country";

const inter = Inter({ subsets: ["latin"] });


export default function Checkout({ cart, user, country }) {
  return (
    <div className={styles.container}>
      <Header />
      <CheckoutOrder cart={cart} user={user} country={country}/>
    </div>

  );
}

export async function getServerSideProps(context) {

  const countryData = await getCountryData();
  await db.connectDb();
  var user = {}; var cart = {};
  const { req } = context;
  const session = await getSession({ req });
  // let stripe_public_key = process.env.STRIPE_PUBLIC_KEY;
  if (session) {
    user = await User.findById(session.user.id);
    if (user) {
      user = JSON.parse(JSON.stringify(user));
      cart = await Cart.findOne({ user: user._id });
      if (cart) {
        cart = JSON.parse(JSON.stringify(cart));
      }
      else {
        return {
          redirect: {
            destination: "/checkout",
          }
        }
      }
    }
   
  }
  else {
    return {
      redirect: {
        destination: "/",
      }
    }
  }
  await db.disconnectDb();
  return {
    props: {
      cart,
      user,
      country: countryData,
      // stripe_public_key
    },
  };
}



