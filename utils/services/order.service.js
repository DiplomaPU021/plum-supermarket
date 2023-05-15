import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";


const getOneById = async (id) => {
    const order = await Order.findById(id);
    return order;
};
const getAll = async () => {
    const result = await Order.find();
    return result;
}

const findByIdAndDelete = async (id) => {
    const result = await Order.findByIdAndDelete(id);
    return result;
};
const findByUserId = async (userId) => {
    try {
        const orders = await Order.find({ user: userId })
            .sort({ updatedAt: -1 })
        return orders;
    } catch (error) {
        console.error(error);
        throw new Error("Не вдалося отримати замовлення користувача");
    }

};
const createOrder = async (
    userId,
    products,
    shippingAddress,
    paymentMethod,
    deliveryMethod,
    totalPrice,
    totalQty,
    costAfterDiscount,
    promocode,
    discount,
    isPaid
) => {
    const order = await new Order(
        {
            user: userId,
            products,
            shippingAddress,
            paymentMethod,
            deliveryMethod,
            totalPrice,
            totalQty,
            costAfterDiscount,
            promocode,
            discount,
            isPaid
        }
    ).save();
    return order;


};

const findByIdAndUpdateStatus = async (id, status) => {
    try {
        if (status == "Завершено") {
            const order = await Order.findOneAndUpdate(
                { _id: id },
                { status, isPaid: true },
                { new: true }
            );
            return order;
        } else {
            const order = await Order.findOneAndUpdate(
                { _id: id },
                { status },
                { new: true }
            );
            return order;
        }
    } catch (err) {
        console.error(err);
    }
};

const orderService = {
    getOneById,
    getAll,
    findByIdAndDelete,
    createOrder,
    findByUserId,
    findByIdAndUpdateStatus
};

export default orderService;