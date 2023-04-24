import nc from 'next-connect';
import bcrypt from "bcryptjs";
import { validateEmail } from "../../../utils/validation";
import db from "../../../utils/db";
import User from "../../../models/User";
import { createActivationToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendEmails';
import { activateEmailTemplate } from '@/emails/activateEmailTemplate';


const handler = nc();
handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { firstName,lastName, phoneNumber, email, password } = req.body;
        // console.log("credencials",firstName,lastName, phoneNumber, email, password);
        if ( !email || !password) {
            return res.status(400).json({ message: "Будь ласка заповніть всі поля" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Введіть дійсну електронну адресу" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Цей email вже зареєстровано!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Пароль має містити принаймі 6 літер" });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            firstName,
            lastName,
            phoneNumber,
            email,
            password: cryptedPassword
        });
        const addedUser = await newUser.save();
        const activation_token = createActivationToken({
            id: addedUser?._id.toString(),
        });
        // console.log("activation_token////////////////",activation_token);
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
        await addedUser.updateOne({ uniqueString: url, });
        sendEmail(email, url, "", "Активуйте вашу електронну адресу", activateEmailTemplate);
        // res.send(url);
    //    console.log(addedUser);
         await db.disconnectDb();
         res.json({
            message: "Успішно зареєстровано! Перевірте вашу адресу на наявність листа активації",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default handler;
