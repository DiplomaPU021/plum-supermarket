import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { deleteApproval, updateCart } from "@/store/cartSlice"

export default function DelNotification({ setDeleteConfirm, productId, setError, ...props }) {
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const [dontAsk, setDontAsk] = useState({ askType: "", another: "another" });
    const { askType } = dontAsk;

    const handleDontAskAgain = (e) => {
        // e.persist();
        // console.log(e.target.value);
        setDontAsk(prevState => ({
            ...prevState,
            askType: e.target.value
        }));
    };
    const deleteHandler = () => {
        let newCart = cart.cartItems.filter((item) => {
            return item._uid != productId;
        });
        setError((prevState) => ({ ...prevState, inCartError: false, uidProduct: "" }));
        dispatch(updateCart(newCart));
        if (dontAsk.askType != "") {
            setDeleteConfirm(true);
            dispatch(deleteApproval(true));
        }

        props.onHide();
    }

    return (
        <Modal
            {...props}
            dialogClassName={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            centered >
            <Modal.Body className={styles.modalbody}>
                <h3>Ви впевненні що хочете видалити цей товар?</h3>
                <div className={styles.line}></div>
                <button className={styles.addbtn} onClick={deleteHandler}>Видалити</button>
                <button className={styles.addbtn2} onClick={() => props.onHide()}>Скасувати</button>
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
