import styles from "./styles.module.scss"
import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import { useState } from "react";
import LeaveFeedback from "../../productPage/leaveFeedback"


export default function OrderItem(props) {
    const [showFulllOrder, setShowFulllOrder] = useState("none")
    const [feedback, setFeedback] = useState(false);
console.log("10", props);
    const handleFeedBack = () => {

        setFeedback(true);

        //  setLoginModalShow(true);

    };
    return (
        <Container className={styles.container}>
            <Row className={styles.orderitem}>
                {showFulllOrder === "none" ? (
                    <Col xs={4} className={styles.col}>
                        <p>№{props.order._id.substring(0, 6)} від {props.order.createdAt.substring(0, 10)}<br /><span>{props.order?.status}</span></p>
                    </Col>) : (
                    <Col xs={11} className={styles.col_opendiv}>
                        <p>№{props.order._id.substring(0, 6)} від {props.order.createdAt.substring(0, 10)}<br /><span>{props.order?.status}</span></p>
                    </Col>
                )}
                {showFulllOrder === "none" ? (
                    <Col xs={3} className={styles.col}>
                        <p>Сума замовлення<br /><span>{props.order.costAfterDiscount.toLocaleString()} ₴</span></p>
                    </Col>) : <></>}
                {showFulllOrder === "none" ? props.order.products.slice(0, 2).map(product => (
                    <Col className={styles.col_pic} key={product._id}>
                        <div className={styles.picture}>
                            <img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }} />
                        </div>
                    </Col>
                )) : <></>}
                <Col xs={1} className={styles.col}>
                    <button onClick={() => setShowFulllOrder(showFulllOrder === "none" ? "block" : "none")}>
                        {showFulllOrder === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img>
                            : <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                    </button>
                </Col>
            </Row>
            <Row style={{ display: showFulllOrder }}>
                <Col className={styles.ordertable}>
                    <div>
                        <Table hover size="sm">
                            <thead>
                                <tr>
                                    <th>Товари PLUM</th>
                                    <th></th>
                                    <th className={styles.tr}>Кількість</th>
                                    <th className={styles.tr}>Ціна</th>
                                </tr>
                            </thead>
                            <tbody>
                                {props.order.products.slice(0, 2).map((product, i) => (
                                    <tr key={i}>
                                        <td> <div className={styles.picture}>
                                            <img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }} />
                                        </div>
                                        </td>
                                        <td className={styles.td}>{product.name}</td>
                                        <td className={styles.centered}>{product.qty}</td>
                                        <td className={styles.centered}>{(product.priceAfter * product.qty).toLocaleString('uk-UA')} ₴</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    <div className={styles.devider}>
                        <span>Інформація про замовлення</span>
                        <div className={styles.line2}></div>
                    </div>
                    <Row className={styles.deliveryinfo}>
                        <div className={styles.delivery_item}>
                            <p>Отримувач</p>
                            <span>{props.order.shippingAddress?.firstName} {props.order.shippingAddress?.lastName}</span>
                        </div>
                        <div className={styles.delivery_item}>
                            <p>Оплата</p>
                            {props.order.discount > 0 ? (
                                <div>
                                    <span>Застосовано промокод {props.order.promocode}</span><br />
                                    <span>Знижка {props.order.discount}%</span><br />
                                </div>
                            ) : <></>}
                            <span>{props.order.paymentMethod} : <b>{props.order.totalPrice.toLocaleString('uk-UA')}  ₴</b></span>
                        </div>
                        <div className={styles.delivery_item}>
                            <p>Доставка</p>
                            <span> {props.order.deliveryMethod.deliveryType}</span>
                            <span> Вартість доставки: {props.order.deliveryMethod.deliveryId !== "postmanDelivery" ?
                                (<span><small>{props.order.deliveryMethod.deliveryCost}</small></span>
                                ) : <span><b>{props.order.deliveryMethod.deliveryCost} ₴</b></span>}</span>
                            {props.order.deliveryMethod.deliveryId === "postmanDelivery" ? (
                                <span><small>{props.order.shippingAddress?.address}</small></span>
                            ) : props.order.deliveryMethod.deliveryId === "selfPickup" ? (
                                <span>Адреса магазину: <small>{props.order.deliveryMethod.deliveryAddress}</small></span>
                            ) : props.order.deliveryMethod.deliveryId === "novaPoshta" ? (
                                <span>Відділення:<small>{props.order.deliveryMethod.deliveryAddress}</small></span>
                            ) : <></>}

                        </div>
                    </Row>
                    <div className={styles.repete}>
                        <button className={styles.light_button} onClick={handleFeedBack}>Залишити відгук</button>
                        <button className={styles.dark_button}>Повторити замовлення</button>
                    </div>
                </Col>

                <LeaveFeedback
                    show={feedback}
                    onHide={() => setFeedback(false)}
                    product={null}   //TODO Как передать сюда продукт ???
                    setProductReview={null}  //TODO Как передать сюда setProductReview ???
                />
            </Row>
        </Container>
    )
}