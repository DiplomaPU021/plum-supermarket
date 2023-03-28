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
import CheaperTogether from "@/components/productPage/cheaperTogether";
import ProductDescription from "@/components/productPage/productDescription";
import Popular from "@/components/popular";
import Reviews from "@/components/productPage/reviews";
import { getCountryData } from "@/utils/country";

export default function product({ product, popular, country }) {
  const [active, setActive] = useState(0);

  return (
    <Container fluid style={{ padding: "0" }}>
      <Header country={country} />
      <Row className={styles.links}>
        <Col style={{ padding: "0" }}>
          <Link href="/">
            <LightPlumIcon />
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <Link
            href={`/category/${product.category.slug}`}
            className={styles.links__link}
          >
            <span>{product.category.name}</span>
            <GreenChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </Link>
          <span className={styles.links__link}>
            {product.subCategories[0].name}
          </span>
        </Col>
      </Row>
      <Row className={styles.nameCode}>
        <Col className={styles.nameCode_name}>
          <span>
            {product.name} {product.color} {product.size}
          </span>
        </Col>
        <Col className={styles.nameCode_code}>
          <span>Код: {product.code}</span>
        </Col>
      </Row>
      <Container fluid className={styles.productpage}>
        <Container fluid className={styles.productpage__main}>
          <Row>
            <Col style={{ padding: "0", width: "50%" }}>
              <MainSwiperCard
                product={product}
                active={active}
                setActive={setActive}
              />
            </Col>
            <Col style={{ padding: "0", width: "50%" }}>
              <Infos product={product} active={active} setActive={setActive} />
            </Col>
          </Row>
        </Container>
      </Container>
      <CustomerInfo />
      <CheaperTogether product={product} productsPlus={product.productsPlus} />
      <ProductDescription product={product} />
      <Reviews reviews={product.reviews} />
      <Popular title={"Популярне з категорії"} products={popular} category={product.category.name} />
      <Footer country={country} />
    </Container>
  );
}
export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style || 0;
  const mode = query.code || 0;

  const countryData = await getCountryData();

  await db.connectDb();
  //----------------
  //from db
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    //.populate({path: "reviews.reviewBy", model: User})
    .lean();
  console.log("PagesProductSlugProps", product);
  let subProduct = product.subProducts[style];


  let price = subProduct.sizes[mode].price.toFixed();

  //products that go together cheaper
  let productsPlus = await Product.find().sort({ createdAt: -1 }).lean();


  let newProduct = {
    ...product,
    style,
    // code: subProduct.sizes[code].code,
    mode,
    images: subProduct.images,
    sizes: subProduct.sizes,
    size: subProduct.sizes[mode].size,
    discount: subProduct.discount,
    color: subProduct.color?.color,
    // colors: subProduct.color? product.subProducts.map((p) => {
    //   return p.color;
    // }) : null,
    price,
    priceAfter: ((100 - subProduct.discount) * price / 100).toFixed(),
    price_unit: subProduct.sizes[mode].price_unit,
    code: subProduct.sizes[mode].code,
    sold: subProduct.sold,
    quantity: subProduct.sizes[mode].qty,
    productsPlus,
    // reviews: [
    //   { percentage: 76 },
    //   { percentage: 14 },
    //   { percentage: 6 },
    //   { percentage: 4 },
    //   { percentage: 0 },
    // ],
  };

  console.log("PagesProductSlugPropsNew", newProduct);
  //Should be with mark "popular"
  let popularFromCategory = await Product.find({ category: product.category._id })
    .sort({ createdAt: -1 })
    .lean();

  await db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      popular: JSON.parse(JSON.stringify(popularFromCategory)),
      country: countryData,
    },
  };
}
