import nc from "next-connect";
import db from "../../../utils/db";
import auth from "../../../middleware/auth";
import Cart from "../../../models/Cart";
import productService from "../../../utils/services/product.service";
import orderService from "../../../utils/services/order.service";
import userService from "../../../utils/services/user.service";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const {
      firstName,
      lastName,
      phoneNumber,
      email,
      products,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      totalPrice,
      totalQty,
      costAfterDiscount,
      promocode,
      discount,
      isPaid,
    } = req.body;
    let user = await userService.getOneById(req.user);
    if (!user.firstName || !user.lastName || !user.phoneNumber) {
      let userUpdate = await userService.findByIdAndUpdateProfileFromCheckout(
        req.user,
        firstName,
        lastName,
        phoneNumber,
        email,
      );
    }
    let result = await orderService.createOrder(
      req.user,
      products,
      shippingAddress,
      paymentMethod,
      deliveryMethod,
      totalPrice,
      totalQty,
      costAfterDiscount,
      promocode,
      discount,
      isPaid,
    );
    if (!shippingAddress) {
      let userUpdate = await userService.findByIdAndUpdateProfileFromCheckout(
        req.user,
        firstName,
        lastName,
        phoneNumber,
        email,
      );
    }
    await Cart.deleteOne({ user: req.user });
    await productService.findByIdAndUpdateQuantity(products, isPaid);
    await db.disconnectDb();
    return res.status(200).json({
      order_id: result._id,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default handler;
