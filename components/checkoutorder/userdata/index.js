import styles from "../styles.module.scss";
import { Row, Col, Form } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "yup-phone";
import { useEffect, useState } from "react";

export default function UserData({
 userData,
 setUserData,
    setOrderError,
}) {

    const { firstName, lastName, phoneNumber, errorLastName, errorFirstName, errorPhoneNumber, email } = userData;
    const validate = yup.object({
        firstName: yup
            .string()
            .min(3, "Ім'я має бути мінімум 3 символи")
            .max(20, "Ім'я має бути максимум 20 символів")
            .matches(
                /^[А-Яа-яЇїІіa-zA-Z'-]*[^\s][A-Za-zА-Яа-яЇїІі' -]*$/,
                "Цифри та спец.символи заборонено"
            )
            .required("Ім'я обов'язково"),
        lastName: yup
            .string()
            .min(3, "Прізвище має бути мінімум 3 символи")
            .max(20, "Прізвище має бути максиFмум 20 символів")
            .matches(
                /^[A-zA-zА-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/,
                "Цифри та спец.символи заборонено"
            )
            .required("Прізвище обов'язково"),
        phoneNumber: yup
            .string()
            .required("Телефон обов'язково")
            .test("phone", "Некоректний номер телефону", (value) => {
                if (!value) return true;
                return (
                    yup.string().phone("UA").isValidSync(value) &&
                    value.length >= 10 &&
                    value[0] === "0"
                );
            }),
    });
    const handleGetCredencials = (e) => {
        const { name, value } = e.target;
        // setActiveAddress({ ...activeAddress, [name]: value });
        setUserData({ ...userData, [name]: value });
    };
    useEffect(() => {
        if (
            userData.errorFirstName === "" &&
            userData.errorLastName === "" &&
            userData.errorPhoneNumber === ""
        ) {
            setOrderError((prevOrderError) => ({
                ...prevOrderError,
                userError: "",
            }));
        }
    }, [userData]);

    // useEffect(() => {
    //     if (!activeAddress && userData.errorFirstName == "" && userData.errorLastName == "" && userData.errorPhoneNumber == "") {
    //         if (user.firstName || user.lastName || user.phoneNumber) {
    //             setActiveAddress({
    //                 ...activeAddress,
    //                 firstName: user.firstName,
    //                 lastName: user.lastName,
    //                 phoneNumber: user.phoneNumber,
    //             });
    //             console.log("81");
    //         }
    //     }
    // }, []);
    useEffect(() => {
        if (firstName == "" || firstName == null) {
            setUserData((prevState) => ({
                ...prevState,
                errorFirstName: "Заповніть будь ласка дані",
            }));
            setOrderError((prevState) => ({
                ...prevState,
                userError: "Заповніть будь ласка дані отримувача",
            }));
        } else {
            setUserData((prevState) => ({
                ...prevState,
                errorFirstName: "",
            }));
        }
        if (lastName == "" || lastName == null) {
            setUserData((prevState) => ({
                ...prevState,
                errorLastName: "Заповніть будь ласка дані",
            }));
            setOrderError((prevState) => ({
                ...prevState,
                userError: "Заповніть будь ласка дані отримувача",
            }));
        } else {
            setUserData((prevState) => ({
                ...prevState,
                errorLastName: "",
            }));
        }
        if (phoneNumber == "" || phoneNumber == null) {
            setUserData((prevState) => ({
                ...prevState,
                errorPhoneNumber: "Заповніть будь ласка дані",
            }));
            setOrderError((prevState) => ({
                ...prevState,
                userError: "Заповніть будь ласка дані отримувача",
            }));
        } else {
            setUserData((prevState) => ({
                ...prevState,
                errorPhoneNumber: "",
            }));
        }
    }, [firstName, lastName, phoneNumber])

    return (
        <>
            {/* <div> activeAddress</div>
            {JSON.stringify(activeAddress, null, 4)} */}
            <div>UserData</div>
            {JSON.stringify(userData, null, 4)}
            <Formik
                enableReinitialize
                initialValues={{
                    firstName,
                    lastName,
                    phoneNumber,
                    email,
                    errorLastName,
                    errorFirstName,
                    errorPhoneNumber,
                }}
                initialErrors={{
                    errorLastName,
                    errorFirstName,
                    errorPhoneNumber
                }}
                validationSchema={validate}
                onSubmit={(e) => {
                    e.preventDefault(e);
                }}
                onBlur={() => checkCredencials}
            >
                {(formik) => (
                    <Form>
                        <Row className={styles.row}>
                            <div className={styles.panel}>
                                {" "}
                                <div className={styles.count}>1</div>Контактні данні
                            </div>
                        </Row>
                        <Row className={styles.contacts}>
                            <Col className={styles.col_contacts}>
                                <Form.Group as={Col} controlId="groupSurname">
                                    <Form.Label className={styles.form_label}>
                                        Прізвище
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleGetCredencials(e);
                                        }}
                                        isInvalid={
                                            !!formik.errors.lastName || formik.initialErrors.errorLastName
                                        }
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.err}>
                                        {formik.errors.lastName}
                                        {formik.initialErrors.errorLastName}
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="groupPhone">
                                    <Form.Label className={styles.form_label}>
                                        Номер телефону
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.form_input}
                                        name="phoneNumber"
                                        value={formik.values.phoneNumber}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleGetCredencials(e);
                                        }}
                                        isInvalid={!!formik.errors.phoneNumber || formik.initialErrors.errorPhoneNumber}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.err}>
                                        {formik.errors.phoneNumber}
                                        {formik.initialErrors.errorPhoneNumber}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid"></Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col className={styles.col_contacts}>
                                <Form.Group as={Col} controlId="groupName">
                                    <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                    <Form.Control
                                        className={styles.form_input}
                                        type="text"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={(e) => {
                                            formik.handleChange(e);
                                            handleGetCredencials(e);
                                        }}
                                        isInvalid={!!formik.errors.firstName || formik.initialErrors.errorFirstName}
                                    />
                                    <Form.Control.Feedback type="invalid" className={styles.err}>
                                        {formik.errors.firstName}
                                        {formik.initialErrors.errorFirstName}
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="valid" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="groupEmail">
                                    <Form.Label className={styles.form_label}>
                                        Електронна пошта
                                    </Form.Label>
                                    <Form.Control
                                        className={styles.form_input}
                                        type="email"
                                        name="email"
                                        value={formik.values.email}
                                        readOnly
                                        isValid={!formik.errors.email}
                                    />
                                    <Form.Control.Feedback type="valid" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className={styles.attention2}>
                            Увага! Товари, що на різних складах або різних продавців, буде
                            доставлено окремими замовленнями
                        </Row>
                    </Form>
                )}
            </Formik>
        </>
    );
}
