import styles from "./styles.module.scss";

export default function SimpleCopyright() {
  return (
    <div className={styles.simple_copyright}>
      <p>ТМ використовується на підставі ліцензії правовласника Plum</p>
      <p>© Інтернет-магазин «Plum™»</p>
      <p className={styles.last_p}>2001–2023</p>
    </div>
  );
}
