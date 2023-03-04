import { Form, Modal, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import ReactStars from "react-rating-stars-component";
import React from "react";
import Star from "@/components/icons/Star";


export default function LeaveFeedback({ show, onHide }) {

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
            <Modal.Title>Написати відгук</Modal.Title>
          </Modal.Header>
          <Form className={styles.form}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Прізвище та ім’я
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                type="name"
                placeholder="Ваше прізвище та ім’я"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
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
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicStars">
       
                <ReactStars
                classNames={styles.form__stars}
                  count={5}
                  size={44}
                  edit={true}
                  style={{ border: "2px solid green" }}
                  isHalf={true}
                  value={1.5}
                  emptyIcon={<Star fillColor={"transparent"} />}
                  halfIcon={<Star fillColor={"transparent"} />}
                  fullIcon={<Star fillColor={"transparent"} />}
                  activeColor="#70BF63"
                />
            </Form.Group>

            <Form.Group className={styles.form__experience}>
              <Form.Label>Досвід використання:</Form.Label>
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 1"
                label=" Менше місяця"
                name="formHorizontalRadios"
                id="formHorizontalRadios1"
              />
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 2"
                label=" Кілька місяців"
                name="formHorizontalRadios"
                id="formHorizontalRadios2"
              />
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 3"
                label="Більше року"
                name="formHorizontalRadios"
                id="formHorizontalRadios3"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAdvantages">
              <Form.Label style={{ paddingLeft: "23px" }}>Переваги</Form.Label>
              <Form.Control className={styles.form_input} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDisadvantage">
              <Form.Label style={{ paddingLeft: "23px" }}>Недоліки</Form.Label>
              <Form.Control className={styles.form_input} type="text" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label style={{ paddingLeft: "23px" }}>Коментар</Form.Label>
              <Form.Control
                className={styles.form_input}
                as="textarea"
                rows={5}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoto">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Фотографії товару
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                as="textarea"
                rows={5}
              />
            </Form.Group>

            {/* TODO bottons */}
            <div className={styles.form__btns}>
              <button>
                <span>Залишити відгук</span>
              </button>
              <button type="submit">
                <span>Скасувати</span>
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
        </div>
      </div>
    </Modal>
  );
}
