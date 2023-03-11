import styles from "./styles.module.scss"
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
// import Link from "next/link"
import { useRouter } from "next/router"



export default function EmptyCart() {
    const router = useRouter();
    const showMainPageHandler= async () => {
       // window.location.reload(true);
       router.push("/");
    }
    return (
        <Modal.Body className={styles.modalbody}>
            <Image src='../../../images/cart.jpg' width="180px" height="180px" />
            <h2>Корзина пуста</h2>
            <h5>Але ще не пізно це виправити!</h5>
            <div className={styles.line}></div>
            {/* <Link className={styles.addbtn} href="/">Add product</Link> */}
            <button className={styles.addbtn}
               onClick={() => showMainPageHandler()}
            >Додати товари</button>
        </Modal.Body>

    )
}