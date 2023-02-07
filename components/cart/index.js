import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import EmptyCart from "./EmptyCart"
import * as React from "react"
import Link from "next/link"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CartItem from './CartItem'

export default function Cart(props) {
    const [itemsCount, setItemsCount] = React.useState(2);
    return (
        <Modal
            {...props}
            size={itemsCount == 0 ? "lg" : "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                <Modal.Header closeButton ></Modal.Header>
                {itemsCount == 0 ? (
                    <EmptyCart />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        <CartItem/>
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