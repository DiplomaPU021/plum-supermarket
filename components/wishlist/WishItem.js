import styles from "./styles.module.scss"
import Card from 'react-bootstrap/Card'
import DeleteIcon from "../icons/DeleteIcon"
import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap"
import { updateWishList } from "@/store/wishListSlice";
import { useDispatch, useSelector } from "react-redux";
import CartIcon from "../icons/CartIcon";
import { addToCart } from "@/store/cartSlice";
import axios from "axios";
import { deleteOneFromWishList } from "@/requests/user";
import { useSession } from "next-auth/react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Link from "next/link";

export default function WishItem({ product, error, setError }) {
    const { data: session } = useSession();
    const [notificationShow, setNotificationShow] = useState(false);
    const wishList = useSelector((state) => state.wishList);
    const [deleteConfirm, setDeleteConfirm] = useState(true);
    const cart = useSelector((state) => state.cart);
    const [cartError, setCartError] = useState(false);
    const dispatch = useDispatch();
    const [addTocartDisabled, setAddTocartDisabled] = useState(false);
    const [isOpenDel, setIsOpenDel] = useState(false);
    const [isOpenCart, setIsOpenCart] = useState(false);
    const [cartChosen, setCartChosen] = useState(false);

    useEffect(() => {
        if (error?.inCartError == true) {
            setAddTocartDisabled(true);
        } else {
            setAddTocartDisabled(false);
        }
    }, [error]);

    useEffect(() => {
        if(product){
         let _uid = `${product._id}_${product.style}_${product.mode}`;
        let exist = null;
        if (cart.cartItems) {
            exist = cart.cartItems.find((item) => item._uid == _uid);
        }
        if (exist) {
            setCartChosen(true);
        } else {
            setCartChosen(false);
        }    
        }
       
    }, [cart.cartTotal, product.style, product.mode]);

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
        setCartError("");
        setIsOpenCart(false);
        const { data } = await axios.get(
            `/api/product/${product._id}?style=${product.style}&code=${product.mode}`
        );
        if (data.quantity < 1) {
            setCartError("Цей товар закінчився");
            setIsOpenCart(true);
            return;
        } else {
            let exist = null;
            if (cart.cartItems) {
                exist = cart.cartItems.find((item) => item._uid === product._uid);
                setCartChosen(true);
            }
            if (exist) {
                setError((prevState) => ({ ...prevState, inCartError: true, uidPrInCart: product._uid }));
                setCartError("Товар уже в корзині");
                setIsOpenCart(true);
                return;
            } else {
                setIsOpenCart(false);
                dispatch(addToCart({ ...data, qty: 1, size: data.size, _uid: product._uid }));
                setCartChosen(true);
                setCartError("");
            }
        }

    }

    return (
        <Card className={styles.card}>
            <Tooltip
                id="delete-tooltip"
                content="Будь ласка зареєструйтесь!"
                isOpen={isOpenDel}
                offset={30}
                className={styles.tooltip_rounded}
            />
            <Tooltip
                id="add-to-cart-tooltip"
                content={cartError}
                isOpen={isOpenCart}
                place="left"
                className={styles.tooltip_rounded}
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
                            <Link href={`/product/${product.slug}?style=${product.style}&code=${product.mode}`} className={styles.h5text}>
                                {(product.name + " " + (product.color ? product.color.color : ""
                                ) + " " + product.size).length > 55
                                    ? `${(product.name + " " + (product.color ? product.color.color : ""
                                    ) + " " + product.size).substring(0, 55)}...`
                                    : product.name + " " + (product.color ? product.color.color : "") + " " + product.size}
                            </Link>
                            <div className={styles.line}></div>
                        </Col>
                        <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
                            <button
                                className={styles.itembtn}
                                onClick={() => addToCartHandler(product)}
                                data-tooltip-id="add-to-cart-tooltip"
                                style={{
                                    backgroundColor: cartChosen ? "#220F4B" : "#FAF8FF",
                                    cursor: `${product.quantity < 1 ? "not-allowed" :  cartChosen ? "auto":"pointer"}`,
                                }}
                                onMouseLeave={() => setIsOpenCart(false)}>
                                <CartIcon fillColor={cartChosen ? "#FAF8FF" : "#220F4B"} />
                            </button>
                            <button
                                className={styles.itembtn}
                                onClick={() => removeProduct(product._uid, product._id, product.code)}
                                style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}
                                data-tooltip-id="delete-tooltip"
                                onMouseLeave={() => setIsOpenDel(false)}>
                                <DeleteIcon fillColor={notificationShow ? "#FAF8FF" : "#220F4B"} />
                            </button>
                        </Col>
                    </Row>
                </Container>
            </Card.Body>
        </Card>

    )
}