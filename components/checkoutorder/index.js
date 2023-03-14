import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { useState, useEffect, useRef } from 'react'
import CartItem from "./cartItem"
import CartPage from '../cart'
import { useSelector, useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice"
import { signIn, useSession } from 'next-auth/react';
import { Formik } from 'formik';
import * as yup from 'yup';
import "yup-phone";
import { getStreets } from "@/requests/street"
import CityModal from "./citymodal";
import useDeepCompareEffect from "use-deep-compare-effect"
import { applyPromocode, manageAddress, saveAddress } from "@/requests/user"
import GooglePayItem from "./googlepay"
import { useRouter } from "next/router"
import CheckoutCart from "./cartitems"
import PaymentMethod from "./payment"
import UserData from "./userdata"
import Shipping from "./shipping"
import Summary from "./summary"
import axios from "axios"




// const initialValues = {
//     firstName: "",
//     lastName: "",
//     phoneNumber: "",
//     city: "",
//     zipCode: "",
//     region: "",
//     address: "",
//     country: "",
// }

export default function CheckoutOrder({
    cart,
    user,
    country
}) {

    //const cartInRedux = useSelector((state) => state.cart);
    //    console.log("cartInChekoutOrder", cart);
    // console.log("userInChekoutOrder", user);
    // const [selectedAddresses, setSelectedAddresses] = useState();
    const router = useRouter();
    // const [payment, setPayment] = useState({ paymentType: "", another: "another" });
    // 
    const [payment, setPayment] = useState({ paymentMethod: "Оплата під час отримання товару", paymentMethodId: "" });
    const { paymentMethod } = payment;
    const [delivery, setDelivery] = useState({ deliveryType: "Нова пошта", deliveryCost: "за тарифами перевізника" });
    const [deliveryCost, setDeliveryCost] = useState(0);
    // const { deliveryType } = delivery;
    // // const [deliv, setDeliv] = useState({ deliveryType: "" });
    // // const { deliveryType } = deliv;
    // const [showPromo, setShowPromo] = useState("none");
    // const [couponDiscount, setCouponDiscount] = useState(0);
    // const [couponApplied, setCouponApplied] = useState(false);
    // const [cartShow, setCartShow] = useState(false);
    const { data: session } = useSession();
    const dispatch = useDispatch();

    const [userAdresses, setUserAdresses] = useState(user?.address || []);
    const [activeAddress, setActiveAddress] = useState(userAdresses?.find(address => address.active === true));
    // const [filteredUserAdresses, setFilteredUserAdresses] = useState(null);

    // const [promocode, setPromocode] = useState("");
    const [order_error, setOrder_Error] = useState("");



    const [totalAfterDiscount, setTotalAfterDiscount] = useState(cart?.cartTotalPrice);
    const [totalPrice, setTotalPrice] = useState(cart?.cartTotalPrice);
    // const [totalQty, setTotalQty] = useState(cart?.cartTotalQty);

    // const getTotalPrice = () => {
    //     return cart.products.reduce(
    //         (accumulator, item) => accumulator + item.qty * item.priceAfter,
    //         0
    //     );
    // };
    // // const getTotalPriceAfterCoupon = () => {
    // //     setTotalAfterDiscount((100 - couponDiscount) * getTotalPrice() / 100)
    // //     return totalAfterDiscount;
    // // };
    // useEffect(() => {
    //     setTotalQty(cart.cartTotalQty);
    //     setTotalPrice(getTotalPrice());
    //     setTotalAfterDiscount((100 - couponDiscount) * getTotalPrice() / 100);

    // }, [cart, setCouponDiscount, setPromocode, totalAfterDiscount]);

    // // const getTotalQty = () => {
    // //     return cart.products.reduce(
    // //         (accumulator, item) => accumulator + item.qty,
    // //         0
    // //     );
    // // };


    // const applyCouponHandler = async () => {
    //     console.log("promoCode", promocode);

    //     const res = await applyPromocode(promocode);
    //     if (res.error) {
    //         console.error("coupon error", res.error);
    //     } else {
    //         if (!couponApplied) {
    //             setCouponDiscount(res.discount);
    //             setTotalAfterDiscount((100 - couponDiscount) * getTotalPrice() / 100);
    //             setCouponApplied(true);
    //         }
    //         else {
    //             console.log("Coupon already applied");
    //         }
    //     }
    // }
    // const sendOrder = async () => {

    //     if (session) {
    //         // const { data } = await axios.get(
    //         //     `/api/product/${product._id}?style=${router.query.style}&code=${router.query.code}`
    //         //   );
    //         try {
    //             const { data } = await axios.post("/api/order/create", {
    //                 products: cart.products,
    //                 shippingAddress: activeAddress,
    //                 paymentMethod,
    //                 totalPrice: totalAfterDiscount ? totalAfterDiscount : totalPrice,
    //             });
    //             router.push(`/order/${data.order_id}`);

    //         } catch (error) { }
    //         console.log("user sent order");
    //         var empty = dispatch(emptyCart());
    //         console.log("emptycartPayload", empty);
    //     } else {
    //         signIn();
    //     }
    // }
   
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
                    promocode:""
                });
                console.log("data", data);
                // router.push(`/order/${data.order_id}`);

            } catch (error) { 
                console.log("EROORORORORRO", error);
            }
            // console.log("user sent order");
            // var empty = dispatch(emptyCart());
            // console.log("emptycartPayload", empty);
        } else {
            signIn();
        }
    }

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

                            {JSON.stringify(activeAddress, null, 4)}
                            <Shipping
                                user={user}
                                activeAddress={activeAddress} setActiveAddress={setActiveAddress}
                                country={country}
                                deliveryType={delivery.deliveryType}
                                setDelivery={setDelivery} />

                            <PaymentMethod paymentMethod={paymentMethod} setPayment={setPayment} />
                        </div>
                    </Col>
                    <Col className={styles.colcard} xs lg="4">
                        <div>
                            <Summary
                                cart={cart}
                                user={user}
                                totalAfterDiscount={totalAfterDiscount} setTotalAfterDiscount={setTotalAfterDiscount}
                                paymentMethod={paymentMethod}
                                activeAddress={activeAddress}
                                delivery={delivery}
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


