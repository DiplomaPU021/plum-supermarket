import styles from "./styles.module.scss"

export default function YoutubeVideo() {
    return (
        <div className={styles.video}>
            <iframe className="w-100" height="520"
                src="https://www.youtube.com/embed/IC7RnVh3SsA?autoplay=1&mute=1&controls=0&showinfo=0&loop=1">
            </iframe>
        </div>

    )
}