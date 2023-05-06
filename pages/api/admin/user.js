import User from "../../../models/User";
import nc from "next-connect";
import auth from '../../../middleware/auth'
import db from "../../../utils/db"

const handler = nc();//.use(auth);

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        db.connectDb();
        await User.findByIdAndRemove(id);
        db.disconnectDb;
        return res.json({
            message: "User has been deleted succesfuly",
            users: await User.find({}).sort({ updateAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default handler;
