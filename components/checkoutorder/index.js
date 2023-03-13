import styles from "./styles.module.scss"
import { Container, Row, Col} from "react-bootstrap"
import { useState } from 'react'
import CheckoutCart from "./cartitems"
import PaymentMethod from "./payment"
import UserData from "./userdata"
import Shipping from "./shipping"
import Summary from "./summary"


export default function CheckoutOrder({
    cart,
    user,
    country
}) {


    const [payment, setPayment] = useState({ paymentMethod: "Оплата під час отримання товару", paymentMethodId: "" });
    const { paymentMethod } = payment;
    const [delivery, setDelivery] = useState({ deliveryType: "Нова пошта", deliveryCost: "за тарифами перевізника", deliveryAddress: "", deliveryId:"novaPoshta" });
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [userAdresses, setUserAdresses] = useState(user?.address || []);
    const [activeAddress, setActiveAddress] = useState(userAdresses?.find(address => address.active === true));
    const [order_error, setOrder_Error] = useState("");
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(cart?.cartTotalPrice);


    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col className={styles.colcard}><div className={styles.leftsale}>Оформлення замовлення</div></Col>
                </Row>
                <Row className={styles.products_row}>
                    <Col className={styles.colcard}>
                        <div className={styles.checkout_form}>
                            <CheckoutCart cart={cart} />
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
                    <Col className={styles.colcard} xs lg="4">
                        <div>
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
                            {/* <Button className={styles.small_sbm}
                                onClick={() => sendOrder()}
                            >Підтвердити</Button> */}
                        </div>
                        <div>
                            <div className={styles.form_line}></div>
                            <div className={styles.info}>
                                <p>Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон від 06.12.2019 № 361-IX)</p>
                                <ul>Підтверджуючи замовлення, я приймаю умови:
                                    <li><div className={styles.info_li}><p>положення про обробку і захист персональних даних</p><img width="120px" height="25px" src="../../../icons/info.png"></img></div></li>
                                    <li><div className={styles.info_li}><p>угоди користувача</p><img width="120px" height="25px" src="../../../icons/info.png"></img></div></li>
                                </ul>
                            </div>
                        </div>
                    </Col>

                </Row>
            </Container>
        </div >
    )
}


