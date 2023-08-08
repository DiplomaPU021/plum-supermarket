import { useState } from "react";
import styles from "./styles.module.scss";
import { ErrorMessage, useField } from "formik";
import ColorPicker from "./ColorPicker";

export default function Colors({ name, product, setProduct, color, ...props }) {
  const [toggle, setToggle] = useState(false);
  const [field, meta] = useField(props);
  return (
    <div className={styles.colors}>
      <div
        className={`${styles.header} ${
          meta.error[name] ? styles.header__error : ""
        }`}
      >
        <div className={styles.flex}>
          {meta.error[name] && <img src="../../../images/warning.png" alt="" />}
          Виберіть новий колір продукту
        </div>
        <span>
          {meta.touched && meta.error[name] && (
            <div className={styles.error_msg}>
              <span></span>
              <ErrorMessage name={name} />
            </div>
          )}
        </span>
      </div>
      <div className={styles.colors_infos}></div>
      <div className={toggle ? styles.toggle : ""}></div>
      <ColorPicker
        product={product}
        setProduct={setProduct}
        color={color}
        props={props}
      />
    </div>
  );
}
