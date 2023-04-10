import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { Accordion, Nav, Container, Row, Col } from 'react-bootstrap'
import Link from "next/link"
import { useRouter } from "next/router"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react";


export default function OrderItem(props) {
    const router = useRouter();
    const [showFulllOrder, setShowFulllOrder] = useState("none")

    return (
        <Container className={styles.container}>
            <Row className={styles.orderitem}>
                <Col xs={4} className={styles.col}>
                    <p>№ 764 807 299 від 16.05.23<br /><span>Виконано</span></p>
                </Col>
                <Col className={styles.col}>
                    <p>Сума замовлення<br /><span>52 428 ₴</span></p>
                </Col>
                <Col xs={2} className={styles.col}>
                    <div className={styles.picture}>
                        <img src="../../../images/macbook.jpg" width='74px' height='45px' style={{ objectFit: "contain" }} />
                    </div>
                </Col>
                <Col xs={2} className={styles.col}>
                    <div className={styles.picture}>
                        <img src="../../../images/macbook.jpg" width='74px' height='45px' style={{ objectFit: "contain" }} />
                    </div>
                </Col>
                <Col xs={1} className={styles.col}>
                    <button onClick={() => setShowFulllOrder(showFulllOrder === "none" ? "block" : "none")}>
                        {showFulllOrder === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img>
                            : <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                    </button>
                </Col>
            </Row>
        </Container>
    )
}