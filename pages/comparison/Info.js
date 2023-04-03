import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import Overlay from "react-bootstrap/Overlay";
import CloseButton from "react-bootstrap/CloseButton";

export default function Info({ target, show, setShow, title, info }) {
  return (
    <Overlay
      target={target.current}
      show={show}
      placement="right"
      className={styles.modal}
    >
      <Card
        style={{
          zIndex: 2,
        }}
        className={styles.modal__main}
      >
        <Card.Body className={styles.modal__main_card}>
          <Card.Title closeButton className={styles.header}>
            {title}
            <CloseButton
              style={{ boxShadow: "none" }}
              onClick={() => {
                setShow(false);
              }}
            />
          </Card.Title>
          <Card.Text className={styles.body}>
            <div scrollable={true}>
              <p>{info}</p>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Overlay>
  );
}
