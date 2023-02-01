import styles from "./styles.module.scss"
import Link from "next/link"
import { IoLocationSharp } from "react-icons/io5"

export default function Ad() {
    return (

        <div className={styles.footer_copyright}>
            <section>©2023 PLUM All Right Reserved</section>
            <section>
                <ul>
                    {data.map((link) => (
                        <li>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))
                    }
                    <li>
                        <a>
                            <IoLocationSharp /> Ukraine
                        </a>
                    </li>
                </ul>
            </section>
        </div>

    )
}

const data = [
    {
        name: "Privacy Center",
        link: ""
    }, {
        name: "Privacy & Cookie Policy",
        link: ""
    }, {
        name: "Manage Cookies",
        link: ""
    }, {
        name: "Terms & Conditions",
        link: ""
    }, {
        name: "Copyright Notice",
        link: ""
    }
]