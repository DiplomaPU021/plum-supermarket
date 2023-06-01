import nc from "next-connect";
import User from "../../../models/User";
import Coupon from "../../../models/Coupon";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import Cart from "../../../models/Cart";

const handler = nc().use(auth);

handler.post(async (req, res) => {

    try {
        const { promocode } = req.body;
        const id = req.user;
        await db.connectDb();
        let user = await User.findById(id);
        let checkCoupon = await Coupon.findOne({ promocode });
        if (checkCoupon == null) {
            return res.json({ error: "Купон не дійсний" });
        }
        const { cartTotalPrice } = await Cart.findOne({ user: user._id });
        let cartTotalAfterDiscount = cartTotalPrice - (cartTotalPrice * checkCoupon.discount) / 100;
        // await Cart.findOneAndUpdate({ user: user._id }, { $set: { cartTotalPrice: cartTotalAfterDiscount}})
        await Cart.findOneAndUpdate({ user: user._id },  {cartTotalAfterDiscount});
        await db.disconnectDb();
        return res.json({ cartTotalAfterDiscount, discount: checkCoupon.discount });


    } catch (error) {
        return res.status(500).json({ error: error.message })

    }
}
)

export default handler;