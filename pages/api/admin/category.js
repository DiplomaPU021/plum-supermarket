import Category from "../../../models/Category";
import nc from "next-connect";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import db from "../../../utils/db";
import slugify from "slugify";
import SubCategory from "@/models/SubCategory";
import GroupSubCategory from "@/models/GroupSubCategory";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    await db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Category already exist, try a different name" });
    }
    await new Category({ name, slug: slugify(name, "_") }).save();
    await db.disconnectDb();
    res.json({
      message: `Category ${name} has been created successfully`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    await db.disconnectDb();
    res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    await Category.findByIdAndRemove(id);
    await db.disconnectDb();
    return res.json({
      message: "Category has been deleted succesfuly",
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    await db.connectDb();

    const subCategoriesToDelete = await SubCategory.find({ top_parent: id });
    let productsToDeleteGroup = [];
    for (const element of subCategoriesToDelete) {
      let productsToDelete = await Product.find({ subCategories: { $in: [element._id.toString()] } });
      productsToDeleteGroup = productsToDeleteGroup.concat(productsToDelete);
    }
    let countDeletedProduct = 0;
    for (const element of productsToDeleteGroup) {
      await Product.findByIdAndDelete(element._id);
      countDeletedProduct++;
    }
    let countDeletedSubCategories = 0;
    for (const element of subCategoriesToDelete) {
      await SubCategory.findByIdAndDelete(element._id);
      countDeletedSubCategories++;
    }
    let countDeletedGroupSubCategories=0;
    const gropupSubCategoriesToDelete = await GroupSubCategory.find({ parent: id });
    for (const element of gropupSubCategoriesToDelete) {
      await GroupSubCategory.findByIdAndDelete(element._id);
      countDeletedGroupSubCategories++;
    }

    await Category.findByIdAndUpdate(id, { name });
    await db.disconnectDb();
    return res.json({
      message: `Category has been deleted succesfuly  ${countDeletedGroupSubCategories} group of subcategories and ${countDeletedSubCategories} subcategories and ${countDeletedProduct} products has been deleted silmuteniously`,
      categories: await Category.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default handler;
