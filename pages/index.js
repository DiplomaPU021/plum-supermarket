import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'

import ProductCard from "@/components/productCard/index_copy";
import axios from 'axios';

import {products} from "../models/Product/index";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  return (
    <div className="styles.container">
    <Header/>  
      {/* {session ? "you are logged in" : "you are not logged in"} */}
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div>
      <Footer/> 
    </div>
  );
}
