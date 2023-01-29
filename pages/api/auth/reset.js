import nc from 'next-connect';
import bcrypt from "bcryptjs";
import db from "../../../utils/db";
import User from "../../../models/User";


const handler = nc();
handler.put(async (req, res) => {
    try {
        console.log("hello from reset server");
        await db.connectDb();
        const { user_id, password } = req.body;
        console.log("user_id: " + user_id + " password: " + password);

        const user = await User.findById(user_id);
        console.log(user.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const cryptedPassword = await bcrypt.hash(password, 12);
        await user.updateOne({ password: cryptedPassword, });

        res.json({ email: user.email });
        await db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default handler;
