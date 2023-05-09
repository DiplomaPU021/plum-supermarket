import styles from "./styles.module.scss"
import Link from "next/link"
import { IoLocationSharp } from "react-icons/io5"


export default function Ad({ country }) {
    return (
        <div className={styles.footer_copyright}>
            <section>©2023 ТМ PLUM використовується на підставі правовласника PlumLTD </section>
            <section>
                <ul>
                    {data.map((link, i) => (
                        <li key={i}>
                            <Link href={link.link}>{link.name}</Link>
                        </li>
                    ))}
                    <li>
                        <a className={styles.location}>
                            <IoLocationSharp /> {country.name}
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