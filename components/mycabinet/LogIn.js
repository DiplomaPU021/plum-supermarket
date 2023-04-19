import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";
import { useRouter } from "next/router";
import Form from "react-bootstrap/Form";
import { Container, Row, Col, Image } from "react-bootstrap";
import ContinueWith from "./ContinueWith";
import * as yup from "yup";
import {
  getProviders,
  getSession,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { useEffect, useState } from "react";
import { Formik } from "formik";
import DotLoaderSpinner from "../loaders/dotLoader";
import axios from "axios";

const initialvalues = {
  login_email: "",
  login_password: "",
  login_error: "",
};
export default function LogIn({
  setRegShow,
  setLogShow,
  setCongratsShow,
  setAuthShow,
  setUserProfileShow,
  setUser
}) {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [userLogin, setUserLogin] = useState(initialvalues);
  const [csrfToken, setCsrfToken] = useState("");

  // useEffect(() => {
  //     if (session &&(status=="authenticated"||status=="loading")) {
  //         switchToMyCabinet();
  //     }
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await getCsrfToken();
      // console.log("token2", Object.values(response));
      // console.log("sessionOnLogin///////////", session, status);
      if (response) {
        setCsrfToken(response);
      }
    }
    fetchData();
  }, []); // Or [] if effect doesn't need props or state

  const { login_email, login_password, login_error } = userLogin;
  const loginValidation = yup.object({
    login_email: yup
      .string()
      .trim()
      .required("Введіть електронну адресу.")
      .email("Введіть дійсну електронну адресу"),
    login_password: yup.string().required("Введіть пароль"),
  });
  const handleChangeCredencials = (e) => {
    // console.log("e.target.name, e.target.name");
    // console.log("e.target.value", e.target.value);
    const { name, value } = e.target;
    setUserLogin({ ...userLogin, [name]: value });
  };
  const switchToMyCabinet = async () => {
    try {
      const res = await axios.get('/api/user/manageProfile');
      const data = res.data;

      setUser(data.user);
      setCongratsShow(false);
      setRegShow(false);
      setLogShow(false);
      setAuthShow(false);
      setUserProfileShow(true);
    } catch (error) {
      console.log(error);
    }

  };
  const signInHandler = async () => {
    try {
      setLoading(true);
      let options = {
        redirect: false,
        email: login_email,
        password: login_password,
        // callbackUrl:"/"
      };
      const res = await signIn("credentials", options);
      // console.log("responseFrom SignIn", res);

      // const { data } = await axios.post('/api/login', JSON.stringify({
      //     email:login_email,
      //     password:login_password,
      // }), {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   });
      //     console.log("dataTokenOnLogin///////////", data);
      //   setCsrfToken(data.token);
      // //   session.user.id = csrfToken.sub || data.user._id.toString();
      // //   session.user.role = data.user.role || "user";

      // console.log("sessionOnLogin///////////", session, status);
      setUserLogin({ ...userLogin, login_error: res.error, success: "" });

      setLoading(false);
      if (res.error) {
        console.log("errorOnLogin", userLogin.login_error);
      } else {
        switchToMyCabinet();
      }
    } catch (error) {
      setLoading(false);
      setuserLogin({ ...userLogin, success: "", login_error: error });
      // switchToRegister();
    }
    // if (res?.error) {
    //     setLoading(false);
    //     setuserLogin({ ...userLogin, login_error: res?.error });
    // } else {
    //     switchToRegister();
    //     // return Router.push(callbackUrl || "/");
    // }
  };
  const switchToRegister = () => {
    setRegShow(true);
    setCongratsShow(false);
    setLogShow(false);
    setAuthShow(false);
    setUserProfileShow(false);
  };

  return (
    <Modal.Body className={styles.modalbodyreg}>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Container className={styles.login_container}>
        <Row>
          <Col>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              initialErrors={{ login_error }}
              validationSchema={loginValidation}
              onSubmit={(e) => {
                e.preventDefault(e);
              
              }}
            >
              {(formik) => (
                <Form
                  onSubmit={(e) => {
                    e.preventDefault(e);
                  }}
                  className={styles.login_forms}
                >
                  <input
                    type="hidden"
                    readOnly
                    name="csrfToken"
                    value={csrfToken}
                  />
                  <Form.Group className="mb-3" controlId="groupLoginEmail">
                    <Form.Label className={styles.formlabel}>
                      Електронна пошта
                    </Form.Label>
                    <Form.Control
                      className={styles.forminput}
                      type="email"
                      name="login_email"
                      value={formik.values.login_email}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangeCredencials(e);
                      }}
                      isInvalid={
                        !!formik.errors.login_email ||
                        formik.initialErrors.login_error
                      }
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.login_email}
                      {formik.initialErrors.login_error}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="groupLoginPassword">
                    <Form.Label className={styles.formlabel}>Пароль</Form.Label>
                    <Form.Control
                      className={styles.forminput}
                      type="password"
                      name="login_password"
                      value={formik.values.login_password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangeCredencials(e);
                      }}
                      isInvalid={!!formik.errors.login_password}
                    />
                    <Form.Control.Feedback
                      type="invalid"
                      className={styles.feedback}
                    >
                      {formik.errors.login_password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <div className={styles.forgot_flex}>
                    <Form.Group className="mb-3" controlId="groupLoginCheckbox">
                      <Form.Check type="checkbox" label="Запам'ятати мене" />
                    </Form.Group>
                    <Link className={styles.forgot} href="/auth/forgot">
                      Забули пароль?
                    </Link>
                  </div>
                  <button
                    className={styles.loginbtn2}
                    variant="primary"
                    onClick={signInHandler}
                  >
                    Увійти
                  </button>
                  <ContinueWith
                    setLogShow={setLogShow}
                    setRegShow={setRegShow}
                    setCongratsShow={setCongratsShow}
                    setAuthShow={setAuthShow}
                    setUserProfileShow={setUserProfileShow}
                  />
                </Form>
              )}
            </Formik>

            <div className={styles.registerSwitch}>
              <p>
                Ви ще не маєте акаунту?{" "}
                <span className={styles.register} onClick={switchToRegister}>
                  Зареєструватися
                </span>
              </p>
            </div>
          </Col>
          <Col className={styles.login_col2}>
            <Image src='../../../images/login.png' width="463px" height="528px" />
          </Col>
        </Row>
      </Container>
    </Modal.Body>
  );
}
