import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.scss'
import { useSession, signIn, signOut } from "next-auth/react"
import Header from '@/components/header'
import Footer from '@/components/footer'
import HomeCarousel from '@/components/carousel'
import 'bootstrap/dist/css/bootstrap.min.css';
import YoutubeVideo from '@/components/youtube'
import RecomendedVideo from '@/components/recomendedVideo'
import Categories from '@/components/categories'
import TopSales from '@/components/topsales'
import Popular from '@/components/popular'
import AppDownload from '@/components/appdownload'
import FAQ from '@/components/faq'
import db from '@/utils/db'
import Product from "@/models/Product"

//import {products} from "../models/Product/index";

const inter = Inter({ subsets: ["latin"] });


export default function Home({ products }) {
  const { data: session } = useSession();
  console.log("session index home", session?.user?.id);

 // console.log("productsIndex", products);
  //   .populate({path: "category", model: Category})
  //   .populate({path: "subCategories._id", model: SubCategory})
  //   .lean();
  //   let product2 = await Product.findById("63e3a79f5ba7e472e6726d0f")
  //   .populate({path: "category", model: Category})
  //   .populate({path: "subCategories._id", model: SubCategory})
  //   .lean();
  return (
    <div className={styles.container}>
      <Header />
      <HomeCarousel />
      <Categories />
      <TopSales products={products} />
      <YoutubeVideo />
      <RecomendedVideo />
      <Popular products ={products}/>
      <AppDownload />
      <FAQ />
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  //----------------
  //from db
  let products = await Product.find().sort({ popularity: -1 }).limit(5);
  //let popProducts ;

  // for (let i = 0; i < products.length; i++) {
  //   products[i]=await Product.findOne(products[i]._id).populate({ path: "category", model: Category })
  //   .lean();
  // }
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },

  }

}