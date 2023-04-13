import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button'
import GooglePlayIcon from "../icons/GooglePlayIcon"
import AppleIcon from "../icons/AppleIcon"
import Link from "next/link";

export default function AppDownload() {
    const color = "#220F4B";

   


    return (
        <div className={styles.app}>
            <div className={styles.apptext}>
                <h1>Завантажуйте додаток і зручно керуйте замовленнями</h1>
            </div>
            <div className="d-grid gap-3">
           
                <Link className={styles.appbtn} href="https://play.google.com/store/games?hl=ru&gl=US&pli=1">               
                    <div className={styles.circle}>
                        <GooglePlayIcon fillColor={color} />
                    </div>
                    <div className={styles.t}>
                        <span className={styles.t__t1}>Завантажити</span>
                        <span className={styles.t__t1}>
                            в <b>Google Play</b>
                        </span>
                    </div>
                </Link>
               
                <Link className={styles.appbtn} href="https://www.apple.com/app-store/">
                    <div className={styles.circle}>
                        <AppleIcon fillColor={color} />
                    </div>
                    <div className={styles.t}>
                        <span className={styles.t__t1}>Завантажити</span>
                        <span className={styles.t__t1}>
                            в <b>AppStore</b>
                        </span>
                    </div>
                </Link>
            </div>
        </div>

    )
}