import nc from "next-connect";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import admin from "../../../middleware/admin";
import slugify from "slugify";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import GroupSubCategory from "../../../models/GroupSubCategory";
import Product from "../../../models/Product";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name } = req.body;
    await db.connectDb();
    const test = await Category.findOne({ name });
    if (test) {
      return res
        .status(400)
        .json({ message: "Така категорія вже існує, спробуйте інше ім'я" });
    }
    await new Category({ name, slug: slugify(name, "_") }).save();
    // await db.disconnectDb();
    return res.json({
      message: `Категорія ${name} створена успішно`,
      categories: await Category.find({}).sort({ name: 1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    const groupSubCategoriesToDelete = await GroupSubCategory.find({
      parent: id,
    });
    const subCategoriesToDelete = await SubCategory.find({ top_parent: id });
    let productsToDeleteGroup = [];
    for (const element of subCategoriesToDelete) {
      let productsToDelete = await Product.find({
        subCategories: { $in: [element._id.toString()] },
      });
      productsToDeleteGroup = productsToDeleteGroup.concat(productsToDelete);
    }
    if (
      groupSubCategoriesToDelete.length == 0 &&
      subCategoriesToDelete.length == 0 &&
      productsToDeleteGroup.length == 0
    ) {
      await Category.findByIdAndRemove(id);
      // await db.disconnectDb();
      return res.json({
        message: "Категорія видалена успішно!",
        categories: await Category.find({}).sort({
          name: 1,
        }),
      });
    } else {
      throw new Error(
        `Категорія містить  ${groupSubCategoriesToDelete?.length} груп(-у) підкатегорій, ${subCategoriesToDelete?.length} підкатегорію(-ій) та ${productsToDeleteGroup?.length} продукт(-ів)`,
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name } = req.body;
    await db.connectDb();
    await Category.findByIdAndUpdate(id, {
      name,
      slug: slugify(name, "_"),
    });
    // await db.disconnectDb();
    return res.json({
      message: `Категорія оновлена успішно!`,
      categories: await Category.find({}).sort({ name: 1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
