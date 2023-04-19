import "bootstrap/dist/css/bootstrap.min.css";
import CartIcon from "@/components/icons/CartIcon";
import ChevronRight from "@/components/icons/ChevronRight";
import HeartIcon from "@/components/icons/HeartIcon";
import ScalesIcon from "@/components/icons/ScalesIcon";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateCart } from "@/store/cartSlice";
import { Col, Container, Row } from "react-bootstrap";
import AllDetails from "../allDetails";
import SizesTable from "../sizesTable";
import { addToWishList, updateWishList } from "@/store/wishListSlice";
import { useSession } from "next-auth/react";
import { saveWishList, updateOneInWishList } from "@/requests/user";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import {
  addToScaleList,
  removeFromScaleList,
  updateScaleList,
} from "@/store/scaleListSlice";

export default function Infos({ product, active, setActive, productError, setProductError }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const scaleList = useSelector((state) => state.scaleList);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQ, setIsOpenQ] = useState(false);
  const [isOpenInWish, setIsOpenInWish] = useState(false);
  const [wishError, setWishError] = useState(false);
  const [wishChosen, setWishChosen] = useState(false);
  const [cartChosen, setCartChosen] = useState(false);
  const [scaleChosen, setScaleChosen] = useState(false);

  useEffect(() => {
    let _uid = `${product._id}_${product.style}_${product.mode}`;
    let exist = null;
    if (cart.cartItems) {
      exist = cart.cartItems.find((item) => item._uid == _uid);
    }
    if (exist) {
      setCartChosen(true);
      // setIsOpenInCart(true);
    } else {
      setCartChosen(false);
      // setIsOpenInCart(false);
    }
  }, [cart.cartTotal, product.style, product.mode]);

  useEffect(() => {
    let _uid = `${product._id}_${product.style}_${product.mode}`;
    let exist = null;
    if (wishList.wishListItems) {
      exist = wishList.wishListItems.some((item) => item._uid == _uid);
    }
    if (exist) {
      setWishChosen(true);
      setIsOpenInWish(true);
    } else {
      setWishChosen(false);
      setIsOpenInWish(false);
    }
  }, [wishList.wishListTotal, product.style, product.mode]);

  useEffect(() => {
    let exist = null;
    if (scaleList.scaleListItems) {
      exist = scaleList.scaleListItems.some((item) => {
        return item.items.some((p) =>
          p._id == product._id && p.style == product.style && p.mode == product.mode
        )
      });
    }
    if (exist) {
      setScaleChosen(true);
      // setIsOpenInScale(true);
    } else {
      setScaleChosen(false);
      // setIsOpenInScale(false);
    }
  }, [scaleList.scaleListTotal, product.style, product.mode]);

  const addToCartHandler = async () => {
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
    );
    if (qty > data.quantity) {
      setProductError("На складі обмежена кількість товару");
      setIsOpenQ(true);
      return;
    } else if (data.quantity < 1) {
      setProductError("Цей товар закінчився");
      setIsOpenQ(true);
      return;
    } else {
      setIsOpenQ(false);
      let _uid = `${data._id}_${data.style}_${data.mode}`;
      let exist = null;
      if (cart.cartItems) {
        exist = cart.cartItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        setProductError("Товар в корзині");
        setIsOpenQ(true);
        // let newCart = cart.cartItems.map((item) => {
        //   if (item._uid === exist._uid) {
        //     return { ...item, qty: item.qty + 1 };
        //   }
        //   return item;
        // });
        // dispatch(updateCart(newCart)); 
      } else {
        dispatch(addToCart({ ...data, qty, size: data.size, _uid }));
        setCartChosen(true);
      }
    }
  };
  const addToWishListHandler = async () => {
    if (session) {
      setWishError("");
      setIsOpenInWish(false);
      // setIsOpen(false);
      let _uid = `${product._id}_${product.style}_${product.mode}`;
      let exist = null;
      if (wishList.wishListItems) {
        exist = wishList.wishListItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        setWishError("Товар уже в списку улюблених");
        setIsOpenInWish(true);
        // let newWishList = wishList.wishListItems.filter((item) => {
        //   return item._uid != _uid;
        // });
        // dispatch(updateWishList(newWishList));
        // updateOneInWishList({ productId: product._id });
      } else {
        const { data } = await axios.get(
          `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
        );
        // setWishChosen(true);
        // setIsOpenInWish(true);
        // console.log("chosen");
        dispatch(
          addToWishList({
            ...data,
            qty,
            size: data.size,
            _uid,
            mode: product.mode,
          })
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
      // setIsOpen(true);
      setWishError("Будь ласка зареєструйтесь!");
      setIsOpenInWish(true);
    }
  };
  const addToScaleHandler = async () => {
    //need to connect to data base
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
    );
      let existSub = null;
      let existItem = null;
      if (scaleList.scaleListItems) {
        existSub = scaleList.scaleListItems.find(
          (item) => item.subCategory_id === data.subCategory_id
        );
        if (existSub) {
          existItem = existSub.items.some((p) =>{ return p._id == data._id && p.style == data.style && p.mode == data.mode});
          if (existItem) {
            if (existSub.items.length === 1) {
              dispatch(removeFromScaleList({ ...existSub }));
              setScaleChosen(false);
            } else {
              dispatch(updateScaleList({ ...data }));
              setScaleChosen(true);
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
  return (
    <Container fluid className={styles.infos}>
      <Tooltip
        id="quantity-tooltip"
        content={productError}
        isOpen={isOpenQ}
        style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px" }}
      />
      <Tooltip
        id="wish-tooltip"
        content={wishError}
        isOpen={isOpenInWish}
        style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px", zIndex:"999" }}
      />
      <Row className={styles.infos__priceandaction}>
        <Col className={styles.infos__priceandaction_price}>
          {product.subProducts[product.style].discount > 0 ? (
            <div>
              <span className={styles.pricediscount}>{`${Number(
                product.price
              ).toLocaleString("uk-UA")} ${product.price_unit}`}</span>
              <span className={styles.priceregular}>
                {`${Number(product.priceAfter).toLocaleString("uk-UA")} ${product.price_unit
                  }`}
              </span>
            </div>
          ) : (
            <div>
              <span className={styles.priceregular}>{`${Number(
                product.price
              ).toLocaleString()} ${product.price_unit}`}</span>
            </div>
          )}
        </Col>
        <Col className={styles.infos__priceandaction_react}>
          <div className={styles.liked}>
            <button
              onClick={addToWishListHandler}
              data-tooltip-id="wish-tooltip"
              onMouseLeave={() => setIsOpenInWish(false)}
              style={{ backgroundColor: wishChosen ? "#220F4B" : "#FAF8FF" }}
            >
              <HeartIcon fillColor={wishChosen ? "#FAF8FF" : "#220F4B"} />
            </button>
            {/* TODO count of liked below*/}
            {/* <div>
              <span>6015</span>
            </div> */}
          </div>
          <button onClick={addToScaleHandler}
            style={{ backgroundColor: scaleChosen ? "#220F4B" : "#FAF8FF" }}>
            <ScalesIcon fillColor={scaleChosen ? "#FAF8FF" : "#220F4B"} />
          </button>
        </Col>
        <Col className={styles.infos__priceandaction_buy}>
          <button
            onClick={() => {
              addToCartHandler();
            }}
            data-tooltip-id="quantity-tooltip"
            onMouseLeave={() => setIsOpenQ(false)}
            style={{
              cursor: `${product.quantity < 1 ? "not-allowed" : ""}`,
              // backgroundColor: cartChosen ? "#220F4B" : "#FAF8FF"
            }}
          >
            {/* <CartIcon fillColor={cartChosen ? "#FAF8FF" : "#220F4B"} /> */}
            <CartIcon fillColor="#FAF8FF" />
            {cartChosen ? (
              <span>В корзині</span>
            ) : (
              <span>Купити</span>
            )}

          </button>
        </Col>
      </Row>

      <Row className={styles.infos__characteristics}>
        <span>Основні характеристики</span>
      </Row>
      <Col className={styles.infos__details}>
        {product.details.slice(0, product.details.lenght).map((info, i) =>
          i < 9 ?
            info.fields.map((name, index) => (
              <div className={styles.infos__details_row} key={index}>
                <div>
                  <span>{name.name}</span>

                </div>
                <div>
                  <span>{name.value}</span>
                </div>
              </div>
            )) : null
        )}
      </Col>
      <Col className={styles.infos__more}>
        <button onClick={() => setShowDetails(true)}>
          Дивитися всі характеристики{" "}
          <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
        </button>
        <AllDetails
          product={product}
          show={showDetails}
          onHide={() => setShowDetails(false)}
        />
      </Col>

      {product.size ? (
        <Row className={styles.infos__sizesInfo}>
          <span className={`${styles.input} ${productError ? styles.error : ""}`}>
            {/* {productError} */}
          </span>
          <Col className={styles.infos__sizesInfo_sizes}>
            {product.sizes.map((el, i) => (
              <Link
                style={{ textDecoration: "none" }}
                key={i}
                href={`/product/${product.slug}?style=${router.query.style}&code=${i}`}
              >
                <Col
                  className={`${styles.infos__sizesInfo_sizes_size}
                  ${i == router.query.code && styles.active_size}`}
                  onClick={() => setActive((prevState) => ({
                    ...prevState,
                    mode: i,
                  }))}
                >
                  {el.size}
                </Col>
              </Link>
            ))}
          </Col>
          <button onClick={() => setShowSizes(true)}>
            Таблиця розмірів{" "}
            <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </button>
          <SizesTable show={showSizes} onHide={() => setShowSizes(false)} />
        </Row>
      ) : null}
    </Container>
  );
}
