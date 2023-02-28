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

const inter = Inter({ subsets: ["latin"] });


export default function Checkout({ cart, user, country }) {
   return (
     <div className={styles.container}>
       <Header />
       <CheckoutOrder cart={cart} user={user} />
       <Footer country={country}/>
     </div>
   );
 }
export async function getServerSideProps(context) {
  //console.log("contextInCheckoutServerSideProps",context);
  //const [loading, setLoading] = React.useState(false)
  let data = {name: "Ukraine", flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg"}, code: "UA"};
  /* Увага!!! замість обєкту можна використати сервіс ipregistry з наступним методом
    await axios
    .get('https://api.ipregistry.co/?key=aq50e9f94war7j9p')
    .then((res) => {      
      return res.data.location.country;
    })
    .catch((err)=> {
      console.log(err);      
    });*/
 await db.connectDb();
  var user={};
  const { req, query } = context;
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
        country: { name: data.name, flag: data.flag.emojitwo, code: data.code },
      },
    };
}

 

