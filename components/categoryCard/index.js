import styles from "./styles.module.scss";
import { Card } from "react-bootstrap";
import Link from "next/link";

export default function CategoryCard({ group }) {
  return (
    <Link style={{ textDecoration: "none"}} href="/">
      <Card className={styles.categorycard}>
        <Card.Img
          className={styles.categorycard__photobox}
          src={`../../images/group_subCategories/${group.image}.png`}
          alt={group.image}
        />
        <div className={styles.line}></div>
        <Card.Body className={styles.categorycard__body}>
          <div>
            {group.group_subcategory.map((sub, i) => (
              <span key={i}>{`${sub.name}, `}</span>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
