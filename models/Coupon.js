import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const couponSchema = new mongoose.Schema(
    {
        promocode: {
            type: String,
            trim:true,
            unique:true,
            upperCase:true,
            required:true,
            minLength:4,
            maxLength:10,            
        },
        // productsToDiscount: [
        //     {
        //         product: {
        //             type: ObjectId,
        //             ref: "Product",
        //         },
        //     }
        // ],
        discount: {
            type: Number,
            required:true,  
            default: 0,
        },
        startDate: {
            type:String,
            required:true,    
        },
        endDate: {
            type:String,
            required:true,    
        },
    },
    {
        timestamps: true,
    }
);

const Coupon = mongoose.models.Coupon || mongoose.model("Coupon", couponSchema);

export default Coupon;