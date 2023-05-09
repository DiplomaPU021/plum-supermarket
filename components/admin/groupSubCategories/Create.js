import styles from './styles.module.scss';
import { useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AdminInput from '../../inputs/adminInput';
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../select/SingularSelect"

export default function Create({ categories, setGroupSubCategories }) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const validate = Yup.object({
        name: Yup.string()
            .required('Вкажіть назву групи підкатегорій.')
            .min(2, "Назва групи підкатегорій має бути між 2 та 30 символами.")
            .max(30, "Назва групи підкатегорій має бути між 2 та 30 символами.")
            .matches(/^[абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИЇІКЛМНОПРСТУФХЦЧШЩЬЮЯa-zA-Z\s]*$/, "Цифри та розділові знаки не допускаються.")
        ,
        parent: Yup.string().required("Будь-ласка виберіть категорію"),
    });
    const handleChangeTopParent = (e) => {
        setParent(e.target.value);
    }
    const submitHandler = async () => {
        try {
            const { data } = await axios.post('/api/admin/groupSubCategory', { name, parent });
            setGroupSubCategories(data.groupSubCategories);
            setName("");
            setParent("");
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (<>
        <Formik
            enableReinitialize
            initialValues={{ name, parent }}
            validationSchema={validate}
            onSubmit={() => {
                submitHandler();
            }}
        >
            {
                (formik) => (
                    <Form>
                        <div className={styles.header}>Створити группу підкатегорій</div>
                        <AdminInput
                            type="text"
                            label="Назва"
                            name="name"
                            placeholder="Група підкатегорій"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <SingularSelect
                            name="parent"
                            value={parent}
                            data={categories}
                            placeholder="Виберіть категорію"
                            header="Виберіть категорію"
                            handleChange={handleChangeTopParent} />
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Додати группу підкатегорій</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}