import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    reviewBy: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    review: {
        type: String,
        required: true,
    },
    size: {
        type: String,
    },
    color: {
        type: String,
        icon: String,
    },
    fit: {
        type: String,
    },
    images: [],
    likes: [],
});

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        brand: {
            type: String,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
        },
        category: {
            type: ObjectId,
            required: true,
            ref: "Category",
        },
        subCategories: [
            {
                type: ObjectId,
                ref: "SubCategory",
            },
        ],
        details: [
            {
                name: String,
                value: String,
            }
        ],

        // details: [
        //     {
        //         "group": "String",
        //         "fields": [
        //             {
        //                 "name": "String",
        //                 "value": "String",
        //                 "isMain": true
        //             }
        //         ]
        //     }
        // ],


        // questions: [
        //     {
        //         question: String,
        //         answer: String,
        //     }
        // ],
        reviews: [reviewSchema],
        refundPolicy: {
            type: String,
            default: "30 days",
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
        },
        // shipping: {
        //     type: Number,
        //     required: true,
        //     default: 0,
        // },
        description_images: [],
        subProducts: [
            {
                images: [],
                color: {
                    type: String,
                    icon: String,
                },
                size: String,
                qty: Number,
                price: Number,
                price_unit: String,
                code: {
                    type: String,
                    required: true,
                    unique: true,
                },
                discount: {
                    type: Number,
                    default: 0,
                },
                sold: {
                    type: Number,
                    default: 0,
                },
            },
        ],
    },
    {
        timestamps: false,
    }
);


const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;