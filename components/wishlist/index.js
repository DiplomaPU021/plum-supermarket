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


export default function WishList({ error, setError, ...props}) {
    const wishList = useSelector((state) => state.wishList);
    const [footerVisible, setFooterVis] = useState("none");
    const getTotalQty = () => {
        return wishList.wishListItems.reduce(
            (accumulator, item) => accumulator + item.qty,
            0
        );
    };
    
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
            className={styles.modal}
            centered>
                <div className={styles.modaldiv}>
                    <Modal.Header className="modal-header" closeButton>Вподобані товари</Modal.Header>
                    {wishList == null || wishList?.wishListItems?.length == 0 || wishList.wishListItems == null ? (
                        <EmptyWish {...props} />
                    ) : (

                        <Modal.Body className={styles.modalbody}>
                            {
                                wishList.wishListItems?.map((product, i) => (
                                    <WishItem key={i} product={product} error={error} setError={setError} />
                                ))
                            }
                        </Modal.Body>
                    )}
                    <Modal.Footer style={{ display: footerVisible }} as={'div'} className={styles.modalfoot}>
                        <Link href="/" className={styles.link} onClick={() => props.onHide()}>Повернутись до покупок</Link>
                    </Modal.Footer>
                </div>
        </Modal>
    )
}
