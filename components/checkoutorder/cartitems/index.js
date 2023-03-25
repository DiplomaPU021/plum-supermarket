import styles from "../styles.module.scss"
import {  Row, Col } from "react-bootstrap"
import { useState } from 'react'
import CartItem from "./CartItem"
import CartPage from '../../cart'


export default function CheckoutCart({ cart }) {
    const [cartShow, setCartShow] = useState(false);
    const updateCartHandler = (e) => {
        e.preventDefault();
        setCartShow(true);
    }

    return (
        <>
            <Row className={styles.row}>
                <Col className={styles.colcard}> <div className={styles.panel}>Ваше замовлення</div></Col>
            </Row>
            <Row className={styles.order}>
                <button
                    onClick={(e) => updateCartHandler(e)}
                >Редагувати</button>
                <CartPage
                    show={cartShow}
                    onHide={() => setCartShow(false)}

                />
                {cart?.products.map((p, i) => (
                    <Col className={styles.colcard} key={p._id} >
                        <CartItem product={p} />
                    </Col>
                ))}
            </Row>
        </>
    )
}


