import styles from "./styles.module.scss";
import { Card } from "react-bootstrap";

export default function CategoryCard({ group }) {
  
  return (
      <Card className={styles.categorycard}>
        <Card.Img
          className={styles.categorycard__photobox}
          src={`../../images/group_subCategories/${group.slug}.png`}
          alt={group.slug}
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
  );
}
