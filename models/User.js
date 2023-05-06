import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema(
  {
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
      type: String,
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
      },
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
        },
      },
    ],
    additionalInfo: {
      vehicle: {
        vehicle: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Я є власником автомобіля",
        },
      },
      motorcycle: {
        motorcycle: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Я є власником іншого виду транспорту",
        },
      },
      children: {
        children: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "У мене є дитина",
        },
      },
      business: {
        business: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default:
            "Цей аккаунт використовується юридичною особою, представником компанії або приватним підприємцем",
        },
      },
    },
    admiration: {
      fishing: {
        fishing: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Рибальство",
        },
      },
      hunting: {
        hunting: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Полювання",
        },
      },
      gardening: {
        gardening: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Садівництво",
        },
      },
      fitness: {
        fitness: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Фітнес",
        },
      },
      yoga: {
        yoga: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Йога",
        },
      },
      running: {
        running: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Біг",
        },
      },
      bicycle: {
        bicycle: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Велосипед",
        },
      },
      music: {
        music: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Музика",
        },
      },
      tourism: {
        tourism: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Туризм",
        },
      },
      cybersport: {
        cybersport: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Кіберспорт",
        },
      },
      handmade: {
        handmade: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Рукоділля",
        },
      },
    },
    pets: {
      dog: {
        dog: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Песик",
        },
      },
      bird: {
        bird: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Пташка",
        },
      },
      cat: {
        cat: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Котик",
        },
      },
      reptile: {
        reptile: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Плазун",
        },
      },
      fish: {
        fish: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Рибки",
        },
      },
      rodent: {
        rodent: {
          type: Boolean,
          default: false,
        },
        field: {
          type: String,
          default: "Гризун",
        },
      },
    },
  },
  { timestamps: true }
);
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;