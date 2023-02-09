import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/product.module.scss";
import db from "../../utils/db";
// import { products } from "../../models/Product/index";
import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
//import user from "../../models/User";
//import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
// import MainSwiper from "../../components/productPage/mainSwiper";
// import Infos from "../../components/productPage/infos";
// import Reviews from "../../components/productPage/reviews";
import { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/GreenChevronRight";

export default function product({ product }) {
  const [activeImg, setActiveImg] = useState("");
  return (
    <div className={styles.product}>
      <Header country="" />
      <div className={styles.product__container}>
        <div className={styles.product__container_path}>
          <LightPlumIcon />
          <div className={styles.product__container_path_chevronRight}>
            <GreenChevronRight />
          </div>
          <span>{product.category.name}</span>
          <div className={styles.product__container_path_chevronRight}>
            <GreenChevronRight />
          </div>
          {product.subCategories.map((sub, i) => (
            <span key={i}> {sub.name}</span>
          ))}
        </div>
        <div className={styles.product__container_nameCode}>
          <div className={styles.product__container_nameCode_name}>
            <span>
              {product.name.length > 60
                ? `${product.name.substring(0, 60)}...`
                : product.name}
            </span>
          </div>
          <div className={styles.product__container_nameCode_code}>
            {/* below have to be code of product (NOT _ID)!!! */}
            <span>Code: {product._id}</span>
          </div>
        </div>
        <div>
          <div>
            Photo + Description
            {/*  className={styles.product__main} */}
            {/* <MainSwiper images={product.images} activeImg={activeImg} />
            <Infos product={product} setActiveImg={setActiveImg} /> */}
          </div>
        </div>
        <div>
          <div>
            Others
            {/* <Reviews product={product} /> */}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style; // id subproduct
  const code = query.code || 0; //id sizes

  db.connectDb();
  //----------------
  //from db
  let product = await Product.findOne({slug})
  .populate({path: "category", model: Category})
  .populate({path: "subCategories._id", model: SubCategory})
  // .populate({path: "reviews.reviewBy", model: User})
  .lean();
  // let product = products.find((el) => el.slug == slug);
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    code,
    // sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange: subProduct.discount
      ? `From ${(prices[0] - prices[0] / subProduct.discount).toFixed(2)} to ${(
          prices[prices.length - 1] -
          prices[prices.length - 1] / subProduct.discount
        ).toFixed(2)}$`
      : `From ${prices[0]} to ${prices[prices.length - 1]}$`,
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[code].price -
            subProduct.sizes[code].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[code].price,
    priceBefore: subProduct.sizes[code].price,
    quantity: subProduct.sizes[code].qty,
    ratings: [
      { percentage: 76 },
      { percentage: 14 },
      { percentage: 6 },
      { percentage: 4 },
      { percentage: 0 },
    ],
    allSizes: product.subProducts
      .map((p) => {
        return p.sizes;
      })
      .flat()
      .sort((a, b) => {
        return a.size - b.size;
      })
      .filter(
        (element, index, array) =>
          array.findIndex((el2) => el2.size === element.size) === index
      ),
  };
  //----------------
  db.disconnectDb();
  return {
    props: { product: JSON.parse(JSON.stringify(newProduct)) },
  };
}
