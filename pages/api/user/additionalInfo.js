import nc from "next-connect";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import userService from "../../../utils/services/user.service";

const handler = nc().use(auth);

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    let user = await userService.getAdditionalInfo(req.user);
    await db.disconnectDb();
    if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
handler.put(async (req, res) => {
  try {
    await db.connectDb();
    const { additionalInfo } = req.body;
    let user = await userService.addAdditionalInfo(req.user, additionalInfo);
    await db.disconnectDb();
    if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default handler;
