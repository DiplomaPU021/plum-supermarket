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
import CheckoutOrder from '@/components/checkoutorder'
import { getCountryData } from "@/utils/country";
// import { useRouter } from "next/router";


const inter = Inter({ subsets: ["latin"] });


export default function Checkout({ cart, user, country }) {
  // console.log("cart, user, country OnCheckoutPage",cart, user, country);
  //  const router = useRouter();
  // React.useEffect(() => {
  //   if (!cart || !user) {
  //     router.push('/');
  //   }
  // }, [cart, user]);

  return (
    <div className={styles.container}>
      <Header />
      <CheckoutOrder cart={cart} user={user} country={country} />
      <Footer country={country} />
    </div>
  );


}
export async function getServerSideProps(context) {

  const countryData = await getCountryData();
  await db.connectDb();
  var user = {}; var cart = {};
  const { req } = context;
  const session = await getSession({ req });
  if (session) {
    console.log("//////////////////////////////////Session:", session);
    user = await User.findById(session.user.id);

    if (user) {
      user = JSON.parse(JSON.stringify(user));
      cart = await Cart.findOne({ user: user._id });
      if (cart) {
        cart = JSON.parse(JSON.stringify(cart));
      } else {
        return {
          redirect: {
            destination: "/checkout",
          }
        }
      }

    }
  }
  await db.disconnectDb();
  return {
    props: {
      cart,
      user,
      country: countryData,
    },
  };
}



