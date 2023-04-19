import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Link from "next/link"

export default function ButtonsTab() {
    return (
        <Row className={styles.row}>
            <Col xs={8} md={8} sm={8} className={styles.col}><span className={styles.leftsale}>Топ цього місяця</span></Col>
            <Col className={styles.coltext} xs={1} md={1} sm={1}><Link href="/" className={styles.link}>Акційні</Link></Col>
            <Col className={styles.coltext} xs={1} md={1} sm={1}><Link href="/" className={styles.link}>Новинки</Link></Col>
            <Col className={styles.coltext} xs={1} md={1} sm={1}><Link href="/" className={styles.link}>Очікувані</Link></Col>
        </Row>
    )
}