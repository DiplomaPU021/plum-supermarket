import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'


export default function EmptyCart(props) {
    return (
        <Modal.Body className={styles.modalbodyempty}>
            <Image src='../../../images/cart.png' width="230px" height="230px" />
            <h5>Корзина пуста</h5>
            <div className={styles.line}></div>
            <p>Але це ніколи не пізно виправити!</p>
            <button className={styles.addbtn}
               onClick={() => props.onHide()}
            >Додати товари</button>
        </Modal.Body>
    )
}