import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import EmptyWish from "./EmptyWish"
import * as React from "react"
import Link from "next/link"
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import WishItem from './WishItem'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import { saveCart } from "@/requests/user"



export default function WishList(props) {
    const router = useRouter();
    const { data: session } = useSession();
    //const cart = useSelector((state) => state.cart);
    const [total, setTotal] = useState(1);

    return (
        <Modal
            {...props}
            size={total == 0 ? "lg" : "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                {/* {cart == null || cart?.cartItems?.length == 0 || cart.cartItems == null ? ( */}
                     {total == 0 ? (
                    <EmptyWish />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        <WishItem />
                        <WishItem />
                    </Modal.Body>
                )}
                 <Modal.Footer as={'div'} className={styles.modalfoot}>                
                        <Link href="/" className={styles.link}>Повернутись до покупок</Link>                 
                </Modal.Footer>
            </div>
        </Modal>
    )
}
