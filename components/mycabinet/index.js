import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from 'react'
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import Authorization from "./Authorization";
import Image from 'react-bootstrap/Image'
import { useDispatch, useSelector } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
import { emptyWishList, updateWishList } from "@/store/wishListSlice";
import { emptyScaleList } from "@/store/scaleListSlice";
import { emptyReviewRating } from "@/store/reviewSlice";

export default function MyCabinet({user, setUser, orders, country,...props}) {
    const { data: session, status } = useSession();
    const dispatch = useDispatch();
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
        setAuthShow(true);
        dispatch(emptyCart());
        dispatch(emptyWishList());
        // dispatch(emptyScaleList());
        dispatch(emptyReviewRating());
    }

    return (
        <Modal
            className={styles.modal}
            {...props}
            size={"xl"}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
                <div className={styles.modal_main}>
            <div className={styles.modaldiv}>
                <Modal.Header className="modal-header" closeButton>Мій кабінет</Modal.Header>
                {authShow ? (
                    <Modal.Body className={styles.modalbodyempty}>
                        <Image src='../../../images/reglog.png' width="308px" height="230px" />
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
                        signOutHandler={signOutHandler}
                        user={user}
                        setUser={setUser}
                        orders={orders}
                        country={country}
                    />
                )}
                {/* {userProfileShow ? (
                    <Modal.Footer> <a>
                        <span onClick={signOutHandler}>Вийти</span>
                    </a></Modal.Footer>
                ) : <></>} */}
            </div>
            </div>
        </Modal>
    )
}
