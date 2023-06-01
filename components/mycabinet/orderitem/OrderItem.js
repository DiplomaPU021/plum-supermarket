import styles from "./styles.module.scss"
import { Container, Row, Col, Table, Form, Modal } from 'react-bootstrap'
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../../store/cartSlice";
import LeaveFeedback from "../../productPage/leaveFeedback"
import axios from "axios";


export default function OrderItem(props) {
  const [showFulllOrder, setShowFulllOrder] = useState("none")
  const [feedback, setFeedback] = useState(false);
  const cart = useSelector((state) => state.cart);
  const [errorInProductCard, setErrorInProductCard] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (props.adminActive) {
      setShowFulllOrder("block")
    }
  })

  const handleFeedBack = () => {
    setFeedback(true);
  };
  const [orderConfirm, setOrderConfirm] = useState(false);

  const handlerRepeatOrder = async () => {
    await Promise.all(props.order.products.map(async (p) => {
      const { data } = await axios.get(
        `/api/product/${p.product}?style=${p.style}&code=${p.mode}`
      );
      let qty = p.qty;
      if (p.qty > data.quantity) {
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
        }
      }
    }));

    setShowFulllOrder("none");
    setOrderConfirm(false);
  };


  return (
    <Container className={styles.container}>
      <Row className={styles.orderitem}>
        {showFulllOrder === "none" && !props.adminActive ? (
          <Col xs={4} className={styles.col}>

            <p>№{props.order._id.substring(0, 6)} від {props.order.createdAt.substring(0, 10)}<br /><span>{props.order?.status}</span></p>
          </Col>) : (
          <Col xs={11} className={styles.col_opendiv}>
            <p>№{props.order._id.substring(0, 6)} від {props.order.createdAt.substring(0, 10)}<br /><span>{props.order?.status}</span></p>
          </Col>
        )}
        {showFulllOrder === "none" && !props.adminActive ? (
          <Col xs={3} className={styles.col}>
            <p>Сума замовлення<br /><span>{props.order.costAfterDiscount.toLocaleString('uk-UA')} ₴</span></p>
          </Col>) : <></>}
        {showFulllOrder === "none" && !props.adminActive ? props.order.products.slice(0, 2).map(product => (
          <Col className={styles.col_pic} key={product._id}>
            <div className={styles.picture}>

              <img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }} />
            </div>
          </Col>
        )) : <></>}
        <Col xs={1} className={styles.col}>
          <button onClick={() => setShowFulllOrder(showFulllOrder === "none" ? "block" : "none")}>
            {showFulllOrder === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img>
              : <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
          </button>
        </Col>
      </Row>
      <Row style={{ display: showFulllOrder }}>
        <Col className={styles.ordertable}>
          <div>
            <Table hover size="sm">
              <thead>
                <tr>
                  <th>Товари PLUM</th>
                  <th></th>
                  <th className={styles.tr}>Кількість</th>
                  <th className={styles.tr}>Ціна</th>
                </tr>
              </thead>
              <tbody>       
                {props.order.products.map((product, i) => (
                  <tr key={i}>
                    <td> <div className={styles.picture}>
                      <img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }} />
                    </div>
                    </td>
                    <td className={styles.td}>{product.name.substring(0,40)}... {product.color?.color} {product.size}</td>
                    <td className={styles.centered}>{product.qty}</td>
                    <td className={styles.centered}>{(product.priceAfter * product.qty).toLocaleString('uk-UA')} ₴</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className={styles.devider}>
            <span>Інформація про замовлення</span>
            <div className={styles.line2}></div>
          </div>
          <Row className={styles.deliveryinfo}>
            <div className={styles.delivery_item}>
              <p>Отримувач</p>
              <span>{props.order.shippingAddress?.firstName} {props.order.shippingAddress?.lastName}</span>
            </div>
            <div className={styles.delivery_item}>
              <p>Оплата</p>
              {props.order.discount > 0 ? (
                <div>
                  <span>Застосовано промокод {props.order.promocode}</span><br />
                  <span>Знижка {props.order.discount}%</span><br />
                </div>
              ) : <></>}
              <span>{props.order.paymentMethod} : <b>{props.order.costAfterDiscount.toLocaleString('uk-UA')}  ₴</b></span>
              <span>Статус: {props.order.isPaid ? "Оплачено" : "Очікується оплата"}</span>
            </div>
            <div className={styles.delivery_item}>
              <p>Доставка</p>
              <span> {props.order.deliveryMethod.deliveryType}</span>
              <span> Вартість доставки: {props.order.deliveryMethod.deliveryId !== "postmanDelivery" ?
                (<span><small>{props.order.deliveryMethod.deliveryCost}</small></span>
                ) : <span><b>{props.order.deliveryMethod.deliveryCost} ₴</b></span>}</span>
              {props.order.deliveryMethod.deliveryId === "postmanDelivery" ? (
                <span><small>{props.order.shippingAddress?.address}</small></span>
              ) : props.order.deliveryMethod.deliveryId === "selfPickup" ? (
                <span>Адреса магазину: <small>{props.order.deliveryMethod.deliveryAddress}</small></span>
              ) : props.order.deliveryMethod.deliveryId === "novaPoshta" ? (
                <span>Відділення:<small>{props.order.deliveryMethod.deliveryAddress}</small></span>
              ) : <></>}
            </div>
          </Row>
          {!props.adminActive ? (
            <div className={styles.repete}>
              {errorInProductCard && <span>{errorInProductCard}</span>}
              <button className={styles.light_button} onClick={handleFeedBack}>Залишити відгук</button>
              <button className={styles.dark_button} onClick={() => setOrderConfirm(true)}>Повторити замовлення</button>
            </div>
          ) : null}
        </Col>

        <LeaveFeedback
          show={feedback}
          onHide={() => setFeedback(false)}
          product={null}
          setProductReview={null}
        />

        <Modal
          show={orderConfirm}
          onHide={() => setOrderConfirm(false)}
          dialogClassName={styles.modal}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body className={styles.modalbody}>
            <h3>Ви впевненні що хочете замовити цей товар ще раз?</h3>
            <div className={styles.line}></div>
            <button className={styles.addbtn} onClick={() => handlerRepeatOrder()}>
              Замовити
            </button>
            <button className={styles.addbtn2} onClick={() => setOrderConfirm(false)}>
              Скасувати
            </button>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  )
}