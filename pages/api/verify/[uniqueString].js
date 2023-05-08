import User from "@/models/User";
import db from "@/utils/db";
import nc from "next-connect";

const handler = nc().get(async (req, res) => {
  try {
    await db.connectDb();
    const { uniqueString } = req.query;
    const user = await User.findOne({ uniqueString });
    if (user) {
      await user.updateOne(
        {
          email_verified: true,
        },
        { new: true }
      );
      await db.disconnectDb();
      //   return res
      //     .status(200)
      //     .json({ message: "email confirmed. Please login <a href='http://localhost:3000'>http://localhost:3000</a>" });
      // }
      res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");

      // повертаємо сторінку з повідомленням
      return res.status(200).send(`
        <html>
          <head>
            <title>Email Confirmed</title>
            <meta charset="utf-8">
          </head>
          <body>
            <h1>Email підтверджено. Тепер ви можете увійти на сайт</h1>
            <a href='http://localhost:3000'>Plum</a>
          </body>
        </html>
      `);
    }

    return res
      .status(404)
      .json({ message: "Щось пішло не так. Будь ласка, спробуйте знову" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default handler;
