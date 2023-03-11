import styles from "../styles.module.scss"
import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from 'react'
import { applyPromocode } from "@/requests/user";
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";
import { useRouter } from "next/router";


export default function Summary({
    cart,
    user,
    totalAfterDiscount,
    setTotalAfterDiscount,
    activeAddress,
    paymentMethod,
    delivery
}) {
    const { data: session } = useSession();
    const dispatch = useDispatch();
    const router = useRouter();
    const [showPromo, setShowPromo] = useState("none");
    const [promocode, setPromocode] = useState("");
    const [discount, setDiscount] = useState(0);
    const [couponError, setCouponError] = useState("");
    const validatePromoCode = yup.object({
        promocode: yup.string().required("Введіть промокод"),
    });


    const [totalPrice, setTotalPrice] = useState(cart?.cartTotalPrice);
    const [totalQty, setTotalQty] = useState(cart?.cartTotalQty);
    const [deliveryCost, setDeliveryCost] = useState(0);
    const [visible, setVisible] = useState(true);
    useEffect(() => {
        setTotalQty(cart.cartTotalQty);
        setTotalPrice(getTotalPrice());

        if (delivery.deliveryType == "Кур'єр на вашу адресу") {
            setDeliveryCost(Number(delivery.deliveryCost));
        }
        setTotalAfterDiscount((100 - discount) * getTotalPrice() / 100 + deliveryCost);
    }, [cart, setPromocode, totalPrice, delivery]);

    const getTotalPrice = () => {
        return cart.products.reduce(
            (accumulator, item) => accumulator + item.qty * item.priceAfter,
            0
        );
    };

    const applyCouponHandler = async (e) => {
        // const form = e.currentTarget;
        // if (form.checkValidity() === false) {
        //     e.preventDefault();
        //     e.stopPropagation();
        // }
        // e.preventDefault();
        // try {
        //   const  res  = await applyPromocode(promocode);
        //   setDiscount(res.discount);
        //   setTotalAfterDiscount(res.cartTotalAfterDiscount);
        // } catch (err) {
        //   setError(res.error);
        // }
        // console.log("promoCode", promocode);

        const res = await applyPromocode(promocode);
        console.log(res);
        if (res.error) {
            setCouponError(res.error);
            console.error("coupon error", res.error);
        } else {

            setTotalAfterDiscount(res.cartTotalAfterDiscount);
            setDiscount(res.discount);
            setCouponError("");
            setVisible(false);
        }
    }
    const sendOrder = async () => {

        if (session) {
            // const { data } = await axios.get(
            //     `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
            //   );
            try {
                const { data } = await axios.post("/api/order/create", {
                    products: cart.products,
                    shippingAddress: activeAddress,
                    shippingPrice: deliveryCost,
                    paymentMethod,
                    totalPrice,
                    costAfterDiscount: totalAfterDiscount,
                    promocode
                });
                router.push(`/order/${data.order_id}`);

            } catch (error) { }
            console.log("user sent order");
            var empty = dispatch(emptyCart());
            console.log("emptycartPayload", empty);
        } else {
            signIn();
        }
    }
    return (
        <>
            <Formik
                enableReinitialize
                initialValues={{
                    promocode,
                }}
                initialErrors={{ couponError }}
                //   error={{}}
                initialTouched={{ promocode: false }}
                validationSchema={validatePromoCode}
                onSubmit={(values) => console.log(values)}
            >
                {(formik) => (

                    <Form  >
                        <div className={styles.confirm}>
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
                            <div className={styles.form_line}></div>
                            <div className={styles.total}>
                                <Form.Label className={styles.total_label}>Разом:</Form.Label>
                                <ul>
                                    <li><div className={styles.info_li}><p>{totalQty} товарів на сумму</p><h6>{totalPrice.toLocaleString()} ₴</h6></div></li>
                                    <li><div className={styles.info_li}><p>Доставка</p><h6>{delivery.deliveryType}</h6></div></li>
                                    <li><div className={styles.info_li}><p>Вартість доставки</p><h6>{delivery.deliveryType == "Кур'єр на вашу адресу" ? `${Number(delivery.deliveryCost)} ₴` : delivery.deliveryCost}</h6></div></li>
                                    <li><div className={styles.info_li}><p>Оплата</p><h6>{paymentMethod}</h6></div></li>
                                    {discount > 0 && (
                                        <li><div className={styles.info_li}><p>Купон застосовано:</p><h6><b>-{discount}%</b></h6></div></li>

                                    )}

                                    <li><div className={styles.info_li}><p>До сплати:</p><h3>{Math.round(totalAfterDiscount).toLocaleString()} ₴</h3></div></li>


                                </ul>
                                <Button className={styles.small_sbm}
                                    onClick={() => sendOrder()}
                                >Підтвердити</Button>
                            </div>

                        </div>
                    </Form>
                )}

            </Formik>


        </>
    )
}