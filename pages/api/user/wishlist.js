import nc from "next-connect";
import Product from "@/models/Product";
import User from "@/models/User";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import userService from "@/utils/services/user.service";

const handler = nc().use(auth);

handler.post(async (req, res) => {
    try {
        await db.connectDb();
        const { productId, size, image, color, code } = req.body;
        // console.log("req.queryId", productId, size, image, color, code);
        // console.log("req.user///////////////////////////////", req.user);
        let user = userService.addToWishList(req.user, productId, size, image, color, code);
        await db.disconnectDb();
        return res.status(200).json({ message: "Продукт успішно додано до списку вподобань" });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
handler.put(async (req, res) => {
    try {
        await db.connectDb();
        const { productId } = req.body;
        // console.log("req.queryIdPut", productId);
        // console.log("req.user///////////////////////////////", req.user);
        let user = userService.findByWishlistAndUpdate(req.user, productId);
        await db.disconnectDb();
        return res.status(200).json({ message: "Продукт успішно відредаговано" });

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
handler.get(async (req, res) => {
    try {

        await db.connectDb();

        let wishList = userService.getWishlist(req.user);
        await db.disconnectDb();
        if (wishList) {
            return res.status(200).json(wishList);
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
});
handler.delete(async (req, res) => {
    // console.log("DELETE!!!!!!!!!!!!!!", req);
    const { productId, code } = req.body;
    // console.log("delete!!!!!!!!!!!!!!!!", productId, code);
    await db.connectDb();
    userService.removeFromWishlist(req.user, productId, code);
});
export default handler;