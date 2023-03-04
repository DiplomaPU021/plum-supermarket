import ChevronRight from "@/components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useState } from "react";
import AllDescription from "../allDescription";

export default function ProductDescription({ product }) {
  const [showDescription, setShowDescription] = useState(false)
  return (
    <Container fluid className={styles.description}>
      <Row className={styles.description__row}>
        <Col className={styles.description__row_col}>
          <span>MacBook Air. З новою силою.</span>
            <Image fluid
              className={styles.description__row_col_image}
              src={product.images[0].url}
              alt=""
            />
          <span>
            MacBook Air — найтонший і найлегший ноутбук від Apple. А тепер завдяки чипу Apple M1 він іще й надпотужний.
          </span>
        </Col>
      </Row>
      <Row className={styles.description__row}>
        <Col className={styles.description__row_col}>
          <span>Легко виконуйте будь-які завдання завдяки надшвидкісному 8-ядерному центральному процесору.</span>
            <Image
              className={styles.description__row_col_image}
              src={product.images[1].url}
              alt=""
            />
           <ul>
             <li>Графічний процесор із щонайбільше 7 ядрами забезпечує відмінне зображення в додатках та іграх зі складною графікою.</li>
             <li>16-ядерна система Neural Engine прискорює виконання всіх операцій, у яких використовується машинне навчання.</li>
             <li>Конструкція без вентилятора гарантує безшумну роботу.</li>
             <li>Новий MacBook Air побив власний рекорд роботи від акумулятора — тепер він працює без підзарядки 18 годин.</li>
            </ul>
        </Col>
      </Row>
      <Row className={styles.description__row}>
        <Col className={styles.description__row_col}>
          <span>Комплект поставки</span>
          <span>Адаптер живлення USB-C потужністю 30 Вт. Кабель USB-C для зарядки (2 м).</span>
            <Image
              className={styles.description__row_col_image}
              src={product.images[1].url}
              alt=""
            />
        </Col>
      </Row>
      <Row>
      <Col className={styles.description__more}>
          <button onClick={()=>setShowDescription(true)}>
            Дивитися всі характеристики{" "}
            <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
          </button>
          <AllDescription
          product={product}
          show={showDescription}
          onHide={() => setShowDescription(false)}/>
        </Col>
      </Row>
    </Container>
  );
}
