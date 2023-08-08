import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Image } from "react-bootstrap";
import styles from "./styles.module.scss";
export default function Advice({ advice }) {
  return (
    <Container fluid className={styles.advice}>
      <Row className={styles.advice__title}>
        <span>{advice.title}</span>
      </Row>
      <Row className={styles.advice__row}>
        <Col>
          <p>{advice.text}</p>
        </Col>
        <Col>
          <Image
            alt=""
            src={`../../images/group_subCategories/${advice.photo}`}
          />
        </Col>
      </Row>
    </Container>
  );
}
