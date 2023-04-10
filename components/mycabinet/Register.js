import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form"
import ContinueWith from "./ContinueWith"
import * as yup from 'yup';
import "yup-phone";
import { Formik } from "formik"
import axios from "axios";
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import { useSession } from "next-auth/react";
import { Container, Row, Col, Image } from "react-bootstrap"


const initialvalues = {
    // firstName: "",
    // lastName: "",
    // phoneNumber: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",

}
export default function Register({
    setRegShow,
    setLogShow,
    setCongratsShow,
    setUserProfileShow,
    setAuthShow }) {
    //    const router = useRouter();
    // console.log("registerProps",setRegShow, setLogShow, setCongratsShow);
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(initialvalues);
    const { data: session, status } = useSession();
    const {
        // firstName,
        // lastName,
        // phoneNumber,
        email,
        password,
        conf_password,
        success,
        error,
    } = user;
    useEffect(() => {
        if (session) {
            switchToMyCabinet();
        }
    }, []);
    const switchToMyCabinet = () => {
        setCongratsShow(false)
        setRegShow(false)
        setLogShow(false)
        setAuthShow(false)
        setUserProfileShow(true)

    }
    const switchToLogin = () => {
        setLogShow(true)
        setRegShow(false)
        setCongratsShow(false)
        setUserProfileShow(false)
    }

    const switchToCongrats = () => {
        setCongratsShow(true)
        setRegShow(false)
        setLogShow(false)
        setUserProfileShow(false)
    }
    const handleChangeCredencials = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    };
    const registerValidation = yup.object({
        firstName: yup.string()
            .min(3, "Ім'я має бути мінімум 3 символи")
            .max(20, "Ім'я має бути максимум 20 символів")
            .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
            .required("Ім'я обов'язково"),
        lastName: yup.string()
            .min(3, "Прізвище має бути мінімум 3 символи")
            .max(20, "Прізвище має бути максиFмум 20 символів")
            .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
            .required("Прізвище обов'язково"),
        phoneNumber: yup.string().test('phone', 'Некоректний номер телефону', value => {
            if (!value) return true;
            return yup.string().phone('UA').isValidSync(value) && value.length >= 10 && value[0] === '0';
        }),
        email: yup.string().email("Введіть коректний адрес email.").trim()
            .required("Email буде потрібний для входу в персональний кабінет та для скидання пароля."),
        password: yup.string().required("Введіть комбінацію 6 літер, цифр та спец. символів.")
            .min(6, "Пароль має мати принаймі 6 символів.")
            .max(36, "Пароль не може бути довшим за 36 символів."),
        conf_password: yup.string().required("Підтвердіть пароль")
            .oneOf([yup.ref("password")], "Паролі не співпадають.")
    });
    const signUpHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post('/api/register', {
                // firstName,
                // lastName,
                // phoneNumber,
                email,
                password,
            });
            setUser({ ...user, error: "", success: data.message });
            setLoading(false);
            setTimeout(async () => {
                // let options = {
                //     redirect: false,
                //     email: email,
                //     password: password,
                // };
                switchToCongrats();
                //  const res = await signIn('credentials', options);
                // router.push("/");
            }, 2000);
        } catch (error) {
            setLoading(false);
            console.error(error);
            setUser({ ...user, success: "", error: error.response.data.message });
        }
    };

    return (
        <Modal.Body className={styles.modalbodyreg}>
            {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <Container className={styles.login_container}>
                <Row>
                    <Col>
                        <Image src='../../../images/register.png' width="463px" height="528px" />
                    </Col>
                    <Col>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                // firstName,
                                // lastName,
                                // phoneNumber,
                                email,
                                password,
                                conf_password,
                            }}
                            initialErrors={{ error }}
                            validationSchema={registerValidation}

                            onSubmit={(e) => {
                                e.preventDefault(e);
                            }}>
                            {(formik) => (
                                <Form method="post" className={styles.reg_forms}>
                                    {/* <Form.Group className="mb-3" controlId="groupSurname">
                                        <Form.Label className={styles.formlabel}>Прізвище</Form.Label>
                                        <Form.Control className={styles.forminput} name="lastName"
                                            value={formik.values.lastName}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.lastName}
                                        />
                                        <Form.Control.Feedback type="invalid">{formik.errors.lastName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="groupName">
                                        <Form.Label className={styles.formlabel}>Імя</Form.Label>
                                        <Form.Control className={styles.forminput}
                                            name="firstName"
                                            value={formik.values.firstName}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.firstName} />
                                        <Form.Control.Feedback type="invalid">{formik.errors.firstName}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="groupPhone">
                                        <Form.Label className={styles.formlabel}>Телефон</Form.Label>
                                        <Form.Control className={styles.forminput}
                                            name="phoneNumber"
                                            value={formik.values.phoneNumber}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.phoneNumber} />
                                        <Form.Control.Feedback type="invalid">{formik.errors.phoneNumber}
                                        </Form.Control.Feedback>
                                    </Form.Group> */}
                                    <Form.Group className="mb-3" controlId="groupEmail">
                                        <Form.Label className={styles.formlabel}>Електронна пошта</Form.Label>
                                        <Form.Control className={styles.forminput} type="email"
                                            name="email"
                                            value={formik.values.email}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.email || formik.initialErrors.error} />
                                        <Form.Control.Feedback type="invalid">{formik.errors.email}{formik.initialErrors.error}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="groupPassword">
                                        <Form.Label className={styles.formlabel}>Пароль</Form.Label>
                                        <Form.Control className={styles.forminput}
                                            type="password"
                                            name="password"
                                            value={formik.values.password}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.password} />
                                        <Form.Control.Feedback type="invalid">{formik.errors.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="groupConfirmPassword">
                                        <Form.Label className={styles.formlabel}>Підтвердити пароль</Form.Label>
                                        <Form.Control className={styles.forminput}
                                            type="password"
                                            name="conf_password"
                                            value={formik.values.conf_password}
                                            onChange={(e) => { formik.handleChange(e); handleChangeCredencials(e) }}
                                            isInvalid={!!formik.errors.conf_password} />
                                        <Form.Control.Feedback type="invalid">{formik.errors.conf_password}
                                        </Form.Control.Feedback>
                                    </Form.Group>
                                    <button className={styles.loginbtn2} variant="primary" onClick={(e) => {
                                        signUpHandler(e);
                                    }}>
                                        Зареєструватись
                                    </button>
                                    <ContinueWith
                                        setLogShow={setLogShow}
                                        setRegShow={setRegShow}
                                        setCongratsShow={setCongratsShow}
                                        setAuthShow={setAuthShow}
                                        setUserProfileShow={setUserProfileShow}
                                    />
                                </Form>
                            )}
                        </Formik>
                        <div className={styles.regSwitch}> <p>Ви вже маєте акаунт? <span className={styles.register} onClick={switchToLogin}>Увійти</span></p></div>
                    </Col>
                    <p className={styles.policy}>Реєструючись, ви погоджуєтеся з умовами положення про обробку і захист персональних даних та угодою користувача</p>
                </Row>
            </Container>
        </Modal.Body>
    )
}