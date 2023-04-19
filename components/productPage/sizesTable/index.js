import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Modal, Image } from "react-bootstrap";
import { useState } from "react";

export default function SizesTable({ show, onHide }) {
  const [sizes, setSizes] = useState(true);
  const [measurements, setMeasurements] = useState(false);
  const sizeColor = sizes ? "#70BF63" : "#573C91";
  const measurColor = measurements ? "#70BF63" : "#573C91";

  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <div className={styles.modal__main}>
        <div className={styles.modal__main_card}>
          <Modal.Header closeButton className={styles.header}>
            <Modal.Title>Таблиця розмірів</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "0" }}>
            <Container fluid>
              <Row className="justify-content-md-center">
                <Col md="4">
                  <button
                    onClick={() => {
                      setSizes(true), setMeasurements(false);
                    }}
                  >
                    <span style={{ color: sizeColor }}>Розмірна сітка</span>
                  </button>
                </Col>
                <Col md="4">
                  <button
                    onClick={() => {
                      setSizes(false), setMeasurements(true);
                    }}
                  >
                    <span style={{ color: measurColor }}>Як знімати мірки</span>
                  </button>
                </Col>
              </Row>
              {sizes ? (
                <Row className={styles.details}>
                  <Col className={styles.details_col}>
                    <div>
                      <span>Розмір виробника</span>
                    </div>
                    <div>
                      <span>35</span>
                    </div>
                    <div>
                      <span>35.5</span>
                    </div>
                    <div>
                      <span>36</span>
                    </div>
                    <div>
                      <span>37</span>
                    </div>
                    <div>
                      <span>37.5</span>
                    </div>
                    <div>
                      <span>38</span>
                    </div>
                    <div>
                      <span>38.5</span>
                    </div>
                    <div>
                      <span>39</span>
                    </div>
                    <div>
                      <span>40</span>
                    </div>
                    <div>
                      <span>41</span>
                    </div>
                  </Col>
                  <div className={styles.line}></div>
                  <Col className={styles.details_col}>
                    <div>
                      <span>Розмір устілки, см</span>
                    </div>
                    <div>
                      <span>22.5</span>
                    </div>
                    <div>
                      <span>23.1</span>
                    </div>
                    <div>
                      <span>23.5</span>
                    </div>
                    <div>
                      <span>23.8</span>
                    </div>
                    <div>
                      <span>24.1</span>
                    </div>
                    <div>
                      <span>24.5</span>
                    </div>
                    <div>
                      <span>24.8</span>
                    </div>
                    <div>
                      <span>25.1</span>
                    </div>
                    <div>
                      <span>25.4</span>
                    </div>
                    <div>
                      <span>25.7</span>
                    </div>
                  </Col>
                </Row>
              ) : (
                <Row className={`justify-content-md-center ${styles.row}`}>
                  <Col md={5}>
                    <Image src="../../../images/rightMeasurment.png" alt="" />
                  </Col>
                  <Col md={5}>
                    <Image src="../../../images/wrongMeasurment.png" alt="" />
                  </Col>
                  <Col md={12} className={styles.instruction}>
                    <span>
                      1. Витягніть устілку із взуття та виміряйте її довжину.{" "}
                    </span>
                    <span>
                      2. Якщо устілка не виймається, одягніть шкарпетку бажаної
                      товщини, станьте на аркуш паперу та обведіть стопу.{" "}
                    </span>
                    <span>
                      3. Візьміть лінійку і виміряйте відстань від однієї
                      крайньої точки доіншої.{" "}
                    </span>
                    <span>
                      4. Знайдіть свій розмір у таблиці відповідного бренду Під
                      час вибору розміру необхідно звернути увагу на повноту
                      ноги.
                    </span>
                    <span>
                      5. Якщо повноту в моделі не вказано, отже взуття середньої
                      (нормальної) повноти
                    </span>
                  </Col>
                  <Col md={12} className={styles.notes}>
                    <span>
                      Примітка : Вимірювання найкраще проводити наприкінці дня,
                      коли розмір ноги максимальний (наприкінці дня до ніг
                      приливає кров, і розмір стопи збільшується)
                    </span>
                  </Col>
                </Row>
              )}
            </Container>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}
