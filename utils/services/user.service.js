import User from "@/models/User";

const getOneById = async (id) => {
    const user = await User.findById(id);
    return user;
};
const getAll = async () => {
    const result = await User.find();
    return result;
}
const findByIdAndUpdateAddress = async (id, address) => {
    const result = await User.updateOne({
        address: addresses,
    }, { new: true });
    return result;
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

const userService = {
    getOneById,
    getAll,
    findByIdAndUpdateAddress,
    findByIdAndDelete,
    createUser,
    findEmail,
    findByUniqueStringAndConfirm,
};

export default userService;