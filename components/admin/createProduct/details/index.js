import { useState } from "react"
import styles from "./styles.module.scss"
import { BsFillPatchMinusFill, BsFillPatchPlusFill } from "react-icons/bs";
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
                    <div className={styles.container_size} key={i}>
                        <input
                            type="text"
                            name="group"
                            placeholder={"Назва групи х-ик"}
                            value={detail.group}
                            onChange={(e) => handleDetails(i, e)}
                        />
                        {/* {details.length == 0 && ( */}
                            <>
                                <BsFillPatchMinusFill onClick={() => handleRemove(i)} />
                                <BsFillPatchPlusFill onClick={() => {
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
                            </>
                        {/* )} */}
                        <div>
                            {detail.fields.map((field, j) => (
                                <div key={"field" + j}>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder={"Назва характеристики"}
                                        value={field.name}
                                        onChange={(e) => handleFields(i, j, e)}
                                    />
                                    <input
                                        type="text"
                                        name="value"
                                        placeholder={"Значення характеристики"}
                                        value={field.value}
                                        onChange={(e) => handleFields(i, j, e)}
                                    />
                                    <input
                                        type="checkbox"
                                        name="isMain"
                                        placeholder={"Основна?"}
                                        checked={field.isMain}
                                        onChange={(e) => handleFieldsMain(i, j, e)}
                                    />
                                    <BsFillPatchMinusFill onClick={() => handleRemoveField(i,j)} />
                                    <BsFillPatchPlusFill onClick={() => {
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





