import { useState, useRef } from "react"
import styles from './styles.module.scss';
import { AiTwotoneEdit, AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";
import { FormGroup, FormLabel, FormControl, Col } from "react-bootstrap"

export default function ListItem({ coupon, setCoupons }) {
    const [open, setOpen] = useState(false);
    const [promocode, setPromocode] = useState('');
    const [discount, setDiscount] = useState('');
    const input = useRef(null);
    const [startDate, setStartDate] = useState(coupon.startDate);
    const [endDate, setEndDate] = useState(coupon.endDate);


    const handleStartDate = (newValue) => {
        setStartDate(newValue.target.value);
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue.target.value);
    }

    const handleRemove = async (id) => {
        try {
            const { data } = await axios.delete('/api/coupon', { data: { id }, })
            toast.success(data.message);
            setCoupons(data.coupons)
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    const handleUpdate = async (id) => {
        try {
            const { data } = await axios.put('/api/coupon', {
                id,
                promocode: promocode || coupon.promocode,
                discount: discount || coupon.discount,
                startDate: startDate,
                endDate: endDate
            })
            toast.success(data.message);
            setCoupons(data.coupons)
            setOpen(false)
            // setPromocode("");
            // setDiscount(0);
            // setStartDate(new Date());
            // setEndDate(tommorow);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (
        <li className={styles.list__item}>
            <input
                className={open ? styles.open : ''}
                type="text"
                value={promocode ? promocode : coupon.promocode}
                onChange={(e) => setPromocode(e.target.value)}
                disabled={!open}
                ref={input}
            />
            {
                open && (<div className={styles.list__item_expand}>
                    <input
                        className={open ? styles.input_discount : ''}
                        type="text"
                        value={discount ? discount : coupon.discount}
                        onChange={(e) => setDiscount(e.target.value)}
                        disabled={!open}
                    />
                    <div className={styles.date_picker}>
                        <FormGroup controlId="groupStartDate">
                            <FormLabel className={styles.form_label2}>
                                Start Date
                            </FormLabel>
                            <FormControl
                                type="date"
                                name="startDate"
                                className={styles.form_control}
                                onChange={(e) => { handleStartDate(e) }}
                                value={startDate ? startDate : ''}
                                placeholder={startDate ? startDate : "dd/mm/yyyy"}
                            />
                        </FormGroup>
                        <FormGroup controlId="groupEndDate">
                            <FormLabel className={styles.form_label2}>
                                End Date
                            </FormLabel>
                            <FormControl
                                type="date"
                                name="endDate"
                                className={styles.form_control}
                                onChange={(e) => { handleEndDate(e) }}
                                value={endDate ? endDate : ''}
                                placeholder={endDate ? endDate : "dd/mm/yyyy"}
                            />
                        </FormGroup>
                    </div>
                    <button className={styles.btn} onClick={() => handleUpdate(coupon._id)}>Save</button>
                    <button className={styles.btn} onClick={() => {
                        setOpen(false);
                        // setPromocode("");
                        // setDiscount(0);
                        // setStartDate(coupon.startDate);
                        // setEndDate(coupon.endDate);
                    }}>Cancel</button>
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
                    onClick={() => handleRemove(coupon._id)}
                />
            </div>
        </li>
    );
}