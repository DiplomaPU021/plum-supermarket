import nc from "next-connect";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import userService from "../../../utils/services/user.service";

const handler = nc().use(auth);

handler.get(async (req, res) => {
  try {
    await db.connectDb();
    let user = await userService.getOneById(req.user);
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
    const { firstName, lastName, phoneNumber, email, gender, birthday } =
      req.body;
    let user = await userService.findByIdAndUpdateProfile(
      req.user,
      firstName,
      lastName,
      phoneNumber,
      email,
      gender,
      birthday,
    );
    await db.disconnectDb();
    if (user) {
      return res.status(200).json({ user });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default handler;
