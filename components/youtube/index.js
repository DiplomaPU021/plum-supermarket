import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

export default function YoutubeVideo() {
    return (
        <div className={styles.video}>
            <iframe width="1480" height="460"
                src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1&controls=0">
            </iframe>
        </div>

    )
}