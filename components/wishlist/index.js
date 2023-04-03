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
import { saveWishList } from "@/requests/user"
import MyCabinet from "@/components/mycabinet"


export default function WishList(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const wishList = useSelector((state) => state.wishList);
    const [userId, setUserId] = useState(props.userid);
    const [footerVisible, setFooterVis] = useState("none");
    // const [loginModalShow, setLoginModalShow] = useState(false);

    // const [total, setTotal] = useState(1);
    const getTotalQty = () => {
        return wishList.wishListItems.reduce(
            (accumulator, item) => accumulator + item.qty,
            0
        );
    };
    // const openLoginModal = () => {
    //     setLoginModalShow(true);

    // };
    // const saveWishListToDbHandler = () => {
    //     if (session) {
    //         saveWishList(wishList);
    //         router.push("/");
    //     }
    //     else {
    //         openLoginModal();
    //     }
    // }


    useEffect(() => {
        if (wishList?.wishListItems?.length !== 0) {
            setFooterVis("block")
        }
        else {
            setFooterVis("none")
        }
    })

    return (
        <Modal
            {...props}
            size={wishList.length == 0 ? "lg" : "xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                {wishList == null || wishList?.wishListItems?.length == 0 || wishList.wishListItems == null ? (
                // {total == 0 ? (
                    <EmptyWish {...props} />
                ) : (
                    <Modal.Body className={styles.modalbody}>
                        {
                            wishList.wishListItems?.map((product, i) => (
                                <WishItem key={i} product={product} userid={userId} error={props.error} setError={props.setError} />
                            ))
                        }
                    </Modal.Body>
                )}
                <Modal.Footer style={{ display: footerVisible }} as={'div'} className={styles.modalfoot}>
                    <Link href="/" className={styles.link} onClick={()=>props.onHide()}>Повернутись до покупок</Link>
                </Modal.Footer>
            </div>
        </Modal>
    )
}
