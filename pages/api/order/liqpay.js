import nc from "next-connect";
import auth from "../../../middleware/auth";
import axios from "axios";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    const { data, signature } = req.body;
    const response = await axios.post("https://www.liqpay.ua/api/3/checkout", {
      form: { data: data, signature: signature },
    });
    return res.status(200).json({
      data: response.data,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default handler;
