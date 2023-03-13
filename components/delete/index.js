import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import * as React from "react"
import { Form, Button } from "react-bootstrap"
import { useRouter } from "next/router"

export default function DelNotification(props) {
    const router = useRouter();
    const [dontAsk, setDontAsk] = React.useState({ askType: "", another: "another" });
    const { askType } = dontAsk;

    const handleDontAskAgain = e => {
        e.persist();
        console.log(e.target.value);

        setDontAsk(prevState => ({
            ...prevState,
            askType: e.target.value
        }));
    };

    return (
        <Modal
            {...props}
            dialogClassName={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Body className={styles.modalbody}>
                <h3>Ви впевненні що хочете видалити цей товар?</h3>
                <div className={styles.line}></div>
                <button className={styles.addbtn}>Видалити</button>
                <button className={styles.addbtn2}>Скасувати</button>
                <Form.Check
                    type="radio"
                    className={styles.radio}
                    aria-label="radio 1">
                    <Form.Check.Input
                        type="radio"
                        value="Не запитувати знову"
                        onChange={handleDontAskAgain}
                        checked={askType === "Не запитувати знову"} />
                    <Form.Check.Label>Не запитувати знову</Form.Check.Label>
                </Form.Check>
            </Modal.Body>
        </Modal>
    )
}
