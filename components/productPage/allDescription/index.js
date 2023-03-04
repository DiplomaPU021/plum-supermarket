import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Modal} from "react-bootstrap";
import { boolean } from "yup";
import styles from "./styles.module.scss";

export default function AllDescription({ product, show, onHide }) {
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
              <span>Опис</span>
            </Col>
          </Row>
          <Row className={styles.modal__body_card_rowDesc}>
            <Row>
              <span>type</span>
              <span>value</span>
            </Row>
            <Row>
              <span>З новою силою</span>
              <span>
                З появою чипа Apple M1 — найтонший і найлегший ноутбук —
                повністю змінився. Центральний процесор тепер працює до 3,5 раза
                швидше. Графічний — уп'ятеро. А завдяки передовій системі Neural
                Engine швидкість машинного навчання зросла вдев'ятеро. Новий
                MacBook Air працює без підзаряджання довше, ніж попередні
                моделі. І зовсім не шумить, тому що в нього немає вентилятора.
                Потужність ще ніколи не була такою компактною.
              </span>
            </Row>
            <Row>
              <span>Маленький чип. Грандіозний прорив</span>
              <span>
                Зустрічайте. Перший чип, розроблений спеціально для Mac. Дивна
                річ, але система на чипі Apple M1 вміщує 16 мільярдів
                транзисторів і об'єднує центральний і графічний процесори,
                систему Neural Engine, контролери уведення-виведення і безліч
                інших компонентів. Чип Apple M1 дає змогу використовувати на Mac
                унікальні технології і забезпечує неймовірну продуктивність у
                поєднанні з найкращою в галузі енергоефективністю. Це не просто
                ще один крок для Mac — це принципово новий рівень можливостей.
              </span>
            </Row>
            <Row>
              <span>Довше працює. Менше їсть</span>
              <span>
                За швидкістю обчислень чип M1 перевершує всі інші процесори
                Apple. Така продуктивність дає змогу виконувати на MacBook Air
                найбільш ресурсомісткі завдання, наприклад, редагувати фото та
                відео на професійному рівні або грати в ігри зі складною
                графікою. Але 8-ядерний процесор у чипі M1 не просто працює до
                3,5 раза швидше, як порівняти з попереднім поколінням
                процесорів, він раціонально розподіляє завдання між ядрами
                продуктивності та ядрами ефективності. Ядра ефективності легко
                справляються з повсякденними діями, витрачаючи водночас
                удесятеро менше енергії.
              </span>
            </Row>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
