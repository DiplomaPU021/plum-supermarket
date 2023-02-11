import nc from "next-connect";
import Product from "@/models/Product";
import User from "@/models/User";
import Cart from "@/models/Cart";
import db from "@/utils/db";

const handler = nc();

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { cart, user_id } = req.body;
        let products = [];
        let user = await User.findById(user_id);
        let existing_cart = await Cart.findOne({ user: user._id });
        if (existing_cart) {
            await existing_cart.remove();
        }     
        for (let i = 0; i < cart.cartItems.length; i++) {
            let dbProduct = await Product.findById(cart.cartItems[i]._id).lean();
            let subProduct = dbProduct.subProducts[cart.cartItems[i].style]; 
            let tempProduct = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.color = {
                color: cart.cartItems[i].color?.color,
                image: cart.cartItems[i].color?.image,
            }
            tempProduct.image = subProduct.images[0].url;
            tempProduct.qty = Number(cart.cartItems[i].qty);
            tempProduct.size = cart.cartItems[i].size;
            let price = Number(subProduct.sizes.find((p) => p.size == cart.cartItems[i].size).price);
            tempProduct.price = subProduct.discount > 0
                ? (price - price / Number(subProduct.discount)
                ).toFixed(2)
                : price.toFixed(2);
            products.push(tempProduct);
        }
        let cartTotal = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotal += products[i].price * products[i].qty;
        }
        const newCart = new Cart({
            products,
            cartTotal: cartTotal.toFixed(2),
            user: user._id,
        });
        const addedCart = await newCart.save();
        await db.disconnectDb();


    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
);
export default handler;
