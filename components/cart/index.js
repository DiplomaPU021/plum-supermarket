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

export default function CartPage(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const cart = useSelector((state) => state.cart);
    const [userId, setUserId] = useState(props.userid);
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
            // signIn();

            openLoginModal();
        }
    }
    //функція н працює, бо зник хедер який її запускав
    // const updateCartInDbHandler = () => {
    //     if (session && window.location.pathname === "/checkout") {
    //         router.push("/checkout");
    //         saveCart(cart);
    //     }
    // }

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
                    <div className={styles.modaldiv}>
                        <Modal.Body className={styles.modalbody}>
                        <h3> Будь ласка авторизуйтесь!</h3>
                            </Modal.Body>
                        <Modal.Footer style={{ display: footerVisible }} as={'div'}>
                            <div className={styles.modalfoot}>
                        <button className={styles.addbtn}
                                    onClick={(e)=>{setLoginModalShow(false); props.onHide();}}>
                                Гаразд</button>
                                </div>
                        </Modal.Footer>
                    </div>
                ) : (
                    <div className={styles.modaldiv}>
                        {cart == null || cart?.cartItems?.length == 0 || cart.cartItems == null ? (
                            <EmptyCart setFooterVis={setFooterVis} />
                        ) : (
                            <Modal.Body className={styles.modalbody} scrollable="true">
                                {
                                    cart.cartItems?.map((product, i) => (
                                        <CartItem key={i} product={product} userid={userId} />
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
                                <Link href="/" className={styles.link}>Повернутись до покупок</Link>
                            </div>
                        </Modal.Footer>
                    </div>
                )}
            </Modal>
    )
}
