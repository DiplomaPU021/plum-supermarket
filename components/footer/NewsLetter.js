import styles from "./styles.module.scss";

export default function NewsLetter() {
  return (
    <div className={styles.footer_newsletter}>
      <div className={styles.footer_flex}>
        <input type="text" placeholder="Email Address" />
        <button className={styles.btn_plum}>SUBSCRIBE</button>
      </div>
    </div>
  );
}
