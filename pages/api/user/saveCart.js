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
            console.log("17");
            await existing_cart.remove();
            console.log("19");
        } 
       
        for (let i = 0; i < cart.cartItems.length; i++) {
            let dbProduct = await Product.findById(cart.cartItems[i]._id).lean();
            let subProduct = dbProduct.subProducts[cart.cartItems[i].style];
            let tempProduct = {};
            tempProduct.name = dbProduct.name;
            tempProduct.product = dbProduct._id;
            tempProduct.image = subProduct.images[0].url;
            tempProduct.size = cart.cartItems[i].size;
            tempProduct.code = subProduct.sizes.find((p) => p.size == cart.cartItems[i].size).code;
            let price = Number(subProduct.sizes.find((p) => p.size == cart.cartItems[i].size).price);
            tempProduct.priceBefore = price;
            tempProduct.priceAfter = subProduct.discount > 0
                ? (price - price / Number(subProduct.discount)
                ).toFixed(2)
                : price.toFixed(2);
                tempProduct.discount= Number(subProduct.discount);
            tempProduct.qty = Number(cart.cartItems[i].qty);
            tempProduct.color = {
                color: cart.cartItems[i].color?.color,
                image: cart.cartItems[i].color?.image,
            }
            products.push(tempProduct);
        }
        let cartTotalPrice = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotalPrice += products[i].priceAfter * products[i].qty;
        }
        let cartTotalQty = 0;
        for (let i = 0; i < products.length; i++) {
            cartTotalQty += products[i].qty;
        }
     //   console.log("//////////////////////productsInSaveCart",products);
        const newCart = new Cart({
            products,
            cartTotalPrice: cartTotalPrice.toFixed(2),
            cartTotalQty:Number(cartTotalQty),
            user: user._id,
        });
      
        const addedCart = await newCart.save();
        console.log("60row_saveCart",addedCart);

        await db.disconnectDb();


    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
)
.get(async (req, res) => {
    await db.connectDb();
    const { user_id } = req.body;
    let user = await User.findById(user_id);
    let existing_cart = await Cart.findOne({ user: user._id });
    if (existing_cart) {
        return res.status(200).json(existing_cart);
    }
   
    
    console.log("//////////////////////existing cart",existing_cart);

    
    await db.disconnectDb();
})
export default handler;
