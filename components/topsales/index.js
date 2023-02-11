import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

import ProductCard from "../productCard"

export default function TopSales({ products }) {
console.log("productsTopSales", products)
;

    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col><div className={styles.leftsale}>Top sales for this month</div></Col>
                    <Col className={styles.coltext} md="auto">Sale</Col>
                    <Col className={styles.coltext} md="auto">New</Col>
                    <Col className={styles.coltext} md="auto">Expected</Col>
                </Row>
            </Container>
            <Container className={styles.products_container}>
                <Row className={styles.products_row}>
                    <Col className={styles.colcard}><ProductCard product={products[0]}  /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[0]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                </Row>
                <Row className={styles.products_row}>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[0]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[0]} /></Col>
                    <Col>
                        <Card className={styles.morevideo}>
                            <Card.Body className={styles.lastcardbody}>
                                <h6 className={styles.textcard}>More items next</h6>
                                <Button className={styles.ytbtn}>Show more</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>

    )
}