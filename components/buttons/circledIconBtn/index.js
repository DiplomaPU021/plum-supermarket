import styles from "./styles.module.scss"
import Link from "next/link"
import { BiRightArrowAlt } from "react-icons/bi"

export default function CircledIconBtn({type, text, icon}) {
    return (

        <button type={type} className={styles.button}>           
            {text}
             <div className={styles.svg_wrap}>
                <BiRightArrowAlt />
            </div>
        </button>

    )
}