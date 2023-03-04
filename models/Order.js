import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const orderSchema = new mongoose.Schema(
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
                size: {
                    type: String,
                },
                code:{
                    type: String,
                },
                //price with discount
                price: {
                    type: Number,
                },
                qty: {
                    type: Number,
                },
                color: {
                    type: String,
                },
            },

        ],

        //total price with discount but without promocode
        cartTotal: Number,
        coupon:{
            type: ObjectId,
            ref: "Coupon",
        },
        //total price with discount and promocode
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

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;