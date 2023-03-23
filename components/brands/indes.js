import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Image} from "react-bootstrap";
import styles from "./styles.module.scss";

export default function Brands({ brands }) {
  return (
    <Container fluid className={styles.brands}>
      <Row className={styles.brands__row}>
        {brands.map((img, i) => (
          <Image
            key={i}
            className={styles.img}
            src={`../../images/brands/${img}.png`}
            alt=""
          />
        ))}
      </Row>
    </Container>
  );
}
