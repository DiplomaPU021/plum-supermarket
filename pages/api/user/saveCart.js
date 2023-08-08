import nc from "next-connect";
import Product from "../../../models/Product";
import User from "../../../models/User";
import Cart from "../../../models/Cart";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";

const handler = nc().use(auth);

handler
  .post(async (req, res) => {
    try {
      await db.connectDb();
      const { cart } = req.body;
      let products = [];
      let user = await User.findById(req.user);
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
        tempProduct.image = subProduct.images[0].url;
        tempProduct.size = cart.cartItems[i].size;
        tempProduct.code = subProduct.sizes.find(
          (p) => p.size == cart.cartItems[i].size,
        ).code;
        let price = Number(
          subProduct.sizes.find((p) => p.size == cart.cartItems[i].size).price,
        );
        tempProduct.price = price;
        tempProduct.priceAfter =
          subProduct.discount > 0
            ? (((100 - subProduct.discount) * price) / 100).toFixed()
            : price;
        tempProduct.discount = Number(subProduct.discount);
        tempProduct.qty = Number(cart.cartItems[i].qty);
        tempProduct.color = {
          color: cart.cartItems[i].color?.color,
          image: cart.cartItems[i].color?.image,
        };
        tempProduct.style = cart.cartItems[i].style;
        tempProduct.mode = cart.cartItems[i].mode;
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
        cartTotalPrice: cartTotalPrice.toFixed(),
        cartTotalQty: Number(cartTotalQty),
        user: user._id,
      });

      const addedCart = await newCart.save();
      // console.log("60row_saveCart",addedCart);

      await db.disconnectDb();
      return res.status(200).json({ addedCart });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  })
  .get(async (req, res) => {
    try {
      const id = req.user;
      await db.connectDb();
      // const { user_id } = req.body;
      let user = await User.findById(id);
      let existing_cart = await Cart.findOne({ user: user._id });
      if (existing_cart) {
        return res.status(200).json({ existing_cart });
      }

      await db.disconnectDb();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
export default handler;
