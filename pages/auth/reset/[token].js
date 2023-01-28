import styles from "../../../styles/forgot.module.scss"
import Link from "next/link"
import { useState } from "react"
import Header from "../../../components/header"
import Footer from "../../../components/footer"
import { BiLeftArrowAlt } from "react-icons/bi"
import CircledIconBtn from "../../../components/buttons/circledIconBtn"
import LoginInput from "../../../components/inputs/loginInput"
import { Formik, Form } from "formik"
import * as Yup from "yup"


export default function forgot() {
    const [password, setPassword] = useState("")
    const [conf_password, setConf_Password] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const passwordValidation = Yup.object({
        password: Yup.string().required("Please enter you new password.")
            .min(6, "Password must be at least 6 characters.")
            .max(36, "Password can't be more then 36 characters."),
        conf_password: Yup.string().required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password must match.")
    })
    const resetHandler = async () => { }
    return (<>
        <Header country="" />
        <div className={styles.forgot}>
            <div>
                <div className={styles.forgot_header}>
                    <div className={styles.back_svg}>
                        <BiLeftArrowAlt />
                    </div>
                    <span>Reset your password ?<Link href="/">Login instred</Link></span>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        password,
                        conf_password
                    }}
                    validationSchema={passwordValidation}
                    onSubmit={() => { forgotHandler() }}>
                    {(form) => (
                        <Form>
                            <LoginInput
                                type="password"
                                icon="password"
                                name="password"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)} />
                            <LoginInput
                                type="password"
                                icon="password"
                                name="conf_password"
                                placeholder="Confirm Password"
                                onChange={(e) => setConf_Password(e.target.value)} />
                            <CircledIconBtn type="submit" text="Submit" />
                            {error && (
                                <span className={styles.error}>{error}</span>
                            )

                            }
                        </Form>
                    )
                    }
                </Formik>


            </div>
        </div>
        <Footer country="" />
    </>
    )
}