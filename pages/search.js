import * as React from "react"
import { Inter } from "next/font/google"
import styles from '../styles/Home.module.scss'
import { getSession } from "next-auth/react"
import Header from '@/components/header'
import "bootstrap/dist/css/bootstrap.min.css";
import { getCountryData } from "@/utils/country";

const inter = Inter({ subsets: ["latin"] });


export default function Search({  country, searchText }) {
  return (
    <div className={styles.container}>
      <Header country={country} />
   <div>{searchText}</div>
    </div>

  );
}

export async function getServerSideProps({query}) {

  const countryData = await getCountryData();
  const searchQuery=query.text || '';
//   await db.connectDb();
//   var user = {}; var cart = {};
//   const { req } = context;
//   const session = await getSession({ req });
//   if (session) {
//     user = await User.findById(session.user.id);
//     if (user) {
//       user = JSON.parse(JSON.stringify(user));
//       cart = await Cart.findOne({ user: user._id });
//       if (cart) {
//         cart = JSON.parse(JSON.stringify(cart));
//       }
//       else {
//         return {
//           redirect: {
//             destination: "/checkout",
//           }
//         }
//       }
//     }
//   }
//   await db.disconnectDb();
  return {
    props: {
      country: countryData,
      searchText:searchQuery
    },
  };
}