import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button'
import GooglePlayIcon from "../icons/GooglePlayIcon"
import AppleIcon from "../icons/AppleIcon"

export default function AppDownload() {
    const color = "#220F4B";
    return (
        <div className={styles.app}>
            <div className={styles.apptext}>
                <h1>Завантажуйте додаток і зручно керуйте замовленнями</h1>
            </div>
            <div className="d-grid gap-3">
                <Button className={styles.appbtn}>
                    <div className={styles.circle}>
                        <GooglePlayIcon fillColor={color} />
                    </div>
                    <div className={styles.t}>
                        <span className={styles.t__t1}>Завантажити</span>
                        <span className={styles.t__t1}>
                            в <b>Google Play</b>
                        </span>
                    </div>
                </Button>
                <Button className={styles.appbtn}>
                    <div className={styles.circle}>
                        <AppleIcon fillColor={color} />
                    </div>
                    <div className={styles.t}>
                        <span className={styles.t__t1}>Завантажити</span>
                        <span className={styles.t__t1}>
                            в <b>AppStore</b>
                        </span>
                    </div>
                </Button>
            </div>
        </div>

    )
}