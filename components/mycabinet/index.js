import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import Authorization from "./Authorization";
import Image from 'react-bootstrap/Image'

export default function MyCabinet(props) {
    const router = useRouter();
    const { data: session, status } = useSession();
    const [userId, setUserId] = useState(props.userid);
    const [authShow, setAuthShow] = useState(session?.user ? false : true);
    const [logShow, setLogShow] = useState(false);
    const [regShow, setRegShow] = useState(false);
    const [congratsShow, setCongratsShow] = useState(false);
    const [userProfileShow, setUserProfileShow] = useState(session?.user ? true : false);
    // console.log("authShowOnIndexModal", authShow, status, session);
    useEffect(() => {
        if (session && (status == "authenticated" || status == "loading")) {
            setAuthShow(false);
            setUserProfileShow(true);
        }
    }, [session]);
    const logInFormShow = () => {
        setLogShow(true)
        setAuthShow(false)

    }
    const registerFormShow = () => {
        setRegShow(true)
        setAuthShow(false)

    }
    const signOutHandler = () => {
        signOut({ redirect: false, callbackUrl: "/" });
        // props.onHide();
        setUserProfileShow(false);
        setAuthShow(true)
    }

    return (
        <Modal
            {...props}
            size={"lg"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <div className={styles.modaldiv}>
                <Modal.Header className="modal-header" closeButton></Modal.Header>
                {authShow ? (
                    <Modal.Body className={styles.modalbodyempty}>
                        <Image src='../../../images/useraccount.jpg' width="241px" height="180px" />
                        <h2>Ви не авторизовані</h2>
                        <div className={styles.line}></div>
                        <h5>Але це ніколи не пізно виправити</h5>
                        <div className={styles.logbtns}>
                            <button className={styles.loginbtn} onClick={logInFormShow}>Увійти</button>
                            <button className={styles.regbtn} onClick={registerFormShow}>Зареєструватися</button>
                        </div>
                    </Modal.Body>
                ) : (
                    <Authorization
                        logShow={logShow}
                        regShow={regShow}
                        congratsShow={congratsShow}
                        authShow={authShow}
                        userProfileShow={userProfileShow}
                        setLogShow={setLogShow}
                        setRegShow={setRegShow}
                        setCongratsShow={setCongratsShow}
                        setAuthShow={setAuthShow}
                        setUserProfileShow={setUserProfileShow}
                    />
                )}
                {userProfileShow ? (
                    <Modal.Footer> <a>
                        <span onClick={signOutHandler}>Вийти</span>
                    </a></Modal.Footer>
                ) : <></>}

            </div>
        </Modal>
    )
}
