// import nc from "next-connect";
// import User from "@/models/User";
// import Product from "@/models/Product";
// import db from "@/utils/db";
// import auth from "@/middleware/auth";
// import userService from "@/utils/services/user.service";
// import productService from "@/utils/services/product.service";

// const handler = nc().use(auth);

// handler.post(async (req, res) => {

//     try {
//         const { product_id, review } = req.body;
//       const user_id = req.user;
//         await db.connectDb();
//        let user = userService.getOneById(user_id);
// console.log("UpdateProductReview", product_id, review);
// try{
//       let updatedProduct = productService.findByIdAndUpdateReviews(user._id, product_id, review);
//         await db.disconnectDb();
//         console.log("updatedProduct", updatedProduct.lean());
//         return res.json({ updatedProduct });
// } catch (error) {
//     return res.status(500).json({ error: error.message })
// }
      
        


//     } catch (error) {
//         return res.status(500).json({ error: error.message })

//     }
// }
// )

// export default handler;