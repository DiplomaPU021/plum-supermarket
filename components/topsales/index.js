import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"
import Container from 'react-bootstrap/Container'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

export default function TopSales() {
    return (
        <div className={styles.topsales}>
            <Container className={styles.container}>
                <Row className={styles.row}>
                    <Col className={styles.col}><div className={styles.leftsale}>Top sales for this month</div></Col>
                    <Col className={styles.coltext} md="auto">Sale</Col>
                    <Col className={styles.coltext} md="auto">New</Col>
                    <Col className={styles.coltext} md="auto">Expected</Col>
                </Row>
            </Container>
            <Container className={styles.products_container}>
                <Row className={styles.products_row}>
                    <Col ><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE1</Card></Col>
                    <Col ><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE2</Card></Col>
                    <Col><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE3</Card></Col>
                    <Col><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE4</Card></Col>
                </Row>
                <Row className={styles.products_row}>
                    <Col><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE5</Card></Col>
                    <Col><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE6</Card></Col>
                    <Col><Card style={{ width: '290px', height: '400px', border: '2px solid grey' }}>SALE7</Card></Col>
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