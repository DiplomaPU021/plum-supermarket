import styles from "./styles.module.scss"
import VisaIcon from "../icons/VisaIcon"
import MastercardIcon from "../icons/MastercardIcon"

export default function Payment() {
    return (
        <div className={styles.footer_payment}>
            <div className={styles.footer_flexwrap}>
                <VisaIcon fillColor={"#70BF63"} />
                <MastercardIcon fillColor={"#70BF63"} />
            </div>
        </div>
    )
}