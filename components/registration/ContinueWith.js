import { useRouter } from "next/router"
import Image from 'react-bootstrap/Image'
import styles from "./styles.module.scss"

export default function ContinueWith() {
    const router = useRouter();
    return (
        <div className={styles.container_frame}>
            <div className={styles.devider}>
                <div className={styles.line2}></div>
                <span>або увійдіть за допомогою</span>
                <div className={styles.line2}></div>
            </div>
            <div className={styles.linkicons}>
                <Image src='../../../authIcons/auth_google.png' width="46px" height="46px" />
                <Image src='../../../authIcons/auth_github.png' width="46px" height="46px" />
                <Image src='../../../authIcons/auth_auth.png' width="46px" height="46px" />
                <Image src='../../../authIcons/auth_fb.png' width="46px" height="46px" />
            </div>
        </div>
    )

}