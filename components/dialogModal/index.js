import styles from "./styles.module.scss";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import * as React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "@/store/DialogSlice";

export default function DialogModal() {
  const dispatch = useDispatch();
  const { dialog } = useSelector((state) => ({ ...state }));
  // const dialog = useSelector((state) => state.dialog);
  console.log("dialog", dialog);
  // console.log("showdialog", showDialog);
  //   const dialog  =useSelector((state) => state.dialog);

  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <div style={{ position: "fixed", zIndex: "9999999999999", }}>
      <Modal
        show={dialog.show}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        
        className={styles.modal}
      >
        <Modal.Header closeButton>
          <Modal.Title className={styles.header}>
            {dialog.header}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>
          {dialog.msgs &&
            dialog.msgs.map((msg, i) => (
              <div key={i}>
                <img width="60px"
                  src={
                    msg.type == "error"
                      ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                      : "https://www.pngmart.com/files/20/Success-Transparent-Background.png"
                  }
                  alt=""
                />
                <span>{msg.msg}</span>
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
