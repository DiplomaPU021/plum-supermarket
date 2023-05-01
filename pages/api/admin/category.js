import Category from "../../../models/Category";
import nc from "next-connect";
import auth from '../../../middleware/auth'
import db from "../../../utils/db"
import slugify from "slugify";

const handler = nc();//.use(auth);

handler.post(async (req, res) => {
    try {
        const { name } = req.body;
     await   db.connectDb();
        const test = await Category.findOne({name});
        if (test) {
            return res
                .status(400)
                .json({ message: "Category already exist, try a different name" });

        }
        await new Category({name, slug:slugify(name)}).save();
      await  db.disconnectDb();
        res.json({
            message: `Category ${name} has been created successfully`,
            categories: await Category.find({}).sort({ updateAt: -1 }),
        })
    } catch (error) {
      await  db.disconnectDb();
        res.status(500).json({message: error.message});    
    }
});

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        db.connectDb();
        await Category.findByIdAndRemove(id);
        db.disconnectDb;
        return res.json({
            message: "Category has been deleted succesfuly",
            categories: await Category.find({}).sort({ updateAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.put(async (req, res) => {
    try {
        const { id, name } = req.body;
        db.connectDb();
        await Category.findByIdAndUpdate(id, {name});
        db.disconnectDb;
        return res.json({
            message: "Category has been updated succesfuly",
            categories: await Category.find({}).sort({ updateAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default handler;