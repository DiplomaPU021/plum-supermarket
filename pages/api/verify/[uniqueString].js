import User from "@/models/User";
import nc from "next-connect";


const handler = nc.get(
  async (req, res) => {
    try {
     
      await db.connectDb();
 const { uniqueString } = req.query;
 const user  = await User.findOne({ uniqueString });
 

      if (user) {
        await user.updateOne({
            emailVerified:true,
        }, { new: true });
        await db.disconnectDb();
        return res
          .status(200)
          .json({ message: "email confirmed. Please login" });
      }

      return res
        .status(404)
        .json({ message: "Something went wrong. Please try again" });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

export default handler;
