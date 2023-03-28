import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

export default function EmptyWish(props) {

    return (
        <Modal.Body className={styles.modalbody}>
            <Image src='../../../images/frame.jpg' width="180px" height="180px" />
            <h2>Вподобаних товарів немає</h2>
            <h5>Але це ніколи не пізно виправити!</h5>
            <div className={styles.line}></div>
            <button className={styles.addbtn}
            onClick={() => props.onHide()}>Додати товар</button>
        </Modal.Body>

    )
}