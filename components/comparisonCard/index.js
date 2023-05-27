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
import { saveWishList } from "@/requests/user";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/store/cartSlice";
import { addToWishList } from "@/store/wishListSlice";
import { updateScaleList } from "@/store/scaleListSlice";
import { useSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";


export default function ComparisonCard({ product, style, mode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const [wishError, setWishError] = useState(false);
  const [isOpenInCart, setIsOpenInCart] = useState(false);
  const [isOpenInWish, setIsOpenInWish] = useState(false);
  const [wishChosen, setWishChosen] = useState(false);
  const [cartChosen, setCartChosen] = useState(false);
  useEffect(() => {
    let _uid = `${product._id}_${product.style}_${product.mode}`;
    let exist = null;
    if (cart.cartItems) {
      exist = cart.cartItems.find((item) => item._uid == _uid);
    }
    if (exist) {
      setCartChosen(true);
      setIsOpenInCart(true);
    } else {
      setCartChosen(false);
      setIsOpenInCart(false);
    }
  }, [cart.cartTotal, style, mode]);

  useEffect(() => {
    let _uid = `${product._id}_${product.style}_${product.mode}`;
    let exist = null;
    if (wishList.wishListItems) {
      exist = wishList.wishListItems.find((item) => item._uid == _uid);
    }
    if (exist) {
      setWishChosen(true);
      setIsOpenInWish(true);
    } else {
      setWishChosen(false);
      setIsOpenInWish(false);
    }
  }, [wishList.wishListTotal, style, mode]);

  const addToCartHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
    );

    if (qty > data.quantity) {
      setErrorInProductCard("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setErrorInProductCard("This product is out of stock.");
      return;
    } else {
      let _uid = `${data._id}_${data.style}_${data.mode}`;
      let exist = null;
      if (cart.cartItems) {
        exist = cart.cartItems.find((item) => item._uid === _uid);
      }
      if (exist) {
      } else {
        dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
        setCartChosen(true);
      }
    }
  };
  const addToWishHandler = async () => {
    if (session) {
      setWishError("");
      setIsOpenInWish(false);
      let _uid = `${product._id}_${style}_${mode}`;
      let exist = null;
      if (wishList.wishListItems) {
        exist = wishList.wishListItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        setWishError("Товар уже в списку улюблених");
        setIsOpenInWish(true);
      } else {
        const { data } = await axios.get(
          `/api/product/${product._id}?style=${style}&code=${mode}`
        );
        dispatch(
          addToWishList({ ...data, qty, size: data.size, _uid, mode: product.mode })
        );
        saveWishList({
          productId: product._id,
          size: product.size,
          image: product.images[0],
          color: product.color?.color,
          code: product.code,
          mode: product.mode,
          style: product.style
        });
      }
    } else {
      setWishError("Будь ласка зареєструйтесь!");
      setIsOpenInWish(true);
    }
  };

  const deleteProductHadler = () => {
    dispatch(updateScaleList({ ...product }));
  };

  return (
    <Card className={styles.product}>
      <Tooltip
        id="wish-tooltip"
        content={wishError}
        isOpen={isOpenInWish}
        style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px", zIndex: "999" }}

      />
      <div className={styles.product__container}>
        <div className={styles.product__container_photobox}>
          <Link href={`/product/${product.slug}?style=${product.style}&code=${product.mode}`}>
            <ProductSwiper images={product.images} />
          </Link>
          <button className={styles.btnclose}
            onClick={() => deleteProductHadler(product)}
          >
            <img src="../../icons/close_btn.png" alt="" />
          </button>
        </div>
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title className={styles.product__container_infos_title}>
                <Link
                  className={styles.link}
                  href={`/product/${product.slug}?style=${product.style}&code=${product.mode}`}
                >
                  {(
                    product.name.substring(0, 45) +
                    " " +
                    (product.color ? product.color.color : "") +
                    " " +
                    product.size
                  ).length > 55
                    ? `${product.name.substring(0, 55)}...`
                    : product.name.substring(0, 45) +
                    " " +
                    (product.color ? product.color.color : "") +
                    " " +
                    product.size}
                </Link>
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
                <span
                  className={styles.pricediscount}
                >{`${product.price.toLocaleString("uk-UA")} ${product.price_unit
                  }`}</span>
                <span className={styles.priceregular}>
                  {`${Math.round(
                    (product.price * (100 - product.discount)) / 100
                  ).toLocaleString("uk-UA")}`}{" "}
                  {product.price_unit}
                </span>
              </Col>
            ) : (
              <Col className={styles.product__container_infos_pricebtn_price}>
                <span
                  className={styles.priceregular}
                >{`${product.price.toLocaleString("uk-UA")} ${product.price_unit}`}</span>
              </Col>
            )}
            <Button onClick={addToWishHandler} className={styles.btnscales} data-tooltip-id="wish-tooltip"
              onMouseLeave={() => setIsOpenInWish(false)}
              onBlur={() => setIsOpenInWish(false)}
              style={{ backgroundColor: wishChosen ? "#220F4B" : "#FAF8FF" }}
            >
              <HeartIcon fillColor={wishChosen ? "#FAF8FF" : "#220F4B"} />
            </Button>
            <Button
              className={styles.btncart}
              disabled={product.quantity < 1}
              style={{
                cursor: `${product.quantity < 1 ? "not-allowed" : ""}`,
                backgroundColor: cartChosen ? "#220F4B" : "#FAF8FF"
              }}
              onClick={() => addToCartHandler()}
            >
              <CartIcon fillColor={cartChosen ? "#FAF8FF" : "#220F4B"} />
            </Button>
          </Row>
          {error && <span>{error}</span>}
        </Container>
      </div>
    </Card>
  );
}
