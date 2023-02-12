import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import * as React from 'react'
import CartItem from "./CartItem"

export default function CheckoutOrder() {
    const [payment, setPayment] = React.useState({ paymentType: "", another: "another" });
    const { paymentType } = payment;
    const [deliv, setDeliv] = React.useState({ deliveryType: "", another: "another" });
    const { deliveryType } = deliv;
    const [showPromo, setShowPromo] = React.useState("none")

    const handleChangePayment = e => {
        e.persist();
        console.log(e.target.value);

        setPayment(prevState => ({
            ...prevState,
            paymentType: e.target.value
        }));
    };

    const handleChangeDelivery = e => {
        e.persist();
        console.log(e.target.value);

        setDeliv(prevState => ({
            ...prevState,
            deliveryType: e.target.value
        }));
    };

    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col className={styles.colcard}><div className={styles.leftsale}>Оформлення замовлення</div></Col>
                </Row>
                <Form>
                    <Row className={styles.products_row}>
                        <Col className={styles.colcard}>
                            <div className={styles.checkout_form}>
                                <Row className={styles.row}>
                                    <Col className={styles.colcard}> <div className={styles.panel}>Ваші контактні данні</div></Col>
                                </Row>
                                <Row className={styles.attention2}>
                                    Увага! Товари, що на різних складах або різних продавців, буде доставлено окремими замовленнями
                                </Row>
                                <Row className={styles.contacts}>
                                    <Col className={styles.col_contacts}>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                    </Col>
                                    <Col className={styles.col_contacts}>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                            <Form.Control className={styles.form_input} type="email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={styles.row}>
                                    <Col className={styles.colcard}> <div className={styles.panel}>Спосіб доставки</div></Col>
                                </Row>
                                <Row className={styles.delivery}>
                                    <Col className={styles.colcard}>
                                        <Form.Group as={Col} controlId="delivery">
                                            <Form.Label className={styles.form_label}>Ваше місто</Form.Label>
                                            <Form.Select className={styles.form_input2} defaultValue="Вибрати місто...">
                                                <option>Львів</option>
                                                <option>Київ</option>
                                                <option>Харків</option>
                                            </Form.Select>
                                            <Row><Col>
                                                <Form.Check
                                                    type="radio"
                                                    className={styles.radio}
                                                    aria-label="radio 6">
                                                    <Form.Check.Input
                                                        type="radio"
                                                        value="Самовивіз з наших магазинів"
                                                        onChange={handleChangeDelivery}
                                                        checked={deliveryType === "Самовивіз з наших магазинів"} />
                                                    <Form.Check.Label>Самовивіз з наших магазинів</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                                <Col className={styles.text_span}>Безкоштовно</Col>
                                            </Row>
                                            <Form.Select className={styles.form_input2} defaultValue="Вибрати адресу відділення...">
                                                <option>вул.Кульпарківська, 72</option>
                                                <option>вул.Мазепи, 127</option>
                                                <option>вул.Антоновича, 31/2</option>
                                            </Form.Select>
                                            <Row><Col>
                                                <Form.Check
                                                    type="radio"
                                                    className={styles.radio}
                                                    aria-label="radio 6">
                                                    <Form.Check.Input
                                                        type="radio"
                                                        value=" Кур'єр на вашу адресу"
                                                        onChange={handleChangeDelivery}
                                                        checked={deliveryType === " Кур'єр на вашу адресу"} />
                                                    <Form.Check.Label> Кур'єр на вашу адресу</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                                <Col className={styles.text_span}>98 $</Col>
                                            </Row>
                                            <Row><Col>
                                                <Form.Check
                                                    type="radio"
                                                    className={styles.radio}
                                                    aria-label="radio 6">
                                                    <Form.Check.Input
                                                        type="radio"
                                                        value="Самомивіз з мобільних точок видачі"
                                                        onChange={handleChangeDelivery}
                                                        checked={deliveryType === "Самомивіз з мобільних точок видачі"} />
                                                    <Form.Check.Label>Самомивіз з мобільних точок видачі</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                                <Col className={styles.text_span}>Безкоштовно</Col>
                                            </Row>
                                            <Row><Col>
                                                <Form.Check
                                                    type="radio"
                                                    className={styles.radio}
                                                    aria-label="radio 6">
                                                    <Form.Check.Input
                                                        type="radio"
                                                        value="Нова пошта"
                                                        onChange={handleChangeDelivery}
                                                        checked={deliveryType === "Нова пошта"} />
                                                    <Form.Check.Label>Нова пошта</Form.Check.Label>
                                                </Form.Check>
                                            </Col>
                                                <Col className={styles.col_disc}><div className={styles.text_discount}><p>145 $</p><h4>80 $</h4></div></Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={styles.row}>
                                    <Col className={styles.colcard}> <div className={styles.panel}>Оплата</div></Col>
                                </Row>
                                <Row className={styles.payment}>
                                    <Col className={styles.colcard}>
                                        <Form.Group controlId="payment">
                                            <Form.Check
                                                type="radio"
                                                className={styles.radio}
                                                aria-label="radio 1">
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="Оплата під час отримання товару"
                                                    onChange={handleChangePayment}
                                                    checked={paymentType === "Оплата під час отримання товару"} />
                                                <Form.Check.Label>Оплата під час отримання товару</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check
                                                type="radio"
                                                className={styles.radio}
                                                aria-label="radio 2">
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="Оплатити зараз"
                                                    onChange={handleChangePayment}
                                                    checked={paymentType === "Оплатити зараз"} />
                                                <Form.Check.Label>Оплатити зараз</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check
                                                type="radio"
                                                className={styles.radio}
                                                aria-label="radio 3">
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="Безготівковий розрахунок для юридичних осіб"
                                                    onChange={handleChangePayment}
                                                    checked={paymentType === "Безготівковий розрахунок для юридичних осіб"} />
                                                <Form.Check.Label>Безготівковий розрахунок для юридичних осіб</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check
                                                type="radio"
                                                className={styles.radio}
                                                aria-label="radio 4">
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="Безготівковий розрахунок для фізичних осіб"
                                                    onChange={handleChangePayment}
                                                    checked={paymentType === "Безготівковий розрахунок для фізичних осіб"} />
                                                <Form.Check.Label>Безготівковий розрахунок для фізичних осіб</Form.Check.Label>
                                            </Form.Check>
                                            <Form.Check
                                                type="radio"
                                                className={styles.radio}
                                                aria-label="radio 5">
                                                <Form.Check.Input
                                                    type="radio"
                                                    value="Кредит та оплата частинами"
                                                    onChange={handleChangePayment}
                                                    checked={paymentType === "Кредит та оплата частинами"} />
                                                <Form.Check.Label>Кредит та оплата частинами</Form.Check.Label>
                                            </Form.Check>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={styles.row}>
                                    <Col className={styles.colcard}> <div className={styles.panel}>Контактні данні одержувача</div></Col>
                                </Row>
                                <Row className={styles.attention}>
                                    Увага! Отримання замовлення за паспортом. Введіть прізвище, ім'я, по батькові та мобільний номер телефону отримувача замовлення
                                </Row>
                                <Row className={styles.contacts}>
                                    <Col className={styles.col_contacts}>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Прізвище</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                    </Col>
                                    <Col className={styles.col_contacts}>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                            <Form.Control className={styles.form_input} />
                                        </Form.Group>
                                        <Form.Group as={Col}>
                                            <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                            <Form.Control className={styles.form_input} type="email" />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className={styles.row}>
                                    <Col className={styles.colcard}> <div className={styles.panel}>Ваше замовлення</div></Col>
                                </Row>
                                <Row className={styles.order}>
                                    <Col className={styles.colcard}>
                                        <CartItem />
                                        <CartItem />
                                    </Col>
                                    <Col className={styles.colcard}>
                                        <Button className={styles.big_confirm}>Підтвердити</Button>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        <Col className={styles.colcard} xs lg="4">
                            <div className={styles.confirm}>
                                <Button className={styles.promo} onClick={() => setShowPromo(showPromo === "none" ? "block" : "none")}>
                                    Промокод
                                    {showPromo === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img> :
                                        <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                                </Button>
                                <div className={styles.promo_div} style={{ display: showPromo }}>
                                    <Form.Control className={styles.form_input3} />
                                    <Button className={styles.small_sbm}>Застосувати</Button>
                                </div>
                                <div className={styles.form_line}></div>
                                <div className={styles.total}>
                                <Form.Label className={styles.total_label}>Разом:</Form.Label>
                                <ul>
                                        <li><div className={styles.info_li}><p>6 товарів на сумму</p><h6>105 754 ₴</h6></div></li>
                                        <li><div className={styles.info_li}><p>Вартість доставки</p><h6>за тарифами перевізника</h6></div></li>
                                        <li><div className={styles.info_li}><p>До сплати:</p><h3>105 754 ₴</h3></div></li>
                                    </ul>
                                    <Button className={styles.small_sbm}>Підтвердити</Button>
                                </div>
                               
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
                </Form>
            </Container>
        </div>




    )
}