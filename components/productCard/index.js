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

export default function ProductCard({ product }) {
  const [active, setActive] = useState(0);
  const [images, setImages] = useState(product.subProducts[active]?.images);
  const [prices, setPrices] = useState(
    product.subProducts[active]?.sizes
      .map((s) => {
        return s.price;
      })
      .sort((a, b) => {
        return a - b;
      })
  );

  useEffect(() => {
    setImages(product.subProducts[active].images);
    setPrices(
      product.subProducts[active]?.sizes
        .map((s) => {
          return s.price;
        })
        .sort((a, b) => {
          return a - b;
        })
    );
  }, [active]);

  const addToCartHandler = async () => {
    //need to connect to data base

    // const { data } = await axios.get(
    //   `/api/product/${product._id}?style=${active}&size=0}`
    // );
    // console.log("data----->", data);
    console.log("data----->", product.subProducts[active].sizes[0]);
  };

  return (
    <Card className={styles.product}>
      <div className={styles.product__container}>
        <Link href={`/product/${product.slug}?style=${active}&size=0`}>
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
        </Link>
        {/* TODO onClick */}
        <Button className={styles.btnheart}>
          <HeartIcon fillColor={"#220F4B"} />
        </Button>
        <Container className={styles.product__container_infos}>
          <Row>
            <Col>
              <Card.Title className={styles.product__container_infos_title}>
                {product.name.length > 55
                  ? `${product.name.substring(0, 55)}...`
                  : product.name}
              </Card.Title>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.product__container_infos_line}></div>
            </Col>
          </Row>
          <Col className={styles.product__container_infos_pricebtn}>
            {product.subProducts[active].discount > 0 ? (
              <div className={styles.product__container_infos_pricebtn_price}>
                <span className={styles.pricediscount}>{`${prices[0]} $`}</span>

                <span className={styles.priceregular}>
                  {`${(
                    prices[0] -
                    prices[0] / product.subProducts[active].discount
                  ).toFixed(2)} ₴`}
                  {/* {` ${product.subProducts[active].sizes[0].price_unit}`} */}
                </span>
              </div>
            ) : (
              <div className={styles.product__container_infos_pricebtn_price}>
                <span className={styles.priceregular}>
                  {`${prices[0]} ₴`} 
                </span>
              </div>
            )}
            <div className={styles.product__container_infos_pricebtn_btn}>
              {/* TODO onClick */}
              <Button className={styles.btnscales}>
                <ScalesIcon fillColor={"#220F4B"} />
              </Button>
              <Button
                className={styles.btncart}
                onClick={() => {
                  addToCartHandler();
                }}
              >
                <CartIcon fillColor={"#FAF8FF"} />
              </Button>
            </div>
          </Col>
        </Container>
      </div>
    </Card>
  );
}
