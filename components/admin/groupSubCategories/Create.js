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
            .required('GroupSubCategory name is required.')
            .min(2, "GroupSubCategory name must be between 2 and 30 characters.")
            .max(30, "GroupSubCategory name must be between 2 and 30 characters.")
            .matches(/^[абвгдеєжзиіїйклмнопрстуфхцчшщьюяАБВГДЕЄЖЗИЇІКЛМНОПРСТУФХЦЧШЩЬЮЯa-zA-Z\s]*$/, "Numbers and special characters are not allowed.")
        ,
        parent: Yup.string().required("Please choose a parent category"),
    });
    const handleChangeTopParent=(e)=>{
        setParent(e.target.value);
    }
    const submitHandler = async () => {
        try {
            console.log("27", name, parent);
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
                        {/* {JSON.stringify(groupSubCategories)}
                        <div>top_parent</div>
                        {topParent}
                        <div>parent</div>
                        {parent} */}
                        <div className={styles.header}>Create a Group of SubCategories</div>
                        <AdminInput
                            type="text"
                            label="Name"
                            name="name"
                            placeholder="Group-Sub-Category name"
                            onChange={(e) => setName(e.target.value)}
                        />
                        <SingularSelect
                            name="parent"
                            value={parent}
                            data={categories}
                            placeholder="Select category"
                            header="Виберіть категорію"
                            handleChange={handleChangeTopParent} />
                        <div className={styles.btnWrap}>
                            <button type="submit" className={`${styles.btn}`}>
                                <span>Add Group Sub Category</span>
                            </button>
                        </div>
                    </Form>
                )
            }
        </Formik>
    </>);
}