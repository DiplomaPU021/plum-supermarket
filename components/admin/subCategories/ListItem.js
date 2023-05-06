import { useState, useRef } from "react"
import styles from './styles.module.scss';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import Categories from "@/components/categories";
import SingularSelect from "../select/SingularSelect"

export default function ListItem({ categories, groupSubCategories, subCategory, setSubCategories }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [parent, setParent] = useState("");
    const [topParent, setTopParent] = useState("");
    const input = useRef(null);

    const handleRemove = async (id) => {
        try {
            const { data } = await axios.delete('/api/admin/subCategory', { data: { id }, })
            toast.success(data.message);
            setSubCategories(data.subCategories)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const handleUpdate = async (id) => {
        try {
            const { data } = await axios.put('/api/admin/subCategory', {
                id,
                name: name || subCategory.name,
                parent: parent || subCategory.parent._id,
                topParent: topParent || subCategory.top_parent._id
            })
            toast.success(data.message);
            setSubCategories(data.subCategories)
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
                value={name ? name : subCategory.name}
                onChange={(e) => setName(e.target.value)}
                disabled={!open}
                ref={input}
            />
            {
                open && (<div className={styles.list__item_expand}>
                    <select
                        name="parent"
                        value={parent || subCategory.parent._id}
                        onChange={(e) => setParent(e.target.value)}
                        disabled={!open}
                        className={styles.select}>
                        <option value={""} key={""}>Select Category</option>
                        {/* { TODO mapping don't work*/}
                        {groupSubCategories.forEach((c, i) => (
                            <></> // <option value={c.parent.id} key={c.parent._id}>{c.parent.name}</option>
                        ))
                        }

                    </select>
                    <button className={styles.btn} onClick={() => handleUpdate(subCategory._id)}>Save</button>
                    <button className={styles.btn} onClick={() => { setOpen(false); setName(""); setParent(""); setTopParent(""); }}>Cancel</button>
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
                    onClick={() => handleRemove(subCategory._id)}
                />
            </div>
        </li>
    );
}