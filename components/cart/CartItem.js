import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import HeartIcon from "../icons/HeartIcon"
import DeleteIcon from "../icons/DeleteIcon"
import { useSelector, useDispatch } from "react-redux";
import { updateCart } from "../../store/cartSlice"


export default function CartItem(product) {
    const { cart } = useSelector((state) => ({ ...state }));
    console.log("cartItem",cart);
    console.log("cartItemProduct",product);
    const dispatch = useDispatch();
    const updateQty = (type) => {
        let newCart = cart.cartItems.map((item) => {
            if (item._uid == product._uid) {
                return {
                    ...item,
                    qty: type == "plus" ? item.qty + 1 : item.qty - 1,
                };
            }
            return item;
        });
        dispatch(updateCart(newCart));
    };
    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardbody}>
                <div className={styles.discount}>15%</div>
                <div className={styles.picture}><img src="https://i.pcmag.com/imagery/reviews/065rv6nxdAEcCzvE3Qb8T3v-1.fit_lim.size_840x473.v1658424542.jpg" width='157px' height='95px'></img></div>
                <div className={styles.cardtext}>
                <h5>Laptop Apple MacBook Air 13" M1 256GB 2020 (MGN93) Silver</h5>
                <div className={styles.cardtext_line}></div>
                <div className={styles.cardtext_extraservice}>
                   <button className={styles.cardextrabtn}>Extra service<img width="30px" height="30px" src="../../../icons/down-btn.png"></img></button>
                </div>
                </div>
                <div className={styles.cardcontrols}>
                    <div className={styles.cardcontrols_itemcount}>
                        <div className={styles.cardcontrols_plusmin}>
                            <button 
                            disabled={product.qty <2} 
                            onClick={() => updateQty("minus")}                            >
                            <span>-</span>
                            </button><div className={styles.count}>01</div>
                            <button 
                            disabled={product.qty == product.quantity} 
                            onClick={() => updateQty("plus")}
                            >
                               <span>+</span> 
                            </button>
                            
                        </div>
                        <h5>92 466$</h5>
                        <h3>81 998$</h3>
                    </div>
                    <div className={styles.cardbtns}>
                    <button className={styles.itembtn}> <HeartIcon fillColor={"#220F4B"} /></button>
                    <button className={styles.itembtn}> <DeleteIcon fillColor={"#220F4B"} /></button>
                    </div>
                </div>
                
            </Card.Body>
        </Card>

    )
}