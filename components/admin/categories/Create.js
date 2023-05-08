import styles from './styles.module.scss';
import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AdminInput from '../../inputs/adminInput';
import { toast } from "react-toastify";
import axios from "axios";

export default function Create({ setCategories }) {
    const [name, setName] = useState("");
    const validate = Yup.object({
        name: Yup.string()
            .required('Вкажіть назву категорії.')
            .min(2, "Назва категорії має бути між 2 та 30 символами.")
            .max(30, "Назва категорії має бути між 2 та 30 символами.")
            .matches(/^[абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИЇІКЛМНОПРСТУФХЦЧШЩЬЮЯa-zA-Z\s]*$/, "Цифри та розділові знаки не допускаються.")
        ,
    });
    const submitHandler = async () => {
        try {
            const { data } = await axios.post('/api/admin/category', { name });
            setCategories(data.categories);
            setName("");
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (<>
        <Formik
            enableReinitialize
            initialValues={{ name }}
            validationSchema={validate}
            onSubmit={() => {
                submitHandler();
            }}
        >
            {
                (formik) => (
                    <Form>
                        <div className={styles.header}>Створити категорію</div>
                        <AdminInput
                            type="text"
                            label="Назва"
                            name="name"
                            placeholder="Категорія"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Додати категорію</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}