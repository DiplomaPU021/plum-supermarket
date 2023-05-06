import styles from "./styles.module.scss";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { ErrorMessage, useField } from "formik";
import { RiShape2Line, RiDeleteBin7Fill } from "react-icons/ri";
import { GiExtractionOrb } from "react-icons/gi";
import { showDialog, hideDialog } from "@/store/DialogSlice";

export default function Style({
  product,
  setProduct,
  name,
  colorImage,
  ...props
}) {
  const dispatch = useDispatch();
  const fileInput = useRef(null);
  const [meta, field] = useField(props);
  const handleImage = (e) => {
    let img = e.target.files[0];
    if (
      img.type !== "image/jpeg" &&
      img.type !== "image/jpg" &&
      img.type !== "image/webp"
    ) {
      dispatch(
        showDialog({
          header: "Unsupported Format.",
          msgs: [
            {
              msg: `${img.name} format is unsupported! Only JPEG, PNG, WEBP are allowed`,
              type: "error",
            },
          ],
        })
      );
      files = files.filter((item) => item !== img.name);
      return;
    } else if (img.size > 1024 * 1024 * 10) {
      dispatch(
        showDialog({
          header: "Unsupported Size.",
          msgs: [
            {
              msg: `${img.name} size is too large, maximum of 10MB allowed`,
              type: "error",
            },
          ],
        })
      );
      return;
    } else {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      let obj = {
        color: product.color?.color,
        image: e.target.value,
      };
      setProduct({ ...product, color: obj });
    }
  };

  return (
    <div className={styles.images}>
      <div
        className={`${styles.header} ${meta.error ? styles.header_error : ""}`}
      >
        <div className={styles.flex}>
          {meta.error && <img src="../../../images/warning.png" alt="" />}
Pick a Product Style Image
        </div>
        <span>
          {meta.touched && meta.error && (
            <div className={styles.error_msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <input
        type="file"
        name={colorImage}
        ref={fileInput}
        hidden
        multiple
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleImage}
      />
   
      <button
        type="reset"
        onClick={() => fileInput.current.click()}
        className={`${styles.btn} ${styles.btn_primary}`}
      >
       Pick a style
      </button>
    </div>
  );
}
