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
    creditCards: [
        {
            name: String,
            number: String,
            expiry: String,
            cvc: String,
            isDefault: {
                type: Boolean,
                default: false,
            },
        }
    ],
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
            },
            mode: {
                type: String,
            },
            style: {
                type: String,
            }
        },
    ],
    // additionalInfo:[
    //     {
    //         children: Boolean,
    //         description:"У мене є дитина"
    //     },
    //     {
    //         vehicle: Boolean,
    //         description:"Я є власником автомобіля"
    //     }, 
    //     {
    //         motocicle: Boolean,
    //         description:"Я є власником іншого виду транспорту"
    //     }, 
    //     {
    //         business: Boolean,
    //         description:"Цей аккаунт використовується юридичною особою, представником компанії або приватним підприємцем"
    //     },

    // ],
    // admiration:[
    //     {
    //         fishing: Boolean,
    //         description:"Рибальство"
    //     },
    //     {
    //         hunting: Boolean,
    //         description:"Полювання"
    //     },
    //     {
    //         music: Boolean,
    //         description:"Садівництво"
    //     },
    //     {
    //         fitness: Boolean,
    //         description:"Фітнес"
    //     }, 
    //     {
    //         yoga: Boolean,
    //         description:"Йога"
    //     }, 
    //     {
    //         running: Boolean,
    //         description:"Біг"
    //     },
    //     {
    //         bicycle: Boolean,
    //         description:"Велосипед"
    //     }, 
    //     {
    //         yoga: Boolean,
    //         description:"Музика"
    //     },
    //     {
    //         music: Boolean,
    //         description:"Музика"
    //     },
    //     {
    //         tourism: Boolean,
    //         description:"Туризм"
    //     },
    //     {
    //         cybersport: Boolean,
    //         description:"Кіберспорт"
    //     },
    //     {
    //         handmade: Boolean,
    //         description:"Рукоділля"
    //     },
    // ],
    // pets:[
    //     {
    //         dog: Boolean,
    //         description:"Песик"
    //     },
    //     {
    //         bird: Boolean,
    //         description:"Пташка"
    //     },
    //     {
    //         cat: Boolean,
    //         description:"Котик"
    //     },
    //     {
    //         reptile: Boolean,
    //         description:"Плазун"
    //     }, 

    //     {
    //         fish: Boolean,
    //         description:"Рибки"
    //     },
    //     {
    //         rodent: Boolean,
    //         description:"Гризун"
    //     },


    // ]
},
    { timestamps: true, }

);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;