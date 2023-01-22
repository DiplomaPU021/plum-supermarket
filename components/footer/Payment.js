import styles from "./styles.module.scss"
import Link from "next/link"

export default function Payment() {
    return (

        <div className={styles.footer_payment}>
            <h3>WE ACCEPT</h3>
            <div className={styles.footer_flexwrap}>
                <img src="../../../images/payment/visa.png" alt="" />
                <img src="../../../images/payment/mastercard-logo.png" alt="" />
                <img src="../../../images/payment/paypal.png" alt="" />
            </div>
        </div>

    )
}