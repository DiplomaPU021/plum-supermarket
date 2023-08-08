import styles from "../styles.module.scss";
import { Row, Col } from "react-bootstrap";
import { useState } from "react";
import CartItem from "./CartItem";
import Cart from "../../cart";

export default function CheckoutCart({ cart }) {
  const [cartShow, setCartShow] = useState(false);
  const updateCartHandler = (e) => {
    e.preventDefault();
    setCartShow(true);
  };

  return (
    <Row className={styles.order}>
      <div className={styles.order_top}>
        <span>Ваше замовлення</span>
        <div className={styles.edit} onClick={(e) => updateCartHandler(e)}>
          <img
            src="../../../icons/edit.png"
            width="46px"
            height="46px"
            alt=""
          />
        </div>
      </div>
      <Cart show={cartShow} onHide={() => setCartShow(false)} />
      <div className={styles.scroll_div} scrolable="true">
        {cart?.products.map((p, i) => (
          <Col key={p._id}>
            <CartItem product={p} />
          </Col>
        ))}
      </div>
      <div className={styles.form_line}></div>
    </Row>
  );
}
