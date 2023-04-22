import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
    formatFormData
} from './cardUtils'
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentForm = ({ total, setIsPaid }) => {
    const [state, setState] = useState({
        number: '',
        expiry: '',
        cvc: '',
        name: '',
        focus: '',
        issuer: "",
        formData: null
    });

    const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
            setState((prev) => ({ ...prev, issuer }));
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
    const handleSubmit = (e) => {

        e.preventDefault();
        const { issuer } = state;
        const formData = [...e.target.elements]
            .filter(d => d.name)
            .reduce((acc, d) => {
                acc[d.name] = d.value;
                return acc;
            }, {});

        setState((prev) => ({ ...prev, formData: formData }));
    }

    return (
        <div>
            <Row>
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
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="cardNumber">
                    <Form.Control
                        type="tel"
                        pattern="[\d ]{16,22}"
                        // pattern={`^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$`}
                        placeholder="Номер карти"
                        name="number"
                        required
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
                        format={formatCreditCardNumber}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="cardHolderName">
                    <Form.Control
                        type="text"
                        placeholder="Прізвище Ім'я"
                        name="name"
                        onChange={handleInputChange}
                        onFocus={handleInputFocus}
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
                                format={formatExpirationDate}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
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
                                format={formatCVC}
                                onChange={handleInputChange}
                                onFocus={handleInputFocus}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>До оплати: <span>{Number(total).toLocaleString("uk-UA")} ₴</span></div>
                    </Col>
                    <Col>
                        <Form.Group as={Col} controlId="groupButtons">
                            <Button type="submit" >Оплатити</Button>
                            <Button type="reset">Скасувати</Button>
                        </Form.Group>
                    </Col>
                </Row>
                {/* {state.formData && (
                    <div>
                        {formatFormData(state.formData).map((d, i) => (
                            <div key={i}>{d}</div>
                        ))}
                    </div>
                )} */}


            </Form>
        </div>
    );
}

export default PaymentForm;