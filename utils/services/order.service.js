import Order from "@/models/Order";


const getOneById = async (id) => {
    const order = await Product.findById(id);
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
        const orders = await Order.find({ user: userId });
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


const orderService = {
    getOneById,
    getAll,
    findByIdAndDelete,
    createOrder,
    findByUserId
};

export default orderService;