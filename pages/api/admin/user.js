import nc from "next-connect";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import User from "../../../models/User";
import admin from "../../../middleware/admin";

const handler = nc().use(auth).use(admin);

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    const result = await User.findByIdAndRemove(id);
    //  await  db.disconnectDb();
    return res.json({
      message: `Користувача ${result.email} видалено!`,
      users: await User.find({}).sort({ updateAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
