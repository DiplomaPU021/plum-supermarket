import nc from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import slugify from "slugify";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    if (req.body.parent) {
      const parent = await Product.findById(req.body.parent);
      if (!parent) {
        return res.status(400).json({
          message: "Parent product not found!",
        });
      } else {
        const newParent = await parent.updateOne(
          {
            $push: {
              subProducts: {
                images: req.body.images,
                color: req.body.color,
                sizes: req.body.sizes,
                discount: req.body.discount,
              },
            },
          },
          {
            new: true,
          }
        );
        return res.status(200).json({ message: "Продукт оновлено успішно!" });
      }
    } else {
      req.body.slug = slugify(req.body.name, "_");
      const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        brand: req.body.brand,
        details: req.body.details,
        slug: req.body.slug,
        category: req.body.category,
        subCategories: req.body.subCategories.map((item) => item._id),
        subProducts: [
          {
            images: req.body.images,
            color: req.body.color,
            sizes: req.body.sizes,
            discount: req.body.discount,
          },
        ],
      });
      await newProduct.save();
    return  res.status(200).json({ message: "Продукт створено успішно!" });
    }
    await db.disconnectDb();
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
});
handler.put(async (req, res) => {
  try {
    await db.connectDb();

    const {
      id,
      name,
      brand,
      description,
      category,
      subCategories,
      details,
      refundPolicy,
      images,
      color,
      sizes,
      discount,
      style,
    } = req.body;
    const product = await Product.findById(id);
    console.log(
      id,
      name,
      brand,
      description,
      category,
      subCategories,
      details,
      refundPolicy,
      images,
      color,
      sizes,
      discount,
      style
    );
    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
      });
    } else {
      let newSubProducts = [];
      for (let i = 0; i < product.subProducts.length; i++) {
        if (i == style) {
          newSubProducts[i] = product.subProducts[i];
          newSubProducts[i].images = images;
          newSubProducts[i].sizes = sizes;
          newSubProducts[i].color = color;
          newSubProducts[i].discount = discount;
        } else {
          newSubProducts.push(product.subProducts[i]);
        }
      }
      const productUpdated = await Product.findByIdAndUpdate(
        id,
        {
          name,
          brand,
          description,
          category,
          subCategories,
          details,
          refundPolicy,
          subProducts: newSubProducts,
        },
        {
          new: true,
        }
      );
      await db.disconnectDb();
     return res.status(200).json({ message: "Продукт відредаговано успішно!" });
    }
  } catch (error) {
   return res.status(500).json({ message: error.message });
  }
});

handler.delete(async (req, res) => {
  try {
    await db.connectDb();

    const { id, style } = req.body;
    const product = await Product.findById(id);
    console.log(id, style);
    if (!product) {
      return res.status(400).json({
        message: "Product not found!",
      });
    } else {
      if (product.subProducts.length == 1) {
        await Product.findByIdAndDelete(id);
        await db.disconnectDb();
        return res.status(200).json({ message: "Продукт видалено успішно!" });
      }
      let deletedSubProducts = product.subProducts.splice(style, 1)[0];
      const productUpdated = await Product.findByIdAndUpdate(
        id,
        {
          subProducts: product.subProducts,
        },
        {
          new: true,
        }
      );
      await db.disconnectDb();
      return res.status(200).json({ message: "Cубпродукт видалено успішно!" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
export default handler;
