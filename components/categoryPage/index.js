import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CategoryCard from "../categoryCard";

import Link from "next/link";
export default function CategoryPage({ category }) {
  return (
    <Container fluid className={styles.categorypage}>
      <Row className={styles.categorypage__title}>
        <span>{category.name}</span>
      </Row>
      <Row lg={4} md={3} className={styles.categorypage__row}>
        {category.groups
          ? category.groups.map((group, i) =>
            group.group_subcategory.length ? (
              <Col className={styles.col} key={i}>
                <Link
                  style={{ textDecoration: "none" }}
                  href={`/subCategory/${group.slug}?sub=${group.group_subcategory[0].slug}`}
                >
                  <CategoryCard group={group} />
                </Link>
              </Col>
            ) : null
          )
          : null}
      </Row>
    </Container>
  );
}
