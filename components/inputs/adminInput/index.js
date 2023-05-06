import styles from './styles.module.scss';
import { ErrorMessage, useField } from "formik";

export default function AdminInput({ placeholder, label, ...props }) {
    const [field, meta] = useField(props);
    return <div>
        <label className={`${styles.label} 
        ${meta.touched && meta.error ? styles.inputError : ""}`}>
            <span>{label}</span>
            {/* {field.type=="textarea"?(
                <textarea 
                formnovalidate="formnovalidate"
                name={field.name} 
                rows={field.rows}
                cols={field.cols}
                placeholder={placeholder}
                {...field}
                {...props}
            ></textarea>
            ) : ( */}
            <input
                type={field.type}
                name={field.name}
                placeholder={placeholder}
                {...field}
                {...props}
            />
            {/* )} */}

        </label>
        {
            meta.touched && meta.error && <div className={styles.inputError__msg}>
                <span></span>
                <ErrorMessage name={field.name} />
            </div>
        }
    </div>
}