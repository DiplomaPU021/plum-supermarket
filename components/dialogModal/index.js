import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import * as React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "../../store/DialogSlice";

export default function DialogModal() {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state) => ({ ...state }));
  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div style={{ position: "fixed", zIndex: "9999999999999" }}>
      <Modal
        show={dialog.show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        className={styles.modal}
      >
        <Modal.Header>
          <Modal.Title className={styles.header_dialog}>
            {dialog.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          {dialog.msgs &&
            dialog.msgs.map((msg, i) => (
              <div key={i} className={styles.msg}>
                <img className={styles.msg}
                  src={
                    msg.type == "error"
                      ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                      : "https://www.freeiconspng.com/uploads/success-icon-1.png"
                  }
                  alt=""
                />
                <span className={styles.msg}>{msg.msg}</span>
              </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {dialog.link?.link && (
            <Button>
              <Link href={dialog.link.link}>
                <span>{dialog.link_text}</span>
              </Link>
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
