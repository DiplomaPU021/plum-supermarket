import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import DeleteIcon from "../icons/DeleteIcon";
import Link from "next/link";

export default function ComparisonListModal({ show, onHide }) {
  return (
    <Modal
      className={styles.modal}
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <div className={styles.modal__main}>
        <div className={styles.modal__main_card}>
          <Modal.Header closeButton className={styles.header}>
            <Modal.Title>Список порівнянь</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: "0" }}>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/comparison`}
                    >
                      <span>Ноутбуки</span>
                    </Link>
                  </td>
                  <td>5</td>
                  <td>
                    <button>
                      <DeleteIcon fillColor="#220F4B" />
                    </button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Link
                      style={{ textDecoration: "none" }}
                      href={`/comparisonPage`}
                    >
                      <span>Ноутбуки</span>
                    </Link>
                  </td>
                  <td>5</td>
                  <td>
                    <button>
                      <DeleteIcon fillColor="#220F4B" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </Modal.Body>
        </div>
      </div>
    </Modal>
  );
}
