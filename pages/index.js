import { Inter } from "@next/font/google";
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
import Popular from "@/components/popular";
import AppDownload from "@/components/appdownload";
import FAQ from "@/components/faq";
import db from "@/utils/db";
import Product from "@/models/Product";
import axios from "axios";
import Category from "@/models/Category";

const inter = Inter({ subsets: ["latin"] });

export default function Home({ country, products, categories }) {
  console.log("country", country);
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
      <Header country={country} />
      <HomeCarousel />
      <Categories categories={categories} />
      <TopSales products={products} />
      <YoutubeVideo />
      <RecomendedVideo />
      <Popular products={products} />
      <AppDownload />
      <FAQ />
      <Footer country={country} />
    </div>
  );
}
export async function getServerSideProps() {
  let data = {
    name: "Ukraine",
    flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg" },
    code: "UA",
  };
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

  //code below is for component cheaperTogether
  let products = await Product.find();

  //code below is for component categories
  let categories = await Category.find();

  return {
    props: {
      country: { name: data.name, flag: data.flag.emojitwo, code: data.code },
      products: JSON.parse(JSON.stringify(products)),
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
