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
//import DotLoaderSpinner from '@/components/loaders/dotLoader';


export default function CartPage(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    // console.log("cartIndex", cart);
    const [total, setTotal] = useState(0);
    //const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState(props.userid);

    // useEffect(() => {
    //     if (session) {
    //         console.log("session_______________>>>>>", session);
    //         setUserId(session.user.id)
    //     }
    // }, [userId]);

    const getTotalPrice = () => {
        return cart.cartItems.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };
    const saveCartToDbHandler = () => {
        if (session) {
            if (window.location.pathname === "/checkout") {
                //  setLoading(true);
                saveCart(cart, session.user.id);
                // setLoading(false);
                props.onHide();
                window.location.reload(true);
                // router.push("/checkout");
                // router.reload();
                //  router.push(
                // {
                //   pathname: router.pathname, // not router.asPath
                //    query: { confirm: true },
                // },);
            } else {
                saveCart(cart, session.user.id);
                router.push("/checkout");
            }
        } else {
            signIn();
        }
    }
    const updateCartInDbHandler = () => {
        if (session && window.location.pathname === "/checkout") {
            router.push("/checkout");
            console.log("77indexCard", cart);
            saveCart(cart, session.user.id);
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
            {/* {
                loading && <DotLoaderSpinner loading={loading} />
            } */}
            <div className={styles.modaldiv}>
                <Modal.Header closeButton onClick={() => updateCartInDbHandler()}></Modal.Header>
                {cart == null || cart?.cartItems?.length == 0 || cart.cartItems == null ? (
                    <EmptyCart />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        {
                            cart.cartItems?.map((product, i) => (
                                <CartItem key={i} product={product} userid={userId} />
                            ))
                        }
                        <h3>Total to pay:<span>{getTotalPrice().toFixed(2)}</span></h3>
                        <button className={styles.addbtn}
                            onClick={() => saveCartToDbHandler()}
                        >Checkout</button>
                        {/* <Checkout total={getTotalPrice().toFixed(2)}
                        saveCartToDbHandler={saveCartToDbHandler}
                        /> */}
                        <Link href="/" className={styles.link}>
                            Back to shopping</Link>
                    </Modal.Body>
                )}
            </div>
        </Modal>
    )
}
