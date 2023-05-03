import Category from "../../../models/Category";
import nc from "next-connect";
import auth from '../../../middleware/auth'
import db from "../../../utils/db"
import slugify from "slugify";
import GroupSubCategory from "@/models/GroupSubCategory";

const handler = nc();//.use(auth);

handler.post(async (req, res) => {

    try {
        const { name, parent } = req.body;
        console.log("14", name, parent);
        await db.connectDb();
        const test = await GroupSubCategory.findOne({ name });
        console.log("test", test);
        if (test) {
            return res
                .status(400)
                .json({ message: "GroupSubCategory already exist, try a different name" });
        }
        await new GroupSubCategory({ name, parent, slug: slugify(name) }).save();
        await db.disconnectDb();
        res.json({
            message: `GroupSubCategory ${name} has been created successfully`,
            groupSubCategories: await GroupSubCategory.find({}).sort({ updatedAt: -1 }),
        })
    } catch (error) {
        await db.disconnectDb();
        res.status(500).json({ message: error.message });
    }
});

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        await db.connectDb();
        await GroupSubCategory.findByIdAndRemove(id);
        await db.disconnectDb();
        return res.json({
            message: "GroupSubCategory has been deleted succesfuly",
            groupSubCategories: await GroupSubCategory.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.put(async (req, res) => {
    try {
        const { id, name, parent } = req.body;
        await db.connectDb();
        await GroupSubCategory.findByIdAndUpdate(id, { name, parent, slug: slugify(name) });
        await db.disconnectDb();
        return res.json({
            message: "GroupSubCategory has been updated succesfuly",
            groupSubCategories: await GroupSubCategory.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.get(async (req, res) => {
    try {
        const { category } = req.query;
        if (!category) {
            return res.json([])
        }
        await db.connectDb();
        const result = await GroupSubCategory.find({ parent: category }).select("name")
        db.disconnectDb();
        return res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default handler;