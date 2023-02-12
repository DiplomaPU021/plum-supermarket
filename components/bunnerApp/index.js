import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function BunnerApp() {
  return (
    <Container fluid>
      <Row className={styles.banner}>
          <Col className={styles.banner__bTitle}>
            <span>Завантажуйте додаток і зручно керуйте замовленнями</span>
          </Col>
          <Col className={styles.banner__btnApp}>
            <button>
              <img src="../../icons/google-play.png" alt="" />
              <div className={styles.t}>
                <span className={styles.t__t1}>Завантажити</span>
                <span className={styles.t__t1}>
                  В <b>Google Play</b>
                </span>
              </div>
            </button>
            <button>
              <img src="../../icons/apple.png" alt="" />
              <div className={styles.t}>
                <span className={styles.t__t1}>Завантажити</span>
                <span className={styles.t__t1}>
                  В <b>AppStore</b>
                </span>
              </div>
            </button>
          </Col>
      </Row>
    </Container>
  );
}
