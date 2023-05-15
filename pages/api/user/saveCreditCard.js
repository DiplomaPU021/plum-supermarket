import nc from "next-connect";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import userService from "@/utils/services/user.service";

const handler = nc().use(auth);

handler.post(async (req, res) => {
  try {
    await db.connectDb();
    const { name, number, expiry, cvc } = req.body;
    let result = await userService.addCreditCard(
      req.user,
      name,
      number,
      expiry,
      cvc
    );
    await db.disconnectDb();
    // console.log("resultApi", result);
    if (result != null && result != "undefined") {
      return res
        .status(200)
        .json({
          message: "Карту додано успішно!",
          creditCards: result.creditCards,
        });
    } else {
      return res.status(400).json({ error: "Помилка додавання картки!" });
    }
  } catch (error) {
    if (error.message === "Карта вже існує!") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: error.message });
    }
  }
});
// handler.put(async (req, res) => {
//   try {
//     await db.connectDb();
//     const { name, number, expiry, cvc, issuer } = req.body;
//     await userService.updateCreditCardlist(
//       req.user,
//       name,
//       number,
//       expiry,
//       cvc,
//       issuer
//     );
//     // let user = userService.findByWishlistAndUpdate(req.user, productId);
//     await db.disconnectDb();
//     return res.status(200).json({ message: "Карту відредаговано" });
//   } catch (error) {
//     return res.status(500).json({ error: error.message });
//   }
// });
handler.get(async (req, res) => {
  try {
    await db.connectDb();
    let cardlist = await userService.getCardlist(req.user);
    await db.disconnectDb();
    if (cardlist) {
      return res.status(200).json({ cardlist });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
handler.put(async (req, res) => {
  const { cardId } = req.body;
  await db.connectDb();
  try {
    const result = await userService.removeFromCreditCards(req.user, cardId);
    if (result) {
      await db.disconnectDb();
      return res.json({
        message: `Картка видалена успішно!`,
        creditCards: result,
      });
    } else {
      await db.disconnectDb();
      return res.status(400).json({ error: "Помилка видалення картки!" });
    }
  } catch (error) {
    await db.disconnectDb();
    return res.status(500).json({ error: error.message });
  }


});
export default handler;
