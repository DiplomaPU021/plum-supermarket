import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductCard from "../productCard";

export default function Products({ products }) {
  return (
    <Row lg={4} md={3} className={styles.products_row}>
      {products.map((p, i) => (
        <Col key={i} className={styles.col}>
          <ProductCard product={p} style={p.style} mode={p.mode}/>
        </Col>
      ))}
      <Col className={styles.col}>
        <Card className={styles.morevideo}>
          <Card.Body className={styles.lastcardbody}>
            <h6 className={styles.textcard}>Більше товарів далі</h6>
            <Button className={styles.ytbtn}>Показати ще</Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
