import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Link from "next/link"
import { useRouter } from "next/router"
import Form from "react-bootstrap/Form"
import ContinueWith from "./ContinueWith"


export default function LogIn({ setRegShow, setLogShow }) {
    const router = useRouter();
    const switchToRegister = () => {
        setRegShow(true)
        setLogShow(false)
    }

    return (
        <Modal.Body className={styles.modalbodyreg}>
            <Form  >
                <Form.Group className="mb-3" controlId="groupEmail">
                    <Form.Label className={styles.formlabel}>Електронна пошта</Form.Label>
                    <Form.Control className={styles.forminput} type="email" name="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupPassword">
                    <Form.Label className={styles.formlabel}>Пароль</Form.Label> <Link className={styles.forgot} href="/auth/forgot">Забули пароль?</Link>
                    <Form.Control className={styles.forminput} type="password" name="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupCheckbox">
                    <Form.Check type="checkbox" label="Запам'ятати мене" />
                </Form.Group>
                <button className={styles.loginbtn2} variant="primary" type="submit">
                    Увійти
                </button>
            </Form>
            <ContinueWith />
            <p>Ви ще не маєте акаунту? <span className={styles.register} onClick={switchToRegister}>Зареєструватися</span></p>
        </Modal.Body>
    )
}