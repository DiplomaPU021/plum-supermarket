import styles from "./styles.module.scss"
import Link from "next/link"
import { BiUser } from "react-icons/bi"
import { IoKeyOutline } from "react-icons/io5"
import { SiMinuteEmail } from "react-icons/si"

export default function LoginInput({ icon }) {
    return (

        <div className={styles.input}>
            {/* {
                icon == "user" ? (<BiUser />) 
                : icon == "email" ? (<SiMinuteEmail />)
                : icon == "password" ? (<IoKeyOutline />) 
                : ("")
            } */}

        </div>

    )
}