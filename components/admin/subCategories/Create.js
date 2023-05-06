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
            .required('SubCategory name is required.')
            .min(2, "SubCategory name must be between 2 and 30 characters.")
            .max(30, "SubCategory name must be between 2 and 30 characters.")
            .matches(/^[абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИЇІКЛМНОПРСТУФХЦЧШЩЬЮЯa-zA-Z'-\s]*$/, "Numbers and special characters are not allowed.")
        ,
        parent: Yup.string().required("Please choose a parent category"),
        topParent: Yup.string().required("Please choose a top parent category")
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
                        <div className={styles.header}>Create a SubCategory</div>
                        <AdminInput
                            type="text"
                            label="Name"
                            name="name"
                            placeholder="Sub-Category name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <SingularSelect
                            name="topParent"
                            value={topParent}
                            data={categories}
                            placeholder="Select category"
                            header="Виберіть категорію"
                            handleChange={handleChangeTopParent} />
                        <SingularSelect
                            name="parent"
                            value={parent}
                            data={filteredGroupSubCategories}
                            placeholder="Select group of category"
                            header="Виберіть групу підкатегорій"
                            handleChange={(e) => setParent(e.target.value)} />
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Add Sub Category</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}