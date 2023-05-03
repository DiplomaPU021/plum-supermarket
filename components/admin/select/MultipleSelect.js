import { ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import { Form } from "react-bootstrap";
import { useField } from "formik";
import Select from "react-select";
import { useEffect, useState } from "react";

export default function MultipleSelect({
  data,
  handleChange,
  placeholder,
  header,
  ...rest
}) {
  const [field, meta] = useField(rest);
  console.log("dataOnMulty//////////////", data)
  const[dataOptions, setDataOptions]=useState(
    data.map((item) => {
        let label= `${item.name}`;
        let value =`${item._id}`;
        return {
            ...item,
            label,
            value,
        };
    })
  );
  useEffect(()=>{
   console.log("dataOptions//////////////", dataOptions); 
  },[data])

  return (
    <div style={{ marginBottom: "1rem" }}>
      <Select
      isMulti
        aria-label="Cat-select"
        name={field.name}
        placeholder={header}
        value={field.value}
        onChange={handleChange}
        className={`${styles.select} ${
          meta.touched && meta.error && styles.error_select
        }`}
        classNamePrefix={header}
        options={dataOptions}
      >
        {/* <option key={""} value={""}>
          {header}
        </option>
        {data?.map((item, i) => (
          <option key={item._id} value={item._id || item.name || item.slug}>
            {item.name || item.slug}
          </option> 
       ))} */}
      </Select>
      {meta.touched && meta.error && (
        <p className={styles.error_msg}>
          <ErrorMessage name={field.name} />
        </p>
      )}
    </div>
  );
}
