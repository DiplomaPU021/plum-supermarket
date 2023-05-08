import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

export default function Congrats({ setRegShow, setLogShow, setCongratsShow }) {


    const logInFormShow = () => {    
        setLogShow(true)
        setCongratsShow(false)
    }
    // const registerFormShow = () => {
    //     setRegShow(true)
    //     setCongratsShow(false)
    // }

    return (
      
        <Modal.Body className={styles.modalbodyreg}>
                        <Image src='../../../images/usercongrats.png'  />
                        {/* <h2>Вітаємо! Ви зареєстровані.</h2> */}
                        <div className={styles.line}></div>
                        <h5>На ваш email відправлено лінк для валідації</h5>
                        <div className={styles.logbtns}>
                            <button className={styles.loginbtn} onClick={logInFormShow}>Увійти</button>
                            {/* <button className={styles.regbtn} onClick={registerFormShow}>Зареєструватися</button> */}
                        </div>
                    </Modal.Body>
    )
}