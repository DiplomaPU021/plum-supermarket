import SubCategory from "@/models/SubCategory";
import nc from "next-connect";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import db from "@/utils/db";
import slugify from "slugify";
import Product from "@/models/Product";
import GroupSubCategory from "@/models/GroupSubCategory";
import Category from "@/models/Category";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent, topParent } = req.body;
    await db.connectDb();
    const test = await SubCategory.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Така назва підкатегорії вже існує, виберіть нову" });
    }
    await new SubCategory({
      name,
      parent,
      top_parent: topParent,
      slug: slugify(name, "_"),
    }).save();
    await db.disconnectDb();
   return res.json({
      message: `Підкатегорія ${name} створена успішно`,
      subCategories: await SubCategory.find({})
      .populate({ path: "parent", model: GroupSubCategory })
      .populate({ path: "top_parent", model: Category })
      .sort({ name: 1 }),
    });
  } catch (error) {
    await db.disconnectDb();
    console.log("31", error.message);
   return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    const existProducts = await Product.find({ subCategories: { $in: [id] } });;
    if(existProducts.length == 0) {
      await SubCategory.findByIdAndRemove(id);
      await db.disconnectDb();
      return res.json({
        message: "Підкатегорія успішно видалена!",
        subCategories: await SubCategory
        .find({})
        .populate({ path: "parent", model: GroupSubCategory })
        .populate({ path: "top_parent", model: Category })
        .sort({ name: 1 }),
      });
    } else {
      await db.disconnectDb();
      throw new Error(`У підкатегорії є ${existProducts.length} продукт(-ів), спершу видаліть їх!`)
    }
  } catch (error) {
   return res.status(500).json({ message: error.message });
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
      message: "Підкатегорія успішно змінена",
      subCategories: await SubCategory.find({})
      .populate({ path: "parent", model: GroupSubCategory })
      .populate({ path: "top_parent", model: Category })
      .sort({ name: 1 }),
    });
  } catch (error) {
   return res.status(500).json({ message: error.message });
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
    ).sort({
      name: 1,
    });
    await db.disconnectDb();
    return res.json(result);
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
});

export default handler;
