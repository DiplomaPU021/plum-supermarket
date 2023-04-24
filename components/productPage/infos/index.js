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
import { addToViewedList } from "@/store/viewedListSlice";

export default function Infos({
  product,
  active,
  setActive,
  productError,
  setProductError,
}) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const scaleList = useSelector((state) => state.scaleList);
  const viewedList = useSelector((state) => state.viewedList);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenQ, setIsOpenQ] = useState(false);
  const [wishBtnColor, setWishBtnColor] = useState(false);
  const [scaleBtnColor, setScaleBtnColor] = useState(false);
  const [scaleChosen, setScaleChosen] = useState(false);
  const [opacity, setOpacity] = useState("1");

  let count = 0;

  useEffect(() => {
    setOpacity(product.quantity < 1 ? "0.6" : "1");
  }, [product]);

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
      let _uid = `${data._id}_${data.style}_${data.code}`;
      let exist = null;
      if (cart.cartItems) {
        exist = cart.cartItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        setProductError("Товар уже в корзині");
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
      }
    }
  };
  const addToWishListHandler = async () => {
    if (session) {
      setIsOpen(false);
      let _uid = `${product._id}_${product.style}_${
        product.subProducts[product.style].sizes[product.mode].code
      }`;
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
          `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
        );

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
          size: product.subProducts[product.style].sizes[product.mode].size,
          image: product.subProducts[product.style].images[0],
          color: product.subProducts[product.style].color?.color,
          code: product.subProducts[product.style].sizes[product.mode].code,
        });
      }
    } else {
      setIsOpen(true);
    }
  };

  const addToScaleHandler = async () => {
    //need to connect to data base
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
    );
    let existSub = null;
    let existItem = null;
    if (scaleList.scaleListItems) {
      existSub = scaleList.scaleListItems.find(
        (item) => item.subCategory_id === data.subCategory_id
      );
      if (existSub) {
        existItem = existSub.items.some((p) => {
          return (
            p._id == data._id && p.style == data.style && p.mode == data.mode
          );
        });
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
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
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
    <Container fluid className={styles.infos}>
      <Tooltip
        id="login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
        style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px" }}
      />
      <Tooltip id="quantity-tooltip" content={productError} isOpen={isOpenQ} 
       style={{ backgroundColor: "#70BF63", color: "#fff", borderRadius: "30px" }}/>
      <Col className={styles.infos__priceandaction}>
        <div className={styles.infos__priceandaction_price}>
          {product.subProducts[product.style].discount > 0 ? (
            <div>
              <span className={styles.pricediscount}>{`${Number(
                product.price
              ).toLocaleString("uk-UA")} ${product.price_unit}`}</span>
              <span
                style={{ opacity: opacity }}
                className={styles.priceregular}
              >
                {`${Number(product.priceAfter).toLocaleString("uk-UA")} ${
                  product.price_unit
                }`}
              </span>
            </div>
          ) : (
            <div>
              <span className={styles.priceregular}>{`${Number(
                product.price
              ).toLocaleString("uk-UA")} ${product.price_unit}`}</span>
            </div>
          )}
        </div>
        <div className={styles.infos__priceandaction_react}>
          <div className={styles.liked}>
            {/* TODO onClick like below*/}
            <button
              style={{ backgroundColor: wishBtnColor ? "#220F4B" : "#FAF8FF" }}
              onClick={addToWishListHandler}
              data-tooltip-id="login-tooltip"
              onMouseLeave={() => setIsOpen(false)}
            >
              <HeartIcon fillColor={wishBtnColor ? "#FAF8FF" : "#220F4B"} />
            </button>
            {/* TODO count of liked below*/}
            {/* <div>
              <span>6015</span>
            </div> */}
          </div>
          <button
            style={{ backgroundColor: scaleChosen ? "#220F4B" : "#FAF8FF" }}
            onClick={addToScaleHandler}
          >
            <ScalesIcon fillColor={scaleChosen ? "#FAF8FF" : "#220F4B"} />
          </button>
        </div>
        <div className={styles.infos__priceandaction_buy}>
          {product.quantity < 1 ? (
            <span style={{ color: "#70BF63" }}>
              Немає в наявності
            </span>
          ) : (
            <></>
          )}
          <button
            onClick={() => {
              addToCartHandler();
            }}
          >
            {product.quantity < 1 ? (
              <span style={{ fontSize: "18px", lineHeight: "25px" }}>
                Повідомити коли з’явиться
              </span>
            ) : (
              <>
                <CartIcon fillColor="#FAF8FF" />
                <span>Купити</span>
              </>
            )}
          </button>
        </div>
      </Col>

      <Row className={styles.infos__characteristics}>
        <span>Основні характеристики</span>
      </Row>
      <Col className={styles.infos__details}>
        {product.details.slice(0, product.details.length).map((info, i) =>
          info.fields.map((field, j) =>
            count < 8 && field.isMain ? (
              <div
                className={styles.infos__details_row}
                key={j}
                {...(count += 1)}
              >
                <div>
                  <span>{field.name}</span>
                </div>
                <div>
                  <span>{field.value}</span>
                </div>
              </div>
            ) : null
          )
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
                onClick={addToViewedHandler}
                href={`/product/${product.slug}?style=${router.query.style}&code=${i}`}
              >
                <Col
                  style={{ opacity: el.qty == 0 ? "0.6" : "" }}
                  className={`${styles.infos__sizesInfo_sizes_size}
                  ${i == router.query.code && styles.active_size}`}
                  onClick={() =>
                    setActive((prevState) => ({
                      ...prevState,
                      mode: i,
                    }))
                  }
                  data-tooltip-id="quantity-tooltip"
                  onMouseLeave={() => setIsOpenQ(false)}
                >
                  {el.size}
                  <div
                    style={{ display: el.qty == 0 ? "" : "none" }}
                    className={styles.infos__sizesInfo_sizes_crossline}
                  ></div>
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
