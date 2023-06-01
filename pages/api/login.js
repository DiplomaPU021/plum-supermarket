import nc from "next-connect";
import { ValidationError } from "yup";
import authService from "../../utils/services/auth.service";
import validationSchema from "../../utils/validations/users.validation";
import db from "../../utils/db";
import User from "../../models/User";

const handler = nc({})
  .post(async (req, res) => {
    try {
      await db.connectDb();
      const { email, password } = req.body;
      // console.log("loginApi", email, password);
      const token = await authService.login(email, password);
      // console.log("token", token);
      let user = await User.findById(token.sub);
      await db.disconnectDb();
      return res.status(200).json({ user,token });
    } catch (err) {
      // if (err instanceof ValidationError) {
      //   res.status(412).json(err.message);
      // }
      return res.status(500).json(err.message);
    }
  });

export default handler;