import styles from "./styles.module.scss"
import Link from "next/link"
import React from 'react'

export default function Links() {
    return (
        <div className={styles.footer_links}>
            {links.map((link, i) => (
                    <ul>
                        {i === 0 ? (
                            <img src="https://logovectorseek.com/wp-content/uploads/2021/09/plum-io-inc-logo-vector.png" alt=""/>
                        ) : (
                            <b>{link.heading}</b>
                        )}
                       
                        {
                            link.links.map((link)=>(
                                <li>
                                    <Link href={link.link}>{link.name}</Link>
                                </li>
                            ))
                        }
                    </ul>
                ))
            }
        </div>
    )
}

const links = [
    {
        heading: "PLUM",
        links: [
            {
                name: "About us",
                link: ""
            },
            {
                name: "Contact us",
                link: ""
            }, {
                name: "Social Responsibility",
                link: ""
            }, {
                name: "About us",
                link: ""
            }
        ]
    }, {
        heading: "HELP & SUPPORT",
        links: [
            {
                name: "Shipping Info",
                link: ""
            },
            {
                name: "Returns",
                link: ""
            }, {
                name: "How To Order",
                link: ""
            }, {
                name: "How To Track",
                link: ""
            },
            {
                name: "Size Guide",
                link: ""
            }
        ] 
    }, {
        heading: "Customer service",
        links: [
            {
                name: "Customer service",
                link: ""
            },
            {
                name: "Terms and Conditions",
                link: ""
            }, {
                name: "Consumers (Transactions)",
                link: ""
            }, {
                name: "Take our feedback survay",
                link: ""
            },
        ] 
    }
]