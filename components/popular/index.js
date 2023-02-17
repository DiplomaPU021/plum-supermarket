import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ProductCard from "../productCard";

export default function Popular({ products }) {
  return (
    <Container fluid className={styles.cont}>
      <Row className={styles.row}>
        <div className={styles.leftsale}>Популярне з категорії</div>
      </Row>
      <Row className={styles.products_row}>
        <ProductCard product={products[0]} />

        <ProductCard product={products[1]} />

        <ProductCard product={products[0]} />

        <ProductCard product={products[1]} />

        <ProductCard product={products[0]} />

        <ProductCard product={products[1]} />

        <ProductCard product={products[0]} />

        <ProductCard product={products[1]} />

        <ProductCard product={products[0]} />

        <ProductCard product={products[1]} />

        <ProductCard product={products[0]} />

        <div className={styles.colcard}>
          <Card className={styles.morevideo}>
            <Card.Body className={styles.lastcardbody}>
              <h6 className={styles.textcard}>Більше товарів далі</h6>
              <Button className={styles.ytbtn}>Показати ще</Button>
            </Card.Body>
          </Card>
        </div>
      </Row>
    </Container>
  );
}
