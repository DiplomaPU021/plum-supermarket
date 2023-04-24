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
    additionalInfo: [
        {
            children: Boolean,
            field: {
                type: String,
                description: "У мене є дитина"
            }
        },
        {
            vehicle: Boolean,
            field: {
                type: String,
            description: "Я є власником автомобіля"
            }
        },
        {
            motocicle: Boolean,
            field: {
                type: String,
            description: "Я є власником іншого виду транспорту"
            }
        },
        {
            business: Boolean,
            field: {
                type: String,
            description: "Цей аккаунт використовується юридичною особою, представником компанії або приватним підприємцем"
            }
        },

    ],
    admiration: [
        {
            fishing: Boolean,
            field: {
                type: String,
            description: "Рибальство"
            }
        },
        {
            hunting: Boolean,
            field: {
                type: String,
            description: "Полювання"
            }
        },
        {
            music: Boolean,
            field: {
                type: String,
            description: "Садівництво"
            }
        },
        {
            fitness: Boolean,
            field: {
                type: String,
            description: "Фітнес"
            }
        },
        {
            yoga: Boolean,
            field: {
                type: String,
            description: "Йога"
            }
        },
        {
            running: Boolean,
            field: {
                type: String,
            description: "Біг"
        }

        },
        {
            bicycle: Boolean,
            field: {
                type: String,
            description: "Велосипед"
            }
        },
        {
            yoga: Boolean,
            field: {
                type: String,
            description: "Музика"
            }
        },
        {
            music: Boolean,
            field: {
                type: String,
            description: "Музика"
            }
        },
        {
            tourism: Boolean,
            field: {
                type: String,
            description: "Туризм"
            }
        },
        {
            cybersport: Boolean,
            field: {
                type: String,
            description: "Кіберспорт"
            }
        },
        {
            handmade: Boolean,
            field: {
                type: String,
            description: "Рукоділля"
            }
        },
    ],
    pets: [
        {
            dog: Boolean,
            field: {
                type: String,
            description: "Песик"
            }
        },
        {
            bird: Boolean,
            field: {
                type: String,
            description: "Пташка"
            }
        },
        {
            cat: Boolean,
            field: {
                type: String,
            description: "Котик"
            }
        },
        {
            reptile: Boolean,
            field: {
                type: String,
            description: "Плазун"
            }
        },

        {
            fish: Boolean,
            field: {
                type: String,
            description: "Рибки"
            }
        },
        {
            rodent: Boolean,
            field: {
                type: String,
            description: "Гризун"
            }
        },


    ]
},
    { timestamps: true, }

);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;