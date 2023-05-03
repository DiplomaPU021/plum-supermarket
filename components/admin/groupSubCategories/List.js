import styles from './styles.module.scss';
import ListItem from "./ListItem";

export default function List({ groupSubCategories, setGroupSubCategories, categories }) {
    return (
        <ul className={styles.list}>
            {
                groupSubCategories.map((groupSubCategory) => (
                    <ListItem
                        groupSubCategory={groupSubCategory}
                        key={groupSubCategory._id}
                        setGroupSubCategories={setGroupSubCategories}
                        categories={categories}
                    />
                ))}
        </ul>
    )

}