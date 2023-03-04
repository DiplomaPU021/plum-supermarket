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
                code: {
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
        coupon: {
            type: ObjectId,
            ref: "Coupon",
        },
        //total price with discount and promocode
        costAfterDiscount: Number,
        user: {
            type: ObjectId,
            ref: "User",
        },
        shippingAddress: {
            firstName: {
                type: String,
            },
            lastName: {
                type: String,
            },
            phoneNumber: {
                type: String,
            },
            address: {
                type: String,
            },

            streetType: {
                type: String,
            },
            street: {
                type: String,
            },
            building: {
                type: String,
            },
            flat: {
                type: String,
            },
            ground: {
                type: String,
            },
            elevator: {
                type: String,
            },
            region: {
                type: String,
            },
            city: {
                type: String,
            },
            cityType: {
                type: String,
            },
            zipCode: {
                type: String,
            },
            country: {
                type: String,
            }

        },
        paymentMethod: {
            type: String,
        },
        paymentResult: {
            id: String,
            status: String,
            email: String,
        },
        total: {
            type: Number,
            required: true,
        },
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        taxPrice: {
            type: Number,
            default: 0,
        },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,            
        },
        status:{
            type:String,
            default: "no Processed"
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;