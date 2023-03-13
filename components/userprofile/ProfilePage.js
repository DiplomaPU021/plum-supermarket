import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Link from "next/link"
import { useRouter } from "next/router"


export default function ProfilePage() {
    const router = useRouter();
   
    return (
        <Modal.Body className={styles.modalbodyempty}>
            <h2>Ваші персональні дані</h2>
            <h5>Особисті дані</h5>
        </Modal.Body>

    )
}