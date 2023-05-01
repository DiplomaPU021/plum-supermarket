import Form from 'react-bootstrap/Form';
import styles from "./styles.module.scss"

function ColorPicker({ colors, setColors }) {

    //TODO handlers if needed

    return (
        <div className={styles.picker}>
            <Form.Label htmlFor="colorInput" className={styles.label_title}>Choose color</Form.Label>
            <Form.Control
                type="color"
                id="exampleColorInput"
                defaultValue="#563d7c"
                value={colors[0]}
                title="Choose your color"
                onChange={() => setColors(e.target.value)}
            />
        </div>
    );
}

export default ColorPicker;