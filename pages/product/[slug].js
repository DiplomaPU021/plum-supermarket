import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/product.module.scss";
import db from "../../utils/db";
import Product from "../../models/Product";
import Category from "../../models/Category";
import SubCategory from "../../models/SubCategory";
import Header from "../../components/header";
import Footer from "../../components/footer";
import MainSwiperCard from "../../components/productPage/mainSwiperCard";
import Infos from "../../components/productPage/infos";
import { useState } from "react";
import LightPlumIcon from "@/components/icons/LightPlumIcon";
import GreenChevronRight from "@/components/icons/ChevronRight";
import Link from "next/link";
import CustomerInfo from "@/components/productPage/customerInfo";
import { Col, Container, Row } from "react-bootstrap";
import FAQ from "@/components/faq";
//import BunnerApp from "@/components/bannerApp";
import CheaperTogether from "@/components/productPage/cheaperTogether";
import ProductDescription from "@/components/productPage/productDescription";
import Popular from "@/components/popular";
import Reviews from "@/components/productPage/reviews";
import AppDownload from "@/components/appdownload";

export default function product({ product, products, country }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <Header country={country} />
      <Container fluid className={styles.productpage}>
        <Row>
          <Col>
            <Link href="/">
              <LightPlumIcon />
              <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
            </Link>
            <Link
              href={`/category/${product.category.slug}`}
              className={styles.productpage__link}
            >
              <span>{product.category.name}</span>
              <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
            </Link>
            {product.subCategories.map((sub, i) => (
              <Link
               //TODO LINK
                href="/"
                //href={`/${product.category.name}/${sub.name}`}
                key={i}
                className={styles.productpage__link}
              >
                <span> {sub.name}</span>
              </Link>
            ))}
          </Col>
        </Row>
        <Row className={styles.productpage__nameCode}>
          <Col className={styles.productpage__nameCode_name}>
            <span>
              {product.name} {product.color} {product.size}
            </span>
          </Col>
          <Col className={styles.productpage__nameCode_code}>
            <span>Код: {product.code}</span>
          </Col>
        </Row>
        <Container fluid className={styles.productpage__main}>
          <Row>
            <Col style={{ padding: "0", width: "50%" }}>
              <MainSwiperCard product={product} active={active} setActive={setActive} />
            </Col>
            <Col style={{ padding: "0" , width: "50%" }}>
              <Infos product={product} active={active} setActive={setActive}/>
            </Col>
          </Row>
        </Container>
      </Container>
      <CustomerInfo />
      <CheaperTogether product={product} productsPlus={product.productsPlus} />
      <ProductDescription product={product} />
      <Reviews reviews={product.reviews} />
      <Popular products={products} />
      <AppDownload />
      <FAQ />
      <Footer country={country}/>
    </div>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const code = query.code || 0;
  let data = {name: "Ukraine", flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg"}, code: "UA"};
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
  //----------------
  //from db
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    //.populate({path: "reviews.reviewBy", model: User})
    .lean();

  let subProduct = product.subProducts[style];

  let price=subProduct.sizes[0].price.toFixed(2);
    //products that go together cheaper
  let productsPlus = await Product.find().sort({createdAt: -1}).lean();
  let newProduct = {
    ...product,
    style,
    // code: subProduct.sizes[code].code,
    code,
    images: subProduct.images,
    //sizes: subProduct.sizes,
    size: subProduct.sizes[0].size,
    discount: subProduct.discount,
    color: subProduct.color?.color,
    price,
    priceAfter: ((100-subProduct.discount)*price/100).toFixed(2),

    price_unit: subProduct.sizes[0].price_unit,
    code: subProduct.sizes[0].code,
    sold: subProduct.sold,

    quantity: subProduct.sizes[0].qty,
    productsPlus,
    ratings: [
      { percentage: 76 },
      { percentage: 14 },
      { percentage: 6 },
      { percentage: 4 },
      { percentage: 0 },
    ],

  };

  // console.log("newProduct",newProduct);

  //Should be the same of the catecory
  let products = await Product.find().sort({ popularity: -1 }).limit(5);
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
  //----------------
  await db.disconnectDb();
  return {
    props: {
      country: { name: data.name, flag: data.flag.emojitwo, code: data.code },
      product: JSON.parse(JSON.stringify(newProduct)),
      products: JSON.parse(JSON.stringify(products)),
      country: { name: data.name, flag: data.flag.emojitwo, code: data.code },
    },
  };
}
