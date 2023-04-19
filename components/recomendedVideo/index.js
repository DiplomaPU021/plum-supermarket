import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlayIcon from "../icons/PlayIcon";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

export default function RecomendedVideo({ title, link }) {
    const [play1, setPlay1] = useState("0");
    const [play2, setPlay2] = useState("1");
    const [play3, setPlay3] = useState("1");


    return (
        <Container fluid className={styles.cont}>
            {/* <div className={styles.container}> */}
            <Row className={styles.products_row}>
                <Col className={styles.col}>
                    <Card className={styles.product}>
                        <div className={styles.cartst}>
                            <iframe
                                src={`https://www.youtube.com/embed/kYFnAnmwG5c?autoplay=${play1}&mute=1&controls=0&showinfo=0&loop=1`}>
                            </iframe>
                            <Card.Body className={styles.bodycard}>
                                <p>Які нові девайси показав Google?</p>
                                <button onClick={()=>setPlay1(play1 == "0" ? "1" : "0")}><PlayIcon fillColor="#FAF8FF" /></button>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
                <Col className={styles.col}>
                    <Card className={styles.product}>
                        <div className={styles.cartst}>
                            <iframe
                                src={`https://www.youtube.com/embed/L71D1XIXNk4?autoplay=${play2}&mute=1&controls=0&showinfo=0&loop=1`}>
                            </iframe>
                            <Card.Body className={styles.bodycard}>
                                <p>Ультрабук нового покоління</p>
                                <button onClick={()=>setPlay2(play2 == "0" ? "1" : "0")}><PlayIcon fillColor="#FAF8FF" /></button>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
                <Col className={styles.col}>
                    <Card className={styles.product}>
                        <div className={styles.cartst}>
                            <iframe
                                src={`https://www.youtube.com/embed/8paaoWp2OeY?autoplay=${play3}&mute=1&controls=0&showinfo=0&loop=1`}>
                            </iframe>
                            <Card.Body className={styles.bodycard}>
                                <p>Huawei MateBook 14s – ноутбук, який зміг</p>
                                <button onClick={()=>setPlay3(play3 == "0" ? "1" : "0")}><PlayIcon fillColor="#FAF8FF" /></button>
                            </Card.Body>
                        </div>
                    </Card>
                </Col>
                <Col className={styles.col}>
                    {/* <div className={styles.colcard}> */}
                    <Card className={styles.morevideo}>
                        <Card.Body className={styles.lastcardbody}>
                            <h6 className={styles.textcard}>Нові відео на каналі PLUM</h6>
                            <Button className={styles.ytbtn}>YouTube PLUM</Button>
                        </Card.Body>
                    </Card>
                    {/* </div> */}
                </Col>
            </Row>
        </Container>
        // </div>



    )
}