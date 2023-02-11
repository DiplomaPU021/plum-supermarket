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

export default function CartItem(product) {
    const  cart  = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const updateQty = (type) => {
        let newCart = cart.cartItems.map((item) => {
            if (item._uid == product.product._uid) {
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
        let newCart = cart.cartItems.filter((item) => {
            return item._uid != id;
        });
        dispatch(updateCart(newCart));
    };
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardbody}>
                {
                    product.product.discount>0? (
                        <div className={styles.discount}>{product.product.discount}%</div>
                    ) : ( <></>)
                }
                <div className={styles.picture}><img src={product.product.images[0]} width='157px' height='95px' alt="picture"></img></div>
                <div className={styles.cardtext}>
                    <h5>
                        {product.product.name.length > 40
                            ? `${product.product.name.substring(0, 40)}...`
                            : product.product.name}
                    </h5>
                    <div className={styles.cardtext_line}></div>
                    <div className={styles.cardtext_extraservice}>
                        <button className={styles.cardextrabtn}>Extra service<img width="30px" height="30px" src="../../../icons/down-btn.png"></img></button>
                    </div>
                </div>
                <div className={styles.cardcontrols}>
                    <div className={styles.cardcontrols_itemcount}>
                        <div className={styles.cardcontrols_plusmin}>
                            <button
                                disabled={product.product.qty < 2}
                                onClick={() => updateQty("minus")} >
                                <span>-</span>
                            </button><div className={styles.count}>{product.product.qty}</div>
                            <button
                                disabled={product.product.qty == product.product.quantity}
                                onClick={() => updateQty("plus")}
                            >
                                <span>+</span>
                            </button>
                        </div>
                        {
                            product.product.discount > 0 ? (
                                <h5>{Number(product.product.priceBefore*product.product.qty).toFixed(2)} {product.product.price_unit}</h5>)
                                : (<></>)
                        }
                        <h3>{Number(product.product.price*product.product.qty).toFixed(2)} {product.product.price_unit}</h3>

                    </div>
                    <div className={styles.cardbtns}>
                        <button className={styles.itembtn}> <HeartIcon fillColor={"#220F4B"} /></button>
                        <button className={styles.itembtn}
                            onClick={() => removeProduct(product.product._uid)}
                        >
                            <DeleteIcon fillColor={"#220F4B"} /></button>
                    </div>
                </div>
            </Card.Body>
        </Card>

    )
}