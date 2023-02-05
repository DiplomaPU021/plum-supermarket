import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PlayIcon from "../icons/PlayIcon";

export default function RecomendedVideo({ title, link }) {
    return (
        <div className={styles.container}>
            <Card className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/kYFnAnmwG5c?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </Card>
            <Card className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/L71D1XIXNk4?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </Card>
            <Card className={styles.cartst}>
                <iframe width="267" height="190"
                    src="https://www.youtube.com/embed/dPMTD7ifzcQ?autoplay=1&mute=1&controls=0">
                </iframe>
                <Card.Body style={{ display: 'flex', width: "267px", paddingBottom: "0px" }}>
                    <p>Some advertising about our products</p>
                    <button><PlayIcon fillColor="#FAF8FF" /></button>
                </Card.Body>
            </Card>
            <Card className={styles.morevideo}>
                <Card.Body className={styles.lastcardbody}>
                    <h6 className={styles.textcard}>New videos on PLUM channal</h6>
                    <Button className={styles.ytbtn}>YouTube PLUM</Button>
                </Card.Body>
            </Card>
        </div>
    )
}