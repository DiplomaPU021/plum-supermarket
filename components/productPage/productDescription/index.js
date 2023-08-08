import ChevronRight from "../../../components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import AllDescription from "../allDescription";
import parse from "html-react-parser";

export default function ProductDescription({ product }) {
  const [showDescription, setShowDescription] = useState(false);
  const [additionalDescription, setAddetionalDescription] = useState("");
  return (
    <Container fluid className={styles.description}>
      <Row className={styles.description__title}>
        <span>Опис</span>
      </Row>
      <Row className={styles.description__row}>
        {parse(product.description)}
      </Row>
      {additionalDescription.length > 1 ? (
        <Row>
          <Col className={styles.description__more}>
            <button onClick={() => setShowDescription(true)}>
              Дивитися всі характеристики{" "}
              <ChevronRight fillColor="#70BF63" w="30px" h="30px" />
            </button>
            <AllDescription
              product={product}
              show={showDescription}
              onHide={() => setShowDescription(false)}
            />
          </Col>
        </Row>
      ) : (
        <React.Fragment />
      )}
    </Container>
  );
}
