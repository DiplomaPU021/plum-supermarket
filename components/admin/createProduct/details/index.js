import { useState } from "react"
import styles from "./styles.module.scss"
import { Form } from "react-bootstrap"
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
export default function Details({
    details,
    product,
    setProduct
}) {
    const handleDetails = (i, e) => {
        const values = [...details];
        values[i][e.target.name] = e.target.value;
        setProduct({ ...product, details: values });
        //TODO implement
    }
    const handleFields = (i, j, e) => {
        const values = [...details];
        values[i].fields[j][e.target.name] = e.target.value;
        setProduct({ ...product, details: values });
    }
    const handleFieldsMain = (i, j, e) => {
        const values = [...details];
        values[i].fields[j][e.target.name] = e.target.checked;
        setProduct({ ...product, details: values });
    }
    const handleRemove = (i) => {
        //TODO implement
        if (details.length > 0) {
            const values = [...details];
            values.splice(i, 1);
            setProduct({ ...product, details: values });
        }
    }
    const handleRemoveField = (i, j) => {
        //TODO implement
        if (details.length > 0 && details[i].fields.length > 1) {
            const values = [...details];
            values[i].fields.splice(j, 1);
            setProduct({ ...product, details: values });
        }
    }

    return (
        <div>
            <div className={styles.header}>Деталі</div>
            {
                details ? details.map((detail, i) => (
                    <div className={styles.container_details} key={i}>
                        <input
                            className={styles.input}
                            type="text"
                            name="group"
                            placeholder={"Назва групи х-ик"}
                            value={detail.group}
                            onChange={(e) => handleDetails(i, e)}
                        />
                        {/* {details.length == 0 && ( */}
                      
                            <AiFillMinusCircle onClick={() => handleRemove(i)} />
                            <AiFillPlusCircle onClick={() => {
                                setProduct({
                                    ...product,
                                    details: [
                                        ...details, {
                                            group: "",
                                            fields: [
                                                {
                                                    name: "",
                                                    value: "",
                                                    isMain: false
                                                }
                                            ]
                                        }
                                    ]
                                })
                            }} />
                       
                        {/* )} */}
                        <div className={styles.details}>
                            {detail.fields.map((field, j) => (
                                <div key={"field" + j} className={styles.field}>
                                    <input
                                        className={styles.input2}
                                        type="text"
                                        name="name"
                                        placeholder={"Назва характеристики"}
                                        value={field.name}
                                        onChange={(e) => handleFields(i, j, e)}
                                    />
                                    <input
                                        className={styles.input2}
                                        type="text"
                                        name="value"
                                        placeholder={"Значення характеристики"}
                                        value={field.value}
                                        onChange={(e) => handleFields(i, j, e)}
                                    />

                                    <input
                                        id="ch_box"
                                        className={styles.ch_box}
                                        type="checkbox"
                                        name="isMain"
                                        placeholder={"Основна?"}
                                        checked={field.isMain}
                                        onChange={(e) => handleFieldsMain(i, j, e)}
                                    />
                                    <label for="ch_box">Основна?</label>

                                    <AiFillMinusCircle onClick={() => handleRemoveField(i, j)} />
                                    <AiFillPlusCircle onClick={() => {
                                        const values = [...details];
                                        values[i].fields.push({
                                            name: "",
                                            value: "",
                                            isMain: false
                                        });
                                        setProduct({
                                            ...product,
                                            details: values
                                        })
                                    }} />
                                </div>
                            ))}
                        </div>
                    </div>
                )) : <></>
            }
        </div>
    )
}





