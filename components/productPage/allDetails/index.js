import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Modal } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function AllDetails({ product, show, onHide }) {
  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      size="xl"
      centered
    >
      <Modal.Body className={styles.modal__body}>
        <Container fluid className={styles.modal__body_card}>
          <Row className={styles.modal__body_card_rowName}>
            <Col className={styles.col}>
              <span>{product.name}</span>
              <span>Характеристики</span>
            </Col>
          </Row>
          {product.details
            ? product.details.map((info, i) => (
                <div key={i}>
                  <Row className={styles.modal__body_card_rowTitle}>
                    <span>{info.group}</span>
                  </Row>
                  {info.fields.map((field, j) => (
                    <Row className={styles.details} key={j}>
                      <div className={styles.details_row}>
                        <div>
                          <span>{field.name}</span>
                        </div>
                        <div>
                          <span>{field.value}</span>
                        </div>
                      </div>
                    </Row>
                  ))}
                </div>
              ))
            : null}
          <Row className={styles.modal__body_card_notes}>
            <Row>
              <span>
                * Увага! Перед встановленням програмного забезпечення прохання
                перевірити сумісність із пристроєм, зазначену на упаковці,
                документації або на веб-сайті.
              </span>
            </Row>
            <Row>
              <span>
                * Характеристики та комплектація товару можуть змінюватися
                виробником без повідомлення.* Огляд підготовлений на базі однієї
                з моделей серії. Точні специфікації дивіться у вкладці
                <q>Характеристики</q>.
              </span>
            </Row>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
