import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please enter your full name",
    },
    email: {
        type: String,
        required: "Please enter your email",
        trim: true,
        unique: true,
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
    emailVerified: {
        type: Boolean,
        default: false,
    },
    defaultPaymentMethod: {
        type: String,
        default: "",
    },
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
            region: {
                type: String,
            },
            city: {
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
},
    { timestamps: true, }

);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;