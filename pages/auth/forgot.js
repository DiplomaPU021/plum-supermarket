import styles from "../../styles/forgot.module.scss"
import Link from "next/link"
import {useState} from "react"
import Header from "../../components/header"
import Footer from "../../components/footer"
import { BiLeftArrowAlt } from "react-icons/bi"
import CircledIconBtn from "../../components/buttons/circledIconBtn"
import LoginInput from "../../components/inputs/loginInput"
import { Formik, Form } from "formik"
import * as Yup from "yup"


export default function forgot() {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const emailValidation=Yup.object({
        email: Yup.string().required("You will need this when you log in and for reset password.")
        .email("Enter a valid email address."),
    })
    const forgotHandler=async()=>{}
    return (<>
        <Header country="" />
        <div className={styles.forgot}>
            <div>
                <div className={styles.forgot_header}>
                    <div className={styles.back_svg}>
                        <BiLeftArrowAlt />
                    </div>
                    <span>Forgot your password ?<Link href="/auth/forgot">Login instred</Link></span>
                </div>

                <Formik
                    enableReinitialize
                    initialValues={{
                        email,

                    }}
                    validationSchema={emailValidation}
                    onSubmit={() => { forgotHandler() }}>
                    {(form) => (
                        <Form>
                            <LoginInput
                                type="text"
                                icon="email"
                                name="email"
                                placeholder="Email Address"
                                onChange={(e) => setEmail(e.target.value)} />

                            <CircledIconBtn type="submit" text="Send link" />
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