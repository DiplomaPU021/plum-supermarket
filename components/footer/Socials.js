import styles from "./styles.module.scss"
import React from 'react'
import FacebookIcon from "../icons/FacebookIcon"
import InstagramIcon from "../icons/InstagramIcon"
import YoutubeIcon from "../icons/YoutubeIcon"
import TwitterIcon from "../icons/TwitterIcon"

export default function Socials() {
    return (
        <div className={styles.footer_socials}>
            <section>
                <ul>
                    <li>
                        <div>
                            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">
                                <FacebookIcon fillColor={"#220F4B"} />
                            </a>

                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="https://www.instagram.com/accounts/login/" target="_blank" rel="noreferrer">
                                <InstagramIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer">
                                <YoutubeIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="https://twitter.com/?lang=ua" target="_blank" rel="noreferrer">
                                <TwitterIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                </ul>
            </section>
        </div>

    )
}