import styles from "./styles.module.scss";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Email(props) {
  const router = useRouter();

  return (
    <Container>
      <Row>
        <Col className={styles.group}>
          <Image src="../../../images/qws.png" width="202px" height="177px" />
          <h5>Упс, здається, у Вас ще немає листувань</h5>
          <div className={styles.line}></div>
          <p>Але це ніколи не пізно виправити!</p>
        </Col>
      </Row>
    </Container>
  );
}
