import ChevronRight from "@/components/icons/ChevronRight";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Image, Row } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useState } from "react";
import AllDescription from "../allDescription";
import parse from 'html-react-parser';

export default function ProductDescription({ product }) {
  const [showDescription, setShowDescription] = useState(false)
  return (
    <Container fluid className={styles.description}>
      <div>{parse(product.description)}</div>
      <Row>
      <Col className={styles.description__more} id="anchor_one" >
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
