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
                priceAfter: {
                    type: Number,
                },
                discount: {
                    type: Number,
                },
                qty: {
                    type: Number,
                },
                color: {
                    color: {
                        type: String,
                    },
                },
            },

        ],

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
        
        //total price with discount but without promocode
        totalPrice: {
            type: Number,
            required: true,
        },
        promocode: {
            type: ObjectId,
            ref: "Coupon",
        },
        //total price with discount and promocode
        costAfterDiscount: Number,
        shippingPrice: {
            type: Number,
            required: true,
            default: 0,
        },
        // taxPrice: {
        //     type: Number,
        //     default: 0,
        // },
        isPaid: {
            type: Boolean,
            required: true,
            default: false,
        },
        status: {
            type: String,
            default: "Нове замовлення",
            enum: ["Нове замовлення", "В обробці", "Надіслано", "Завершено", "Скасовано"],
        },
        paidAt:{
            type:Date,
        },
        deliveredAt:{
            type:Date,
        }
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;