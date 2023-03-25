import styles from "./styles.module.scss"
import Card from 'react-bootstrap/Card'
import DeleteIcon from "../icons/DeleteIcon"
import { useState } from "react";
import DelNotification from "../delete"
import { Container, Row, Col, Form } from "react-bootstrap"
import { updateWishList } from "@/store/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../icons/CartIcon";
import { addToCart, updateCart } from "@/store/cartSlice";
import axios from "axios";

export default function WishItem(product) {
    const [notificationShow, setNotificationShow] = useState(false);
    const wishList = useSelector((state) => state.wishList);
    const [deleteConfirm, setDeleteConfirm] = useState(true);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const removeProduct = (_uid) => {
        if (deleteConfirm) {
            let newWishList = wishList.wishListItems.filter((item) => {
                return item._uid != _uid;
            });
            dispatch(updateWishList(newWishList));
        } else {
            setNotificationShow(true)
        }

    };
    const addToCartHandler= async (product)=>{
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&code=${product.code}`
          );
        let exist = null;
      if (cart.cartItems) {
        exist = cart.cartItems.find((item) => item._uid === product._uid);
      }
      if (exist) {
        setError('Товар уже в корзині');
        return;
      } else {
        dispatch(addToCart({ ...data, qty:1, size: data.size, _uid:product._uid }));
      }
    }

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
                        <Col md={8} xs={12} sm={8} className={styles.cardtext}>
                            <h5>
                                {(product.product.name + " " + (product.product.color ? product.product.color.color : ""
                                ) + " " + product.product.size).length > 55
                                    ? `${(product.product.name + " " + (product.product.color ? product.product.color.color : ""
                                    ) + " " + product.product.size).substring(0, 55)}...`
                                    : product.product.name + " " + (product.product.color ? product.product.color.color : "") + " " + product.product.size}
                            </h5>
                            <div className={styles.cardtext_line}></div>
                        </Col>
                        <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
                            <button className={styles.itembtn} onClick={() => addToCartHandler(product.product)}> <CartIcon fillColor={"#220F4B"}  /></button>
                            <button className={styles.itembtn} onClick={() => removeProduct(product.product._uid)} style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}>
                                <DeleteIcon fillColor={notificationShow ? "#FAF8FF" : "#220F4B"} />
                            </button>
                            {/* <DelNotification
                                productId={product.product._uid}
                                setDeleteConfirm={setDeleteConfirm}
                                show={notificationShow}
                                onHide={() => setNotificationShow(false)}
                            /> */}
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>

    )
}