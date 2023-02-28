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
                name: {
                    type: String,
                },
                image: {
                    type: String,
                },
                size: {
                    type: String,
                },
                code:{
                    type: String,
                },
                price: {
                    type: Number,
                },
                priceAfter: {
                    type: Number,
                },
                discount: {
                    type: Number,
                    default: 0,
                },
                qty: {
                    type: Number,
                },
                color: {
                    color: String,
                    image: String,
                },
            }

        ],
        cartTotalPrice: Number,
        cartTotalQty: Number,
        user: {
            type: ObjectId,
            ref: "User",
            unique: true,
        }
    },
    {
        timestamps: true,
    }
);

const Cart = mongoose.models.Cart || mongoose.model("Cart", cartSchema);

export default Cart;