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
            return res.status(404).json({ message: "User not found" });
        }
        const user_id = createResetToken({
            id: user._id.toString(),
        });
        const url = `${process.env.BASE_URL}/auth/reset/${user_id}`;
        sendEmail(email, url, "", "Reset your password", resetEmailTemplate);
         await db.disconnectDb();
         res.json({
            message: "An email has been sent to your email address",

        });
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
});
export default handler;
