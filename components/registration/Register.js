import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form"
import ContinueWith from "./ContinueWith"


export default function Register({ setRegShow, setLogShow }) {
    const router = useRouter();

    const switchToLogin = () => {
        setLogShow(true)
        setRegShow(false)
    }

    return (
        <Modal.Body className={styles.modalbodyreg}>
            <Form>
                <Form.Group className="mb-3" controlId="groupSurname">
                    <Form.Label className={styles.formlabel}>Прізвище</Form.Label>
                    <Form.Control className={styles.forminput} name="firstname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupName">
                    <Form.Label className={styles.formlabel}>Імя</Form.Label>
                    <Form.Control className={styles.forminput} name="lastname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupPhone">
                    <Form.Label className={styles.formlabel}>Телефон</Form.Label>
                    <Form.Control className={styles.forminput} name="phone" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupEmail">
                    <Form.Label className={styles.formlabel}>Електронна пошта</Form.Label>
                    <Form.Control className={styles.forminput} type="email" name="email" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupPassword">
                    <Form.Label className={styles.formlabel}>Пароль</Form.Label>
                    <Form.Control className={styles.forminput} type="password" name="password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="groupPassword">
                    <Form.Label className={styles.formlabel}>Підтвердити пароль</Form.Label>
                    <Form.Control className={styles.forminput} type="password" name="password" />
                </Form.Group>
                <button className={styles.loginbtn2} variant="primary" type="submit">
                    Увійти
                </button>
            </Form>
            <ContinueWith />
            <p>Ви вже маєте акаунт? <span className={styles.register} onClick={switchToLogin}>Увійти</span></p>
            <p className={styles.policy}>Реєструючись, ви погоджуєтеся з умовами положення про обробку і захист персональних даних та угодою користувача</p>
        </Modal.Body>
    )
}