import styles from './styles.module.scss';
import { useEffect, useState } from "react"
import { Form, Formik } from "formik"
import * as Yup from "yup"
import AdminInput from '../../inputs/adminInput';
import { toast } from "react-toastify";
import axios from "axios";
import SingularSelect from "../select/SingularSelect"
import Categories from '@/components/categories';

export default function Create({ categories, setSubCategories, groupSubCategories }) {
    const [name, setName] = useState("");
    const [parent, setParent] = useState("");
    const [topParent, setTopParent] = useState("");
    const [filteredGroupSubCategories, setFilteredGroupSubCategories] = useState(groupSubCategories);
    const validate = Yup.object({
        name: Yup.string()
        .required('Вкажіть назву підкатегорії.')
        .min(2, "Назва підкатегорії має бути між 2 та 30 символами.")
        .max(30, "Назва підкатегорії має бути між 2 та 30 символами.")
        .matches(/^[абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИЇІКЛМНОПРСТУФХЦЧШЩЬЮЯa-zA-Z\s]*$/, "Цифри та розділові знаки не допускаються.")
        ,
        parent: Yup.string().required("Будь-ласка виберіть группу"),
        topParent: Yup.string().required("Будь-ласка виберіть категорію")
    });
    const handleChangeTopParent = (e) => {
        setTopParent(e.target.value);
    }
    useEffect(() => {
        if (topParent) {
            // console.log(groupSubCategories)
            setFilteredGroupSubCategories(groupSubCategories?.filter(item => topParent === item.parent._id));
        }
    }, [topParent])
    const submitHandler = async () => {
        try {
            // console.log(name, parent, topParent);
            const { data } = await axios.post('/api/admin/subCategory', { name, parent, topParent });
            setSubCategories(data.subCategories);
            setName("");
            setParent("");
            setTopParent("");
            toast.success(data.message);
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };
    return (<>
        <Formik
            enableReinitialize
            initialValues={{ name, parent, topParent }}
            validationSchema={validate}
            onSubmit={() => { submitHandler(); }}>
            {
                (formik) => (
                    <Form>
                        <div className={styles.header}>Створити підкатегорію</div>
                        <AdminInput
                            type="text"
                            label="Назва"
                            name="name"
                            placeholder="Підкатегорія"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <SingularSelect
                            name="topParent"
                            value={topParent}
                            data={categories}
                            placeholder="Виберіть категорію"
                            header="Виберіть категорію"
                            handleChange={handleChangeTopParent} />
                        <SingularSelect
                            name="parent"
                            value={parent}
                            data={filteredGroupSubCategories}
                            placeholder="Виберіть групу підкатегорій"
                            header="Виберіть групу підкатегорій"
                            handleChange={(e) => setParent(e.target.value)} />
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Додати підкатегорію</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}