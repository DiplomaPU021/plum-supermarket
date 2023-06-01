import styles from "./styles.module.scss";
import Modal from "react-bootstrap/Modal";
import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import ContinueWith from "./ContinueWith";
import * as yup from "yup";
import "yup-phone";
import { Formik } from "formik";
import axios from "axios";
import DotLoaderSpinner from "../../components/loaders/dotLoader";
import {
  getProviders,
  getSession,
  signIn,
  getCsrfToken,
  useSession,
} from "next-auth/react";
import { Container, Row, Col, Image } from "react-bootstrap";

const initialvalues = {
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
};
export default function Register({
  setRegShow,
  setLogShow,
  setCongratsShow,
  setUserProfileShow,
  setAuthShow,
}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(initialvalues);
  const { data: session, status } = useSession();
  const { email, password, conf_password, success, error } = user;

  const switchToMyCabinet = () => {
    setCongratsShow(false);
    setRegShow(false);
    setLogShow(false);
    setAuthShow(false);
    setUserProfileShow(true);
  };

  useEffect(() => {
    if (session) {
      switchToMyCabinet();
    }
  }, [session, switchToMyCabinet]);

  const switchToLogin = () => {
    setLogShow(true);
    setRegShow(false);
    setCongratsShow(false);
    setUserProfileShow(false);
  };

  const switchToCongrats = () => {
    setCongratsShow(true);
    setRegShow(false);
    setLogShow(false);
    setUserProfileShow(false);
  };
  const handleChangeCredencials = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const registerValidation = yup.object({
    email: yup
      .string()
      .email("Введіть коректний адрес email.")
      .trim()
      .required(
        "Email буде потрібний для входу в персональний кабінет та для скидання пароля."
      ),
    password: yup
      .string()
      .required("Введіть комбінацію 6 літер, цифр та спец. символів.")
      .min(6, "Пароль має мати принаймі 6 символів.")
      .max(36, "Пароль не може бути довшим за 36 символів."),
    conf_password: yup
      .string()
      .required("Підтвердіть пароль")
      .oneOf([yup.ref("password")], "Паролі не співпадають."),
  });
  const signUpHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post("/api/register", {
        email,
        password,
        conf_password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);
      setTimeout(async () => {
        switchToCongrats();
      }, 2000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.error });
    }
  };

  return (
    <Modal.Body className={styles.modalbodyreg}>
      {loading && <DotLoaderSpinner loading={loading} />}
      <Container className={styles.login_container}>
        <Row className={styles.body_row}>
          <Col className={styles.image_col}>
            <Image
              src="../../../images/register.png"
              width="416px"
              height="556px"
              alt=""
            />
          </Col>
          <Col>
            <Formik
              enableReinitialize
              initialValues={{
                email,
                password,
                conf_password,
              }}
              initialErrors={{ error }}
              validationSchema={registerValidation}
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              {(formik) => (
                <Form
                  method="post"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                  className={styles.reg_forms}
                >
                  <Form.Group className="mb-3" controlId="groupEmail">
                    <Form.Label className={styles.formlabel}>
                      Електронна пошта
                    </Form.Label>
                    <Form.Control
                      className={styles.forminput}
                      type="email"
                      name="email"
                      value={formik.values.email}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangeCredencials(e);
                      }}
                      isInvalid={
                        !!formik.errors.email || formik.initialErrors.error
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.email}
                      {formik.initialErrors.error}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="groupPassword">
                    <Form.Label className={styles.formlabel}>Пароль</Form.Label>
                    <Form.Control
                      className={styles.forminput}
                      type="password"
                      name="password"
                      value={formik.values.password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangeCredencials(e);
                      }}
                      isInvalid={!!formik.errors.password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="groupConfirmPassword">
                    <Form.Label className={styles.formlabel}>
                      Підтвердити пароль
                    </Form.Label>
                    <Form.Control
                      className={styles.forminput}
                      type="password"
                      name="conf_password"
                      value={formik.values.conf_password}
                      onChange={(e) => {
                        formik.handleChange(e);
                        handleChangeCredencials(e);
                      }}
                      isInvalid={!!formik.errors.conf_password}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formik.errors.conf_password}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <button
                    className={styles.loginbtn2}
                    variant="primary"
                    onClick={(e) => {
                      signUpHandler(e);
                    }}
                  >
                    Зареєструватись
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
            <div className={styles.regSwitch}>
              {" "}
              <p>
                Ви вже маєте акаунт?{" "}
                <span className={styles.register} onClick={switchToLogin}>
                  Увійти
                </span>
              </p>
            </div>
          </Col>
          <p className={styles.policy}>
            Реєструючись, ви погоджуєтеся з умовами положення про обробку і
            захист персональних даних та угодою користувача
          </p>
        </Row>
      </Container>
    </Modal.Body>
  );
}
