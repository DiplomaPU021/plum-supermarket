import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import * as React from "react"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { showDialog, hideDialog } from "@/store/DialogSlice";


export default function DialogModal(props) {
    const dispatch = useDispatch();
    const { dialog } = useSelector((state) => ({ ...state }));
 


    return (
        <Modal
            {...props}
            // dialogClassName={styles.modal}
            aria-labelledby="contained-modal-title-vcenter"
            className="modal"
            centered
        >
           
                <div className={styles.modaldiv}>
                   
                        <Modal.Body className={styles.modalbody} scrollable="true">
                            
                        </Modal.Body>
                   
                    
                </div>
           
        </Modal>
    )
}