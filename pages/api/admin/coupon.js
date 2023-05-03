import Coupon from "../../../models/Coupon";
import nc from "next-connect";
import auth from '../../../middleware/auth'
import db from "../../../utils/db"
import slugify from "slugify";

const handler = nc();//.use(auth);

handler.post(async (req, res) => {
    try {
        const { promocode, discount, startDate, endDate } = req.body;
        await db.connectDb();
        const test = await Coupon.findOne({ promocode });
        if (test) {
            return res
                .status(400)
                .json({ message: "Coupon already exist, try a different one" });

        }
        await new Coupon({ promocode, discount, startDate, endDate }).save();
        await db.disconnectDb();
        res.json({
            message: `Coupon ${promocode} has been created successfully`,
            coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
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
        await Coupon.findByIdAndRemove(id);
        await db.disconnectDb();
        return res.json({
            message: "Coupon has been deleted succesfuly",
            coupons: await Coupon.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

handler.put(async (req, res) => {
    try {
        const { id, promocode, discount, startDate, endDate } = req.body;
        await db.connectDb();
        await Coupon.findByIdAndUpdate(id, { promocode, discount, startDate, endDate });
        await db.disconnectDb();
        return res.json({
            message: "Coupon has been updated succesfuly",
            coupons: await Coupon.find({}).sort({ updatedAt: -1 })
        })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default handler;