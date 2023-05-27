import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import Image from "next/image";


export default function Categories({ categories }) {
  return (
    <Container fluid className={styles.container}>
      <Row className={styles.row}>
        {categories.length
          ? categories.map((ca, i) => (
            <Col lg={3} key={i} className={styles.col}>
              <Link href={`/category/${ca.slug}`} className={styles.link}>
                <Image
                  width={34}
                  height={34}
                  src={`/images/categories/${ca.slug}.png`}
                  alt="category icon"
                />
                {ca.name}
              </Link>
            </Col>
          ))
          : null}
      </Row>
    </Container>
  );
}
