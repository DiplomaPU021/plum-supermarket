import styles from "./styles.module.scss"
import { Container, Row, Col, Pagination } from 'react-bootstrap'
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

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 4;

    function displayComponentsForActivePage() {
        const startIndex = (activePage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        return props.orders.slice(startIndex, endIndex);
    }

    function handlePageChange(pageNumber) {
        setActivePage(pageNumber);
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
                {displayComponentsForActivePage().map((order) => (
                    <OrderItem order={order} key={order._id} />
                ))}
                <div>
                    <Pagination className={styles.fixed_bottom}>
                        <Pagination.Prev className={styles.pagin_item} />       {/*   //TODO  onClick Implement*/}
                        {Array.from({
                            length: Math.ceil(props.orders.length / itemsPerPage),
                        }).map((_, index) => (
                            <Pagination.Item
                                key={index}
                                active={index + 1 === activePage}
                                onClick={() => handlePageChange(index + 1)}
                                className={styles.pagin_item}
                            >
                                <span>{index + 1}</span>
                            </Pagination.Item>
                        ))}
                        <Pagination.Next className={styles.pagin_item} />  {/*   //TODO  onClick Implement*/}
                    </Pagination>
                </div>
            </Row>
        </Container >
    )
}