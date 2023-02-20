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
    // console.log("propsInCartIndex", props);
    const router = useRouter();
    //const [cartShow, setCartShow] = useState(props.show);
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState(0);
    //const [loading, setLoading] = useState(false)
    const [userId, setUserId] = useState(props.userid);

    useEffect(() => {
        if (session) {
            console.log("session_______________>>>>>", session);
            setUserId(session.user.id)
        }
    }, [userId]);


    // setCartShow(props.show);
    //console.log("27cartindex",cartShow);
    const getTotalPrice = () => {
        // console.log("cartTotalPriceInCartIndex", cart);
        return cart.cartItems.reduce(
            (accumulator, item) => accumulator + item.qty * item.price,
            0
        );
    };
    const saveCartToDbHandler = () => {
        if (session) {
            console.log("sessionUser_______________>>>>>", session.user);
          //  setUserId(session.user.id);
            console.log("48indexCard");
            if (window.location.pathname === "/checkout") {
                console.log("50indexCard");
                //  setLoading(true);
                saveCart(cart, session.user.id);
                // setLoading(false);
                console.log("54indexCard");
                // setCartShow(false);
                props.onHide();
                router.push("/checkout");
                //  getCart(session.user.id);
                // router.reload();
                // window.location.reload(true);
                //  router.push(
                // {
                //   pathname: router.pathname, // not router.asPath
                //    query: { confirm: true },
                // },);
            } else {
                //    setLoading(true);
                console.log("68indexCard");
                saveCart(cart, session.user.id);
                //  setLoading(false);
                console.log("71indexCard");
                router.push("/checkout");

                //  router.push(
                // {
                //     pathname: "/checkout", // not router.asPath
                //      query: { confirm: true },
                //   },);
            }
            // saveCart(cart, session.user.id);
            //  router.push("/checkout");

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
