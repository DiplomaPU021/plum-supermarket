import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Card from 'react-bootstrap/Card'
import Button from "react-bootstrap/Button"
import HeartIcon from "../icons/HeartIcon"
import DeleteIcon from "../icons/DeleteIcon"

export default function CartItem() {
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
                            <span>-</span><div className={styles.count}>01</div><span>+</span>
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