import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import "bootstrap/dist/css/bootstrap.min.css"



import {products} from "../models/Product/index";
import CheckoutOrder from '@/components/checkoutorder'

const inter = Inter({ subsets: ["latin"] });


export default function Checkout() {
  return (
    <div className={styles.container}>
      <Header />
      <CheckoutOrder/>
      <Footer />
    </div>
  );
}
