import React from "react";
import Modal from "react-bootstrap/Modal";
import styles from "./styles.module.scss";
const LiqPayResponse = ({ html, ...props }) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <div dangerouslySetInnerHTML={{ __html: html }} />
      <Modal.Footer as={"div"}>
        <div className={styles.modalfoot}>
          <button className={styles.addbtn} onClick={() => props.onHide()}>
            Добре
          </button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LiqPayResponse;
