import { Col, Container, Image, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";

export default function CustomerInteraction() {

  return (
    <Container fluid className={styles.info}>
      <Row className={styles.info__row}>
        <Col className={styles.info__row_col}>
          <Col className={styles.list}>
            <span className={styles.title}>Доставка</span>
            <ul>
              <li>Самовивіз з відділення пошти</li>
              <li>Доставка кур'єром</li>
            </ul>
          </Col>
        </Col>
        <Col className={styles.info__row_col}>
          <Container fluid className={styles.creditvariant}>
            <Row className={styles.creditvariant__credit}>
              <span className={styles.title}>В кредит</span>
              <button>В кредит</button>
            </Row>
            <Row>
              <Col className={styles.creditvariant__banks}>
                <Image
                  className={styles.img}
                  src="/icons/privatbank.png"
                  alt="PrivatBank"
                />
                <span>Privatbank</span>
              </Col>
              <Col className={styles.creditvariant__banks}>
                <Image
                  className={styles.img}
                  src="/icons/monobank.png"
                  alt="Monobank"
                />
                <span>Monobank</span>
              </Col>
              <Col className={styles.creditvariant__banks}>
                <Image
                  className={styles.img}
                  src="/icons/otpbank.png"
                  alt="Otpbank"
                />
                <span>Otpbank</span>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className={styles.info__row}>
        <Col className={styles.info__row_col}>
          <Col className={styles.list}>
            <span className={styles.title}>Гарантія</span>
            <ul>
              <li>12 місяців офіційної гарантії від виробника</li>
              <li>Обмін/повернення товару впродовж 14 днів</li>
            </ul>
          </Col>
        </Col>
        <Col className={styles.info__row_col}>
          <Col className={styles.list}>
            <span className={styles.title}>Оплата</span>
            <ul>
              <li>
                Оплата. Оплата під час отримання товару, Google Pay, Картою
                онлайн, Безготівковими для юридичних осіб, Оплатити онлайн
                соціальною картою <q>Пакунок малюка</q>, 
                Безготівковий для фізичних осіб, Apple Pay, 
                Оплатити онлайн картою <q>єПідтримка</q>, Visa, Mastercard
              </li>
            </ul>
          </Col>
        </Col>
      </Row>
    </Container>
  );
}
