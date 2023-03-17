import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import * as React from "react"
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import ProfilePage from "./ProfilePage";

export default function UserProfile(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const [userId, setUserId] = useState(props.userid);

    return (
        <Modal
            {...props}
            size={"lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                <Modal.Header className="modal-header" closeButton >Мій кабінет</Modal.Header>
                <ProfilePage />
            </div>
        </Modal>
    )
}
