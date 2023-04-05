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

export default function Infos({ product, active, setActive, setError }) {
  const router = useRouter();
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const [size, setSize] = useState(product.size);
  const scaleList = useSelector((state) => state.scaleList);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizes, setShowSizes] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   setCode("");
  // }, [router.query.code]);

  const addToCartHandler = async () => {
    //need to connect to data base
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
    );

    if (qty > data.quantity) {
      setError("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setError("This product is out of stock.");
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
  const addToWishListHandler = async () => {
    if (session) {
      setIsOpen(false);
      let _uid = `${product._id}_${product.style}_${product.subProducts[product.style].sizes[product.mode].code
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
      `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
    );

    if (qty > data.quantity) {
      setError("The quantity is bigger than in stock.");
      return;
    } else if (data.quantity < 1) {
      setError("This product is out of stock.");
      return;
    } else {
      //let _uid = `${data._id}_${product.style}_${router.query.code}`;
      let _uid = `${data._id}_${data.style}_${data.code}`;
      let exist = null;
      if (scaleList.scaleListItems) {
        exist = scaleList.scaleListItems.find((item) => item._uid === _uid);
      }
      if (exist) {
        let newScaleList = scaleList.scaleListItems.filter((item) => {
          return item._uid != _uid;
        });
        dispatch(updateScaleList(newScaleList));
      } else {
        dispatch(addToScaleList({ ...data, qty, size: data.size, _uid }));
      }
    }
  };
  return (
    <Container fluid className={styles.infos}>
      <Tooltip
        id="login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
      />
      <Row className={styles.infos__priceandaction}>
        <Col className={styles.infos__priceandaction_price}>
          {product.subProducts[active].discount > 0 ? (
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
              data-tooltip-id="login-tooltip"
              onMouseLeave={() => setIsOpen(false)}
            >
              <HeartIcon fillColor="#220F4B" />
            </button>
            {/* TODO count of liked below*/}
            {/* <div>
              <span>6015</span>
            </div> */}
          </div>
          <button onClick={addToScaleHandler}>
            <ScalesIcon fillColor="#220F4B" />
          </button>
        </Col>
        <Col className={styles.infos__priceandaction_buy}>
          <button
            onClick={() => {
              addToCartHandler();
            }}
          >
            <CartIcon fillColor="#FAF8FF" />
            <span>Купити</span>
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
                  onClick={() => setSize(el.size)}
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
