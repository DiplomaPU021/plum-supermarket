import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

export default function EmptyCart() {
    return (
        <Modal.Body className={styles.modalbody}>
            <Image src='../../../images/cart.jpg' width="180px" height="180px" />
            <h2>Cart is empty</h2>
            <h5>But it's never late to fix it !</h5>
            <div className={styles.line}></div>
            <button className={styles.addbtn}>Add product</button>
        </Modal.Body>

    )
}