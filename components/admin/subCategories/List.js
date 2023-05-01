import styles from './styles.module.scss';
import ListItem from "./ListItem";

export default function List({ subCategories, setSubCategories, groupSubCategories }) {
    return (
        <ul className={styles.list}>
            {
                subCategories.map((subCategory) => (
                    <ListItem
                        subCategory={subCategory}
                        key={subCategory._id}
                        setSubCategories={setSubCategories}
                        groupSubCategories={groupSubCategories}
                    />
                ))}
        </ul>
    )

}