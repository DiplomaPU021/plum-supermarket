import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import ProductSwiper from "./ProductSwiper";
import Link from "next/link";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import HeartIcon from "../icons/HeartIcon";
import CartIcon from "../icons/CartIcon";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCart } from "@/store/cartSlice";
import {
  addToWishList,
  removeFromWishList,
  updateWishList,
} from "@/store/wishListSlice";

import { updateScaleList } from "@/store/scaleListSlice";

// сюди приходить продукт з бази даних напряму
export default function ComparisonCard({ product, style,mode }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState(router.query.code);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const cart = useSelector((state) => state.cart);
  //const { cart } = useSelector((state) => ({ ...state }));

  const wishList = useSelector((state) => state.wishList);
  const [images, setImages] = useState(product.images);

  const [price, setPrice] = useState(product.price);

  const addToCartHandler = async () => {
    // if (!router.query.code) {
    //   setError("Please select a product type");
    //   return;
    // }
    // const { data } = await axios.get(`/api/product/${product._id}?style=${product.style}&code=${router.query.code}`);

    const { data } = await axios.get(
      `/api/product/${product._id}?style=${style}&code=${mode}`
    );

    if (qty > data.quantity) {
      setError("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setError("This product is out of stock.");
      return;
    } else {
      //let _uid = `${data._id}_${product.style}_${router.query.code}`;
      let _uid = `${data._id}_${data.style}_${data.mode}`;
      let exist = null;
      if (cart.cartItems) {
        exist = cart.cartItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        let newCart = cart.cartItems.map((item) => {
          if (item._uid === exist._uid) {
            return { ...item, qty: item.qty + 1 };
          }
          return item;
        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
      }
    }
  };

  const addToWishHandler = async () => {
    // if (!router.query.code) {
    //   setError("Please select a product type");
    //   return;
    // }
    // const { data } = await axios.get(`/api/product/${product._id}?style=${product.style}&code=${router.query.code}`);

    const { data } = await axios.get(
      `/api/product/${product._id}?style=${style}&code=${mode}`
    );

    if (qty > data.quantity) {
      setError("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setError("This product is out of stock.");
      return;
    } else {
      //let _uid = `${data._id}_${product.style}_${router.query.code}`;
      let _uid = `${data._id}_${data.style}_${data.mode}`;
      let exist = null;
      if (wishList.wishListItems) {
        exist = wishList.wishListItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        let newWishList = wishList.wishListItems.filter((item) => {
          return item._uid != _uid;
        });
        dispatch(updateWishList(newWishList));
      } else {
        dispatch(addToWishList({ ...data, qty, size: data.size, _uid }));
      }
    }
  };

  const deleteProductHadler =  () => {
    dispatch(updateScaleList({ ...product }));
  };

  return (
    <Card className={styles.product}>
      <div className={styles.product__container}>
        <div className={styles.product__container_photobox}>
          <Link href={`/product/${product.slug}?style=0&code=0`}>
            <ProductSwiper images={images} />
          </Link>
          <button className={styles.btnclose}
           onClick={()=>deleteProductHadler(product)}
          >
            <img src="../../icons/close_btn.png" alt="" />
          </button>
        </div>
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title className={styles.product__container_infos_title}>
                {(
                  product.name +
                  " " +
                  (product.color ? product.color.color : "") +
                  " " +
                  product.size
                ).length > 55
                  ? `${product.name.substring(0, 55)}...`
                  : product.name +
                    " " +
                    (product.color ? product.color.color : "") +
                    " " +
                    product.size}
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.product__container_infos_line}></div>
            </Col>
          </Row>
          <Row className={styles.product__container_infos_pricebtn}>
            {product.discount > 0 ? (
              <Col className={styles.product__container_infos_pricebtn_price}>
                <span className={styles.pricediscount}>{`${price.toLocaleString(
                  "uk-UA"
                )} ${product.price_unit}`}</span>
                <span className={styles.priceregular}>
                  {`${Math.round(
                    (price * (100 - product.discount)) / 100
                  ).toLocaleString("uk-UA")}`}{" "}
                  {product.price_unit}
                </span>
              </Col>
            ) : (
              <Col className={styles.product__container_infos_pricebtn_price}>
                <span
                  className={styles.priceregular}
                >{`${price} ${product.price_unit}`}</span>
              </Col>
            )}
            <Button onClick={addToWishHandler} className={styles.btnscales}>
              <HeartIcon fillColor={"#220F4B"} />
            </Button>
            <Button
              className={styles.btncart}
              disabled={product.quantity < 1}
              style={{
                cursor: `${product.quantity < 1 ? "not-allowed" : ""}`,
              }}
              onClick={() => addToCartHandler()}
            >
              <CartIcon fillColor={"#FAF8FF"} />
            </Button>
          </Row>
          {error && <span>{error}</span>}
        </Container>
      </div>
    </Card>
  );
}
