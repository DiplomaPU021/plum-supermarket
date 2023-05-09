import { useState, useRef } from "react"
import styles from './styles.module.scss';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import Categories from "@/components/categories";
import SingularSelect from "../select/SingularSelect"

export default function ListItem({ categories, groupSubCategories, groupSubCategory, setGroupSubCategories }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [parent, setParent] = useState("");
    const input = useRef(null);

    const handleRemove = async (id) => {
        try {
            const { data } = await axios.delete('/api/admin/groupSubCategory', { data: { id }, })
            toast.success(data.message);
            setGroupSubCategories(data.groupSubCategories)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const handleUpdate = async (id) => {
        try {
            const { data } = await axios.put('/api/admin/groupSubCategory', {
                id,
                name: name || groupSubCategory.name,
                parent: parent || groupSubCategory.parent._id,
            })
            toast.success(data.message);
            setGroupSubCategories(data.groupSubCategories)
            setOpen(false)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <li className={styles.list__item}>
            <input
                className={open ? styles.open : ''}
                type="text"
                value={name ? name : groupSubCategory.name}
                onChange={(e) => setName(e.target.value)}
                disabled={!open}
                ref={input}
            />
            {
                open && (<div className={styles.list__item_expand}>
                    <select
                        name="parent"
                        value={parent || groupSubCategory.parent._id}
                        onChange={(e) => setParent(e.target.value)}
                        disabled={!open}
                        className={styles.select}>
                        <option value={""} key={""}>Виберіть категорію</option>
                        {categories.map((c, i) => (
                            <option value={c._id} key={c._id}>{c.name}</option>
                        ))
                        }

                    </select>
                    <button className={styles.btn} onClick={() => handleUpdate(groupSubCategory._id)}>Зберегти</button>
                    <button className={styles.btn} onClick={() => { setOpen(false); setName(""); setParent(""); }}>Скасувати</button>
                </div>)
            }
            <div className={styles.list__item_actions}>
                {
                    !open && (<AiTwotoneEdit
                        onClick={() => {
                            setOpen((prev) => !prev);
                            input.current.focus();
                        }}
                    />
                    )}
                <AiFillDelete
                    onClick={() => handleRemove(groupSubCategory._id)}
                />
            </div>
        </li>
    );
}