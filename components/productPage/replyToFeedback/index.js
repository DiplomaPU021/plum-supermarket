import { useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { Form, Modal } from "react-bootstrap";
import styles from "./styles.module.scss";

export default function ReplyToFeedback({ show, onHide, review }) {
  const { data: session } = useSession();
  const [replierName, setReplierName] = useState(
    session ? session.user?.name : "",
  );

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
            <Modal.Title>Відповісти на відгук</Modal.Title>
          </Modal.Header>
          <Form className={styles.form}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ paddingLeft: "23px" }}>Ім’я</Form.Label>
              <Form.Control
                className={styles.form_input}
                type="name"
                value={replierName}
                placeholder="Ваше прізвище та ім’я"
                onChange={(e) => setReplierName(e.target.value)}
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Електронна пошта
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                type="email"
                placeholder="your@email.com"
              />
              <Form.Text style={{ paddingLeft: "23px" }} className="text-muted">
                Ми ніколи нікому не передамо вашу електронну адресу.
              </Form.Text>
            </Form.Group> */}

            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label style={{ paddingLeft: "23px" }}>Коментар</Form.Label>
              <Form.Control
                className={styles.form_input}
                as="textarea"
                rows={6}
                placeholder="Ваш коментар"
              />
            </Form.Group>
            {/* TODO bottons */}
            <div className={styles.form__btns}>
              <button>
                <span>Скасувати</span>
              </button>
              <button type="submit">
                <span>Відповісти</span>
              </button>
            </div>

            <Form.Group controlId="formBasicCheckbox">
              <Form.Check type="checkbox" className={styles.form_checkbox}>
                <Form.Check.Input
                  className={styles.form_checkbox_box}
                  type="checkbox"
                />
                <Form.Check.Label className={styles.form_checkbox_label}>
                  Повідомляти про відповіді по електорнній пошті
                </Form.Check.Label>
              </Form.Check>
            </Form.Group>
          </Form>
          <div className={styles.info}>
            <p>
              Щоб ваш відгук або коментар пройшов модерацію і був опублікований,
              ознайомтеся, будь ласка,
              <Link style={{ color: "#573C90" }} href="/rules">
                нашими правилами
              </Link>
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
