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
          <Row className={styles.details}>
            <div className={styles.details_row}>
              <div>
                <span>Серія(модельний ряд)</span>
              </div>
              <div>
                <span>Apple MacBook Air</span>
              </div>
            </div>
          </Row>
          <Row className={styles.modal__body_card_rowTitle}>
            <span>Екран</span>
          </Row>
          <Row className={styles.details}>
            {product.details.slice(0, product.details.lenght).map((info, i) => (
              <div className={styles.details_row} key={i}>
                <div>
                  <span>{info.name}</span>
                </div>
                <div>
                  <span>{info.value}</span>
                </div>
              </div>
            ))}
          </Row>
          <Row className={styles.modal__body_card_rowTitle}>
            <span>Корпус</span>
          </Row>
          <Row className={styles.details}>
            <div className={styles.details_row}>
              <div>
                <span>Ємність акамулятора</span>
              </div>
              <div>
                <span>49.9Вт*год</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Колір</span>
              </div>
              <div>
                <span>Срібний</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Вага</span>
              </div>
              <div>
                <span>1.29 кг</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Характеристики батареї</span>
              </div>
              <div>
                <span>
                  До 15 годин роботи в інтернеті через бездротову мережуДо 18
                  годин під час відтворення фільмів з програми Apple
                  TVВбудований літій-полімерний акумулятор ємністю 49,9 Вт*год{" "}
                </span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Габарити (Ш х Г х В)</span>
              </div>
              <div>
                <span>304.1 x 212.4 x 16.1 мм</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Короткі характеристики</span>
              </div>
              <div>
                <span>
                  Екран 13.3" Retina (2560x1600) WQXGA, глянцевий/Apple M1/RAM 8
                  ГБ/SSD 256 ГБ/Apple M1 Graphics/Wi-Fi/Bluetooth/macOS Big
                  Sur/1.29 кг/сріблястий
                </span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Додатково</span>
              </div>
              <div>
                <span>З підсвіткою, порт Thunderbolt</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Вид</span>
              </div>
              <div>
                <span>Ноутбуки</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Додаткові можливості</span>
              </div>
              <div>
                <span>
                  HD-камера FaceTime 720pТехнологія True ToneSSD-накопичувач
                  PCIeTouch IDСтереодинамікиШироке стереоПідтримка відтворення
                  контенту у форматі Dolby AtmosСистема з трьох спрямованих
                  мікрофонівКлавіатура Magic Keyboard з підсвіткоюДатчик
                  зовнішньої освітленостіТрекпад Force Touch
                </span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Країна виробник</span>
              </div>
              <div>
                <span>Китай</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Комплект постачання</span>
              </div>
              <div>
                <span>
                  MacBook AirАдаптер USB-C потужністю 30 ВтКабель USB-C для
                  заряджання (2 м)
                </span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Країна реєстрації бренду</span>
              </div>
              <div>
                <span>США</span>
              </div>
            </div>
            <div className={styles.details_row}>
              <div>
                <span>Гарантія</span>
              </div>
              <div>
                <span>12 місяців офіційної гарантії від виробника</span>
              </div>
            </div>
          </Row>
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
