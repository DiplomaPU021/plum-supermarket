import * as yup from "yup";
import "yup-phone";


const registerValidation = yup.object({
    firstName: yup.string()
        .min(3, "Ім'я має бути мінімум 3 символи")
        .max(20, "Ім'я має бути максимум 20 символів")
        .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
        .required("Ім'я обов'язково"),
    lastName: yup.string()
        .min(3, "Прізвище має бути мінімум 3 символи")
        .max(20, "Прізвище має бути максиFмум 20 символів")
        .matches(/^[А-Яа-яЇїІі'-]*[^\s][А-Яа-яЇїІі' -]*$/, "Цифри та спец.символи заборонено")
        .required("Прізвище обов'язково"),
    phoneNumber: yup.string().test('phone', 'Некоректний номер телефону', value => {
        if (!value) return true;
        return yup.string().phone('UA').isValidSync(value) && value.length >= 10 && value[0] === '0';
    }),
    email: yup.string().email().trim().required("Email буде потрібний для входу в персональний кабінет та для скидання пароля.")
        .email("Введіть коректний адрес email."),
    password: yup.string().required("Введіть комбінацію 6 літер, цифр та спец. символів.")
        .min(6, "Пароль має мати принаймі 6 символів.")
        .max(36, "Пароль не може бути довшим за 36 символів."),
    conf_password: yup.string().required("Підтвердіть пароль")
        .oneOf([yup.ref("password")], "Паролі не співпадають.")
});
const loginValidation = yup.object({
    login_email: yup.string().trim().required("Введіть електронну адресу.").email("Введіть дійсну електронну адресу"),
    login_password: yup.string().required("Введіть пароль")
});

const yupValidation = {
    registerValidation,
    loginValidation
};

export default yupValidation;
