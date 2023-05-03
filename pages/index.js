import { Inter } from "next/font/google";
import styles from "../styles/Home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HomeCarousel from "@/components/carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import YoutubeVideo from "@/components/youtube";
import RecomendedVideo from "@/components/recomendedVideo";
import Categories from "@/components/categories";
import TopSales from "@/components/topsales";
import AppDownload from "@/components/appdownload";
import FAQ from "@/components/faq";
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";
import Category from "@/models/Category";
import { getCountryData } from "@/utils/country";
import SubCategory from "@/models/SubCategory";
import User from "@/models/User";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country, products, categories, searchHandler }) {

  const { data: session, status } = useSession();
  // console.log("session",session, status);
  return (
    <div className={styles.container}>
      <Header country={country} searchHandler={searchHandler}/>
      <HomeCarousel />
      <Categories categories={categories} />
      <TopSales products={products} />
      <YoutubeVideo />
      <RecomendedVideo />
      <AppDownload />
      <FAQ />
      <Footer country={country} />
    </div>
  );
}
export async function getServerSideProps() {
  const countryData = await getCountryData();

  await db.connectDb();

  //code below is for component TopSales
  let products = await Product.find()
  .populate({ path: "category", model: Category })
  .populate({ path: "subCategories", model: SubCategory })
  .populate({ path: "reviews.reviewBy", model: User })
  .populate({ path: "reviews.replies.replyBy", model: User })
  .lean();
  let newProducts = products.map((product) => {
    let style = -1;
    let mode = -1;
  
    product.subProducts.forEach((subProduct, subIndex) => {
      subProduct.sizes.forEach((size, sizeIndex) => {
        if (size.qty > 0 && style === -1) {
          style = subIndex;
          mode = sizeIndex;
        }
      });
    });
  
    let color = product.subProducts[style] ? product.subProducts[style].color?.color : '';
    let size = mode !== -1 ? product.subProducts[style].sizes[mode].size : "";
  
    return {
      ...product,
      style,
      mode,
      color,
      size,
    };
  });

  //code below is for component Categories
  let categories = await Category.find().lean();

  return {
    props: {
      country: countryData,
      products: JSON.parse(JSON.stringify(newProducts)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
