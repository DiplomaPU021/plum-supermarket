import styles from "./styles.module.scss";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import HeartIcon from "../icons/HeartIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap";
import { updateCart } from "../../store/cartSlice";
import DelNotification from "../delete";
import axios from "axios";
import { addToWishList } from "@/store/wishListSlice";
import { saveWishList } from "@/requests/user";
import { useSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import "react-tooltip/dist/react-tooltip.css";

export default function CartItem({ product, error, setError, deleteConfirm, setDeleteConfirm }) {
  const { data: session } = useSession();
  const [showExtra, setShowExtra] = useState("none");
  const [notificationShow, setNotificationShow] = useState(false);
  const cart = useSelector((state) => state.cart);
  const wishList = useSelector((state) => state.wishList);
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [wishChosen, setWishChosen] = useState(false);

  const updateQty = async (type) => {
    let newCart = cart.cartItems.map((item) => {
      if (item._uid == product._uid) {
        return {
          ...item,
          qty: type == "plus" ? item.qty + 1 : item.qty - 1,
        };
      }
      return item;
    });
    dispatch(updateCart(newCart));
  };

  const removeProduct = (id) => {
    if (deleteConfirm) {
      let newCart = cart.cartItems.filter((item) => {
        return item._uid != id;
      });
      setError((prevState) => ({
        ...prevState,
        inCartError: false,
        uidPrInCart: "",
      }));
      dispatch(updateCart(newCart));
    } else {
      setNotificationShow(true);
    }

    // const removeProduct = async (id) => {

    //TODO треба перенести  в компонент модальне видалення DelNotification і в разі вибору не показувати знову використовувати пряме видалення тут
    // let newCart = cart.cartItems.filter((item) => {
    //     return item._uid != id;
    // });
    // dispatch(updateCart(newCart));
  };
  const addToWishHandler = async (product) => {
    if (session) {
      setWishChosen(wishChosen ? false : true)
      console.log("addToWishListHandlerCartItem", product);
      const { data } = await axios.get(
        `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
      );
      let exist = null;
      if (wishList.wishListItems) {
        exist = wishList.wishListItems.find(
          (item) => item._uid === product._uid
        );
      }
      if (exist) {
        setError((prevState) => ({
          ...prevState,
          inWishListError: true,
          uidPrInWish: product._uid,
        }));
        console.error("Товар уже в улюблених");
        return;
      } else {
        dispatch(
          addToWishList({
            ...data,
            qty: 1,
            size: data.size,
            _uid: product._uid,
            mode: product.mode,
          })
        );
        saveWishList({
          productId: product._id,
          size: product.size,
          image: product.images[0],
          color: product.color?.color,
          code: product.code,
        });
      }
    } else {
      setIsOpen(true);
    }
  };
  return (
    <Card className={styles.card}>
      <Tooltip
        id="login-tooltip"
        content="Будь ласка зареєструйтесь!"
        isOpen={isOpen}
        place="top"
        // style={{ backgroundColor: "#70BF63", color: "#fff" }}
        className={styles.tooltip_rounded}
        // classNameArrow={styles.tooltip_arrow}
      />
      <Card.Body className={styles.cardbody}>
        {product.discount > 0 ? (
          <div className={styles.discount}>{product.discount}%</div>
        ) : (
          <></>
        )}
        <Container className={styles.bord}>
          <Row className={styles.bord}>
            <Col md={3} xs={12} sm={3} className={styles.bordimage}>
              <Row className={styles.picture}>
                <img
                  src={product.images[0]}
                  width="157px"
                  height="95px"
                  alt="picture"
                />
              </Row>
            </Col>
            <Col md={5} xs={12} sm={5} className={styles.cardtext}>
              <Link href={`/product/${product.slug}?style=${product.style}&code=${product.mode}`} className={styles.h5text}>
                {(
                  product.name +
                  " " +
                  (product.color ? product.color.color : "") +
                  " " +
                  product.size
                ).length > 55
                  ? `${(
                    product.name +
                    " " +
                    (product.color ? product.color.color : "") +
                    " " +
                    product.size
                  ).substring(0, 55)}...`
                  : product.name +
                  " " +
                  (product.color ? product.color.color : "") +
                  " " +
                  product.size}
              </Link>
              <div className={styles.line}></div>
              <div className={styles.cardtext_extraservice}>
                <button
                  className={styles.cardextrabtn}
                  onClick={() =>
                    setShowExtra(showExtra === "none" ? "block" : "none")
                  }
                >
                  Додаткові послуги{" "}
                  {showExtra === "none" ? (
                    <img
                      width="30px"
                      height="30px"
                      src="../../../icons/down-btn.png"
                    ></img>
                  ) : (
                    <img
                      width="30px"
                      height="30px"
                      src="../../../icons/up-btn.png"
                    ></img>
                  )}
                </button>
                <div
                  className={styles.extra_div}
                  style={{ display: showExtra }}
                >
                  <div className={styles.check}>
                    <Form.Check type={"checkbox"} id={`check-api-1`}>
                      <Form.Check.Input type={"checkbox"} />
                      <Form.Check.Label>
                        <b>Windows 11</b>
                      </Form.Check.Label>
                    </Form.Check>
                    <p>
                      Операційна система Windows 11 Для дому на 1ПК (ESD -
                      електронна ліцензія в конверті, всі мови) (KW9-00664)
                    </p>
                    <h4>9899 $</h4>
                  </div>
                  <div className={styles.check}>
                    <Form.Check type={"checkbox"} id={`check-api-2`}>
                      <Form.Check.Input type={"checkbox"} />
                      <Form.Check.Label>
                        <b>Microsoft 365 на вибір</b>
                      </Form.Check.Label>
                    </Form.Check>
                    <p>
                      Microsoft 365 Персональний, підписка 1 рік, для 1
                      користувача (ESD - електронний ключ в конверті)
                      (QQ2-00004)
                    </p>
                    <h4>2899 $</h4>
                  </div>
                </div>
              </div>
            </Col>
            <Col md={3} xs={12} sm={3} className={styles.cardcontrols}>
              <Row className={styles.cardcontrols_itemcount}>
                <div className={styles.cardcontrols_plusmin}>
                  <button
                    disabled={product.qty < 2 ? true : false}
                    onClick={() => updateQty("minus")}
                  >
                    <span>-</span>
                  </button>
                  <div className={styles.count}>{product.qty}</div>
                  <button
                    disabled={product.qty == product.quantity}
                    onClick={() => updateQty("plus")}
                  >
                    <span>+</span>
                  </button>
                </div>
                <div className={styles.bord}>
                  {product.discount > 0 ? (
                    <h5>
                      {Math.round(product.price * product.qty).toLocaleString(
                        "uk-UA"
                      )}{" "}
                      {product.price_unit}
                    </h5>
                  ) : (
                    <></>
                  )}
                  <h3>
                    {Math.round(
                      product.priceAfter * product.qty
                    ).toLocaleString("uk-UA")}{" "}
                    {product.price_unit}
                  </h3>
                </div>
              </Row>
            </Col>
            <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
              <button
                className={styles.itembtn}
                onClick={() => addToWishHandler(product)}
                data-tooltip-id="login-tooltip"
                onMouseLeave={() => setIsOpen(false)}
                style={{ backgroundColor: wishChosen ? "#220F4B" : "#FAF8FF" }}
              >
                {" "}
                <HeartIcon fillColor={wishChosen ? "#FAF8FF" : "#220F4B"} />
              </button>
              <button
                className={styles.itembtn}
                onClick={() => removeProduct(product._uid)}
                style={{
                  backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF",
                }}
              >
                <DeleteIcon
                  fillColor={notificationShow ? "#FAF8FF" : "#220F4B"}
                />
              </button>
              <DelNotification
                productId={product._uid}
                setDeleteConfirm={setDeleteConfirm}
                show={notificationShow}
                onHide={() => setNotificationShow(false)}
                setError={setError}
              />
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
}
