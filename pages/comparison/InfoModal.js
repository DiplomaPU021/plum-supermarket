import styles from "../../styles/comparison.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";

export default function InfoModal({ show, onHide, title, info }) {
  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      size="md"
      centered
    >
      <div className={styles.modal__main}>
        <div className={styles.modal__main_card}>
          <Modal.Header closeButton className={styles.header}>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body className={styles.body}>
            <div scrollable >
            <p>{info}</p>
            </div>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}
