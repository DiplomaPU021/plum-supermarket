import { ErrorMessage } from "formik";
import styles from "./styles.module.scss";
import { useField } from "formik";
import Select from "react-select";
import { useEffect, useState } from "react";
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

export default function MultipleSelect({
    name,
    data,
    handleChange,
    header,
    ...rest
}) {
    const [field, meta] = useField(rest);



    return (
        <div style={{ marginBottom: "1rem" }}>

            <Select
                name={name}
                isMulti
                value={field.value}
                onChange={handleChange}
                components={animatedComponents}
                className={`${styles.select} ${meta.touched && meta.error && styles.error_select
                    }`}
                classNamePrefix="Виберіть субкатегорії"
                options={data}
                isClearable={true}
                placeholder={header}
            >
            </Select>
            {meta.touched && meta.error && (
                <p className={styles.error_msg}>
                    <ErrorMessage name={name} />
                </p>
            )}
        </div>
    );
}
