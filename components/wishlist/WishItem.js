import styles from "./styles.module.scss"
import Card from 'react-bootstrap/Card'
import HeartIcon from "../icons/HeartIcon"
import DeleteIcon from "../icons/DeleteIcon"
import * as React from "react"
import DelNotification from "../delete"
import { Container, Row, Col, Form } from "react-bootstrap"

export default function WishItem(product) {

    const [notificationShow, setNotificationShow] = React.useState(false);
    const removeProduct = (id) => {
        setNotificationShow(true)
        //TODO implement
    };

    return (
        <Card className={styles.card}>
            <Card.Body className={styles.cardbody}>
                <div className={styles.discount}>15%</div>
                <Container className={styles.bord}>
                    <Row className={styles.bord}>
                        <Col md={3} xs={12} sm={3} className={styles.bordimage}>
                            <Row className={styles.picture}>
                                <img src="../../../images/macbook.jpg" width='157px' height='95px' alt="picture"></img>
                            </Row>
                        </Col>
                        <Col md={8} xs={12} sm={8} className={styles.cardtext}>
                            <h5>
                                Ноутбук Apple MacBook Air 13" M1 256GB 2020 (MGN93) Silver
                            </h5>
                            <div className={styles.cardtext_line}></div>
                        </Col>
                        <Col md={1} xs={12} sm={1} className={styles.cardbtns}>
                            <button className={styles.itembtn}> <HeartIcon fillColor={"#220F4B"} /></button>
                            <button className={styles.itembtn} onClick={() => removeProduct(1)} style={{ backgroundColor: notificationShow ? "#220F4B" : "#FAF8FF" }}>
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