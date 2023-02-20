import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";

const handler = nc();

handler.get(async (req, res) => {
    console.log("/////////////////////axios",req.query.id);
    try {
  
        const id = req.query.id;
        await db.connectDb();
        // const { user_id } = req.body;
        let user = await User.findById(id);
        let existing_cart = await Cart.findOne({ user: user._id });
        if (existing_cart) {
            return res.status(200).json(existing_cart);
        }
       
        
        console.log("//////////////////////existing cart",existing_cart);
    
        
        await db.disconnectDb();

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
)

export default handler;