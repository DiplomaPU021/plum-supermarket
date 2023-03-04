import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import HeartIcon from "../icons/HeartIcon"
import DeleteIcon from "../icons/DeleteIcon"
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updateCart } from "../../store/cartSlice"
import CartIcon from "../icons/CartIcon"
import * as React from "react"
import DelNotification from "../delete"

export default function WishItem(product) {
    // const  cart  = useSelector((state) => state.cart);
    // const dispatch = useDispatch();
    // const updateQty = (type) => {
    //     let newCart = cart.cartItems.map((item) => {
    //         if (item._uid == product.product._uid) {
    //             return {
    //                 ...item,
    //                 qty: type == "plus" ? item.qty + 1 : item.qty - 1,
    //             };
    //         }
    //         return item;
    //     });
    //     dispatch(updateCart(newCart));   
    // };
    const [cartShow, setCartShow] = React.useState(false);
    const [notificationShow, setNotificationShow] = React.useState(false);

    const removeProduct = (id) => {
        setNotificationShow(true)
        //TODO implement
    };

    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardbody}>
                <div className={styles.discount}>15%</div>
                <div className={styles.picture}><img src="../../../images/macbook.jpg" width='157px' height='95px' alt="picture"></img></div>
                <div className={styles.cardtext}>
                    <h5>
                        Ноутбук Apple MacBook Air 13" M1 256GB 2020 (MGN93) Silver
                    </h5>
                    <div className={styles.cardtext_line}></div>
                </div>
                <div className={styles.cardcontrols}>
                    <div className={styles.cardbtns}>
                        <button onClick={() => setCartShow(true)} style={{ backgroundColor: cartShow ? "#220F4B" : "#FAF8FF" }}>
                            <CartIcon fillColor={cartShow ? "#FAF8FF" : "#220F4B"} />
                        </button>
                        <button onClick={() => removeProduct(1)} style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}>
                            <DeleteIcon fillColor={notificationShow ? "#FAF8FF" : "#220F4B"} />
                        </button>
                    </div>
                </div>
                <DelNotification
                        show={notificationShow}
                        onHide={() => setNotificationShow(false)}
                    />
            </Card.Body>
        </Card>

    )
}