import styles from "./styles.module.scss";
import { useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import AdminInput from "../../inputs/adminInput";
import { toast } from "react-toastify";
import axios from "axios";
import { FormGroup, FormLabel, FormControl } from "react-bootstrap";

export default function Create({ setCoupons }) {
  const [discount, setDiscount] = useState(0);
  const tommorow = new Date();
  tommorow.setDate(tommorow.getDate() + 1);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(tommorow);

  const handleStartDate = (newValue) => {
    setStartDate(newValue.target.value);
  };

  const handleEndDate = (newValue) => {
    setEndDate(newValue.target.value);
  };

  const validate = Yup.object({
    discount: Yup.number()
      .required('Вкажіть знижку')
      .min(1, "Знижка має бути не менше 1%")
      .max(99, "Знижка має бути не більше 99%")
  });
  const submitHandler = async () => {
    try {
      const { data } = await axios.post("/api/coupon", {
        discount,
        startDate,
        endDate,
      });
      setCoupons(data.coupons);
      setDiscount(0);
      setStartDate(new Date());
      setEndDate(tommorow);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response);
    }
  };
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{ discount, startDate, endDate }}
        validationSchema={validate}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        {(formik) => (
          <Form 
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className={styles.header}>Створити купон</div>
            <AdminInput
              type="number"
              label="Знижка"
              name="discount"
              placeholder="Введіть розмір знижки..."
              onChange={(e) => setDiscount(e.target.value)}
            />
            <div className={styles.date_picker}>
              <FormGroup controlId="groupStartDate">
                <FormLabel className={styles.form_label}>
                  Початок дії
                </FormLabel>
                <FormControl
                  type="date"
                  name="startDate"
                  className={styles.form_control}
                  onChange={(e) => {
                    handleStartDate(e);
                  }}
                  value={startDate ? startDate : ""}
                  placeholder={startDate ? startDate : "dd/mm/yyyy"}
                />
              </FormGroup>
              <FormGroup controlId="groupEndDate">
                <FormLabel className={styles.form_label}>
                  Кінець дії
                </FormLabel>
                <FormControl
                  type="date"
                  name="endDate"
                  className={styles.form_control}
                  onChange={(e) => {
                    handleEndDate(e);
                  }}
                  value={endDate ? endDate : ""}
                  placeholder={endDate ? endDate : "dd/mm/yyyy"}
                />
              </FormGroup>
            </div>
            <div className={styles.btnWrap}>
              <button onClick={() => submitHandler()} className={`${styles.btn}`}>
                <span>Додати купон</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}
