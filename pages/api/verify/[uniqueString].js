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
      res.status(200).setHeader("Content-Type", "text/html; charset=utf-8");

      return res.status(200).send(`
        <html>
          <head>
            <title>Email Confirmed</title>
            <meta charset="utf-8">
            <style type="text/css">
            body{background: #FAF8FF;}
            a {text-decoration: none;}
            .add{
              text-align: center;
              color: #220F4B;
              display: flex; 
              justify-content: center;
              flex-direction: column;
              margin:auto;
              height: 100%;
              width: 800px;
            }
            .logo{
              padding-top: 100px;
              width: 800px;
              height: 460px;
              border-radius: 23px;
              box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
              background: #a177a9;
            }
            img{
              padding-left: 160px;  
            }
            </style>
          </head>
          <body>
          <div class="add">
          <div class="logo"> 
            <a href='http://localhost:3000'>
            <img width="750px" height="150px" alt="" src="https://res.cloudinary.com/dzctqbi3o/image/upload/v1683558653/Diploma/email/vgmesq6pqjpeevid2xyr.png"/>
            </a>
            <h1>Email підтверджено</h1>
            <h2>Для переходу на сайт клікніть по логотипу</h2>
            </div>
            </div>
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
