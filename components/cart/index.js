import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import EmptyCart from "./EmptyCart"
import * as React from "react"
import Link from "next/link"
import CartItem from './CartItem'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import { saveCart } from "@/requests/user"
import MyCabinet from "@/components/mycabinet"

export default function CartPage(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const [footerVisible, setFooterVis] = useState("none");
    const [loginModalShow, setLoginModalShow] = useState(false);


    const getTotalPrice = () => {
        return cart.cartItems.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };
    const openLoginModal = () => {
        setLoginModalShow(true);

    };
    const saveCartToDbHandler = () => {
        if (session) {
            if (window.location.pathname === "/checkout") {
                saveCart(cart);
                props.onHide();
                router.push("/checkout");
            } else {
                saveCart(cart);
                router.push("/checkout");
            }
        } else {
            openLoginModal();
        }
    }

    useEffect(() => {
        if (cart?.cartItems?.length !== 0) {
            setFooterVis("block")
        }
        else {
            setFooterVis("none")
        }
    })

    return (
        <Modal
            {...props}
            size={cart.length == 0 ? "lg" : "xl"}
            // dialogClassName={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            className="modal"
            centered
        >
            {loginModalShow ? (
                <MyCabinet show={loginModalShow} onHide={()=>setLoginModalShow(false)}/>
            ) : (
                <div className={styles.modaldiv}>
                    {cart == null || cart?.cartItems?.length == 0 || cart.cartItems == null ? (
                        <EmptyCart  { ...props }/>
                    ) : (
                        <Modal.Body className={styles.modalbody} scrollable="true">
                            {
                                cart.cartItems?.map((product, i) => (
                                    <CartItem key={i} product={product} error={props.error} setError={props.setError}/>
                                ))
                            }
                        </Modal.Body>
                    )}
                    <Modal.Footer style={{ display: footerVisible }} as={'div'}>
                        <div className={styles.modalfoot}>
                            <h3>Всього до оплати:<span>{Math.round(getTotalPrice()).toLocaleString()} ₴</span></h3>
                            <button className={styles.addbtn}
                                onClick={() => saveCartToDbHandler()}
                            >Оформити замовлення</button>
                            <Link href="/" className={styles.link} onClick={()=>props.onHide()}>Повернутись до покупок</Link>
                        </div>
                    </Modal.Footer>
                </div>
            )}
        </Modal>
    )
}
