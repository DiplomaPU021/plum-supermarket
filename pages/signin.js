import React from 'react';
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import { BiLeftArrowAlt } from "react-icons/bi"
import Link from "next/link"
import { Formik, Form, prepareDataForValidation } from "formik"
import * as Yup from "yup"
import { getProviders, signIn } from "next-auth/react"
import LoginInput from "../components/inputs/loginInput"
import CircledIconBtn from "../components/buttons/circledIconBtn"
import DotLoaderSpinner from '@/components/loaders/dotLoader';
import Router from "next/router"

const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "register success",
    error: "error from backend",
}

export default function signin({ providers }) {
    const [loading, setLoading] = React.useState(false)
    const [user, setUser] = React.useState(initialvalues);
    const { login_email, login_password, name,
        email,
        password,
        conf_password } = user;

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const loginValidation = Yup.object({
        login_email: Yup.string().required("Email address is required.").email("Please enter a valid email address"),
        login_password: Yup.string().required("Please enter a password")
    })
    const registerValidation = Yup.object({
        name: Yup.string().required("What's your name ?")
            .min(2, "First name must be between 2and 16 characters.")
            .max(16, "First name must be between 2and 16 characters.")
            .matches(/^[aA-zZ]/, "Numbers and special characters are not alowed."),
        email: Yup.string().required("You will need this when you log in and for reset password.")
            .email("Enter a valid email address."),
        password: Yup.string().required("Enter a combination of at least 6 numbers, letters and punctuation marks.")
            .min(6,"Password must be at least 6 characters.")
            .max(36, "Password can't be more then 36 characters."),
        conf_password: Yup.string().required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password must match.")
    })
    return (
        <>
            {
                loading && <DotLoaderSpinner loading={loading} />
            }
            <Header />
            <div className={styles.login}>
                <div className={styles.login_container}>
                    <div className={styles.login_header}>
                        <div className={styles.back_svg}>
                            <BiLeftArrowAlt />
                        </div>
                        <span>We'd be happy to join us! <Link href="/">Go Store</Link></span>
                    </div>
                    <div className={styles.login_form}>
                        <h1>Sign in</h1>
                        <p>Get access to one of the best E-Shopping services in the world.</p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                login_email,
                                login_password,
                            }}
                            validationSchema={loginValidation}>
                            {(form) => (
                                <Form>
                                    <LoginInput
                                        type="text"
                                        icon="email"
                                        name="login_email"
                                        placeholder="Email Address"
                                        onChange={handleChange} />
                                    <LoginInput
                                        type="password"
                                        icon="password"
                                        name="login_password"
                                        placeholder="Password"
                                        onChange={handleChange} />
                                    <CircledIconBtn type="submit" text="Sign in" />
                                    <div className={styles.forgot}>
                                        <Link href="/auth/forgot">Forgot password ?</Link>
                                    </div>
                                </Form>
                            )
                            }
                        </Formik>
                        <div className={styles.login_socials}>
                            <span className={styles.login_or}>Or continue with</span>
                            <div className={styles.login_socials_wrap}>
                                {providers.map((provider) => (
                                    <div key={provider.name}>
                                        <button className={styles.social_btn}
                                            onClick={() => signIn(provider.id)}>
                                            <img src={`../../icons/${provider.name}.png`} alt="provider" />
                                            Sign in with {provider.name}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.login_container}>

                    <div className={styles.login_form}>
                        <h1>Sign up</h1>
                        <p>Get access to one of the best E-Shopping services in the world.</p>
                        <Formik
                            enableReinitialize
                            initialValues={{
                                name,
                                email,
                                password,
                                conf_password,
                            }}
                            validationSchema={registerValidation}>
                            {(form) => (
                                <Form>
                                    <LoginInput
                                        type="text"
                                        icon="user"
                                        name="name"
                                        placeholder="Full Name"
                                        onChange={handleChange} />
                                    <LoginInput
                                        type="text"
                                        icon="email"
                                        name="email"
                                        placeholder="Email Address"
                                        onChange={handleChange} />
                                    <LoginInput
                                        type="password"
                                        icon="password"
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange} />
                                    <LoginInput
                                        type="password"
                                        icon="password"
                                        name="conf_password"
                                        placeholder="Re-Type Password"
                                        onChange={handleChange} />
                                    <CircledIconBtn type="submit" text="Sign up" />
                                </Form>
                            )
                            }
                        </Formik>
                        {/* <div>
                            {success && <span className={styles.success}>{success}</span>}
                        </div>
                        <div>
                            {error && <span className={styles.error}>{error}</span>}
                        </div> */}
                    </div>
                </div>
            </div>
            <Footer country="Ukraine" />
        </>
    )
}

export async function getServerSideProps(context) {
    const providers = Object.values(await getProviders())
    return {
        props: { providers }
    }
}
