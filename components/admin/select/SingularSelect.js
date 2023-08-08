import { ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import { useField } from "formik";

export default function SingularSelect({
  data,
  handleChange,
  placeholder,
  header,
  ...rest
}) {
  const [field, meta] = useField(rest);
  return (
    <div style={{ marginBottom: "1rem" }}>
      <select
        aria-label="Cat-select"
        disabled={rest.disabled}
        name={field.name}
        placeholder={header}
        value={field.value}
        onChange={(e) => handleChange(e)}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error_select
        }`}
      >
        <option key={""} value={""}>
          {header}
        </option>
        {data?.map((item, i) => (
          <option key={item._id} value={item._id}>
            {item.name}
          </option>
        ))}
      </select>
      {meta.touched && meta.error && (
        <p className={styles.error_msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
