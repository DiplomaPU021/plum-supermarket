import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function FAQ() {
  return (
    <Container fluid className={styles.helpCenter}>
      <Row>
        <Col className={styles.helpCenter__titleCentr}>
          <img src="../../icons/help.png" alt="" />
          <div>
            <span>Виникли запитання?</span>
            <span>Скористайтесь довідковим центром</span>
          </div>
        </Col>
      </Row>
      <Row className={styles.helpCenter__helps}>
        <Col className={styles.helpCenter__helps_card}>
          <button>Оплата</button>
          <span>
            У цьому розділі є необхідна інформація про доступні способи оплати
            та про те як ними скористатись
          </span>
        </Col>
        <Col className={styles.helpCenter__helps_card}>
          <button>Доставка</button>
          <span>
            Інформацію про терміни та способи доставки, умови отримання і
            зберігання, можна знайти тут
          </span>
        </Col>
        <Col className={styles.helpCenter__helps_card}>
          <button>Замовлення</button>
          <span>
            Інформація про те, як перевірити статус замовлення, скасувати його,
            або змінити термін резерву
          </span>
        </Col>
        <Col className={styles.helpCenter__helps_card}>
          <button>Гарантія</button>
          <span>
            Потрібна допомога із вже придбаним товаром? Корисна інформація тут
          </span>
        </Col>
      </Row>
      <Row>
        <Col className={styles.helpCenter__more}>
          <span>Більше відвовідей шукайте тут</span>
          <button>Довідковий центр PLUM</button>
        </Col>
      </Row>
    </Container>
  );
}
