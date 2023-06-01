import nc from "next-connect";
import db from "../../../../utils/db";
import Order from "../../../../models/Order";
import auth from "../../../../middleware/auth";
import admin from "../../../../middleware/admin";
import orderService from "../../../../utils/services/order.service";

const handler = nc().use(auth).use(admin);


handler.put(async (req, res) => {
    try {
        const {
            id,
            status,
        } = req.body;
        await db.connectDb();
        const result = await orderService.findByIdAndUpdateStatus(id, status);

        if (result) {
            // await db.disconnectDb();
            return res.status(200).json({ message: "Статус замовлення змінено успішно!" });
        } else {
            // await db.disconnectDb();
            return res.status(401).json({ message: "Помилка зміни статусу!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

handler.delete(async (req, res) => {
    try {
        const { id } = req.body;
        await db.connectDb();
        const result = await orderService.findByIdAndDelete(id);

        if (!result) {
            return res.status(400).json({
                message: "Order not found!",
            });
        } else {
            await db.disconnectDb();
            return res.status(200).json({ message: "Замовлення видалено!" });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

handler.get(async (req, res) => {
    try {
        await db.connectDb();

        const result = await orderService.getAll()
            .select(
                "paymentMethod status isPaid totalPrice createdAt costAfterDiscount promocode discount products deliveryMethod shippingAddress"
            )
            .sort({ updateAt: -1 });

        if (!result) {
            return res.status(400).json({
                message: "Orders not found!",
            });
        } else {
            await db.disconnectDb();
            return res.json(result);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
export default handler;
