import styles from "../styles/Home.module.scss";
import { useSession, signIn, signOut } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import "bootstrap/dist/css/bootstrap.min.css";
import ProductCard from "@/components/productCard";
import HomeCarousel from "@/components/carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import YoutubeVideo from "@/components/youtube";
import RecomendedVideo from "@/components/recomendedVideo";
import db from "../utils/db";
import Product from "../models/Product";

export default function Home({ products }) {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className={styles.container}>
      <Header />
      <HomeCarousel />
      {/* {session ? "you are logged in" : "you are not logged in"} */}
      <div className={styles.products}>
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
      <YoutubeVideo />
      <RecomendedVideo />
      <Footer />
    </div>
  );
}
export async function getServerSideProps() {
  db.connectDb();
  //----------------
  //from db
  let products = await Product.find().sort({createdAt: -1}).lean();
  return {
    props: { products: JSON.parse(JSON.stringify(products)) },
  };
}
