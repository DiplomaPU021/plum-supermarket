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
import axios from "axios";
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import {  useState } from "react";

import CheckoutOrder from '@/components/checkoutorder'

const inter = Inter({ subsets: ["latin"] });


export default function Checkout({ cart, user }) {
  // const [loading, setLoading] = React.useState(false)
   return (
     <div className={styles.container}>
                    {/* {
                 loading && <DotLoaderSpinner loading={loading} />
             } */}
       <Header />
       <CheckoutOrder cart={cart} user={user}/>
       <Footer />
     </div>
   );
 }
export async function getServerSideProps(context) {
  //console.log("contextInCheckoutServerSideProps",context);
  //const [loading, setLoading] = React.useState(false)
 await db.connectDb();
  var user={};
  const { req, query } = context;
    const session = await getSession({req});
    if (session) {
      console.log("///////////////////////////////////////Session:",session);
      user = await User.findById(session.user.id);
      var cart={}; 
     // console.log("userInCheckout", user);
      if (user) {
        // setLoading(true);
        cart = await Cart.findOne({ user: user._id });
        // setLoading(false);
        console.log("/////////////////////////////////cart:", cart);
        if (!cart) {
      //     const { data } = await axios.get(`/api/user/getcart/${session.user.id}`);
      // console.log("alert!!!",data);
          // alert("Hello! I am an alert box!!");
          // return   res.status(200).json({ name: 'John Doe' })
          // window.location.reload(true);
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
      },
    };
}

 

