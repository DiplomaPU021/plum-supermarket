import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./styles.module.scss";
import { useRef, useState } from "react";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { Container, Row, Image } from "react-bootstrap";

export default function Images({ images, setImages }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  const handleImages = (e) => {
    let files = Array.from(e.target.files);

    if (images.length + files.length > 10) {
      setError("Дозволено максимум 10 фото.");
      return;
    }

    files.forEach((img, i) => {
      if (
        img.type !== "image/jpeg" &&
        img.type !== "image/png" &&
        img.type !== "image/webp"
      ) {
        setError(
          `${img.name} Неочікуваний формат! Дозволяється лише JPEG, PNG, WEBP.`,
        );
        files = files.filter((item) => item.name !== img.name);
        return;
      } else if (img.size > 1024 * 1024 * 5) {
        setError(`${img.name} розмір завеликий, дозволено максимум 5 Мб.`);
        files = files.filter((item) => item.name !== img.name);
        return;
      } else {
        setError("");
        const reader = new FileReader();
        reader.readAsDataURL(img);
        reader.onload = (e) => {
          setImages((images) => [...images, e.target.result]);
        };
      }
    });
  };
  const removeImage = (image) => {
    setImages((images) => images.filter((img) => img !== image));
    if (images.length <= 10) {
      setError("");
    }
  };
  return (
    <Container className={styles.form__photos}>
      <Row>
        <div md={3} className={styles.col}>
          <Image
            style={{ width: "70px", marginRight: "50px" }}
            src="../../../icons/camera.png"
            alt="camera"
          />
          <div>
            Натисніть{" "}
            <label
              htmlFor="file-upload"
              style={{
                color: "#70BF63",
                textDecoration: "underline",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              сюди
            </label>
            <input
              id="file-upload"
              ref={inputRef}
              type="file"
              hidden
              onChange={handleImages}
              multiple
              accept="image/png,image/jpeg,image/webp"
            />
            , щоб вибрати і додати свої фотографії (до 10 штук)
          </div>
        </div>
        {error && <div className={styles.error}>{error}</div>}
      </Row>
      <div className={styles.imags_wrap}>
        {images.length > 0 &&
          images.map((img, i) => (
            <span key={i}>
              <MdOutlineRemoveCircle onClick={() => removeImage(img)} />
              <Image src={img} alt="" />
            </span>
          ))}
      </div>
    </Container>
  );
}
