import Category from "@/models/Category";
import nc from "next-connect";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import db from "@/utils/db";
import slugify from "slugify";
import GroupSubCategory from "@/models/GroupSubCategory";
import SubCategory from "@/models/SubCategory";
import Product from "@/models/Product";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    const { name, parent } = req.body;
    await db.connectDb();
    const test = await GroupSubCategory.findOne({ name });
    if (test) {
      return res.status(400).json({
        message: "Така група підкатегорій вже існує, спробуйте інше ім'я",
      });
    }
    await new GroupSubCategory({
      name,
      parent,
      slug: slugify(name, "_"),
    }).save();
    await db.disconnectDb();
    return res.json({
      message: `Група підкатегорій ${name} створена успішно`,
      groupSubCategories: await GroupSubCategory.find({}).populate({ path: "parent", model: Category }).sort({
        name: 1,
      }),
    });
  } catch (error) {
    await db.disconnectDb();
    return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    // const { id } = req.body;
    // await db.connectDb();
    // const subCategoriesToDelete = await SubCategory.find({ parent: id });
    // let productsToDeleteGroup = [];
    // for (const element of subCategoriesToDelete) {
    //   let productsToDelete = await Product.find({ subCategories: { $in: [element._id.toString()] } });
    //   productsToDeleteGroup = productsToDeleteGroup.concat(productsToDelete);
    // }
    // let countDeletedProduct = 0;
    // for (const element of productsToDeleteGroup) {
    //   await Product.findByIdAndDelete(element._id);
    //   countDeletedProduct++;
    // }
    // let countDeletedSubCategories = 0;
    // for (const element of subCategoriesToDelete) {
    //   await SubCategory.findByIdAndDelete(element._id);
    //   countDeletedSubCategories++;
    // }
    // await GroupSubCategory.findByIdAndRemove(id);
    // await db.disconnectDb();
    // return res.json({
    //   message: `GroupSubCategory has been deleted succesfuly and ${countDeletedSubCategories} subcategories and ${countDeletedProduct} products has been deleted silmuteniously`,
    //   groupSubCategories: await GroupSubCategory.find({}).sort({
    //     updatedAt: -1,
    //   }),
    // });
    const { id } = req.body;
    await db.connectDb();
    const subCategoriesToDelete = await SubCategory.find({ parent: id });
  
    let productsToDeleteGroup = [];
    for (const element of subCategoriesToDelete) {
      let productsToDelete = await Product.find({
        subCategories: { $in: [element._id.toString()] },
      });
      productsToDeleteGroup = productsToDeleteGroup.concat(productsToDelete);
    }
    if (
      subCategoriesToDelete.length == 0 &&
      productsToDeleteGroup.length == 0
    ) {
      await GroupSubCategory.findByIdAndRemove(id);
      await db.disconnectDb();
      return res.json({
        message: "Група підкатегорій видалена успішно!",
        groupSubCategories: await GroupSubCategory.find({}).sort({
          name: 1,
        }),
      });
    } else {
      throw new Error(
        `Група підкатегорій містить ${subCategoriesToDelete?.length} підкатегорю(-ій) та ${productsToDeleteGroup?.length} продукт(-ів)`
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, name, parent } = req.body;
    await db.connectDb();
    await GroupSubCategory.findByIdAndUpdate(id, {
      name,
      parent,
      slug: slugify(name, "_"),
    });
    await db.disconnectDb();
    return res.json({
      message: "Група підкатегорій оновлена успішно",
      groupSubCategories: await GroupSubCategory.find({}).populate({ path: "parent", model: Category }).sort({
        name: 1,
      }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.get(async (req, res) => {
  try {
    const { category } = req.query;
    if (!category) {
      return res.json([]);
    }
    await db.connectDb();
    const result = await GroupSubCategory.find({ parent: category })
      .select("name")
      .sort({
        name: 1,
      });
    db.disconnectDb();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
