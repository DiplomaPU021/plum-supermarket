import Form from 'react-bootstrap/Form';
import styles from "./styles.module.scss"
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function ColorPicker({ product, setProduct, color, props }) {

    const handleChangeColor = (e) => {
        let obj = {
            color: product.color?.color,
            image: e.target.value,
        }
        setProduct({ ...product, color: obj });
    };
    const handleChangeColorName = (e) => {
        let obj = {
            color: e.target.value,
            image: product.color?.image,
        }
        setProduct({ ...product, color: obj });
    };

    const handleNoColor = (e) => {
        e.preventDefault();
        let obj = {
            color: "",
            image: "#ffffff00",
        }
        setProduct({ ...product, color: obj });
    }

    return (
        <div className={styles.picker}>
            <Form.Label htmlFor="colorInput" className={styles.label_title}>Виберіть колір</Form.Label>
            <Form.Control
                type="color"
                id="exampleColorInput"
                name="image"
                value={color?.image || "#ffffff00"}
                title="Виберіть колір"
                onChange={(e) => handleChangeColor(e)}
                disabled={props.disabled}
            />
            <Form.Label htmlFor="colorName" className={styles.label_title}>Введіть назву кольору</Form.Label>
            <Form.Control
                type="text"
                id="exampleColorName"
                name="color"
                value={color?.color || ""}
                title="Введіть назву кольору"
                onChange={(e) => handleChangeColorName(e)}
                disabled={props.disabled}
            />
            <div ><button disabled={props.disabled} className={styles.click_btn} onClick={(e) => handleNoColor(e)}>Натистіть якщо немає кольору</button></div>

        </div>
    );
}

export default ColorPicker;