import React from 'react';
import Header from "../components/header"
import Footer from "../components/footer"
import styles from "../styles/signin.module.scss"
import { BiLeftArrowAlt } from "react-icons/bi"
import Link from "next/link"
import { Formik, Form } from "formik"
import * as Yup from "yup"
import { getProviders, getSession, signIn, getCsrfToken } from "next-auth/react"
import axios from "axios";
import LoginInput from "../components/inputs/loginInput"
import CircledIconBtn from "../components/buttons/circledIconBtn"
import DotLoaderSpinner from '../components/loaders/dotLoader';
import Router from "next/router"
import { SiNumpy } from 'react-icons/si';
import 'bootstrap/dist/css/bootstrap.min.css';


const initialvalues = {
    login_email: "",
    login_password: "",
    name: "",
    email: "",
    password: "",
    conf_password: "",
    success: "",
    error: "",
    login_error: "",
}

export default function signin({ providers, callbackUrl, csrfToken, country }) {
    const [loading, setLoading] = React.useState(false)
    const [user, setUser] = React.useState(initialvalues);
    const {
        login_email,
        login_password,
        name,
        email,
        password,
        conf_password,
        success,
        error,
        login_error,
    } = user;

    const handleChange =  (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    };

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
            .min(6, "Password must be at least 6 characters.")
            .max(36, "Password can't be more then 36 characters."),
        conf_password: Yup.string().required("Confirm your password")
            .oneOf([Yup.ref("password")], "Password must match.")
    });

    const signInHandler = async () => {
        setLoading(true);
        let options = {
            redirect: false,
            email: login_email,
            password: login_password,
        };
        const res = await signIn('credentials', options);
        setUser({ ...user, error: "", success: "" });
        setLoading(false);
        if (res?.error) {
            setLoading(false);
            setUser({ ...user, login_error: res?.error });
        } else {
            return Router.push(callbackUrl || "/");
        }
    };
    const signUpHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/auth/signup', {
                name,
                email,
                password,
            });
            setUser({ ...user, error: "", success: data.message });
            setLoading(false);
            setTimeout(async () => {
                let options = {
                    redirect: false,
                    email: email,
                    password: password,
                };
                const res = await signIn('credentials', options);
                Router.push("/");
            }, 2000);
        } catch (error) {
            setLoading(false);
            setUser({ ...user, success: "", error: error.response.data.message });
        }
    };
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
                            validationSchema={loginValidation}
                            onSubmit={() => {
                                signInHandler();
                            }}>
                            {(form) => (
                                <Form method="post" action="/api/auth/signin/email">
                                    <input
                                        type="hidden"
                                        name="csrfToken"
                                        value={csrfToken}
                                    />
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
                                    {login_error && (
                                        <span className={styles.error}>{login_error}</span>
                                    )}
                                    <div className={styles.forgot}>
                                        <Link href="/auth/forgot">Forgot password ?</Link>
                                    </div>
                                </Form>
                            )}

                        </Formik>
                        <div className={styles.login_socials}>
                            <span className={styles.login_or}>Or continue with</span>
                            <div className={styles.login_socials_wrap}>
                                {providers.map((provider) => {
                                    if (provider.name == "Credentials") {
                                        return;
                                    }
                                    return (
                                        <div key={provider.name}>
                                            <button className={styles.social_btn}
                                                onClick={() => signIn(provider.id)}>
                                                <img src={`../../icons/${provider.name}.png`} alt="provider" />
                                                Sign in with {provider.name}
                                            </button>
                                        </div>
                                    );
                                })}
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
                            validationSchema={registerValidation}
                            onSubmit={ () => {
                                signUpHandler();
                            }}>
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
                                        onChange={handleChange}
                                    />
                                    <CircledIconBtn type="submit" text="Sign up" />
                                </Form>
                            )}
                        </Formik>
                        <div>
                            {success && <span className={styles.success}>{success}</span>}
                        </div>
                        <div>
                            {error && <span className={styles.error}>{error}</span>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer country={country} />
        </>
    )
}

export async function getServerSideProps(context) {
    const { req, query } = context;
    const session = await getSession({req});
    const { callbackUrl } = query;
    let data = {name: "Ukraine", flag: { emojitwo: "https://cdn.ipregistry.co/flags/emojitwo/ua.svg"}, code: "UA"};
    /* Увага!!! замість обєкту можна використати сервіс ipregistry з наступним методом
      await axios
      .get('https://api.ipregistry.co/?key=aq50e9f94war7j9p')
      .then((res) => {      
        return res.data.location.country;
      })
      .catch((err)=> {
        console.log(err);      
      });*/
    if (session) {
        return {
            redirect: {
                destination: callbackUrl,
            },
        };
    };
    const csrfToken = await getCsrfToken(context);
    const providers = Object.values(await getProviders());
   const country= { name: data.name, flag: data.flag.emojitwo, code: data.code };
    return {
        props: { providers, csrfToken, callbackUrl, country },
       
    };
}
