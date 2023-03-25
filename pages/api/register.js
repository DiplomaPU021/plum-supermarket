import nc from "next-connect";
import authService from "@/utils/services/auth.service";
// import yupValidation from "@/utils/validations/users.validation";
import db from "@/utils/db";


const handler = nc()
  .post(async (req, res) => {
    try {
      await db.connectDb();
      const { firstName, lastName, phoneNumber, email, password } =req.body;
      const user = await authService.registerUser(firstName, lastName, phoneNumber, email, password);
      await db.disconnectDb();
      return res.status(201).json({
        message: `user ${user._id} registered! Please confirm your email to login`,
      });
    } catch (err) {
      return res.status(500).json(err.message);
    }
  });

export default handler;