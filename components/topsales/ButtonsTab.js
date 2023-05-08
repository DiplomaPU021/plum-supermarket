import styles from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ButtonsTab() {
  const [activeLink, setActiveLink] = useState("");
  const router = useRouter();
  useEffect(() => {
    const sortProductsHandler = () => {
      const path = router.pathname;
      const { query } = router;
      query.topsales = activeLink;
      router.push({
        pathname: path,
        query: query,
      });
    };

    if (activeLink !== "") {
      sortProductsHandler();
    }
  }, [activeLink]);

  return (
    <Row className={styles.row}>
      <Col xs={8} md={8} sm={8} className={styles.col}>
        <span className={styles.leftsale}>Топ цього місяця</span>
      </Col>
      <Col className={styles.coltext} xs={1} md={1} sm={1}>
        <button
          onClick={() => {
            setActiveLink("discounts");
          }}
          className={styles.link}
          style={{ fontWeight: activeLink === "discounts" ? "600" : "500" }}
        >
          Акційні
        </button>
      </Col>
      <Col className={styles.coltext} xs={1} md={1} sm={1}>
        <button
          onClick={() => {
            setActiveLink("newest");
          }}
          className={styles.link}
          style={{ fontWeight: activeLink === "newest" ? "600" : "500" }}
        >
          Новинки
        </button>
      </Col>
      <Col className={styles.coltext} xs={1} md={1} sm={1}>
        <button
          onClick={() => {
            setActiveLink("popular");
          }}
          className={styles.link}
          style={{ fontWeight: activeLink === "popular" ? "600" : "500" }}
        >
          Популярні
        </button>
      </Col>
    </Row>
  );
}
