import styles from './styles.module.scss';
import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AdminInput from '../../inputs/adminInput';
import { toast } from "react-toastify";
import axios from "axios";
import { FormGroup, FormLabel, FormControl, Col } from "react-bootstrap"

export default function Create({ setCoupons }) {
    const [promocode, setPromocode] = useState("");
    const [discount, setDiscount] = useState(0);
    const tommorow = new Date();
    tommorow.setDate(tommorow.getDate() + 1);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(tommorow);


    const handleStartDate = (newValue) => {
        setStartDate(newValue.target.value);
    }

    const handleEndDate = (newValue) => {
        setEndDate(newValue.target.value);
    }


    const validate = Yup.object({
        promocode: Yup.string()
            .required('Coupon name is required.')
            .min(2, "Coupon name must be between 2 and 30 characters.")
            .max(30, "Coupon name must be between 2 and 30 characters."),
        discount: Yup.number()
            .required('Discount name is required.')
            .min(1, "Discount must be at list 1%")
            .max(99, "Discount must be less than 99%")
    });
    const submitHandler = async () => {
        try {
            //TODO check errors its not showing
            // if(startDate.toString() == endDate.toString()){
            //    return toast.error("You can't pick the same dates")
            // }
            // else if((endDate.getTime() - startDate.getTime()) < 0){
            //     return toast.error("Start date can't be more than the end date")
            // }

            const { data } = await axios.post('/api/coupon', { promocode, discount, startDate, endDate });
            setCoupons(data.coupons);
            setPromocode("");
            setDiscount(0);
            setStartDate(new Date());
            setEndDate(tommorow);
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response);
        }
    };
    return (<>
        <Formik
            enableReinitialize
            initialValues={{ promocode, discount, startDate, endDate }}
            validationSchema={validate}
            onSubmit={() => {
                submitHandler();
            }}
        >
            {
                (formik) => (
                    <Form>
                        <div className={styles.header}>Create a Coupon</div>
                        <AdminInput
                            type="text"
                            label="Promocode"
                            name="promocode"
                            placeholder="Promocode"
                            onChange={(e) => setPromocode(e.target.value)}
                        />
                        <AdminInput
                            type="number"
                            label="Discount"
                            name="discount"
                            placeholder="Coupon name"
                            onChange={(e) => setDiscount(e.target.value)}
                        />
                        <div className={styles.date_picker}>
                            <FormGroup controlId="groupStartDate">
                                <FormLabel className={styles.form_label}>
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
                                <FormLabel className={styles.form_label}>
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
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Add Coupon</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}