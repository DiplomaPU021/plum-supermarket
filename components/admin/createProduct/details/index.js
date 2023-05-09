import styles from "./styles.module.scss"
import { ErrorMessage, useField } from "formik"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";

export default function Details({
    name,
    disabled,
    details,
    product,
    setProduct,
    ...props
}) {
    const [field, meta] = useField(props);
    const handleDetails = (i, e) => {
        const newDetails = [...product.details];
        newDetails[i][e.target.name] = e.target.value;
        setProduct({ ...product, details: newDetails });
    }
    const handleFields = (i, j, e) => {
        const newDetails = [...product.details];
        newDetails[i].fields[j][e.target.name] = e.target.value;
        setProduct({ ...product, details: newDetails });
    }
    const handleFieldsMain = (i, j, e) => {
        const newDetails = [...product.details];
        newDetails[i].fields[j][e.target.name] = e.target.checked;
        setProduct({ ...product, details: newDetails });
    }
    const handleAdd = () => {
        setProduct({
            ...product,
            details: [
                ...details, {
                    group: "",
                    fields: [
                        {
                            name: '',
                            value: '',
                            isMain: false
                        }
                    ]
                }
            ]
        })
    }
    const handleAddField = (i) => {
        const newDetails = [...product.details];
        newDetails[i].fields.push({
            name: '',
            value: '',
            isMain: false
        });
        setProduct({
            ...product,
            details: newDetails
        });

    }
    const handleRemove = (i) => {
        if (details.length > 0) {
            const newDetails = [...product.details];
            newDetails.splice(i, 1);
            setProduct({ ...product, details: newDetails });
        }
    }
    const handleRemoveField = (i, j) => {
        if (details.length > 0 && details[i].fields.length > 1) {
            const newDetails = [...product.details];
            newDetails[i].fields.splice(j, 1);
            setProduct({ ...product, details: newDetails });
        }
    }

    return (
        <div>
            <div className={`${styles.header} ${meta.error[name] ? styles.header__error : ""}`}>
                <div className={styles.flex}>
                    {
                        meta.error[name] && <img src="../../../images/warning.png" alt="" />
                    }
                    Виберіть деталі продукту:
                </div>
                <span>
                    {
                        meta.touched && meta.error[name] && <div className={styles.error_msg}>
                            <span></span>
                            <ErrorMessage name={name} />
                        </div>
                    }
                </span>
            </div>
            {
                details.length > 0 ? details.map((detail, i) => (
                    <div className={styles.container_details} key={i}>
                        <span className={styles.top_space}>
                            <input key={"inputd" + i}
                                id={"inputd" + i}
                                type="text"
                                name="group"
                                placeholder={"Назва групи х-ик"}
                                value={detail.group}
                                onChange={(e) => handleDetails(i, e)}
                                disabled={disabled}
                                className={styles.input}
                            />
                            <AiFillMinusCircle onClick={() => handleRemove(i)} />
                            <AiFillPlusCircle onClick={() => handleAdd()} />
                        </span>
                        <div className={styles.details}>
                            {detail.fields && detail.fields.length > 0 ? detail.fields.map((f, j) => (
                                <div key={"field" + j} className={styles.field}>
                                    <input key={"input" + j} id={"input" + j} className={styles.input2}
                                        type="text"
                                        name="name"
                                        placeholder={"Назва характеристики"}
                                        value={f.name}
                                        onChange={(e) => handleFields(i, j, e)}
                                        disabled={disabled}
                                        required
                                    />
                                    <input key={"input2" + j} className={styles.input2} id={"input2" + j}
                                        type="text"
                                        name="value"
                                        placeholder={"Значення характеристики"}
                                        value={f.value}
                                        onChange={(e) => handleFields(i, j, e)}
                                        disabled={disabled}
                                        required
                                    />
                                    <input key={"input3" + j} id={"input3" + j} className={styles.ch_box}
                                        type="checkbox"
                                        name="isMain"
                                        placeholder={"Основна?"}
                                        checked={f.isMain}
                                        onChange={(e) => handleFieldsMain(i, j, e)}
                                        disabled={disabled}
                                    />
                                    <label for={"input3" + j}>Основна?</label>
                                    <AiFillMinusCircle onClick={() => handleRemoveField(i, j)} />
                                    <AiFillPlusCircle onClick={() => handleAddField(i)} />
                                </div>
                            )) : <AiFillPlusCircle onClick={() => handleAddField(i)} />}
                        </div>
                    </div>
                )) : <span className={styles.add}><AiFillPlusCircle onClick={() => handleAdd()} /></span>
            }
        </div>
    )
}





