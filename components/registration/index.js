import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import * as React from "react"
import { useSelector } from "react-redux";
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from "next/router"
import Authorization from "./Authorization";
import Image from 'react-bootstrap/Image'

export default function Registration(props) {
    const router = useRouter();
    const { data: session } = useSession();
    const [userId, setUserId] = React.useState(props.userid);
    const [authShow, setAuthShow] = React.useState(true);
    const [logShow, setLogShow] = React.useState(false);
    const [regShow, setRegShow] = React.useState(false);

    const logInFormShow = () => {
        setLogShow(true)
        setAuthShow(false)
    }
    const registerFormShow = () => {
        setRegShow(true)
        setAuthShow(false)
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
                    <Authorization logShow={logShow} regshow={regShow} setLogShow={setLogShow} setRegShow={setRegShow} />
                )}
            </div>
        </Modal>
    )
}
