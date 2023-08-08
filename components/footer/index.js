import styles from "./styles.module.scss";
import Link from "next/link";
import React from "react";
import Links from "./Links";
import Socials from "./Socials";
import NewsLetter from "./NewsLetter";
import Payment from "./Payment";
import Copyright from "./Copyright";

export default function Footer({ country }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <Links />
        <Socials />
        <NewsLetter />
        <Copyright country={country} />
      </div>
    </footer>
  );
}
