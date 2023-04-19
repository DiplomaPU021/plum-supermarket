import nc from "next-connect";
import User from "@/models/User";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import Cart from "@/models/Cart";
import productService from "@/utils/services/product.service";

const handler = nc().use(auth);


handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const {
            products,
            shippingAddress,         
            paymentMethod,
            deliveryMethod,
            totalPrice,
            totalQty,
            costAfterDiscount,
            promocode,
            discount
        } = req.body;
       
        let user = await User.findById(req.user);
        const newOrder = await new Order({
            user: user._id,
            products,
            shippingAddress,         
            deliveryMethod,
            paymentMethod,
            totalPrice,
            totalQty,
            costAfterDiscount,
            // promocode:coupon?coupon._id:null
            promocode,
            discount
        }).save();
        await Cart.deleteOne({ user: user._id });
    
       await productService.findByIdAndUpdateQuantity(products);
        console.log("46");
        await db.disconnectDb();
        return res.status(200).json({
            order_id: newOrder._id,
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});

export default handler;