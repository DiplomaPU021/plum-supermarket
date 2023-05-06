import Form from 'react-bootstrap/Form';
import styles from "./styles.module.scss"

function ColorPicker({ product, setProduct, color }) {

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
    return (
        <div className={styles.picker}>
            <Form.Label htmlFor="colorInput" className={styles.label_title}>Виберіть колір</Form.Label>
            <Form.Control
                type="color"
                id="exampleColorInput"
                name="image"
                value={color?.image|| ""}
                title="Виберіть колір"
                onChange={(e) => handleChangeColor(e)}
            />
            <Form.Label htmlFor="colorName" className={styles.label_title}>Введіть назву кольору</Form.Label>
            <Form.Control
                type="colorName"
                id="exampleColorName"
                name="color"
                value={color?.color||""}
                title="Введіть назву кольору"
                onChange={(e) => handleChangeColorName(e)}
            />
        </div>
    );
}

export default ColorPicker;