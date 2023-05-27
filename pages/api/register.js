import nc from "next-connect";
import authService from "@/utils/services/auth.service";
// import yupValidation from "@/utils/validations/users.validation";
import db from "@/utils/db";
import { createActivationToken } from "@/utils/tokens";

const handler = nc();
handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { email, password, conf_password} = req.body;
    if(password !== conf_password){
      return res.status(500).json({ error: "Паролі не співпадають!" });
    }
    const user = await authService.registerUser(email, password);
    const activation_token = createActivationToken({
      id: user._id.toString(),
  });
    await db.disconnectDb();
    return res.status(201).json({
      message: `user ${user._id} registered! Please confirm your email to login`,
      activation_token: activation_token,
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
