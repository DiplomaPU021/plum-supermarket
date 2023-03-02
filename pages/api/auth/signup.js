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
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        if (!validateEmail(email)) {
            return res.status(400).json({ message: "Please enter a valid email" });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "This email is already registered!" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email,
            password: cryptedPassword
        });
        const addedUser = await newUser.save();
        const activation_token = createActivationToken({
            id: addedUser._id.toString(),
        });
        console.log("activation_token",activation_token);
        const url = `${process.env.BASE_URL}/activate/${activation_token}`;
        sendEmail(email, url, "", "Activate your account", activateEmailTemplate);
        // res.send(url);
       // console.log(addedUser);
         await db.disconnectDb();
         res.json({
            message: "Successfully registered! Please check your email for activation link",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default handler;
