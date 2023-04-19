import Product from "@/models/Product";
import User from "@/models/User";
import productService from "./product.service";

const getOneById = async (id) => {
    const user = await User.findById(id);
    // console.log("userServise", user);
    return user;
};
const getAll = async () => {
    const result = await User.find();
    return result;
}
const findByIdAndUpdateAddress = async (id, address) => {
    const result = await User.updateOne(
        { _id: id },
        { $set: { address } },
        { new: true });
    return result;
};
const findByIdAndUpdateProfile = async (id, firstName, lastName, phoneNumber, email, gender, birthday) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: id, email },
            { firstName, lastName, phoneNumber, gender, birthday },
            { new: true }
        );
        return user;
    } catch (err) {
        console.error(err);
    }
};
const findByIdAndDelete = async (id) => {
    const result = await User.findByIdAndDelete(id);
    return result;
};
const createUser = async (
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    uniqueString
) => {
    const user = await new User(
        {
            firstName,
            lastName,
            phoneNumber,
            email,
            password,
            uniqueString
        }
    ).save();


    return user;
};
// const getAllEmails = async () => {
//     const result = await userRepo.getAllEmails();
//     return result;
// };
const findEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};
const findByUniqueStringAndConfirm = async (uniqueString) => {
    const result = await User.findOne({ uniqueString });
    if (result) {
        await result.updateOne({
            emailVerified: true,
        }, { new: true });
        return user;
    }
    return result;

};
const addToWishList = async (userId, productId, size, image, color, code) => {
    const user = await User.findById(userId);
    const product = await Product.findById(productId);
    const existWishItem = user.wishlist.findIndex((x) => x.product.toString() == productId && x.code.toString() == code);
    let wishItem = {
        product: product._id,
        name: product.name,
        size,
        image,
        color,
        code
    };
    if (existWishItem === -1) {

        if (!user.wishlist) {
            user.wishlist = []; // створюємо поле, якщо його немає
        }
        // Якщо  ще не існує, додаємо новий
        user.wishlist.push(wishItem);
        const result = await user.save({ validateBeforeSave: false });

        return result;
    } else {

        // const updateResult = user.updateOne(
        //     {
        //         "wishlist.product": productId,
        //         "wishlist.code": code,
        //     },
        //     {
        //         $set: {
        //             "wishlist.$.color": color,
        //             "wishlist.$.size": size,
        //             "wishlist.$.image": image,                    
        //         },
        //     },
        //     {
        //         new: true,
        //         // upsert: true // додаємо опцію upsert
        //     });
        // return updateResult;

    }
}
const findByWishlistAndUpdate = async (userId, productId, size, image, color, code) => {
    // console.log("findByWishlistAndUpdate", userId, productId);
    const user = await User.findById(userId);
    // if (user) {
    //   user.wishlist = user.wishlist.filter((item) => item.product.toString() !== productId);
    //   await user.save({ validateBeforeSave: false });
    //   return true;
    // }
    // return false;
    try {
        const updateResult = user.updateOne(
            {
                "wishlist.product": productId,
                "wishlist.code": code,
            },
            {
                $set: {
                    "wishlist.$.color": color,
                    "wishlist.$.size": size,
                    "wishlist.$.image": image,
                },
            },
            {
                new: true,
                // upsert: true // додаємо опцію upsert
            });
        return updateResult;
    } catch (error) {
        // console.log(error);
        throw new Error("Error removing wishlist item");
    }
}

const removeFromWishlist = async (userId, productId, code) => {
    // console.log("removeFromDb", userId, productId, code);
    // const user = await User.findById(userId);
    // if (user) {
    //   user.wishlist = user.wishlist.filter((item) => item.product.toString() !== productId);
    //   await user.save({ validateBeforeSave: false });
    //   return true;
    // }
    // return false;
    try {
        const result = await User.updateOne(
            { _id: userId },
            { $pull: { wishlist: { product: productId, code: code } } }
        );
        return result;
    } catch (error) {
        // console.log(error);
        throw new Error("Error removing wishlist item");
    }
}

const getWishlist = async (userId) => {
    const user = await User.findById(userId);
    if (user) {
        return user.wishlist;
    } else {
        throw new Error("Користувача не знайдено!");
    }

}
const userService = {
    getOneById,
    getAll,
    findByIdAndUpdateAddress,
    findByIdAndDelete,
    createUser,
    findEmail,
    findByUniqueStringAndConfirm,
    addToWishList,
    findByWishlistAndUpdate,
    removeFromWishlist,
    getWishlist,
    findByIdAndUpdateProfile
};

export default userService;