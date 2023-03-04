import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState } from 'react'
import CartItem from "./cartItem"
import CartPage from '../cart'
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice"
import { signIn, useSession } from 'next-auth/react';
import axios from "axios";
import { Formik } from 'formik';
import * as yup from 'yup';
require("yup-phone");

// import { getSession, signIn, signOut } from "next-auth/react"
// import User from "@/models/User";
// import Cart from "@/models/Cart";
//import db from "@/utils/db";

const initialValues = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    cityRegion: "",
    city: "",
    zipCode: "",
    address1: "",
    address2: "",
    country: "",
}

export default function CheckoutOrder({
    cart,
    user,
    selectedAddresses,
    setSelectedAddresses
}) {

    const cartInRedux = useSelector((state) => state.cart);
    // console.log("cartInChekoutOrder", cart);
    // console.log("userInChekoutOrder", user);
    const [payment, setPayment] = useState({ paymentType: "", another: "another" });
    const { paymentType } = payment;
    const [deliv, setDeliv] = useState({ deliveryType: "", another: "another" });
    const { deliveryType } = deliv;
    const [showPromo, setShowPromo] = useState("none");
    const [couponDiscount, setCouponDiscount] = useState(0);
    const [cartShow, setCartShow] = useState(false);
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const [adresses, setAdresses] = useState(user?.address || []);
    const [shipping, setShipping] = useState(initialValues);

    const {
        firstName,
        lastName,
        phoneNumber,
        cityRegion,
        city,
        zipCode,
        address1,
        address2,
        country
    } = shipping;
    const validate = yup.object({
        firstName: yup.string()
            .min(3, "Ім'я має бути мінімум 3 символи")
            .max(20, "Ім'я має бути максимум 20 символів")
            .matches(/^[aA-zZ]/, "Цифри та спец.символи заборонено"),
        lastName: yup.string()
            .min(3, "Прізвище має бути мінімум 3 символи")
            .max(20, "Прізвище має бути максимум 20 символів")
            .matches(/^[aA-zZ]/, "Цифри та спец.символи заборонено"),
        phoneNumber: yup.string().phone().required("Необхідний номер телефону"),
        cityRegion: yup.string()
            .required("Необхідно ввести область")
            .min(3, "Має бути мінімум 3 символи")
            .max(20, "Має бути максимум 20 символів"),
        city: yup.string()
            .required("Необхідно ввести місто")
            .min(2, "Має бути мінімум 2 символи")
            .max(20, "Має бути максимум 20 символів"),
        // zipCode: yup.integer().positive(),
        address1: yup.string()
            .max(100, "Має бути максимум 100 символів"),
        address2: yup.string()
            .max(100, "Має бути максимум 100 символів"),
        country: yup.string()
    })
    // useEffect(() => {
    //    // @refresh reset
    // }, [cart]);

    // const[selectedAddress, setSelectedAddress] = useState(user?.adress ||[]);

    const handleChangeName = e => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })

    }
    const handleChangeSurname = e => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    }
    const handleChangePhoneNumber = e => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    }
    const handleChangeEmail = e => {
        const { name, value } = e.target;
        setShipping({ ...shipping, [name]: value })
    }
    const handleChangePayment = e => {
        e.persist();
        console.log("handlePayment: ", e.target.value);

        setPayment(prevState => ({
            ...prevState,
            paymentType: e.target.value
        }));
    };
    const handleChangeDelivery = e => {
        e.persist();
        console.log("handleDelivery", e.target.value);

        setDeliv(prevState => ({
            ...prevState,
            deliveryType: e.target.value
        }));
    };
    const getTotalPrice = () => {
        return cart.products.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };
    const getTotalPriceAferCoupon = () => {
        return (100 - couponDiscount) * getTotalPrice() / 100;
    };
    const getTotalQty = () => {
        return cart.products.reduce(
            (accumulator, item) => accumulator + item.qty,
            0
        );
    };
    const updateCartHandler = (e) => {
        e.preventDefault();
        setCartShow(true);
    }

    const sendOrder = async () => {
        if (session) {
            // const { data } = await axios.get(
            //     `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
            //   );
            console.log("user sent order");
            var empty = dispatch(emptyCart());
            console.log("emptycartPayload", empty);
        } else {
            signIn();
        }
    }
    //    const updateCartHandler=(e)=>{
    //     sendOrder(e);
    //     //window.location.reload(true);
    //     // @refresh reset
    //    }
    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col className={styles.colcard}><div className={styles.leftsale}>Оформлення замовлення</div></Col>
                </Row>
                <Formik
                    enableReinitialize
                    initialValues={{
                        firstName,
                        lastName,
                        phoneNumber,
                        cityRegion,
                        city,
                        zipCode,
                        address1,
                        address2
                    }}
                    validationSchema={validate}
                // onSubmit={() => {
                //     signInHandler();
                // }}
                >
                    {(form) => (
                        <Form >
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
                                                    <Form.Control className={styles.form_input} onChange={handleChangeSurname} />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Номер телефону</Form.Label>
                                                    <Form.Control className={styles.form_input} onChange={handleChangePhoneNumber} />
                                                </Form.Group>
                                            </Col>
                                            <Col className={styles.col_contacts}>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Ім'я</Form.Label>
                                                    <Form.Control className={styles.form_input} onChange={handleChangeName} />
                                                </Form.Group>
                                                <Form.Group as={Col}>
                                                    <Form.Label className={styles.form_label}>Електронна пошта</Form.Label>
                                                    <Form.Control className={styles.form_input} type="email" onChange={handleChangeEmail} />
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
                                            <button
                                                onClick={(e) => updateCartHandler(e)}
                                            >Редагувати</button>
                                            <CartPage
                                                show={cartShow}
                                                onHide={() => setCartShow(false)}
                                            />
                                            {
                                                cart.products.map((p, i) => (
                                                    <Col className={styles.colcard} key={i} >
                                                        <CartItem product={p} />
                                                    </Col>
                                                ))}
                                            {/* <Col className={styles.colcard}>
                                        <Button className={styles.big_confirm}>Підтвердити</Button>
                                    </Col> */}
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
                                            {/* TODO onClick */}
                                            <Button className={styles.small_sbm}>Застосувати</Button>
                                        </div>
                                        <div className={styles.form_line}></div>
                                        <div className={styles.total}>
                                            <Form.Label className={styles.total_label}>Разом:</Form.Label>
                                            <ul>
                                                <li><div className={styles.info_li}><p>{getTotalQty()} товарів на сумму</p><h6>{getTotalPrice().toFixed(2)} грн</h6></div></li>
                                                <li><div className={styles.info_li}><p>Вартість доставки</p><h6>за тарифами перевізника</h6></div></li>
                                                <li><div className={styles.info_li}><p>До сплати:</p><h3>{getTotalPriceAferCoupon().toFixed(2)} грн</h3></div></li>
                                            </ul>
                                            <Button className={styles.small_sbm}
                                                onClick={() => sendOrder()}
                                            >Підтвердити</Button>
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
                    )}

                </Formik>

            </Container>
        </div >
    )
}
// export async function getServerSideProps(context) {
//     //console.log("contextInCheckoutServerSideProps",context);
//     await db.connectDb();
//     var user = {};
//     const session = await getSession(context);
//     if (session) {
//         console.log("///////////////////////////////////////Session:", session);
//         user = await User.findById(session.user.id);
//         var cart = {};
//         // console.log("userInCheckout", user);  
//         if (user) {
//             cart = await Cart.findOne({ user: user._id });
//             if (!cart) {
//                 // alert("Hello! I am an alert box!!");
//                 // return   res.status(200).json({ name: 'John Doe' })
//                 return {
//                     // redirect: {
//                     //   destination: "auth/cart",
//                     // }
//                 }
//             }
//             console.log("/////////////////////////////////cart:", cart);
//         } else {
//             return {
//                 redirect: {
//                     destination: "/signin",
//                 }
//             }
//         }
//     }
//   await  db.disconnectDb();
//     return {
//         props: {
//             cart: JSON.parse(JSON.stringify(cart)),
//             user: JSON.parse(JSON.stringify(user)),
//         },
//     };
// }
