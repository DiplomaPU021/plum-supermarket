import nc from "next-connect";
import User from "@/models/User";
import Order from "@/models/Order";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import Coupon from "@/models/Coupon";
import Cart from "@/models/Cart";
import productService from "@/utils/services/product.service";
import orderService from "@/utils/services/order.service";
import userService from "@/utils/services/user.service";
import UserData from "@/components/checkoutorder/userdata";
import axios from "axios";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
  
    const {
     data, signature
    } = req.body; 
    const response = await axios.post("https://www.liqpay.ua/api/3/checkout",  { form: { data: data, signature: signature } });
    return res.status(200).json({
     data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default handler;