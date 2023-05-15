import styles from "./styles.module.scss";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { useEffect, useRef, useState } from 'react';
import Cards from 'react-credit-cards-2';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from './cardUtils'
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-credit-cards-2/dist/es/styles-compiled.css';

const PaymentForm = ({ total, setIsPaid, userCreditCards, setUserCreditCards, setShowAddCard, setShowCard, setSelectedCard }) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
        issuer: "",
        formData: null
    });
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    useEffect(() => {
        if (state.number && state.expiry && state.name && state.cvc !== '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [state]);

    // useEffect(() => {
    //     setSelectedCard(userCreditCards?.find(creditCard => creditCard.isDefault === true)._id || "");
    // }, [userCreditCards]);

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState((prev) => ({ ...prev, issuer }));
        }
    };

    const handleUpload = async () => {
        let toastId = null;

        try {
            const { data } = await axios.post(
                '/api/user/saveCreditCard',
                {
                    name: state.name,
                    number: state.number,
                    expiry: state.expiry,
                    cvc: state.cvc,
                },
                {
                    onUploadProgress: (p) => {
                        const progress = p.loaded / p.total;
                        setTimeout(() => {
                            if (toastId === null) {
                                toastId = toast('Додаємо карту...', { progress });
                            } else {
                                toast.update(toastId, { progress });
                            }
                        }, 500);
                    },
                }
            );
            setTimeout(() => {
                toast.update(toastId, {
                    render: data?.message,
                    type: toast.TYPE.SUCCESS,
                });
                // if (setIsPaid != null) {
                //     setIsPaid(true);
                // }

                handleReset();

            }, 3000);
            setUserCreditCards(data.creditCards);
        } catch (error) {
            if (error.response?.data?.error) {
                toast.update(toastId, {
                    render: error.response.data.error,
                    type: toast.TYPE.ERROR,
                });
            }
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (e.target.name === "number") {
            e.target.value = formatCreditCardNumber(e.target.value);
        } else if (e.target.name === "expiry") {
            e.target.value = formatExpirationDate(e.target.value);
        } else if (e.target.name === "cvc") {
            e.target.value = formatCVC(e.target.value);
        }
        setState((prev) => ({ ...prev, [name]: value }));
    }

    const handleInputFocus = (e) => {
        setState((prev) => ({ ...prev, focus: e.target.name }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { issuer } = state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});
        setState((prev) => ({ ...prev, formData: formData }));
        handleUpload();
        setShowAddCard(false);
        setShowCard(true);
    }
    const handleReset = () => {
        setState((prev) => ({
            ...prev, number: '',
            expiry: '',
            cvc: '',
            name: '',
            focus: '',
            issuer: '',
            formData: null
        }));
        setShowCard(true);
        setShowAddCard(false);
    }

    return (
        <div style={{ padding: "0" }}>
            <Row className={styles.card_image}>
                <Col>
                    <Cards
                        number={state.number || ''}
                        expiry={state.expiry || ''}
                        cvc={state.cvc || ''}
                        name={state.name || ''}
                        focused={state.focus}
                    />
                </Col>
            </Row>
            <Form onSubmit={handleSubmit} onReset={handleReset}>
                <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Control
                        type="text"
                        pattern="[\d ]{16,22}"
                        placeholder="Номер карти"
                        name="number"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        value={formatCreditCardNumber(state.number)}
                        className={styles.form_input_card}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cardHolderName">
                    <Form.Control
                        type="text"
                        placeholder="Прізвище Ім'я"
                        name="name"
                        value={state.name}
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        className={styles.form_input_card}
                    />
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group className="mb-3" controlId="cardvalid">
                            <Form.Control
                                type="tel"
                                name="expiry"
                                pattern="\d\d/\d\d"
                                placeholder="Термін дії"
                                value={formatExpirationDate(state.expiry)}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                className={styles.form_input_card}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group className="mb-3" controlId="cardcvv">
                            <Form.Control
                                type="text"
                                name="cvc"
                                pattern="\d{3,4}"
                                placeholder="CVV"
                                value={formatCVC(state.cvc)}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                                className={styles.form_input_card}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col className={styles.litext_btn}>
                        {total == null ? (<></>) : (<><p>До оплати:</p><h3>{Number(total).toLocaleString("uk-UA")} ₴</h3></>)}
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="groupButtons" className={styles.flex_row_card}>
                            <Button type="submit" className={styles.light_button} disabled={isButtonDisabled}>Додати карту</Button>
                            <Button type="reset" className={styles.dark_button}>Скасувати</Button>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default PaymentForm;