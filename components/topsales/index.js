import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import styles from "./styles.module.scss";
import Products from "../../components/popular/Products"
import ButtonsTab from "../../components/topsales/ButtonsTab"

export default function TopSales({ products }) {
  const [activeLink, setActiveLink] = useState("popular");

  const sortProducts = (link) => {
    switch (link) {
      case "discounts":
        return products.slice().sort((a, b) => b.discount - a.discount);
      case "newest":
        return products
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "popular":
        return products.slice().sort((a, b) => b.sold - a.sold);
      default:
        return products;
    }
  };

  let sortedProducts = sortProducts(activeLink);

  useEffect(() => {
    sortedProducts = sortProducts(activeLink);
  }, [activeLink, products]);

  return (
    <Container fluid className={styles.cont}>
      <ButtonsTab activeLink={activeLink} setActiveLink={setActiveLink} />
      <Products products={sortedProducts} />
    </Container>
  );
}
