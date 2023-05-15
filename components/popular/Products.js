import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductCard from "../productCard";
import { useState } from "react";

export default function Products({ products }) {

  const [pageSize, setPageSize] = useState(8);

  return (
    <Row lg={4} md={3} className={styles.products_row}>
      {products.slice(0, pageSize).map((p, i) => (
        <Col key={i} className={styles.col}>
          <ProductCard product={p} style={p.style} mode={p.mode} />
        </Col>
      ))}
      {pageSize < products.length ? 
      <Col className={styles.col}>
        <Card className={styles.morevideo}>
          <Card.Body className={styles.lastcardbody}>
            <h6 className={styles.textcard}>Більше товарів далі</h6>
            <Button
              className={styles.ytbtn}
              onClick={() => {
                setPageSize(pageSize + 8)
              }}
            >
              Показати ще
            </Button>
          </Card.Body>
        </Card>
      </Col>
      : <></>}
    </Row>
  );
}
