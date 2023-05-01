import nc from "next-connect";
import db from "@/utils/db";
import auth from "@/middleware/auth";
import userService from "@/utils/services/user.service";

const handler = nc().use(auth);

handler.post(async (req, res) => {
    try {
        await db.connectDb();
     
        const { fishing, hunting, gardening, fitness, yoga, running, bicycle,music, tourism, cybersport, handmade } = req.body;
        let user = await userService.addAdmirations(req.user, fishing, hunting, gardening, fitness, yoga, running, bicycle,music, tourism, cybersport, handmade);
        await db.disconnectDb();
        return res.status(200).json({ message: "Вподобання оновлено успішно!" });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// handler.put(async (req, res) => {
//     try {
//         await db.connectDb();
//         const { productId, code } = req.body;
//         await userService.removeFromAddmiration(req.user, productId, code);
//         // let user = userService.findByWishlistAndUpdate(req.user, productId);
//         await db.disconnectDb();
//         return res.status(200).json({ message: "Продукт успішно відредаговано" });

//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// });
handler.get(async (req, res) => {
    try {
        await db.connectDb();
        let addmiration = await userService.getAddmirations(req.user);
        await db.disconnectDb();
        if (wishList) {
            return res.status(200).json({addmiration});
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
});
// handler.delete(async (req, res) => {
//     const { productId, code } = req.body;
//     console.log("delete!!!!!!!!!!!!!!!!", productId, code);
//     await db.connectDb();
//     await userService.removeFromWishlist(req.user, productId, code);
// });
export default handler;