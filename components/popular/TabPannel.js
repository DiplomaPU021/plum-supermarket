import styles from "./styles.module.scss";
import Row from "react-bootstrap/Row";

export default function TabPannel({ tabText, category }) {
    return (
        <Row className={styles.row}>
            <div className={styles.leftsale}>{tabText}<span>{category}</span></div>
        </Row>
    )
}