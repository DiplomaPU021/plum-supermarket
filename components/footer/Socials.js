import styles from "./styles.module.scss"
import Link from "next/link"
import React from 'react'
import {FaFacebookF, FaTiktok} from "react-icons/fa"
import {BsInstagram, BsYoutube, BsPinterest, BsSnapchat} from "react-icons/bs"

export default function Socials(){
    return(
       
            <div className={styles.footer_socials}>
                <section>
                    <h3>STAY CONNECTED</h3>
                    <ul>
                        <li>
                            <a href="" target="_blank">
<FaFacebookF/>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                            <BsInstagram/>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                            <BsYoutube/>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                            <FaTiktok/>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                            <BsPinterest/>
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank">
                            <BsSnapchat/>
                            </a>
                        </li>
                    </ul>
                </section>
            </div>
        
    )
}