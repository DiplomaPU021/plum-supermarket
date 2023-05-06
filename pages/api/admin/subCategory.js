import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import nc from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import db from "../../../utils/db";
import slugify from "slugify";
import Product from "@/models/Product";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent, topParent } = req.body;
    await db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "SubCategory already exist, try a different name" });
    }
    await new SubCategory({
      name,
      parent,
      top_parent: topParent,
      slug: slugify(name, "_"),
    }).save();
    await db.disconnectDb();
    res.json({
      message: `SubCategory ${name} has been created successfully`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    await db.disconnectDb();
    console.log("31", error.message);
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    const productsToDelete = await Product.find({ subCategories: { $in: [id] } });
    let countDeletedProduct = 0;
    for (const element of productsToDelete) {
      await Product.findByIdAndDelete(element._id);
      countDeletedProduct++;
    }
    await SubCategory.findByIdAndRemove(id);
    await db.disconnectDb();
    return res.json({
      message: `SubCategory has been deleted succesfuly and ${countDeletedProduct} products has been deleted too`,
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent, topParent } = req.body;
    await db.connectDb();
    await SubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      top_parent: topParent,
      slug: slugify(name, "_"),
    });
    await db.disconnectDb();
    return res.json({
      message: "SubCategory has been updated succesfuly",
      subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const { groupSubCategory } = req.query;
    if (!groupSubCategory) {
      return res.json([]);
    }
    await db.connectDb();
    const result = await SubCategory.find({ parent: groupSubCategory }).select(
      "name"
    );
    await db.disconnectDb();
    return res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
