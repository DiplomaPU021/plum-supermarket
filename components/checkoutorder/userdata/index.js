import styles from "../styles.module.scss"
import { Row, Col, Form } from "react-bootstrap"
import { Formik } from 'formik';
import * as yup from 'yup';
import "yup-phone";


export default function UserData({ user, activeAddress, setActiveAddress }) {

    const validate = yup.object({
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
    })

    const handleGetCredencials = e => {
        const { name, value } = e.target;
        setActiveAddress({ ...activeAddress, [name]: value });
    }

    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    firstName: user.firstName ? user.firstName : "",
                    lastName: user.lastName ? user.lastName : "",
                    phoneNumber: user.phoneNumber ? user.phoneNumber : "",
                }}
                validationSchema={validate}>
                {(formik) => (
                    <Form>
                        <Row className={styles.row}>
                            <Col className={styles.colcard}> <div className={styles.panel}>Контактні данні одержувача</div></Col>
                        </Row>
                        <Row className={styles.attention2}>
                            Увага! Отримання замовлення за паспортом. Введіть прізвище, ім'я, по батькові та мобільний номер телефону отримувача замовлення
                        </Row>
                        <Row className={styles.contacts}>
                            <Col className={styles.col_contacts}>
                                <Form.Group as={Col} controlId="groupSurname">
                                    <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                    <Form.Control className={styles.form_input}
                                        type="text"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={(e) => { formik.handleChange(e); handleGetCredencials(e) }}
                                        isInvalid={!!formik.errors.lastName}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.lastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="groupPhone">
                                    <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                    <Form.Control className={styles.form_input}
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={(e) => { formik.handleChange(e); handleGetCredencials(e) }}
                                        isInvalid={!!formik.errors.phoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.phoneNumber}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid">
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col className={styles.col_contacts}>
                                <Form.Group as={Col} controlId="groupName">
                                    <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                    <Form.Control className={styles.form_input}
                                        type="text"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={(e) => { formik.handleChange(e); handleGetCredencials(e) }}
                                        isInvalid={!!formik.errors.firstName}
                                    />
                                    <Form.Control.Feedback type="invalid">{formik.errors.firstName}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid" />

                                </Form.Group>
                                <Form.Group as={Col} controlId="groupEmail">
                                    <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                    <Form.Control className={styles.form_input}
                                        type="email" name="email" value={user ? user.email : ""} readOnly
                                        isValid={!formik.errors.email} />
                                    <Form.Control.Feedback type="valid" />
                                </Form.Group>
                            </Col>
                        </Row>

                    </Form>
                )}
            </Formik>
        </>
    )
}


