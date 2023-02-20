import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        promocode: String,
        productsToDiscount: [
            {
                product: {
                    type: ObjectId,
                    ref: "Product",
                },
            }
        ],
        discount: {
            type: Number,
            default: 0,
        },
        timeStart: Date,
        timeEnd: Date,
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;