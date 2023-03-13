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


export default function Infos({ product, active, setActive }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const cart = useSelector((state) => state.cart);
  const [code, setCode] = useState();

  const [showDetails, setShowDetails] = useState(false)
  const [showSizes, setShowSizes] = useState(false)

  useEffect(() => {
    setCode("");
  }, [router.query.code]);

  const addToCartHandler = async () => {
    //need to connect to data base
    const { data } = await axios.get(
      `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
    );
  
    if (qty > data.quantity) {
      setError('The quantity is bigger than in stock.');
      return;
    } else if (data.quantity < 1) {
      setError('This product is out of stock.');
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
            return { ...item, qty: item.qty + 1 }
          }
          return item;

        });
        dispatch(updateCart(newCart));
      } else {
        dispatch(addToCart(
          { ...data, qty, size: data.size, _uid, }
        ));
      }
    }
  };

  return (
    <Container fluid className={styles.infos}>
      <Row className={styles.infos__priceandaction}>
        <Col className={styles.infos__priceandaction_price}>
          {product.subProducts[active].discount > 0 ? (
            <div>
              <span className={styles.pricediscount}>{`${Number(product.price).toLocaleString()} ${product.price_unit}`}</span>
              <span className={styles.priceregular}>
                {`${Number(product.priceAfter).toLocaleString()} ${product.price_unit}`}
              </span>
            </div>
          ) : (
            <div>
              <span className={styles.priceregular}>{`${Number(product.price).toLocaleString()} ${product.price_unit}`}</span>
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
        <button
        onClick={()=> setShowDetails(true)}>
          Дивитися всі характеристики{" "}
          <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
        </button>
            <AllDetails
            product={product}
            show={showDetails}
            onHide={() => setShowDetails(false)}/>
      </Col>
      {product.size ?
      (<Row className={styles.infos__sizesInfo}>
        <Col className={styles.infos__sizesInfo_sizes}>
            {product.subProducts.map((el, i) => (
            <Link style={{textDecoration: "none"}}
              key={i}
              href={`/product/${product.slug}?style=${i}&code=${product.code}`}
            >
              <Col
                className={`${styles.infos__sizesInfo_sizes_size}
                  ${i == router.query.style && styles.active_size
                }`}
                 onClick={() => setActive(i)}
              >
               {el.sizes[0].size}
              </Col>
            </Link>
          ))}
        </Col>
        <button
         onClick={()=> setShowSizes(true)}
         >
          Таблиця розмірів{" "}
          <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
        </button>
        <SizesTable
            show={showSizes}
            onHide={() => setShowSizes(false)}/>
      </Row>): (null)}
    </Container>

  );
}
