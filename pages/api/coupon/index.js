import nc from "next-connect";
import Coupon from "@/models/Coupon";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import { generatePromoCode } from "@/utils/promocodeGenerator";

const handler = nc();


handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { startDate, endDate, discount } = req.body;
        const promocode= generatePromoCode(6);
        const test = await Coupon.findOne({ promocode });
        if (test) {
            return res.status(400).json({ message: "Цей промокод вже існує" });
        }
        await new Coupon({
            promocode,
            startDate,
            endDate,
            discount,
        }).save();

        await db.disconnectDb();
        return res.status(200).json({
            message: "Купон успішно створено!",
            coupons: await Coupon.find({})
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default handler;