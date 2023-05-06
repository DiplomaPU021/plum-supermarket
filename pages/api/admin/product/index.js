import nc from "next-connect";
import db from "@/utils/db";
import Product from "@/models/Product";
import auth from "@/middleware/auth";
import admin from "@/middleware/admin";
import slugify from "slugify";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
    console.log("hello world", req.body);
    try {
        await db.connectDb();
        if (req.body.parent) {
            console.log("parent: ",req.body.parent);
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
                console.log("37", newParent);
                res.status(200).json({message:"Продукт оновлено успішно!"})
            }
        } else {
            console.log("request", req.body);
             req.body.slug = slugify(req.body.name,"_");
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                brand: req.body.brand,
                details: req.body.details,
                slug: req.body.slug,
                category: req.body.category,
                subCategories: req.body.subCategories.map((item)=>item._id),
                subProducts: [
                    {
                        images: req.body.images,
                        color: req.body.color,
                        sizes: req.body.sizes,
                        discount: req.body.discount,
                    }
                ]
            });
            console.log("newProduct///////////////////////////", newProduct);
            await newProduct.save();
            res.status(200).json({message:"Продукт створено успішно!"})
        }
        await db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
handler.put(async (req, res) => {
    console.log("hello world", req.body);
    try {
        await db.connectDb();
        if (req.body.parent) {
            console.log("parent: ",req.body.parent);
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
                console.log("37", newParent);
                res.status(200).json({message:"Продукт оновлено успішно!"})
            }
        } else {
            console.log("request", req.body);
             req.body.slug = slugify(req.body.name,"_");
            const newProduct = new Product({
                name: req.body.name,
                description: req.body.description,
                brand: req.body.brand,
                details: req.body.details,
                slug: req.body.slug,
                category: req.body.category,
                subCategories: req.body.subCategories.map((item)=>item._id),
                subProducts: [
                    {
                        images: req.body.images,
                        color: req.body.color,
                        sizes: req.body.sizes,
                        discount: req.body.discount,
                    }
                ]
            });
            console.log("newProduct///////////////////////////", newProduct);
            await newProduct.save();
            res.status(200).json({message:"Продукт створено успішно!"})
        }
        await db.disconnectDb();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
export default handler;
