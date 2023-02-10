import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import EmptyCart from "./EmptyCart"
import * as React from "react"
import Link from "next/link"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CartItem from './CartItem'
import { useSelector, useDispatch } from "react-redux";


export default function Cart(props) {
    const { cart } = useSelector((state) => ({ ...state }));
    console.log("cart", cart)

   // const [itemsCount, setItemsCount] = React.useState(2);

console.log("props",props);
    return (
        <Modal
            {...props}
            size={cart.length == 0  ? "lg" : "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                <Modal.Header closeButton ></Modal.Header>
                {cart.length == 0 || cart==null? (
                    <EmptyCart />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        {
                            cart.cartItems.map((product) => ( 
                                <CartItem product={product} key={product._uid} />
                            ))
                        }
                        <CartItem/>
                        <h3>Total to pay:<span>93 997$</span></h3>
                        <button className={styles.addbtn}>Checkout</button>
                        <Link href="/" className={styles.link}>Back to shopping</Link>
                    </Modal.Body>
                )}
            </div>
        </Modal>
    )
}