import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductCard from "../productCard";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Products({ products }) {

  const router = useRouter();
  const [pageSize, setPageSize] = useState(16);
  const showMoreProductsHandler = () => {
    const path = router.pathname;
    const { query } = router;
    query.pageSize = pageSize;
    router.push({
      pathname: path,
      query: query,
    });
  };

  return (
    <Row lg={4} md={3} className={styles.products_row}>
      {products.map((p, i) => (
        <Col key={i} className={styles.col}>
          <ProductCard product={p} style={p.style} mode={p.mode} />
        </Col>
      ))}
      <Col className={styles.col}>
        <Card className={styles.morevideo}>
          <Card.Body className={styles.lastcardbody}>
            <h6 className={styles.textcard}>Більше товарів далі</h6>
            <Button
              className={styles.ytbtn}
              onClick={() => {
                setPageSize(pageSize + 8), showMoreProductsHandler();
              }}
            >
              Показати ще
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
