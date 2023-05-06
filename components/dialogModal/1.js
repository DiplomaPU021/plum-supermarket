import styles from "./styles.module.scss";
import ModalDialog from 'react-bootstrap/ModalDialog'
import { Button } from 'react-bootstrap'
import * as React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux"
import { showDialog, hideDialog } from "@/store/DialogSlice";


export default function DialogModal(props) {
    const dispatch = useDispatch();
    const { dialog } = useSelector((state) => ({ ...state }));
    const handleClose = () => {
        dispatch(hideDialog());
    }

    return (
        <ModalDialog
            show={showDialog()}
            onHide={handleClose}
            {...props}
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <ModalDialog.Header closeButton>
                <ModalDialog.Title className={styles.header}>{dialog.header}</ModalDialog.Title>
            </ModalDialog.Header>
            <ModalDialog.Body className={styles.body}>
                {
                    dialog.msgs && dialog.msgs.map((msg, i) => (
                        <div>
                            <img src={msg.type == "error"
                                ? "https://www.freeiconspng.com/uploads/orange-error-icon-0.png"
                                : "https://www.pngmart.com/files/20/Success-Transparent-Background.png"
                            } alt="" />
                            <span>{msg.msg}</span>
                        </div>
                    ))
                }
            </ModalDialog.Body>
            <ModalDialog.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </ModalDialog.Footer>
        </ModalDialog>
    )
}