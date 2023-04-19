import { useState, useRef } from "react" 
import styles from './styles.module.scss';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";

export default function ListItem({ category }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const input = useRef(null);
    const handleRemove = async () => {};
    return (
        <li className={styles.list__item}>
            <input
                className={open ? styles.open : ''}
                type="text"
                value={name ? name : category.name}
                onChange={(e)=> setName(e.target.value)}
                disabled={!open}
                ref={input}
            />
            <div className={styles.list__item_actions}>
            {
                !open && (<AiTwotoneEdit
                    onClick={()=>{
                        setOpen((prev) => !prev);
                        input.current.focus();
                    }}
                />
            )}
            <AiFillDelete
                onClick={()=>handleRemove(category._id)}
            />
            </div>
        </li>
    );
}