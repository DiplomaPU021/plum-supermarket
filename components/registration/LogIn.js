import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Link from "next/link"
import { useRouter } from "next/router"
import Form from "react-bootstrap/Form"
import ContinueWith from "./ContinueWith"
import * as yup from 'yup';
import { getProviders, getSession, signIn, getCsrfToken } from "next-auth/react"
import { useState } from "react"
import { Formik } from "formik"
import DotLoaderSpinner from "../loaders/dotLoader"


const initialvalues = {
    login_email: "",
    login_password: "",
    login_error: "",
}
export default function LogIn({ setRegShow, setLogShow, setCongratsShow }) {
    console.log("loginProps",setRegShow, setLogShow, setCongratsShow);
    const router = useRouter();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialvalues);
    const {
        login_email,
        login_password,
        login_error,
    } = user;
    const loginValidation = yup.object({
        login_email: yup.string().trim().required("Введіть електронну адресу.").email("Введіть дійсну електронну адресу"),
        login_password: yup.string().required("Введіть пароль")
    });
    const handleChangeCredencials = (e) => {
        console.log("e.target.name, e.target.name");
        console.log("e.target.value", e.target.value);
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    };
    const signInHandler = async () => {
        setLoading(true);
        let options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };
        const res = await signIn('Credentials', options);
        setUser({ ...user, error: "", success: "" });
        setLoading(false);
        if (res?.error) {
            setLoading(false);
            setUser({ ...user, login_error: res?.error });
        } else {
            switchToRegister();
            // return Router.push(callbackUrl || "/");
        }
    };
    const switchToRegister = () => {
        setRegShow(true)
        setLogShow(false)
        setCongratsShow(false)
    }

    return (
        <Modal.Body className={styles.modalbodyreg}>
                   {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <Formik
                enableReinitialize
                initialValues={{
                    login_email,
                    login_password,
                }}
                initialErrors={{ login_error }}
                validationSchema={loginValidation}
                onSubmit={(e) => {
                    e.preventDefault(e);
                }}>
                {(formik) => (
                    <Form>
                        {/* <input
                            type="hidden"
                            name="csrfToken"
                            value={csrfToken}
                        /> */}
                        <Form.Group className="mb-3" controlId="groupLoginEmail">
                            <Form.Label className={styles.formlabel}>Електронна пошта</Form.Label>
                            <Form.Control className={styles.forminput}
                                type="email"
                                name="login_email"
                                value={formik.values.login_email}
                                onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                  isInvalid={!!formik.errors.login_email || formik.initialErrors.login_error} />
                                <Form.Control.Feedback type="invalid">{formik.errors.login_email}{ formik.initialErrors.login_error}
                            </Form.Control.Feedback>     
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="groupLoginPassword">
                            <Form.Label className={styles.formlabel}>Пароль</Form.Label> <Link className={styles.forgot} href="/auth/forgot">Забули пароль?</Link>
                            <Form.Control className={styles.forminput}
                                type="password"
                                name="login_password"
                                value={formik.values.login_password}
                                onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }} 
                                isInvalid={!!formik.errors.login_password} />
                                <Form.Control.Feedback type="invalid">{formik.errors.login_password}
                           </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="groupLoginCheckbox">
                            <Form.Check type="checkbox" label="Запам'ятати мене" />
                        </Form.Group>
                        <button className={styles.loginbtn2} variant="primary" onClick={signInHandler}>
                            Увійти
                        </button>
                    </Form>
                )}
            </Formik>
            <ContinueWith />
            <p>Ви ще не маєте акаунту? <span className={styles.register} onClick={switchToRegister}>Зареєструватися</span></p>
        </Modal.Body>
    )
}