import styles from "./styles.module.scss"
import { Container, Row, Col } from 'react-bootstrap'
import { useState } from "react";


export default function OrderItem(props) {
    const [showFulllOrder, setShowFulllOrder] = useState("none")
       return (
        <Container className={styles.container}>
            <Row className={styles.orderitem}>
                <Col xs={4} className={styles.col}>
                    <p>№{props.order._id.substring(0,6)} від {props.order.createdAt.substring(0,10)}<br /><span>{props.order?.status}</span></p>
                </Col>
                <Col className={styles.col}>
                    <p>Сума замовлення<br /><span>{props.order.costAfterDiscount.toLocaleString()} ₴</span></p>
                </Col>

                {props.order.products.slice(0, 2).map(product => (
                    <Col xs={2} className={styles.col} key={product._id}>
                        <div className={styles.picture}>
                            <img src={product.image} width='74px' height='45px' style={{ objectFit: "contain" }} />
                        </div>
                    </Col>
                ))}
                <Col xs={1} className={styles.col}>
                    <button onClick={() => setShowFulllOrder(showFulllOrder === "none" ? "block" : "none")}>
                        {showFulllOrder === "none" ? <img width="30px" height="30px" src="../../../icons/down-btn.png"></img>
                            : <img width="30px" height="30px" src="../../../icons/up-btn.png"></img>}
                    </button>
                </Col>
                
                
            </Row>
            <Row style={{ display: showFulllOrder }}>
            <Col  >
                    <div>hello</div>
                    </Col>
            </Row>
        </Container>
    )
}