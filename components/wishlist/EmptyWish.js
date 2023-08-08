import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

export default function EmptyWish(props) {
  return (
    <Modal.Body className={styles.modalbodyempty}>
      <Image
        src="../../../images/frame.png"
        width="230px"
        height="230px"
        alt="Empty wishlist"
      />
      <h5>Вподобаних товарів немає</h5>
      <div className={styles.line}></div>
      <p>Але це ніколи не пізно виправити!</p>
      <button className={styles.addbtn} onClick={() => props.onHide()}>
        Додати товар
      </button>
    </Modal.Body>
  );
}
