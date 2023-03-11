import nc from "next-connect";
import User from "@/models/User";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";

const handler = nc().use(auth);


handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { products, shippingAddress, shippingPrice, paymentMethod, totalPrice, costAfterDiscount,promocode } = req.body;
        console.log("apiordercreate", shippingAddress, shippingPrice, paymentMethod, totalPrice, costAfterDiscount,promocode);
        let user = await User.findById(req.user);
        let coupon= await Coupon.findOne({promocode});
        console.log("apiordercreateUser",coupon);
        const newOrder = await new Order({
            user: user._id,
            products,
            shippingAddress,
            shippingPrice,
            paymentMethod, 
            totalPrice,
            costAfterDiscount,
            promocode:coupon?coupon._id:null
        }).save();
console.log("apiordercreateneworder", newOrder);
        await db.disconnectDb();
        return res.status(200).json({
            order_id: newOrder._id,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default handler;