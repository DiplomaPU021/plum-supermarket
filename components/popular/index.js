import styles from "./styles.module.scss";
import Container from "react-bootstrap/Container";
import TabPannel from "../../components/popular/TabPannel"
import Products from "../../components/popular/Products"

export default function Popular({title, products, category }) {
  return (
    <Container fluid className={styles.cont}>
      <TabPannel category={category} tabText={title} />
      <Products products={products} />
    </Container>
  );
}
