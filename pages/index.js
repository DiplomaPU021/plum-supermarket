import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import "bootstrap/dist/css/bootstrap.min.css"
import ProductCard from "@/components/productCard";

import HomeCarousel from '@/components/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import YoutubeVideo from '@/components/youtube'
import RecomendedVideo from '@/components/recomendedVideo'
import Categories from '@/components/categories'
import TopSales from '@/components/topsales'
import Popular from '@/components/popular'
import AppDownload from '@/components/appdownload'
import FAQ from '@/components/faq'


import {products} from "../models/Product/index";

const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  const { data: session } = useSession()
  console.log(session);
  return (
    <div className={styles.container}>
      <Header />
      <HomeCarousel />
      <Categories />
      <TopSales />
      {/* {session ? "you are logged in" : "you are not logged in"} */}
      {/* <div className={styles.products}>
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </div> */}
      <YoutubeVideo />
      <RecomendedVideo />
      <Popular />
      <AppDownload />
      <FAQ />
      <Footer />
    </div>
  );
}
