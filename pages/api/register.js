import nc from "next-connect";
import authService from "@/utils/services/auth.service";
// import yupValidation from "@/utils/validations/users.validation";
import db from "@/utils/db";


const handler = nc()
  .post(async (req, res) => {
    try {
      await db.connectDb();
      const {  email, password } =req.body;
      console.log( email, password);
      const user = await authService.registerUser( email, password);
      await db.disconnectDb();
      return res.status(201).json({
        message: `user ${user._id} registered! Please confirm your email to login`,
      });
    } catch (err) {
      if (err.message.includes("Такий")) {
        return res.status(400).json({ error: err.message });
      } else {
        return res.status(500).json({ error: err.message });
      }
    }
  });

export default handler;