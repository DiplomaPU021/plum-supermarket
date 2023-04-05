import styles from "./styles.module.scss"
import Card from 'react-bootstrap/Card'
import DeleteIcon from "../icons/DeleteIcon"
import { useEffect, useState } from "react";
import DelNotification from "../delete"
import { Container, Row, Col, Form } from "react-bootstrap"
import { updateWishList } from "@/store/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../icons/CartIcon";
import { addToCart, updateCart } from "@/store/cartSlice";
import axios from "axios";
import { deleteOneFromWishList } from "@/requests/user";
import { useSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function WishItem({ product, error, setError }) {
    const { data: session } = useSession();
    const [notificationShow, setNotificationShow] = useState(false);
    const wishList = useSelector((state) => state.wishList);
    const [deleteConfirm, setDeleteConfirm] = useState(true);
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [addTocartDisabled, setAddTocartDisabled] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);

    useEffect(() => {
        if (error?.inCartError == true) {
            setAddTocartDisabled(true);
        } else {
            setAddTocartDisabled(false);
        }
    }, [error])

    const removeProduct = (_uid, id, code) => {
        if (session) {
            setIsOpenDel(false);
            if (deleteConfirm) {
                let newWishList = wishList.wishListItems.filter((item) => {
                    return item._uid != _uid;
                });
                dispatch(updateWishList(newWishList));
                deleteOneFromWishList({ productId: id, code });
            } else {
                setNotificationShow(true);
            }
        } else {
            setIsOpenDel(true);
        }


    };
    const addToCartHandler = async (product) => {
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
        );
        let exist = null;
        if (cart.cartItems) {
            exist = cart.cartItems.find((item) => item._uid === product._uid);
        }
        if (exist) {
            setError((prevState) => ({ ...prevState, inCartError: true, uidPrInCart: product._uid }));
            console.error('Товар уже в корзині');
            setIsOpenCart(true);
            return;
        } else {
            setIsOpenCart(false);
            dispatch(addToCart({ ...data, qty: 1, size: data.size, _uid: product._uid }));
        }
    }

    return (
        <Card className={styles.card}>
            <Tooltip
                id="delete-tooltip"
                content="Будь ласка зареєструйтесь!"
                isOpen={isOpenDel}
                offset={30}
            />
            <Tooltip
                id="add-to-cart-tooltip"
                content="Уже в корзині!"
                isOpen={isOpenCart}              
                place="left"
            />
            <Card.Body className={styles.cardbody}>
                {
                    product.discount > 0 ? (
                        <div className={styles.discount}>{product.discount}%</div>
                    ) : (<></>)
                }
                <Container className={styles.bord}>
                    <Row className={styles.bord}>
                        <Col md={3} xs={12} sm={3} className={styles.bordimage}>
                            <Row className={styles.picture}>
                                <img src={product.images[0]} width='157px' height='95px' alt="picture" />
                            </Row>
                        </Col>
                        <Col md={8} xs={12} sm={8} className={styles.cardtext}>
                            <h5>
                                {(product.name + " " + (product.color ? product.color.color : ""
                                ) + " " + product.size).length > 55
                                    ? `${(product.name + " " + (product.color ? product.color.color : ""
                                    ) + " " + product.size).substring(0, 55)}...`
                                    : product.name + " " + (product.color ? product.color.color : "") + " " + product.size}
                            </h5>
                            <div className={styles.cardtext_line}></div>
                        </Col>
                        <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
                            <button
                                className={styles.itembtn}
                                onClick={() => addToCartHandler(product)}
                                disabled={error.inCartError && error.uidProduct === product._uid ? true : false}
                                data-tooltip-id="add-to-cart-tooltip"
                                onMouseLeave={() => setIsOpenCart(false)}>
                                <CartIcon fillColor={"#220F4B"} />
                            </button>
                            <button
                                className={styles.itembtn}
                                onClick={() => removeProduct(product._uid, product._id, product.code)}
                                style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}
                                data-tooltip-id="delete-tooltip"
                                onMouseLeave={() => setIsOpenDel(false)}>
                                <DeleteIcon fillColor={notificationShow ? "#FAF8FF" : "#220F4B"} />
                            </button>
                            {/* <DelNotification
                                productId={product._uid}
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