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

// сюди приходить продукт з бази даних напряму
export default function ProductCard({ product }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [code, setCode] = useState(router.query.code);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState("");
  const cart = useSelector((state) => state.cart);
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
          return Number(s.price).toFixed();
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

    const { data } = await axios.get(`/api/product/${product._id}?style=0&code=0`);
    console.log("dataOnProductCardIndex--------->", data);

    // console.log("data2--------->", product._id);
    // console.log("data3--------->", data.style);
    // console.log("data3--------->", data.quantity);
    // console.log("data4--------->", router.query.code);

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
  return (
    <Card className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}&code=0`}>
          <div className={styles.product__container_photobox}>
            <ProductSwiper images={images} />
          </div>
          {product.subProducts[active].discount ? (
            <div className={styles.product__discount}>
              -{product.subProducts[active].discount}%
            </div>
          ) : (
            ""
          )}
          {/* TODO onClick */}
          <Button className={styles.btnheart}>
            <HeartIcon fillColor={"#220F4B"} />
          </Button>
        </Link>
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title className={styles.product__container_infos_title}>

                {(product.name + " " + (product.subProducts[active].color ? product.subProducts[active].color.color : ""
                ) + " " + product.subProducts[active].sizes[active].size).length > 55

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
                >{`${prices[0]} ${product.subProducts[active].sizes[0].price_unit}`}</span>
                <span className={styles.priceregular}>
                  {`${(
                    (Number(prices[0]) *
                      (100 - Number(product.subProducts[active].discount))) /
                    100
                  ).toFixed(2)}`}{" "}
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
            <Col className={styles.product__container_infos_pricebtn_btn}>
              {/* TODO onClick */}
              <Button className={styles.btnscales}>
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
            </Col>
          </Row>
          {error && <span>{error}</span>}
        </Container>
      </div>
    </Card>
  );
}
