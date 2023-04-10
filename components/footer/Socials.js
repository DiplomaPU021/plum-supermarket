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
                            <a href="https://www.facebook.com/" target="_blank">
                                <FacebookIcon fillColor={"#220F4B"} />
                            </a>

                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="https://www.instagram.com/accounts/login/" target="_blank">
                                <InstagramIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="" target="_blank">
                                <YoutubeIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                    <li>
                        <div>
                            <a href="" target="_blank">
                                <TwitterIcon fillColor={"#220F4B"} />
                            </a>
                        </div>
                    </li>
                </ul>
            </section>
        </div>

    )
}