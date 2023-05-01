import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Modal } from "react-bootstrap";
import styles from "./styles.module.scss";
import React, { useRef } from "react";
import { useState } from "react";
import Link from "next/link";
import Images from "./Images";
import { Rating } from "react-simple-star-rating";
import dataURItoBlob from "@/utils/dataURItoBlob";
import { uploadImages } from "@/requests/upload";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { addToReviewRating, updateNumberReviews, updateReviewRating } from "@/store/reviewSlice";

export default function LeaveFeedback({ show, onHide, product, setProductReview }) {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    reviewerName: session ? session.user.name : "",
    review: '',
    advantages: '',
    disadvantages: '',
    experience: '',
    rating: 0
  });
  const [errors, setErrors] = useState({});
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })
    if (!!errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      })
    }
  }
  const [images, setImages] = useState([]);
  let uploaded_images = [];

  const validateForm = () => {
    const { reviewerName, advantages, disadvantages, review, experience, rating } = form;
    const newErrors = {};
    if (!reviewerName || reviewerName === "") {
      newErrors.reviewerName = "Введіть ваше і'мя!";
    }
    if (!review || review === "") {
      newErrors.review = "Будь ласка напишіть відгук!";
    }
    if (!advantages || advantages === "") {
      newErrors.advantages = "Будь ласка заповніть переваги!";
    }
    if (!disadvantages || disadvantages === "") {
      newErrors.disadvantages = "Будь ласка заповніть недоліки!";
    }
    return newErrors;
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      if (images.length > 0) {
        let temp = images.map((img) => {
          return dataURItoBlob(img);
        });
        const path = "review images";
        let formData = new FormData();
        formData.append("path", path);
        temp.forEach((img) => {
          formData.append("file", img);
        });
        uploaded_images = await uploadImages(formData);
      }
      const { data } = await axios.put(`/api/product/${product._id}/review`, {
        reviewerName: form.reviewerName,
        rating: form.rating,
        experience: form.experience,
        advantages: form.advantages,
        disadvantages: form.disadvantages,
        review: form.review,
        images: uploaded_images,
      });
      setProductReview(data.reviews);
      dispatch(updateNumberReviews(data.reviews.length));
      dispatch(addToReviewRating(form.rating))
      setForm({
        reviewerName: '',
        review: '',
        advantages: '',
        disadvantages: '',
        experience: '',
        rating: 0
      });
      setImages([]);
      onHide();
    }
  }
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
          <Form className={styles.form} >
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Ім’я
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                type="name"
                placeholder="Ваше ім’я"
                name="reviewerName"
                value={form.reviewerName}
                onChange={(e) => setField(e.target.name, e.target.value)}
                isInvalid={!!errors.reviewerName}
              />
              <Form.Control.Feedback type="invalid">{errors.reviewerName}</Form.Control.Feedback>
            </Form.Group>
            {/* <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Електронна пошта
              </Form.Label>
              <Form.Control
                className={styles.form_input}
                type="email"
                placeholder="your@email.com"
                name="email"
                value={form.email}
                 onChange={(e) => setField(e.target.name, e.target.value)}
              />
              <Form.Text style={{ paddingLeft: "23px" }} className="text-muted">
                Ми ніколи нікому не передамо вашу електронну адресу.
              </Form.Text>
            </Form.Group> */}

            <Form.Group className={styles.form__stars}>
              <Rating
                SVGstyle={{ margin: "0 10px" }}
                initialValue={form.rating}
                size={56}
                SVGstrokeColor="#70BF63"
                SVGstorkeWidth={1}
                emptyColor="transparent"
                fillColor="#70BF63"
                onClick={(rate) => setField("rating", rate)}
              />
            </Form.Group>

            <Form.Group className={styles.form__experience}>
              <Form.Label>Досвід використання:</Form.Label>
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 1"
                label="Менше місяця"
                name="experience"
                id="formHorizontalRadios1"
                value="Менше місяця"
                onChange={(e) => setField(e.target.name, e.target.value)}
              />
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 2"
                label="Кілька місяців"
                name="experience"
                id="formHorizontalRadios2"
                value="Кілька місяців"
                onChange={(e) => setField(e.target.name, e.target.value)}
              />
              <Form.Check
                className={styles.form__experience_radiobtn}
                type="radio"
                aria-label="radio 3"
                label="Більше року"
                name="experience"
                id="formHorizontalRadios3"
                value="Більше року"
                onChange={(e) => setField(e.target.name, e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAdvantages">
              <Form.Label style={{ paddingLeft: "23px" }}>Переваги</Form.Label>
              <Form.Control className={styles.form_input}
                type="text"
                name="advantages"
                value={form.advantages}
                onChange={(e) => setField(e.target.name, e.target.value)}
                isInvalid={!!errors.advantages} />
              <Form.Control.Feedback type="invalid">{errors.advantages}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicDisadvantage">
              <Form.Label style={{ paddingLeft: "23px" }}>Недоліки</Form.Label>
              <Form.Control className={styles.form_input}
                type="text"
                name="disadvantages"
                value={form.disadvantages}
                onChange={(e) => setField(e.target.name, e.target.value)}
                isInvalid={!!errors.disadvantages} />
              <Form.Control.Feedback type="invalid">{errors.disadvantages}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicTextarea">
              <Form.Label style={{ paddingLeft: "23px" }} >Коментар</Form.Label>
              <Form.Control
                className={styles.form_input}
                as="textarea"
                rows={6}
                name="review"
                required
                value={form.review}
                onChange={(e) => setField(e.target.name, e.target.value)}
                isInvalid={!!errors.review}
              />
              <Form.Control.Feedback type="invalid">{errors.review}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPhoto">
              <Form.Label style={{ paddingLeft: "23px" }}>
                Фотографії товару
              </Form.Label>
              <Images images={images} setImages={setImages} />
            </Form.Group>
            {/* TODO bottons */}
            <div className={styles.form__btns}>
              {/* {form.review != "" && form.review != null ? ( */}
              <button onClick={handleSubmitReview}>
                <span>Залишити відгук</span>
              </button>
              {/* ) : <button disabled> <span>Залишити відгук</span></button>} */}
              <button>
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
          <div className={styles.info}>
            <p>
              Щоб ваш відгук або коментар пройшов модерацію і був опублікований,
              ознайомтеся, будь ласка, з&nbsp;
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
