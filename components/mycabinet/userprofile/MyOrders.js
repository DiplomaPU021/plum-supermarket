import styles from "./styles.module.scss"
import { Container, Row, Col } from 'react-bootstrap'
import Link from "next/link"
import { useRouter } from "next/router"
import LoopIcon from "@/components/icons/LoopIcon";
import { useState } from "react";
import OrderItem from "../orderitem/OrderItem";


export default function MyOrders(props) {
    const [showDirection, setShowDirection] = useState("desc")

    const setSortDirection = () => {
        showDirection == "desc" ? setShowDirection("asc") : setShowDirection("desc")       
    }

    return (
        <Container>
            <Row className={styles.orderpagehead}>
                <Col xs className={styles.col}><Link href="/" className={styles.link}>Виконані</Link></Col>
                <Col xs={2} sm={4} md={2} className={styles.col}><Link href="/" className={styles.link}>Очікувані</Link></Col>
                <Col xs={2} sm={4} md={2} className={styles.col}><Link href="/" className={styles.link}>Скасовані</Link></Col>
            </Row>
            <Row className={styles.searchrow}>

                <div className={styles.search}>
                    <div className={styles.search_field}>
                        <input type="text" placeholder="Пошук замовлення" />
                        <button>
                            <LoopIcon fillColor="#FAF8FF" />
                        </button>
                    </div>
                </div>
                <button className={styles.cardextrabtn} onClick={() => setSortDirection()}>Сортування за суммою {showDirection === "desc" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img> :
                    <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                </button>

            </Row>
            <Row className={styles.orders}>
                {props.orders?.map((order) =>(
                    <OrderItem order={order} key={order._id}/>
                ))}                  
            </Row>
        </Container>
    )
}