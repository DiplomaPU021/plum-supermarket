import styles from "./styles.module.scss"
import * as React from "react"
import Card from 'react-bootstrap/Card'
import HeartIcon from '../icons/HeartIcon'
import DeleteIcon from "../icons/DeleteIcon"
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col, Form } from "react-bootstrap"
import { updateCart } from "../../store/cartSlice"
import DelNotification from "../delete"


export default function CartItem(product, userid) {
    const [showExtra, setShowExtra] = React.useState("none")
    const [notificationShow, setNotificationShow] = React.useState(false);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const updateQty = async (type) => {
        let newCart = cart.cartItems.map((item) => {
            if (item._uid == product.product._uid) {
                return {
                    ...item,
                    qty: type == "plus" ? item.qty + 1 : item.qty - 1,
                };
            }
            return item;
        });
        dispatch(updateCart(newCart));
    };

    const removeProduct = (id) => {
        // const removeProduct = async (id) => {
        setNotificationShow(true)
        //TODO треба перенести  в компонент модальне видалення DelNotification і в разі вибору не показувати знову використовувати пряме видалення тут
        // let newCart = cart.cartItems.filter((item) => {
        //     return item._uid != id;
        // });
        // dispatch(updateCart(newCart));
    };
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardbody}>
                {
                    product.product.discount > 0 ? (
                        <div className={styles.discount}>{product.product.discount}%</div>
                    ) : (<></>)
                }
                <Container className={styles.bord}>
                    <Row className={styles.bord}>
                        <Col md={3} xs={12} sm={3} className={styles.bordimage}>
                            <Row className={styles.picture}>
                                <img src={product.product.images[0]} width='157px' height='95px' alt="picture" />
                            </Row>
                        </Col>
                        <Col md={5} xs={12} sm={5} className={styles.cardtext}>
                            <h5>
                                {(product.product.name + " " + (product.product.color ? product.product.color.color : ""
                                ) + " " + product.product.size).length > 55
                                    ? `${(product.product.name + " " + (product.product.color ? product.product.color.color : ""
                                    ) + " " + product.product.size).substring(0, 55)}...`
                                    : product.product.name + " " + (product.product.color ? product.product.color.color : "") + " " + product.product.size}
                            </h5>
                            <div className={styles.cardtext_line}></div>
                            <div className={styles.cardtext_extraservice}>
                                <button className={styles.cardextrabtn} onClick={() => setShowExtra(showExtra === "none" ? "block" : "none")}>Extra service {showExtra === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img> :
                                    <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                                </button>
                                <div className={styles.extra_div} style={{ display: showExtra }}>
                                    <div className={styles.check}>
                                        <Form.Check type={'checkbox'} id={`check-api-1`} >
                                            <Form.Check.Input type={'checkbox'} />
                                            <Form.Check.Label><b>Windows 11</b></Form.Check.Label>
                                        </Form.Check>
                                        <p>Операційна система Windows 11 Для дому на 1ПК (ESD - електронна ліцензія в конверті, всі мови) (KW9-00664)</p>
                                        <h4>9899 $</h4>
                                    </div>
                                    <div className={styles.check}>
                                        <Form.Check type={'checkbox'} id={`check-api-2`} >
                                            <Form.Check.Input type={'checkbox'} />
                                            <Form.Check.Label><b>Microsoft 365 на вибір</b></Form.Check.Label>
                                        </Form.Check>
                                        <p>Microsoft 365 Персональний, підписка 1 рік, для 1 користувача (ESD - електронний ключ в конверті) (QQ2-00004)</p>
                                        <h4>2899 $</h4>
                                    </div>                        
                                </div>
                            </div>
                        </Col>
                        <Col md={3} xs={12} sm={3} className={styles.cardcontrols}>
                            <Row className={styles.cardcontrols_itemcount}>
                                <div className={styles.cardcontrols_plusmin}>
                                    <button
                                        disabled={product.product.qty < 2 ? true : false}
                                        onClick={() => updateQty("minus")} >
                                        <span>-</span>
                                    </button><div className={styles.count}>{product.product.qty}</div>
                                    <button
                                        disabled={product.product.qty == product.product.quantity}
                                        onClick={() => updateQty("plus")}
                                    >
                                        <span>+</span>
                                    </button>
                                </div>
                                <div className={styles.bord}>
                                    {
                                        product.product.discount > 0 ? (

                                            <h5>{Math.round(product.product.price * product.product.qty).toLocaleString('uk-UA')} {product.product.price_unit}</h5>)
                                            : (<></>)
                                    }
                                    <h3>{Math.round(product.product.priceAfter * product.product.qty).toLocaleString('uk-UA')} {product.product.price_unit}</h3>

                                </div>
                            </Row>
                        </Col>
                        <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
                            <button className={styles.itembtn}> <HeartIcon fillColor={"#220F4B"} /></button>
                            <button className={styles.itembtn} onClick={() => removeProduct(product.product._uid)} style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}>
                                <DeleteIcon fillColor={notificationShow ? "#FAF8FF" : "#220F4B"} />
                            </button>
                            <DelNotification
                                show={notificationShow}
                                onHide={() => setNotificationShow(false)}
                            />
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}
