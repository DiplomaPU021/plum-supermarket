import styles from "./styles.module.scss"
import Button from 'react-bootstrap/Button'
import GooglePlayIcon from "../icons/GooglePlayIcon"
import AppleIcon from "../icons/AppleIcon"

export default function AppDownload() {
    const color = "#220F4B";
    return (
        <div className={styles.app}>
            <div className={styles.apptext}>
                <h1>Download the app and conveniently manage orders.</h1>
            </div>
            <div className="d-grid gap-3">
                <Button className={styles.appbtn}>
                    <div className={styles.circle}>
                        <GooglePlayIcon fillColor={color} />
                    </div>
                    Google Play
                </Button>
                <Button className={styles.appbtn}>
                    <div className={styles.circle}>
                        <AppleIcon fillColor={color} />
                    </div>
                    App Store
                </Button>
            </div>
        </div>

    )
}