import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import EmptyCart from "./emptyCart"
import * as React from "react"
import Link from "next/link"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import CartItem from './cartItem'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import { saveCart } from "@/requests/user"



export default function Cart(props) {
    const router = useRouter();

    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0);


    const getTotalPrice = () => {
        return cart.cartItems.reduce(
            (accumulator, item) => accumulator + item.qty * item.price,
            0
        );
    };
    const saveCartToDbHandler = async () => {

        if (session) {
            saveCart(cart, session.user.id);
            router.push("/checkout");
        } else {
            signIn();
        }
    }
    // useEffect(() => {
    //     setTotal(cart.cartItems.reduce(
    //         (accumulator, item) => accumulator + item.qty * item.price, 0));
    // }, [cart.cartItems]);

    return (
        <Modal
            {...props}
            size={cart.length == 0 ? "lg" : "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                <Modal.Header closeButton ></Modal.Header>
                {cart == null || cart?.cartItems?.length == 0 || cart.cartItems == null ? (
                    <EmptyCart />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        {
                            cart.cartItems?.map((product, i) => (
                                <CartItem product={product} key={i} />
                            ))
                        }
                        <h3>Total to pay:<span>{getTotalPrice().toFixed(2)}</span></h3>
                        <button className={styles.addbtn}
                            onClick={() => saveCartToDbHandler()}
                        >Checkout</button>
                        {/* <Checkout total={getTotalPrice().toFixed(2)}
                        saveCartToDbHandler={saveCartToDbHandler}
                        /> */}
                        <Link href="/" className={styles.link}>Back to shopping</Link>
                    </Modal.Body>
                )}
            </div>
        </Modal>
    )
}
