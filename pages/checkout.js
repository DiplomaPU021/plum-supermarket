import { context } from "react-responsive";
import * as React from "react"
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { getSession, signIn, signOut } from "next-auth/react"
import User from "@/models/User";
import Cart from "@/models/Cart";
import Header from '@/components/header'
import Footer from '@/components/footer'
import "bootstrap/dist/css/bootstrap.min.css";
import db from "@/utils/db";
import DotLoaderSpinner from '@/components/loaders/dotLoader';

import CheckoutOrder from '@/components/checkoutorder'
import { getCountryData } from "@/utils/country";


const inter = Inter({ subsets: ["latin"] });


export default function Checkout({ cart, user, country }) {
   return (
     <div className={styles.container}>
       <Header />
       <CheckoutOrder cart={cart} user={user}  country={country}/>
       <Footer country={country}/>
       
     </div>
     
   );
 }
export async function getServerSideProps(context) {
  const countryData = await getCountryData();
 await db.connectDb();
  var user={};
  const { req } = context;
    const session = await getSession({req});
    if (session) {
      // console.log("//////////////////////////////////Session:",session);
      user = await User.findById(session.user.id);
      var cart={}; 
      if (user) {
        cart = await Cart.findOne({ user: user._id });
      
        // console.log("/////////////////////////////////cart:", cart);
        if (!cart) {
          return {
            redirect: {
              destination: "/checkout",
            }
          }
        }
      } else {
        return {
          redirect: {
            destination: "/signin",
          }
        }
      }
    }
  
   await db.disconnectDb();  
    return {
      props: {
        cart: JSON.parse(JSON.stringify(cart)),
        user: JSON.parse(JSON.stringify(user)),
        country: countryData,
      },
    };
}

 

