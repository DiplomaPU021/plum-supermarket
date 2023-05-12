import styles from "../styles.module.scss";
import { Col, Form, Row } from "react-bootstrap";
import { paymentMethods } from "@/data/paymentMethods";
import PaymentForm from "@/components/paymentForm";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function PaymentMethod({
    paymentMethod,
    setPayment,
    totalAfterDiscount,
    stripe_public_key,
    setIsPaid,
    user
}) {
    const [showCard, setShowCard] = useState(false);
    const [showAddCard, setShowAddCard] = useState(false);
    const [userCreditCards, setUserCreditCards] = useState(user?.creditCards || []);
    const [selectedCard, setSelectedCard] = useState(userCreditCards?.find(creditCard => creditCard.isDefault === true || null));

    useEffect(() => {
        setSelectedCard(userCreditCards?.find(creditCard => creditCard.isDefault === true || null));
    }, [userCreditCards]);
    
    const handleChangePayment = (e) => {
        e.target.id === "paymentOnline" ? setShowCard(true) : setShowCard(false);
        setPayment((prevState) => ({
            ...prevState,
            paymentMethod: e.target.value,
            paymentMethodId: e.target.id,
        }));
    };
    const handleMakePayment = () => {
        setTimeout(() => {
            toast('🦄 Здійснюється оплата!', {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setTimeout(() => {
                toast('Оплачено!', {
                    position: "bottom-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: false,
                    theme: "dark",
                    type: toast.TYPE.SUCCESS,
                });
            }, 3000);
        }, 500);
        setIsPaid(true);
    }
    const handleAddCard = () => {
        setShowAddCard(true);
        setShowCard(false)
    }
    return (
        <>
            <Row className={styles.row}>
                <div className={styles.panel}>
                    {" "}
                    <div className={styles.count}>3</div>Оплата
                </div>
            </Row>
            <Row className={styles.payment}>
                <Form.Group>
                    {paymentMethods.map((pm, index) =>
                        pm.id === "paymentOnline" ? (
                            <React.Fragment key={pm.id}>
                                <Form.Check
                                    type="radio"
                                    className={styles.radio}
                                    aria-label="radio 1"
                                >
                                    <Form.Check.Input
                                        type="radio"
                                        name="payment"
                                        value={pm.name}
                                        id={pm.id}
                                        className={styles.rrr}
                                        onChange={handleChangePayment}
                                        checked={paymentMethod === `${pm.name}`}
                                    />
                                    <Form.Check.Label htmlFor={pm.id}>{pm.name}</Form.Check.Label>
                                </Form.Check>
                                {showCard ? (
                                    userCreditCards.length > 0 ? (
                                        <div key={`${pm.id}-select-${index}`}>
                                            <Form.Select
                                             name="creditselect"
                                              className={styles.form_input_card}
                                              value={selectedCard?._id}>
                                                <option value="Вибрати карту" disabled={true} id="optcred1" key="optcred1">Вибрати карту...</option>
                                                {userCreditCards.map((cc) => (
                                                    <option key={`${cc._id}-${index}`} value={cc._id}>{`**** **** **** ${cc.number.slice(-4)}`}</option>
                                                ))}
                                            </Form.Select>
                                            <Row className={styles.flex_row_card}>
                                                <button className={styles.dark_button} onClick={handleMakePayment}>Оплатити</button>
                                                <button className={styles.light_button} onClick={handleAddCard}>Додати карту</button>
                                            </Row>

                                        </div>
                                    ) : (
                                        <PaymentForm key={`${pm.id}-form-${index}`}
                                            total={totalAfterDiscount}
                                            setIsPaid={setIsPaid}
                                            userCreditCards={userCreditCards}
                                            setUserCreditCards={setUserCreditCards}
                                            setShowAddCard={setShowAddCard}
                                            setShowCard={setShowCard}
                                            setSelectedCard={setSelectedCard}
                                        />
                                    )
                                ) :
                                    (
                                        showAddCard ? (
                                            <PaymentForm key={`${pm.id}-form-${index}`}
                                                total={totalAfterDiscount}
                                                setIsPaid={setIsPaid}
                                                setUserCreditCards={setUserCreditCards}
                                                setShowAddCard={setShowAddCard}
                                                setShowCard={setShowCard}
                                                setSelectedCard={setSelectedCard}
                                            />
                                        ) : null
                                    )}
                            </React.Fragment>
                        ) : (
                            <Form.Check
                                key={pm.id}
                                type="radio"
                                className={styles.radio}
                                aria-label="radio 1"
                            >
                                <Form.Check.Input
                                    type="radio"
                                    name="payment"
                                    value={pm.name}
                                    id={pm.id}
                                    className={styles.rrr}
                                    onChange={handleChangePayment}
                                    checked={paymentMethod === `${pm.name}`}
                                />
                                <Form.Check.Label htmlFor={pm.id}>{pm.name}</Form.Check.Label>
                            </Form.Check>
                        )
                    )}
                </Form.Group>
            </Row>
        </>
    );
}
