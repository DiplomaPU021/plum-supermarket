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
import { Col, Container, Row } from "react-bootstrap";

export default function Infos({ product, active }) {
  const router = useRouter();
  const [size, setSize] = useState(router.query.size);
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
    setSize("");
  }, [router.query.style]);
  useEffect(() => {
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
    //   `/api/product/${product._id}?style=${product.style}`
    // );
    // console.log("data----->", data);
    console.log("data----->", product.subProducts[product.style]);
  };

  return (
    <Container fluid className={styles.infos}>
      <Row className={styles.infos__priceandaction}>
        <Col className={styles.infos__priceandaction_price}>
          {product.subProducts[active].discount > 0 ? (
            <div>
              <span className={styles.pricediscount}>{`${prices[0]} $`}</span>

              <span className={styles.priceregular}>
                {`${(
                  prices[0] -
                  prices[0] / product.subProducts[active].discount
                ).toFixed(2)}`}{" "}
                ₴
              </span>
            </div>
          ) : (
            <div>
              <span className={styles.priceregular}>{`${prices[0]} ₴`}</span>
            </div>
          )}
        </Col>
        <Col className={styles.infos__priceandaction_react}>
          <div className={styles.liked}>
            {/* TODO onClick like below*/}
            <button>
              <HeartIcon fillColor="#220F4B" />
            </button>
            {/* TODO count of liked below*/}
            <div>
              <span>6015</span>
            </div>
          </div>
          {/* TODO onClick scales below*/}
          <button>
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
          i < 9 ? (
            <div className={styles.infos__details_row} key={i}>
              <div>
                <span>{info.name}</span>
              </div>
              <div>
                <span>{info.value}</span>
              </div>
            </div>
          ) : null
        )}
      </Col>
      <Col className={styles.infos__more}>
        {/* TODO more details */}
        <button>
          Дивитися всі характеристики{" "}
          <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
        </button>
      </Col>
      {product.sizes[0].size ? 
      (<Row className={styles.infos__sizesInfo}>
        <Col className={styles.infos__sizesInfo_sizes}>
          {product.sizes.map((size, i) => (
            <Link style={{textDecoration: "none"}}
              key={i}
              href={`/product/${product.slug}?style=${router.query.style}&size=${i}`}
            >
              <Col
                className={`${styles.infos__sizesInfo_sizes_size} ${
                  i == router.query.size && styles.active_size
                }`}
                onClick={() => setSize(size.size)}
              >
                {size.size}
              </Col>
            </Link>
          ))}
        </Col>
        <button>
          {/* TODO onClick */}
          Таблиця розмірів{" "}
          <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
        </button>
      </Row>): (null)}
    </Container>
  );
}
