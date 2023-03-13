import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

export default function YoutubeVideo() {
    return (
        <div className={styles.video}>
            <iframe className="d-block w-100" height="480"
                src="https://www.youtube.com/embed/IC7RnVh3SsA?autoplay=1&mute=1&controls=0">
            </iframe>
        </div>

    )
}