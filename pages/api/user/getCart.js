import nc from "next-connect";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";
import auth from "@/middleware/auth";

const handler = nc().use(auth);

handler.get(async (req, res) => {
   
    try {
        const id = req.user;
        await db.connectDb();
        // const { user_id } = req.body;
        let user = await User.findById(id);
        let existing_cart = await Cart.findOne({ user: user._id });
        if (existing_cart) {
            return res.status(200).json(existing_cart);
        }
       
        await db.disconnectDb();

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
)

export default handler;