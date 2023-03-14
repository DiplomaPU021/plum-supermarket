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
// console.log("productsTopSales", products);

    return (
        <Container fluid className={styles.cont}>
            <Row className={styles.row}>
                <Col xs={10} md={8} className={styles.col}><span className={styles.leftsale}>Top sales for this month</span></Col>
                <Col className={styles.coltext2} xs={2} md={1}><Link href="/" className={styles.link}>Акційні</Link></Col>
                <Col className={styles.coltext} xs={2} md={1}><Link href="/" className={styles.link}>Новинки</Link></Col>
                <Col className={styles.coltext} xs={2} md={1}><Link href="/" className={styles.link}>Очікувані</Link></Col>
            </Row>
            <Row className={styles.products_row}>
                <ProductCard product={products[0]} />
                <ProductCard product={products[1]} />
                <ProductCard product={products[0]} />
                <ProductCard product={products[1]} />
                <ProductCard product={products[1]} />
                <ProductCard product={products[0]} />
                <ProductCard product={products[1]} />
                <div className={styles.colcard}>
                    <Card className={styles.morevideo}>
                        <Card.Body className={styles.lastcardbody}>
                            <h6 className={styles.textcard}>Більше товарів далі</h6>
                            <Button className={styles.ytbtn}>Показати ще</Button>
                        </Card.Body>
                    </Card>
                </div>
            </Row>
        </Container>


    )
}