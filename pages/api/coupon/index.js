import nc from "next-connect";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import { generatePromoCode } from "../../../utils/promocodeGenerator";
import admin from "../../../middleware/admin";

const handler = nc().use(auth).use(admin);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const {  discount, startDate, endDate } = req.body;
    const promocode = generatePromoCode(6);
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
    res.json({
      message: `Купон ${promocode} створено успішно!`,
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
handler.delete(async (req, res) => {
  try {
    const { id } = req.body;
    await db.connectDb();
    await Coupon.findByIdAndRemove(id);
    // await db.disconnectDb();
    return res.json({
      message: "Купон успішно видалено!",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

handler.put(async (req, res) => {
  try {
    const { id, promocode, discount, startDate, endDate } = req.body;
    await db.connectDb();
    await Coupon.findByIdAndUpdate(id, {
      promocode,
      discount,
      startDate,
      endDate,
    });
    // await db.disconnectDb();
    return res.json({
      message: "Купон змінено успішно!",
      coupons: await Coupon.find({}).sort({ updatedAt: -1 }),
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

export default handler;
