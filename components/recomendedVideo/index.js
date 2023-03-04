import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlayIcon from "../icons/PlayIcon";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

export default function RecomendedVideo({ title, link }) {
    return (
        <Container fluid className={styles.cont}>
        {/* <div className={styles.container}> */}
        <Row className={styles.products_row}>
            <div className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/kYFnAnmwG5c?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </div>
            <div className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/L71D1XIXNk4?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </div>
            <div className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/8paaoWp2OeY?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px", paddingBottom: "0px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </div>
            <div className={styles.morevideo}>
                <Card.Body className={styles.lastcardbody}>
                    <h6 className={styles.textcard}>Нові відео на каналі PLUM</h6>
                    <Button className={styles.ytbtn}>YouTube PLUM</Button>
                </Card.Body>
            </div>
            </Row>
            </Container>
        // </div>
    )
}