import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";
import Payment from "./Payment";

export default function Links() {
  return (
    <div className={styles.footer_links}>
      {links.map((link, i) => (
        <ul key={i}>
          {i === 0 ? (
            <div>
              <img
                className={styles.imglogo}
                src="../../../logo/logo_dark.png"
                alt=""
              />
              <h5>Some text here about our motivation</h5>
              <Payment />
            </div>
          ) : (
            <p>{link.heading}</p>
          )}
          {link.links.map((link, i) => (
            <li key={i}>
              <Link href={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

const links = [
  {
    heading: "PLUM",
    links: [],
  },
  {
    heading: "Про компанію",
    links: [
      {
        name: "Про нас",
        link: "",
      },
      {
        name: "Умови використання сайту",
        link: "/terms_of_service",
      },
      {
        name: "Усі категорії",
        link: "",
      },
      {
        name: "Сервісні центри",
        link: "",
      },
    ],
  },
  {
    heading: "Допомога",
    links: [
      {
        name: "Доставка та оплата",
        link: "/terms_of_service",
      },
      {
        name: "Кредит",
        link: "",
      },
      {
        name: "Гарантія",
        link: "",
      },
      {
        name: "Повернення товару",
        link: "/terms_of_service",
      },
      {
        name: "Політика конфіденційності",
        link: "/privacy_policy",
      },
    ],
  },
  {
    heading: "Сервіси",
    links: [
      {
        name: "Бонусний рахунок",
        link: "",
      },
      {
        name: "PLUM Premium",
        link: "",
      },
      {
        name: "Подарункові сертифікати",
        link: "",
      },
      {
        name: "PLUM обмін",
        link: "",
      },
    ],
  },
  {
    heading: "Партнерам",
    links: [
      {
        name: "Продавати на PLUM",
        link: "",
      },
      {
        name: "Співпраця з нами",
        link: "",
      },
      {
        name: "Франчайзінг",
        link: "",
      },
      {
        name: "Оренда приміщень",
        link: "",
      },
    ],
  },
];
