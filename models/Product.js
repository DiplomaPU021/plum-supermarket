import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const replySchema = new mongoose.Schema({
    replyBy: {
        type: ObjectId,
        ref: "User",
        required: true,
    },
    replierName: {
        type: String,
    },
    comment: {
        type: String,
        required: true,
    },
    likes: [],
    dislikes: [],
});

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
    reviewerName: {
        type: String,
    },
    //comment
    review: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
    },
    advantages: {
        type: String,
    },
    disadvantages: {
        type: String,
    },
    // size: {
    //     type: String,
    // },
    // style: {
    //     color: String,
    //     image: String,
    // },
    // fit: {
    //     type: String,
    // },
    images: [],
    likes: [],
    dislikes: [],
    replies: [replySchema]
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
        // details: [
        //     {
        //         name: String,
        //         value: String,
        //     }
        // ],
        details: [
            {
                group: String,
                fields: [
                    {
                        name: String,
                        value: String,
                        isMain: Boolean
                    }
                ]
            }
        ],
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

        subProducts: [
            {
                images: [],
                color: {
                    color: {
                        type: String,
                    },
                    image: {
                        type: String,
                    }
                },
                sizes: [
                    {
                        size: String,
                        qty: Number,
                        price: Number,
                        price_unit: {
                            type: String
                        },
                        code: {
                            type: String,
                            required: true,
                            unique: true,
                        }
                    },
                ],
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
        timestamps: true,
    }
);


const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;