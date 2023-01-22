import React from 'react';
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import { BiLeftArrowAlt } from "react-icons/bi"
import Link from "next/link"
import { Formik, Form } from "formik"
import LoginInput from "../components/inputs/loginInput"

export default function signin() {
    return (
        <>
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
                        <Formik>
                            {(form) => (
                                    <Form>
                                        <LoginInput icon="email"/>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
                </div>
            </div>
            <Footer country="Ukraine" />
        </>
    )
}
