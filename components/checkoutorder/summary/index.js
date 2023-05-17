import styles from "../styles.module.scss"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { applyPromocode, saveAddress } from "@/requests/user";
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
import { useRouter } from "next/router";
import CheckoutCart from "../cartitems";
import PersonalDataPolicy from '../../checkoutorder/info/PersonalDataPolicy'
import UserConditions from "../../checkoutorder/info/PersonalDataPolicy"
import MyCabinet from "@/components/mycabinet";
import DotLoaderSpinner from "@/components/loaders/dotLoader";



export default function Summary({
    cart,
    userData,
    totalAfterDiscount,
    setTotalAfterDiscount,
    activeAddress,
    setActiveAddress,
    paymentMethod,
    delivery,
    setDelivery,
    isPaid,
    orderError,
    setOrderError

}) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const router = useRouter();
    const [userSinginShow, setUserSigninShow] = useState(false);
    const [showPromo, setShowPromo] = useState("none");
    const [promocode, setPromocode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");

    const validatePromoCode = yup.object({
        promocode: yup.string().required("Введіть промокод"),
    });

    const [totalPrice, setTotalPrice] = useState(cart?.cartTotalPrice);
    const [totalQty, setTotalQty] = useState(cart?.cartTotalQty);
    const [visible, setVisible] = useState(true);
    const [infoShow, setInfoShow] = useState(false);
    const [info2Show, setInfo2Show] = useState(false);
    useEffect(() => {
        setTotalQty(cart?.cartTotalQty);
        setTotalPrice(getTotalPrice());
        if (delivery.deliveryId == "postmanDelivery") {
            setTotalAfterDiscount(((100 - discount) * getTotalPrice() / 100 + Number(delivery.deliveryCost)).toFixed());
        }
        else {
            setTotalAfterDiscount(((100 - discount) * getTotalPrice() / 100).toFixed());
        }
    }, [cart, setPromocode, totalPrice, delivery]);

    const getTotalPrice = () => {
        return cart?.products.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };

    const applyCouponHandler = async (e) => {
        const res = await applyPromocode(promocode);
        if (res.error) {
            setCouponError(res.error);
        } else {
            setTotalAfterDiscount(res.cartTotalAfterDiscount);
            setDiscount(res.discount);
            setCouponError("");
            setVisible(false);
        }
    }
    const sendOrder = async (e) => {

        if (session) {
            if (orderError.userError === "" && orderError.shippingError === "" && orderError.paymentError === "") {
                try {
                    setLoading(true);
                    if (activeAddress != null) {
                        await saveAddress(activeAddress);
                    }

                    const { data } = await axios.post("/api/order/create", {
                        firstName: userData.firstName,
                        lastName: userData.lastName,
                        phoneNumber: userData.phoneNumber,
                        email: userData.email,
                        products: cart.products,
                        shippingAddress: activeAddress,
                        paymentMethod,
                        deliveryMethod: delivery,
                        totalPrice,
                        totalQty: cart.cartTotalQty,
                        costAfterDiscount: totalAfterDiscount,
                        promocode,
                        discount,
                        isPaid
                    });
                    setLoading(false);
                    router.push(`/order/${data.order_id}`);
                    var empty = dispatch(emptyCart());
                } catch (error) { console.error("summary129", error) }
            }
            else {
                console.error("Заповніть поля", JSON.stringify(orderError, null, 4))
            }

        } else {
            setUserSigninShow(true);
            router.push(`/`);
        }
    }
    return (
        <div className={styles.confirm}>
             {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <Formik
                enableReinitialize
                initialValues={{
                    promocode,
                }}
                initialErrors={{ couponError, orderError }}
                initialTouched={{ promocode: false }}
                validationSchema={validatePromoCode}
                onSubmit={(values) => console.log(values)}
            >
                {(formik) => (
                    <Form >
                        <div>
                            <CheckoutCart cart={cart} />
                            <Button className={styles.promo} onClick={() => setShowPromo(showPromo === "none" ? "block" : "none")}>
                                Промокод
                                {showPromo === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img> :
                                    <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                            </Button>
                            <div className={styles.promo_div} style={{ display: showPromo }}>
                                <Form.Control className={styles.form_input3}
                                    name="promocode"
                                    onChange={(e) => {
                                        formik.handleChange(e);
                                        setPromocode(e.target.value);
                                        setVisible(true);
                                    }}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.promocode}
                                    isInvalid={formik.touched.promocode && couponError != "" || formik.touched.promocode && !!formik.errors.promocode}
                                    isValid={formik.touched.promocode && couponError === "" && formik.initialErrors.couponError == ""}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.promocode || formik.initialErrors.couponError}
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="valid">
                                </Form.Control.Feedback>
                                {visible ? (
                                    <Button className={styles.small_sbm} onClick={(e) => applyCouponHandler(e)}>Застосувати</Button>
                                ) : <></>}
                            </div>
                            <div className={styles.total}>
                                <ul>
                                    <li><div className={styles.litext_btn}><p>{totalQty} товарів на сумму</p><h6>{totalPrice.toLocaleString("uk-UA")} ₴</h6></div></li>
                                    <li><div className={styles.litext_btn}><p>Доставка</p><h6>{delivery.deliveryType}</h6></div></li>
                                    <li><div className={styles.litext_btn}><p>Адреса доставки</p><h6>{delivery.deliveryAddress}</h6></div></li>
                                    <li><div className={styles.litext_btn}><p>Вартість доставки</p><h6>{delivery.deliveryType == "Кур'єр на вашу адресу" ? `${Number(delivery.deliveryCost)} ₴` : delivery.deliveryCost}</h6></div></li>
                                    <li><div className={styles.litext_btn}><p>Оплата</p><h6>{paymentMethod}</h6></div></li>
                                    <li><div className={styles.litext_btn}><p>Статус оплати</p><h6>{isPaid ? "Оплачено" : "Очікується оплата"}</h6></div></li>
                                    {discount > 0 && (
                                        <li><div className={styles.litext_btn}><p>Купон застосовано:</p><h6><b>-{discount}%</b></h6></div></li>
                                    )}
                                    <li><div className={styles.litext_btn}><p>До сплати:</p><h3>{Math.round(totalAfterDiscount).toLocaleString("uk-UA")} ₴</h3></div></li>
                                </ul>
                                <Button className={styles.small_sbm} onClick={() => sendOrder()}>Підтвердити</Button>
                                <Form.Control className={styles.form_input3}
                                    name="errorHidden"
                                    hidden
                                    isInvalid={orderError.userError != "" || orderError.shippingError != "" || orderError.paymentError != ""}
                                />
                                <Form.Control.Feedback type="invalid">{formik.errors.orderError?.userError || formik.errors.orderError?.shippingError || formik.errors.orderError?.paymentError}
                                </Form.Control.Feedback>
                            </div>
                            <div>
                                <div className={styles.form_line}></div>
                                <div className={styles.info}>
                                    <p>Отримання замовлення від 5 000 ₴ тільки за паспортом (Закон від 06.12.2019 № 361-IX)</p>
                                    <ul>Підтверджуючи замовлення, я приймаю умови:
                                        <li><div className={styles.litext_btn}><p>положення про обробку і захист персональних даних</p><img width="115px" height="25px" src="../../../icons/info.png" onClick={() => setInfoShow(true)}></img></div></li>
                                        <li><div className={styles.litext_btn}><p>угоди користувача</p><img width="115px" height="25px" src="../../../icons/info.png" onClick={() => setInfo2Show(true)}></img></div></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
            <PersonalDataPolicy show={infoShow}
                onHide={() => setInfoShow(false)} />
            <UserConditions show={info2Show}
                onHide={() => setInfo2Show(false)} />
        </div>
    )
}