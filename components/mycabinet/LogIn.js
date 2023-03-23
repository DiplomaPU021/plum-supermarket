import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Link from "next/link"
import { useRouter } from "next/router"
import Form from "react-bootstrap/Form"
import ContinueWith from "./ContinueWith"
import * as yup from 'yup';
import { getProviders, getSession, signIn, getCsrfToken, useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import { Formik } from "formik"
import DotLoaderSpinner from "../loaders/dotLoader"
import useDeepCompareEffect from "use-deep-compare-effect"
import axios from "axios"
// import useSwr from "swr";

const initialvalues = {
    login_email: "",
    login_password: "",
    login_error: "",
}
export default function LogIn({
    setRegShow,
    setLogShow,
    setCongratsShow,
    setAuthShow,
    setUserProfileShow
}) {
    // const fetcher = url => axios.get(url).then(res => res.data)
    // const { data, error } = useSwr("/api/login", fetcher);

    // if (error) return <div>Failed to load users</div>;
    // if (!data) return <div>Loading...</div>;
    const router = useRouter();
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialvalues);
    const [csrfToken, setCsrfToken] = useState('');


    // useEffect(() => {
    //     if (session &&(status=="authenticated"||status=="loading")) {
    //         switchToMyCabinet();
    //     }
    // }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await getCsrfToken();
            console.log("token2", Object.values(response));
            console.log("sessionOnLogin///////////", session, status);
            if (response) {
                setCsrfToken(response);
            }
        }
        fetchData();
    }, []); // Or [] if effect doesn't need props or state

    // useEffect(() => {
    //     async function fetchData() {
    //         const response = await getCsrfToken();
    //         console.log("token2",Object.values(response));
    //         if (response) {
    //             setCsrfToken(response);
    //         }
    //     }
    //     fetchData();
    // }, []); // Or [] if effect doesn't need props or state
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
    const switchToMyCabinet = () => {
        setCongratsShow(false)
        setRegShow(false)
        setLogShow(false)
        setAuthShow(false)
        setUserProfileShow(true)

    }
    const signInHandler = async () => {
        try {
            setLoading(true);
            let options = {
                redirect: false,
                email: login_email,
                password: login_password,
                // callbackUrl:"/"
            };
            const res = await signIn('credentials', options);
            console.log("responseFrom SignIn", res);

            // const { data } = await axios.post('/api/login', JSON.stringify({
            //     email:login_email,
            //     password:login_password,
            // }), {
            //     headers: { "Content-Type": "application/json" },
            //     withCredentials: true,
            //   });
            //     console.log("dataTokenOnLogin///////////", data);
            //   setCsrfToken(data.token);
            // //   session.user.id = csrfToken.sub || data.user._id.toString();
            // //   session.user.role = data.user.role || "user";

            console.log("sessionOnLogin///////////", session, status);
            setUser({ ...user, login_error: res.error, success: "" });

            setLoading(false);
            if (res.error) {
                console.log("noerooreee", user.login_error);
              
            } else{
                switchToMyCabinet();
            }

        }
        catch (error) {
            setLoading(false);
            console.error("error", error);
            setUser({ ...user, success: "", login_error: error });
            // switchToRegister();
        }
        // if (res?.error) {
        //     setLoading(false);
        //     setUser({ ...user, login_error: res?.error });
        // } else {
        //     switchToRegister();
        //     // return Router.push(callbackUrl || "/");
        // }
    };
    const switchToRegister = () => {
        setRegShow(true)
        setCongratsShow(false)
        setLogShow(false)
        setAuthShow(false)
        setUserProfileShow(true)
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
                    login_password

                }}
                initialErrors={{ login_error }}
                validationSchema={loginValidation}
                onSubmit={(e) => {
                    e.preventDefault(e);

                }}>
                {(formik) => (
                    <Form onSubmit={(e) => {
                        e.preventDefault(e)
                    }}>
                        <input
                            type="hidden"
                            readOnly
                            name="csrfToken"
                            value={csrfToken}
                        />
                        <Form.Group className="mb-3" controlId="groupLoginEmail">
                            <Form.Label className={styles.formlabel}>Електронна пошта</Form.Label>
                            <Form.Control className={styles.forminput}
                                type="email"
                                name="login_email"
                                value={formik.values.login_email}
                                onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                isInvalid={!!formik.errors.login_email || formik.initialErrors.login_error} />
                            <Form.Control.Feedback type="invalid">{formik.errors.login_email}{formik.initialErrors.login_error}
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
            <ContinueWith
                setLogShow={setLogShow}
                setRegShow={setRegShow}
                setCongratsShow={setCongratsShow}
                setAuthShow={setAuthShow}
                setUserProfileShow={setUserProfileShow} />
            <p>Ви ще не маєте акаунту? <span className={styles.register} onClick={switchToRegister}>Зареєструватися</span></p>
        </Modal.Body>
    )
}