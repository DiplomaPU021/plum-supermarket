import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    email: {
        type: String,
        required: "Please enter your email",
        trim: true,
        unique: true,
    },
    birthday: {
        type: String,
    },
    gender: {
        type: String
    },
    password: {
        type: String,
        required: "Please enter your password",
    },
    role: {
        type: String,
        default: "user",
    },
    image: {
        type: String,
        default: "profile.gif",
    },
    email_verified: {
        type: Boolean,
        default: false,
    },
    defaultPaymentMethod: {
        type: String,
        default: "",
    },
    uniqueString: {
        type: String,
        unique: true,
    },
    // likedProducts: [
    //     {
    //         type: ObjectId,
    //         ref: "Product",
    //     },
    // ],
    address: [
        {
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
            },
            active: {
                type: Boolean,
                default: false,
            },
        },
    ],
    wishlist: [
        {
            product: {
                type: ObjectId,
                ref: "Product",
                required: true,
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
            color: {
                type: String,
            },
            code: {
                type: String,
            }
        },
    ],
},
    { timestamps: true, }

);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;