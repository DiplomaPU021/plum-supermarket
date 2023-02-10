import styles from "./styles.module.scss"
import Link from "next/link"
import React from 'react'
import Payment from './Payment'

export default function Links() {
    return (
        <div className={styles.footer_links}>
            {links.map((link, i) => (
                <ul key={i}>
                    {i === 0 ? (
                        <div>
                            <img className={styles.imglogo} src="../../../logo/logo_dark.png" alt="" />
                            <h5>Some text here about our motivation</h5>
                            <Payment />
                        </div>
                    ) : (
                        <h3>{link.heading}</h3>
                    )}
                    {
                        link.links.map((link, i) => (
                            <li key={i}>
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
        links: []
    },
    {
        heading: "About company",
        links: [
            {
                name: "About us",
                link: ""
            },
            {
                name: "Terms and Conditions",
                link: ""
            }, {
                name: "Contacts",
                link: ""
            }, {
                name: "All Categories",
                link: ""
            },
        ]
    },
    {
        heading: "Help & Support",
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
    },
    {
        heading: "Customer service",
        links: [
            {
                name: "Customer service",
                link: ""
            },
            {
                name: "PLUM Premium ",
                link: ""
            }, {
                name: "Bonus",
                link: ""
            }, {
                name: "Take our feedback survay",
                link: ""
            },
        ]
    },
    {
        heading: "Partners",
        links: [
            {
                name: "Sell with PLUM",
                link: ""
            },
            {
                name: "Work with us",
                link: ""
            }, {
                name: "Rent",
                link: ""
            }, {
                name: "FAQ",
                link: ""
            },
        ]
    }
]