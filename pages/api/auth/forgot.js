import nc from 'next-connect';
import db from "../../../utils/db";
import User from "../../../models/User";
import { createResetToken } from '../../../utils/tokens';
import { sendEmail } from '../../../utils/sendEmails';
import { resetEmailTemplate } from '@/emails/resetEmailTemplate';


const handler = nc();
handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { email } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }
        const user_id = createResetToken({
            id: user._id.toString(),
        });
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Поновіть свій пароль", resetEmailTemplate);
        // res.send(url);
       // console.log(addedUser);
         await db.disconnectDb();
         res.json({
            message: "На вашу поштову скриньку надіслано листа",

        });
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
});
export default handler;
