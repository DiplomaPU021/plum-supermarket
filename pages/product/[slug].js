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
import { useEffect, useState } from "react";
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
import User from "@/models/User";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { updateNumberReviews, updateReviewRating } from "@/store/reviewSlice";
import GroupSubCategory from "@/models/GroupSubCategory";
import FloatingButton from '@/components/FloatingButton';
import { addToViewedList } from "@/store/viewedListSlice";

export default function product({ product, popular, country, style, mode }) {
  const [active, setActive] = useState({ style: style, mode: mode });
  const [productReview, setProductReview] = useState(product?.reviews?.reverse());
  const [productError, setProductError] = useState("");
  const dispatch = useDispatch();
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  useEffect(() => {
    dispatch(updateReviewRating(product.rating))
    dispatch(updateNumberReviews(product.numReviews))
  }, [product]);

  
  // const viewedList = useSelector((state) => state.viewedList);
  
  // useEffect(() => {
  //   const addToViewedHandler = async () => {
  //     const { data } = await axios.get(
  //       `/api/product/${product._id}?style=${active.style}&code=${active.mode}`
  //     );

  //     if (viewedList.viewedListItems) {
  //       const existItem = viewedList.viewedListItems.find(
  //         (item) =>
  //           item._id == data._id &&
  //           item.style == data.style &&
  //           item.mode == data.mode
  //       );

  //       if (!existItem) {
  //         dispatch(addToViewedList({ ...data }));
  //       }
  //     }
  //   };

  //   addToViewedHandler();
  // }, []);

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
          <Link
            href={`/subCategory/${product.subCategories[0].parent.slug}?sub=${product.subCategories[0].slug}`}
            className={styles.links__link}
          >
            <span> {product.subCategories[0].name}</span>
          </Link>
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
          <Row style={{ margin: "0" }}>
            <Col style={{ padding: "0", width: "50%" }}>
              <MainSwiperCard
                product={product}
                active={active}
                setActive={setActive}
                productReview={productReview}
                setProductReview={setProductReview}
              />
            </Col>
            <Col style={{ padding: "0", width: "50%" }}>
              <Infos product={product} active={active} setActive={setActive} productError={productError} setProductError={setProductError} />
            </Col>
          </Row>
        </Container>
      </Container>
      <CustomerInfo />
      <CheaperTogether product={product} productsPlus={product.productsPlus} active={active} setActive={setActive} />
      <ProductDescription product={product} />
      <FloatingButton />
      <Reviews product={product} productReview={productReview} setProductReview={setProductReview} active={active} setActive={setActive} />
      <Popular title={"Популярне з категорії"} products={popular} category={product.category.name} />
      <Footer country={country} />
    </Container>
  );
}
export async function getServerSideProps(context) {
  const { query, req } = context;
  const slug = query.slug;
  const style = query.style == null || query.style == "undefined" ? 0 : query.style;
  const mode = query.code || 0;

  const countryData = await getCountryData();

  await db.connectDb();
  //----------------
  //from db
  let product = await Product.findOne({ slug })
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory, populate: { path: "parent", model: GroupSubCategory } })
    .populate({ path: "reviews.reviewBy", model: User })
    .populate({ path: "reviews.replies.replyBy", model: User })
    .lean();
  // console.log("PagesProductSlugProps", product);
  if (!product) {
    await db.disconnectDb();
    return {
      redirect: {
        destination: "/",
      }
    }
  }
  let subProduct = product.subProducts[style];
  let price = subProduct.sizes[mode].price.toFixed();

  //products that go together cheaper
  let productsPlus = await Product.find()
    .populate({ path: "category", model: Category })
    .populate({ path: "subCategories", model: SubCategory })
    .populate({ path: "reviews.reviewBy", model: User })
    .populate({ path: "reviews.replies.replyBy", model: User })
    .sort({ createdAt: -1 }).lean();

  //Should be with mark "popular"
  let onlyFromCategory = await Product.find({ category: product.category._id })
    .lean();
  let newFromCategory = onlyFromCategory.map((product) => {
    let style = -1;
    let mode = -1;
    // знайдемо індекс першого підпродукту з ненульовим залишком
    for (let i = 0; i < product.subProducts.length; i++) {
      let subProduct = product.subProducts[i];
      for (let j = 0; j < subProduct.sizes.length; j++) {
        if (subProduct.sizes[j].qty > 0) {
          style = i;
          mode = j;
          break;
        }
      }
      if (style !== -1) {
        break;
      }
    }

    let color = product.subProducts[style] ? product.subProducts[style].color?.color : '';
    let size = product.subProducts[style].sizes[mode].size;
    let sold = product.subProducts[style].sold;
    let priceAfter = ((100 - product.subProducts[style].discount) * product.subProducts[style].sizes[mode].price / 100).toFixed();
    return {
      ...product,
      style,
      mode,
      color,
      size,
      sold,
      priceAfter
    };
  });
  let popularFromCategory = [...newFromCategory].sort((a, b) => b.sold - a.sold);
  // let popularFromCategory = await Product.aggregate([
  //   { $match: { category: product.category._id } },
  //   { $unwind: "$subProducts" },
  //   { $sort: { "subProducts.sold": -1 } }, 
  //   { $group: { _id: "$_id", subProducts: { $push: "$subProducts" } } },
  //   { $project: { _id: 0, subProducts: 1 } },
  // ]).exec();
  let newProduct = {
    ...product,
    style,
    mode,
    images: subProduct.images,
    sizes: subProduct.sizes,
    size: subProduct.sizes[mode].size,
    discount: subProduct.discount,
    color: subProduct.color?.color,
    price,
    priceAfter: ((100 - subProduct.discount) * price / 100).toFixed(),
    price_unit: subProduct.sizes[mode].price_unit,
    code: subProduct.sizes[mode].code,
    sold: subProduct.sold,
    quantity: subProduct.sizes[mode].qty,
    productsPlus: newFromCategory,
    reviews: product.reviews.reverse(),
    rating: product.rating
  };
  await db.disconnectDb();

  return {
    props: {
      product: JSON.parse(JSON.stringify(newProduct)),
      popular: JSON.parse(JSON.stringify(popularFromCategory)),
      country: countryData,
      style: style,
      mode: mode,
    },
  };
}
