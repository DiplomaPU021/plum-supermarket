import styles from "./styles.module.scss";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";
import * as React from "react";
import Link from "next/link";
// import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "@/store/DialogSlice";

export default function DialogModal({ dialog }) {
  // const dispatch = useDispatch();
  // // const { dialog } = useSelector((state) => ({ ...state }));
  // const dialog = useSelector((state) => state.dialog);
  console.log("dialog", dialog);
  // console.log("showdialog", showDialog);
  //   const dialog  =useSelector((state) => state.dialog);
  const handleClose = () => {
    dispatch(hideDialog());
  };

  return (
    <Modal
      show={dialog.show}
      onHide={handleClose}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >
          {dialog.header}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body >
        {dialog.msgs &&
          dialog.msgs.map((msg, i) => (
            <div key={i}>
              <img
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
      </Modal.Footer>
    </Modal>

  );
}
