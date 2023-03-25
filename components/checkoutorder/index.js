import styles from "./styles.module.scss"
import { Container, Row, Col } from "react-bootstrap"
import { useState } from 'react'
import CheckoutCart from "./cartitems"
import PaymentMethod from "./payment"
import UserData from "./userdata"
import Shipping from "./shipping"
import Summary from "./summary"
import SimpleCopyright from "./SimpleCopyright"

export default function CheckoutOrder({
    cart,
    user,
    country
}) {
    const [payment, setPayment] = useState({ paymentMethod: "Оплата під час отримання товару", paymentMethodId: "" });
    const { paymentMethod } = payment;
    const [delivery, setDelivery] = useState({ deliveryType: "Нова пошта", deliveryCost: "за тарифами перевізника", deliveryAddress: "", deliveryId: "novaPoshta" });
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [userAdresses, setUserAdresses] = useState(user?.address || []);
    const [activeAddress, setActiveAddress] = useState(userAdresses?.find(address => address.active === true));
    const [order_error, setOrder_Error] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(cart?.cartTotalPrice);

    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <div className={styles.leftsale}>Оформлення замовлення</div>
                </Row>
                <Row className={styles.general_div}>
                    <Col className={styles.colcard}>
                        <div className={styles.checkout_form}>
                            <UserData user={user} activeAddress={activeAddress} setActiveAddress={setActiveAddress} />
                            <Shipping
                                user={user}
                                activeAddress={activeAddress} setActiveAddress={setActiveAddress}
                                country={country}
                                delivery={delivery}
                                setDelivery={setDelivery} />
                            <PaymentMethod paymentMethod={paymentMethod} setPayment={setPayment} />
                        </div>
                    </Col>
                    <Col className={styles.summary_form} xs lg="4">
                        <Summary
                            cart={cart}
                            user={user}
                            totalAfterDiscount={totalAfterDiscount}
                            setTotalAfterDiscount={setTotalAfterDiscount}
                            paymentMethod={paymentMethod}
                            activeAddress={activeAddress}
                            delivery={delivery}
                            setDelivery={setDelivery}
                        />
                    </Col>
                </Row>
            </Container>
            <SimpleCopyright />
        </>
    )
}


