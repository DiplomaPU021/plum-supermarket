import Product from "../../models/Product";
import User from "../../models/User";
import productService from "./product.service";
import Cart from "../../models/Cart";

const getOneById = async (id) => {
  const user = await User.findById(id);
  return user;
};
const getAll = async () => {
  const result = await User.find();
  return result;
};
const findByIdAndUpdateAddress = async (id, address) => {
  const result = await User.updateOne(
    { _id: id },
    { $set: { address } },
    { new: true },
  );
  return result;
};
const findByIdAndUpdateProfile = async (
  id,
  firstName,
  lastName,
  phoneNumber,
  email,
  gender,
  birthday,
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, email },
      { firstName, lastName, phoneNumber, gender, birthday },
      { new: true },
    );
    return user;
  } catch (err) {
    console.error(err);
  }
};
const findByIdAndUpdateProfileFromCheckout = async (
  id,
  firstName,
  lastName,
  phoneNumber,
  email,
) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, email },
      { firstName, lastName, phoneNumber },
      { new: true },
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
const createUser = async (email, password, uniqueString) => {
  const user = await new User({
    email,
    password,
    uniqueString,
  }).save();

  return user;
};
const findEmail = async (email) => {
  const user = await User.findOne({ email });
  return user;
};
const findByUniqueStringAndConfirm = async (uniqueString) => {
  const result = await User.findOne({ uniqueString });
  if (result) {
    const user = await result.updateOne(
      {
        emailVerified: true,
      },
      { new: true },
    );
    return user;
  }
  return result;
};
const addToWishList = async (
  userId,
  productId,
  size,
  image,
  color,
  code,
  style,
  mode,
) => {
  const user = await User.findById(userId);
  const product = await Product.findById(productId);
  const existWishItem = user.wishlist.findIndex(
    (x) => x.product?.toString() == productId && x.code?.toString() == code,
  );

  let wishItem = {
    product: product._id,
    name: product.name,
    size,
    image,
    color,
    code,
    style,
    mode,
  };
  if (existWishItem === -1) {
    if (!user.wishlist) {
      user.wishlist = [];
    }
    // Якщо  ще не існує, додаємо новий
    user.wishlist.push(wishItem);
    const result = await user.save({ validateBeforeSave: false });
    return result;
  } else {
    console.log("Already present in wishList");
  }
};
const findByWishlistAndUpdate = async (
  userId,
  productId,
  size,
  image,
  color,
  code,
) => {
  const user = await User.findById(userId);
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
      },
    );
    return updateResult;
  } catch (error) {
    throw new Error("Error removing wishlist item");
  }
};

const removeFromWishlist = async (userId, productId, code) => {
  try {
    const result = await User.updateOne(
      { _id: userId },
      { $pull: { wishlist: { product: productId, code: code } } },
    );
    return result;
  } catch (error) {
    throw new Error("Error removing wishlist item");
  }
};

const getWishlist = async (userId) => {
  const user = await User.findById(userId);
  if (user) {
    const wishlist = user.wishlist;
    const newProducts = wishlist.map(async (item) => {
      const product = await Product.findById(item.product, "-reviews");
      if (product) {
        const style = Number(item.style);
        const mode = Number(item.mode);
        const _uid = `${item.product}_${style}_${mode}`;
        const subProduct = product.subProducts[style];
        if (subProduct) {
          const price = subProduct.sizes[mode].price;
          const newProduct = {
            ...product.toObject(),
            style,
            mode,
            size: subProduct.sizes[mode].size,
            discount: subProduct.discount,
            color: subProduct.color,
            price,
            priceAfter: (((100 - subProduct.discount) * price) / 100).toFixed(),
            price_unit: subProduct.sizes[mode].price_unit,
            code: subProduct.sizes[mode].code,
            qty: 1,
            images: subProduct.images.map((img) => img.url),
            _uid,
          };
          return newProduct;
        }
      }
    });
    return Promise.all(newProducts);
  } else {
    throw new Error("Користувача не знайдено!");
  }
};
const getCartlist = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    const newProducts = cart.products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (product) {
        const style = item.style;
        const mode = item.mode;
        const qty = item.qty;
        const _uid = `${item.product}_${style}_${mode}`;
        const subProduct = product.subProducts[style];
        if (subProduct) {
          const price = subProduct.sizes[mode].price;
          const newProduct = {
            ...product.toObject(),
            style,
            mode,
            size: subProduct.sizes[mode].size,
            discount: subProduct.discount,
            color: subProduct.color,
            price,
            priceAfter: (((100 - subProduct.discount) * price) / 100).toFixed(),
            price_unit: subProduct.sizes[mode].price_unit,
            code: subProduct.sizes[mode].code,
            quantity: subProduct.sizes[mode].qty,
            qty,
            images: subProduct.images.map((img) => img.url),
            image: subProduct.images[0].url,
            _uid,
          };
          return newProduct;
        }
      }
    });
    return Promise.all(newProducts);
  } else {
    throw new Error("Користувача не знайдено!");
  }
};
const addCreditCard = async (userId, name, number, expiry, cvc) => {
  try {
    const user = await User.findById(userId);
    const existCreditCardItem = user.creditCards?.findIndex(
      (x) => x.name?.toString() == name && x.number?.toString() == number,
    );
    let creditCardItem = { name, number, expiry, cvc, isDefault: true };
    let user_creditCards = user.creditCards;
    let creditCards = [];
    for (let i = 0; i < user_creditCards.length; i++) {
      let temp_creditCard = {};
      if (existCreditCardItem !== i) {
        temp_creditCard = {
          ...user_creditCards[i].toObject(),
          isDefault: false,
        };
        creditCards.push(temp_creditCard);
      } else {
        creditCards.push(creditCardItem);
      }
    }
    if (existCreditCardItem == -1) {
      creditCards.push(creditCardItem);
    } else {
      throw new Error("Карта вже існує!");
    }
    await user.updateOne(
      {
        creditCards: creditCards,
      },
      { new: true },
    );
    const result = await User.findById(userId);
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};
const removeFromCreditCards = async (userId, creditCardId) => {
  const user = await User.findById(userId);
  if (user) {
    user.creditCards = user.creditCards.filter(
      (item) => item._id.toString() !== creditCardId,
    );
    if (user.creditCards.length > 0) {
      let creditCardDefaultExist = user.creditCards.find(
        (item) => item.isDefault == true,
      );
      if (creditCardDefaultExist) {
        const result = await user.save({ validateBeforeSave: false });
        return result.creditCards;
      } else if (user.creditCards.length > 0) {
        user.creditCards[user.creditCards.length - 1].isDefault = true;
        const result = await user.save({ validateBeforeSave: false });
        return result.creditCards;
      }
    } else {
      const result = await user.save({ validateBeforeSave: false });
      return result.creditCards;
    }
  }
  throw new Error("Error deleting credit card");
};

const addAdditionalInfo = async (userId, additionalInfo) => {
  try {
    const user = await User.findById(userId);
    if (user) {
      const result = await user.updateOne({ additionalInfo }, { new: true });
      return result;
    }
    return user;
  } catch (err) {
    throw new Error("Error adding additional info");
  }
};

const getAdditionalInfo = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      return foundUser.additionalInfo;
    } else {
      throw new Error("Користувача не знайдено!");
    }
  } catch (error) {
    throw new Error("Error getting additional info");
  }
};
const addAdmirations = async (userId, admiration) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { admiration },
      { new: true },
    );
    return user;
  } catch (err) {
    throw new Error("Error adding addmiration info");
  }
};
const getAddmirations = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      return foundUser.admiration;
    } else {
      throw new Error("Користувача не знайдено!");
    }
  } catch (error) {
    throw new Error("Error getting addmiration info");
  }
};
const addPets = async (userId, pets) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { pets },
      { new: true },
    );
    return user;
  } catch (err) {
    throw new Error("Error adding pets info");
  }
};
const getPets = async (userId) => {
  try {
    const foundUser = await User.findById(userId);
    if (foundUser) {
      return foundUser.pets;
    } else {
      throw new Error("Користувача не знайдено!");
    }
  } catch (error) {
    throw new Error("Error getting pets info");
  }
};
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
  findByIdAndUpdateProfile,
  findByIdAndUpdateProfileFromCheckout,
  addCreditCard,
  removeFromCreditCards,
  addAdmirations,
  getAddmirations,
  getAdditionalInfo,
  addAdditionalInfo,
  addPets,
  getPets,
};

export default userService;
