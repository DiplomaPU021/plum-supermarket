import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import nc from "next-connect";
import auth from '../../../middleware/auth'
import db from "../../../utils/db"
import slugify from "slugify";

const handler = nc();//.use(auth);

handler.post(async (req, res) => {
   
    try {
        const { name, parent, topParent } = req.body;
        db.connectDb();
        const test = await SubCategory.findOne({ name });
        if (test) {
            return res
                .status(400)
                .json({ message: "SubCategory already exist, try a different name" });

        }
        await new SubCategory({ name, parent, topParent, slug: slugify(name) }).save();
        db.disconnectDb();
        res.json({
            message: `SubCategory ${name} has been created successfully`,
            subCategories: await SubCategory.find({}).sort({ updatedAt: -1 }),
        })
    } catch (error) {
        db.disconnectDb();
        res.status(500).json({ message: error.message });
    }
});

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        db.connectDb();
        await SubCategory.findByIdAndRemove(id);
        db.disconnectDb;
        return res.json({
            message: "SubCategory has been deleted succesfuly",
            subCategories: await SubCategory.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.put(async (req, res) => {
    try {
        const { id, name, parent, topParent } = req.body;
        db.connectDb();
        await SubCategory.findByIdAndUpdate(id, {name, parent, topParent, slug: slugify(name)});
        db.disconnectDb;
        return res.json({
            message: "SubCategory has been updated succesfuly",
            subCategories: await SubCategory.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.get(async (req, res) => {
    try {
        const { category } = req.query;
        if(!category){
            return res.json([])
        }
        db.connectDb();
        const result = await SubCategory.find({parent: category}).select("name")
        db.disconnectDb;
        return res.json(result)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default handler;