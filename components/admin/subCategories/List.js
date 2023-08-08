import ListItem from "./ListItem";
import styles from "./styles.module.scss";

export default function List({
  subCategories,
  setSubCategories,
  categories,
  groupSubCategories,
}) {
  return (
    <ul className={styles.list}>
      {subCategories.map((subCategory) => (
        <ListItem
          subCategory={subCategory}
          key={subCategory._id}
          setSubCategories={setSubCategories}
          categories={categories}
          groupSubCategories={groupSubCategories}
        />
      ))}
    </ul>
  );
}
