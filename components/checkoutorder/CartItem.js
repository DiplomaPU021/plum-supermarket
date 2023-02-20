import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import HeartIcon from "../icons/HeartIcon"
import DeleteIcon from "../icons/DeleteIcon"

export default function CartItem({ product }) {
    //console.log("productInChecoutCartItem", product);
    return (
        <>
            <Card className={styles.card}>          
                <Card.Body className={styles.cardbody}>                  
                    {
                        product.discount > 0
                            ? (<div className={styles.discount}>
                                -{product.discount}%
                            </div>)
                            : ("")
                    }
                    <div className={styles.picture}><img src={product.image} width='157px' height='95px'></img></div>
                    <div className={styles.cardtext}>
                        <h5>                {(product.name + " " + (product.color ? product.color : ""
                        ) + " " + product.size).length > 55
                            ? `${product.name.substring(0, 55)}...`
                            : product.name + " " + (product.color ? product.color : "") + " " + product.size}</h5>
                    </div>
                    <div className={styles.cardcontrols}>
                        <div className={styles.cardcontrols_itemcount}>
                            <div className={styles.cardcontrols_plusmin}>
                                {/* <span>-</span> */}
                                <div className={styles.count}>{product.qty}</div>
                                {/* <span>+</span> */}
                            </div>
                            {product.priceBefore!=product.priceAfter?
                            ( <h5>{product.priceBefore} грн</h5>): ""}                          
                            <h3>{product.priceAfter} грн</h3>
                        </div>
                        {/* <div className={styles.cardbtns}>
                            <button className={styles.itembtn}> <DeleteIcon fillColor={"#220F4B"} /></button>
                        </div> */}
                    </div>
                </Card.Body>
            </Card>
            <div className={styles.cardtext_line}></div>
        </> 
    )
}