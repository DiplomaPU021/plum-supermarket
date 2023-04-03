import nc from "next-connect";
// import User from "@/models/User";
// import Product from "@/models/Product";
import db from "@/utils/db";
import auth from "@/middleware/auth";
// import userService from "@/utils/services/user.service";
import productService from "@/utils/services/product.service";

const handler = nc().use(auth);

handler.put(async (req, res) => {

    try {
        const {
            reviewerName,
            rating,
            experience,
            advantages,
            disadvantages,
            review,
            images } = req.body;
        //   const user_id = req.user;
        await db.connectDb();
        const updatedProduct =await productService.findByReviewByAndUpdate(
            req.user,
            req.query.id,
            review,
            reviewerName,
            rating,
            experience,
            advantages,
            disadvantages,
            images);
        await db.disconnectDb();
        return res.status(200).json({ reviews: updatedProduct.reviews.reverse() });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
)

export default handler;