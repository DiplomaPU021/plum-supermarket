// import nc from "next-connect";
// import Product from "@/models/Product";
// import User from "@/models/User";
// import Cart from "@/models/Cart";
// import db from "@/utils/db";

// const handler = nc();

// handler.post(async (req, res) => {
//     try {
//         await db.connectDb();
//         const { cart, user_id } = req.body;
//         let user = await User.findById(user_id);
//         await user.updateOne({
//             $push:{
//                 address:address,
//             },
//         });
//         res.json(address);
//         await db.disconnectDb();


//     } catch (error) {
//         return res.status(500).json({ error: error.message });

//     }
// }
// );
// export default handler;