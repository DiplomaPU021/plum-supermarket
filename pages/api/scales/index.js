import nc from "next-connect";
import SubCategory from "@/models/SubCategory";
import db from "@/utils/db";

const handler = nc();

handler.get(async (req, res) => {
  try {
    await db.connectDb();

    const subCategories = await SubCategory.find().lean();
    await db.disconnectDb();
    return res.status(200).json({
      subCategories,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
export default handler;
