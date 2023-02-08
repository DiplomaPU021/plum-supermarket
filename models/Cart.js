import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
                // name: {
                //     type: String,
                // },
                // image: {
                //     type: String,
                // },
                // size: {
                //     type: String,
                // },
                // style: {
                //     style: String,
                //     color: String,
                //     image: String,
                // },
                qty: {
                    type: Number,
                },
                // color: {
                //     color: String,
                //     image: String,
                // },
                cost:{
                    type: Number,
                },
            },

        ],
        cartTotal: Number,
        discount: Number,
        coupons:String,
        costAfterDiscount: Number,
        user: {
            type: ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;