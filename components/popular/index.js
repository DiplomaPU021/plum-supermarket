import styles from "./styles.module.scss"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
//import { products } from '../../models/Product/index.js'
import ProductCard from "../productCard"

export default function Popular({products}) {
    console.log("products", products)
;
    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col><div className={styles.leftsale}>Popular from Category</div></Col>
                </Row>
            </Container>
            <Container className={styles.products_container}>
                <Row className={styles.products_row}>
                    {/* <Col className={styles.colcard}><ProductCard product={products[0]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[3]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col> */}
                </Row>
                <Row className={styles.products_row}>
                    {/* <Col className={styles.colcard}><ProductCard product={products[0]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[3]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[2]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col> */}
                </Row>
                <Row className={styles.products_row}>
                    {/* <Col className={styles.colcard}><ProductCard product={products[2]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[1]} /></Col>
                    <Col className={styles.colcard}><ProductCard product={products[3]} /></Col> */}
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