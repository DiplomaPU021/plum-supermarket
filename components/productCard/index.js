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

// сюди приходить продукт з бази даних напряму
export default function ProductCard({ product }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState(router.query.code);
  const [qty, setQty] = useState(1);
  const [errorInProductCard, setErrorInProductCard] = useState("");
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const scaleList = useSelector((state) => state.scaleList);

  //const { cart } = useSelector((state) => ({ ...state }));

  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return Number(s.price);
      })
      .sort((a, b) => {
        return a - b;
      })
  );
  const [isOpen, setIsOpen] = useState(false);
  // useEffect(() => {
  //   setCode("");
  //   setQty(1);
  // }, [router.query.style]);
  // useEffect(() => {
  //   if (qty > product.quantity) {
  //     setQty(product.quantity);
  //   }
  // }, [router.query.code]);
  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return Number(s.price);
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);

  const addToCartHandler = async () => {
    // if (!router.query.code) {
    //   setError("Please select a product type");
    //   return;
    // }
    // const { data } = await axios.get(`/api/product/${product._id}?style=${product.style}&code=${router.query.code}`);

    const { data } = await axios.get(
      `/api/product/${product._id}?style=0&code=0`
    );

    if (qty > data.quantity) {
      setErrorInProductCard("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setErrorInProductCard("This product is out of stock.");
      return;
    } else {
      //let _uid = `${data._id}_${product.style}_${router.query.code}`;
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
      setIsOpen(false);
      let _uid = `${product._id}_${active}_${product.subProducts[active].sizes[active].code}`;
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
          `/api/product/${product._id}?style=0&code=0`
        );
        dispatch(
          addToWishList({ ...data, qty, size: data.size, _uid, mode: 0 })
        );
        saveWishList({
          productId: product._id,
          size: product.subProducts[active].sizes[active].size,
          image: product.subProducts[active].images[0],
          color: product.subProducts[active].color?.color,
          code: product.subProducts[active].sizes[active].code,
        });
      }
    } else {
      setIsOpen(true);
    }

    // if (!router.query.code) {
    //   setError("Please select a product type");
    //   return;
    // }
    // const { data } = await axios.get(`/api/product/${product._id}?style=${product.style}&code=${router.query.code}`);

    // const { data } = await axios.get(
    //   `/api/product/${product._id}?style=0&code=0`
    // );

    // if (qty > data.quantity) {
    //   setError("The quantity is bigger than in stock.");
    //   return;
    // } else if (data.quantity < 1) {
    //   setError("This product is out of stock.");
    //   return;
    // } else {
    //   //let _uid = `${data._id}_${product.style}_${router.query.code}`;
    //   let _uid = `${data._id}_${data.style}_${data.code}`;
    //   let exist = null;
    //   if (wishList.wishListItems) {
    //     exist = wishList.wishListItems.find((item) => item._uid === _uid);
    //   }
    //   if (exist) {
    //     let newWishList = wishList.wishListItems.filter((item) => {
    //       return item._uid != _uid;
    //   });
    //   dispatch(updateWishList(newWishList));
    //   } else {
    //     dispatch(addToWishList({ ...data, qty, size: data.size, _uid,mode:0 }));
    //   }
    // }
  };

  const addToScaleHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=0&code=0`
    );
    let existSub = null;
    let existItem = null;
    if (scaleList.scaleListItems) {
      existSub = scaleList.scaleListItems.find(
        (item) => item.subCategory_id === data.subCategory_id
      );
      if (existSub) {
        existItem = existSub.items.find((p) => p._id === data._id);
        if (existItem) {
          if (existSub.items.length === 1) {
            dispatch(removeFromScaleList({ ...existSub }));
          } else {
            dispatch(updateScaleList({ ...data }));
          }
        } else {
          dispatch(addToScaleList({ ...data }));
        }
      } else {
        dispatch(addToScaleList({ ...data }));
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
      />
      <div className={styles.product__container}>
        <div className={styles.product__container_photobox}>
          <Link href={`/product/${product.slug}?style=${active}&code=0`}>
            <ProductSwiper images={images} />
          </Link>
          <Button
            className={styles.btnheart}
            onClick={addToWishHandler}
            data-tooltip-id="login-tooltip"
            onMouseLeave={() => setIsOpen(false)}
          >
            <HeartIcon fillColor={"#220F4B"} />
          </Button>
        </div>
        {product.subProducts[active].discount ? (
          <div className={styles.product__discount}>
            -{product.subProducts[active].discount}%
          </div>
        ) : (
          <></>
        )}
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title className={styles.product__container_infos_title}>
                {(
                  product.name +
                  " " +
                  (product.subProducts[active].color
                    ? product.subProducts[active].color.color
                    : "") +
                  " " +
                  product.subProducts[active].sizes[active].size
                ).length > 55
                  ? `${product.name.substring(0, 55)}...`
                  : product.name +
                    " " +
                    (product.subProducts[active].color
                      ? product.subProducts[active].color.color
                      : "") +
                    " " +
                    product.subProducts[active].sizes[active].size}
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.product__container_infos_line}></div>
            </Col>
          </Row>
          <Row className={styles.product__container_infos_pricebtn}>
            {product.subProducts[active].discount > 0 ? (
              <Col className={styles.product__container_infos_pricebtn_price}>
                <span
                  className={styles.pricediscount}
                >{`${prices[0].toLocaleString("uk-UA")} ${
                  product.subProducts[active].sizes[0].price_unit
                }`}</span>
                <span className={styles.priceregular}>
                  {`${Math.round(
                    (prices[0] * (100 - product.subProducts[active].discount)) /
                      100
                  ).toLocaleString("uk-UA")}`}{" "}
                  {product.subProducts[active].sizes[0].price_unit}
                </span>
              </Col>
            ) : (
              <Col className={styles.product__container_infos_pricebtn_price}>
                <span
                  className={styles.priceregular}
                >{`${prices[0]} ${product.subProducts[active].sizes[0].price_unit}`}</span>
              </Col>
            )}
            <Button
              className={styles.btnscales}
              onClick={() => addToScaleHandler()}
            >
              <ScalesIcon fillColor={"#220F4B"} />
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
          {errorInProductCard && <span>{errorInProductCard}</span>}
        </Container>
      </div>
    </Card>
  );
}
