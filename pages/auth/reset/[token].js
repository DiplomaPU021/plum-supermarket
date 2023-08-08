import styles from "../../../styles/forgot.module.scss";
import Link from "next/link";
import { useState } from "react";
import Header from "../../../components/header";
import Footer from "../../../components/footer";
import axios from "axios";
import { BiLeftArrowAlt } from "react-icons/bi";
import CircledIconBtn from "../../../components/buttons/circledIconBtn";
import LoginInput from "../../../components/inputs/loginInput";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import DotLoaderSpinner from "../../../components/loaders/dotLoader";
import { Router } from "next/router";
import { getSession, signIn } from "next-auth/react";

export default function Reset({ user_id }) {
  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter your new password")
      .min(6, "Password must be at least 6 characters.")
      .max(36, "Password can't be more then 36 characters."),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Password must match."),
  });
  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });
      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    } catch (error) {
      setLoading(false);
      setSuccess("");
      setError(error.response.data.message);
    }
  };
  return (
    <>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Header country="" />
      <div className={styles.forgot}>
        <div>
          <div className={styles.forgot_header}>
            <div className={styles.back_svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              Reset your password? <Link href="/">Login instead</Link>
            </span>
          </div>

          <Formik
            enableReinitialize
            initialValues={{
              password,
              conf_password,
            }}
            validationSchema={passwordValidation}
            onSubmit={() => {
              resetHandler();
            }}
          >
            {(form) => (
              <Form>
                <LoginInput
                  type="password"
                  icon="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <LoginInput
                  type="password"
                  icon="password"
                  name="conf_password"
                  placeholder="Confirm Password"
                  onChange={(e) => setConf_password(e.target.value)}
                />
                <CircledIconBtn type="submit" text="Submit" />
                <div style={{ marginTop: "10px" }}>
                  {error && <span className={styles.error}>{error}</span>}
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
      <Footer country="" />
    </>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, process.env.RESET_TOKEN_SECRET);
  return {
    props: {
      user_id: user_id.id,
    },
  };
}
