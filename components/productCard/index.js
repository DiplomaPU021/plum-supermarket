import { useCallback, useEffect, useMemo, useState } from "react";
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
import ScalesIcon from "../icons/ScalesIcon";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCart } from "@/store/cartSlice";
import { addToWishList, updateWishList } from "@/store/wishListSlice";
import { updateOneInWishList, saveWishList } from "@/requests/user";
import { useSession } from "next-auth/react";
import {
  addToScaleList,
  updateScaleList,
  removeFromScaleList,
} from "@/store/scaleListSlice";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { addToViewedList } from "@/store/viewedListSlice";

export default function ProductCard({ product, style, mode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [images, setImages] = useState(product.subProducts[style]?.images);
  const [qty, setQty] = useState(1);
  const [errorInProductCard, setErrorInProductCard] = useState("");
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const scaleList = useSelector((state) => state.scaleList);
  const viewedList = useSelector((state) => state.viewedList);
  const [opacity, setOpacity] = useState("1");
  const reviewRating = useSelector((state) => state.reviewRating);
  const [isOpen, setIsOpen] = useState(false);
  const [wishChosen, setWishChosen] = useState(false);
  const [cartChosen, setCartChosen] = useState(false);
  const [scaleChosen, setScaleChosen] = useState(false);

  useEffect(() => {
    setImages(product.subProducts[style].images);
    setOpacity(product.quantity < 1 ? "0.6" : "1");
  }, [style, product.slug, product]);

  const addToCartHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${style}&code=${mode}`
    );

    if (qty > data.quantity) {
      setErrorInProductCard("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setErrorInProductCard("This product is out of stock.");
      return;
    } else {
      setCartChosen(cartChosen ? false : true);
      let _uid = `${data._id}_${data.style}_${data.code}`;
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
    if (session) {
      setWishChosen(wishChosen ? false : true);
      setIsOpen(false);
      let _uid = `${product._id}_${style}_${product.subProducts[style].sizes[mode].code}`;
      let exist = null;
      if (wishList.wishListItems) {
        exist = wishList.wishListItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        let newWishList = wishList.wishListItems.filter((item) => {
          return item._uid != _uid;
        });
        dispatch(updateWishList(newWishList));
        updateOneInWishList({ productId: product._id });
      } else {
        const { data } = await axios.get(
          `/api/product/${product._id}?style=${style}&code=${mode}`
        );
        dispatch(
          addToWishList({ ...data, qty, size: data.size, _uid, mode: 0 })
        );
        saveWishList({
          productId: product._id,
          size: product.subProducts[style].sizes[mode].size,
          image: product.subProducts[style].images[0],
          color: product.subProducts[style].color?.color,
          code: product.subProducts[style].sizes[mode].code,
        });
      }
    } else {
      setIsOpen(true);
    }
  };

  const addToScaleHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${style}&code=${mode}`
    );
    let existSub = null;
    let existItem = null;
    if (scaleList.scaleListItems) {
      existSub = scaleList.scaleListItems.find(
        (item) => item.subCategory_id === data.subCategory_id
      );
      if (existSub) {
        existItem = existSub.items.find(
          (p) =>
            p._id == data._id && p.style == data.style && p.mode == data.mode
        );
        if (existItem) {
          if (existSub.items.length === 1) {
            dispatch(removeFromScaleList({ ...existSub }));
            setScaleChosen(false);
          } else {
            dispatch(updateScaleList({ ...data }));
            setScaleChosen(false);
          }
        } else {
          dispatch(addToScaleList({ ...data }));
          setScaleChosen(true);
        }
      } else {
        dispatch(addToScaleList({ ...data }));
        setScaleChosen(true);
      }
    }
  };

  const addToViewedHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${style}&code=${mode}`
    );
    
    if (viewedList.viewedListItems) {
      const existItem = viewedList.viewedListItems.find(
        (item) =>
          item._id == data._id &&
          item.style == data.style &&
          item.mode == data.mode
      );
      
      if (!existItem) {
        dispatch(addToViewedList({ ...data }));
      }
    }
  };

  return (
    <Card className={styles.product}>
      <Tooltip
        id="login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
        offset={30}
        style={{
          backgroundColor: "#70BF63",
          color: "#fff",
          borderRadius: "30px",
          zIndex: "2",
        }}
      />
      <div className={styles.product__container}>
        <div className={styles.product__container_photobox}>
          <Link
            style={{ opacity: opacity }}
            onClick={addToViewedHandler}
            href={`/product/${product.slug}?style=${style}&code=${mode}`}
          >
            <ProductSwiper images={images} />
          </Link>
          <Button
            className={styles.btnheart}
            onClick={addToWishHandler}
            data-tooltip-id="login-tooltip"
            onMouseLeave={() => setIsOpen(false)}
            style={{ backgroundColor: wishChosen ? "#220F4B" : "#FAF8FF" }}
          >
            <HeartIcon fillColor={wishChosen ? "#FAF8FF" : "#220F4B"} />
          </Button>
        </div>
        {product.subProducts[style]?.discount ? (
          <div
            style={{ opacity: opacity }}
            className={styles.product__discount}
          >
            -{product.subProducts[style]?.discount}%
          </div>
        ) : (
          <></>
        )}
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title
                style={{ opacity: opacity }}
                className={styles.product__container_infos_title}
              >
                <Link
                  className={styles.link}
                  onClick={addToViewedHandler}
                  href={`/product/${product.slug}?style=${style}&code=${mode}`}
                >
                  {(
                    product.name +
                    " " +
                    (product.subProducts[style]?.color
                      ? product.subProducts[style]?.color.color
                      : "") +
                    " " +
                    product.subProducts[style]?.sizes[mode].size
                  ).length > 55
                    ? `${product.name.substring(0, 55)}...`
                    : product.name +
                      " " +
                      (product.subProducts[style]?.color
                        ? product.subProducts[style]?.color.color
                        : "") +
                      " " +
                      product.subProducts[style]?.sizes[mode].size}
                </Link>
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <div
                style={{ opacity: opacity }}
                className={styles.product__container_infos_line}
              ></div>
            </Col>
          </Row>
          <Row className={styles.product__container_infos_pricebtn}>
            {product.subProducts[style]?.discount > 0 ? (
              <Col
                style={{ opacity: opacity }}
                className={styles.product__container_infos_pricebtn_price}
              >
                <span className={styles.pricediscount}>{`${product.subProducts[
                  style
                ]?.sizes[mode].price.toLocaleString("uk-UA")} ${
                  product.subProducts[style]?.sizes[mode].price_unit
                }`}</span>
                <span className={styles.priceregular}>
                  {`${Math.round(
                    (product.subProducts[style]?.sizes[mode].price *
                      (100 - product.subProducts[style]?.discount)) /
                      100
                  ).toLocaleString("uk-UA")}`}{" "}
                  {product.subProducts[style].sizes[mode].price_unit}
                </span>
              </Col>
            ) : (
              <Col
                style={{ opacity: opacity }}
                className={styles.product__container_infos_pricebtn_price}
              >
                <span className={styles.priceregular}>{`${product.subProducts[
                  style
                ]?.sizes[mode].price.toLocaleString("uk-UA")} ${
                  product.subProducts[style]?.sizes[mode].price_unit
                }`}</span>
              </Col>
            )}
            <Button
              className={styles.btnscales}
              style={{ backgroundColor: scaleChosen ? "#220F4B" : "#FAF8FF" }}
              onClick={() => addToScaleHandler()}
            >
              <ScalesIcon fillColor={scaleChosen ? "#FAF8FF" : "#220F4B"} />
            </Button>
            <Button
              className={styles.btncart}
              disabled={product.quantity < 1}
              style={{
                opacity: opacity,
                cursor: `${product.quantity < 1 ? "not-allowed" : ""}`,
                backgroundColor: cartChosen ? "#220F4B" : "#FAF8FF",
              }}
              onClick={() => addToCartHandler()}
            >
              <CartIcon fillColor={cartChosen ? "#FAF8FF" : "#220F4B"} />
            </Button>
          </Row>
          {errorInProductCard && <span>{errorInProductCard}</span>}
        </Container>
      </div>
    </Card>
  );
}
