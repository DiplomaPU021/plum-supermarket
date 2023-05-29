import { useState, useRef, useEffect } from "react"
import styles from './styles.module.scss';
import { toast } from "react-toastify";
import axios from "axios";
import { BsEyeFill, BsFillCheckCircleFill } from "react-icons/bs";
import OrderDetails from "../orderDetails";

export default function TableItem({ order, activeOrder, setActiveOrder }) {
    const input = useRef(null);
    const [open, setOpen] = useState(false);
    const [updatedStatus, setUpdatedStatus] = useState(order.status);
    const [updatedIsPaid, setUpdatedIsPaid] = useState(order.isPaid);
    const statusOptions = [
        "Нове замовлення",
        "В обробці",
        "Надіслано",
        "Завершено",
        "Скасовано",
    ];


    const handleOrderStatusSave = async () => {
        if (updatedStatus) {
            const result = await axios.put("/api/admin/order", {
                id: order._id,
                status: updatedStatus
            });
            toast.success(result.data.message);
            if (updatedStatus == "Завершено") {
                setUpdatedIsPaid(true);
            }
        }
    };

    return (
        <tr>
            <td>
                №{order._id.substring(0, 6)} від{" "}
                {order.createdAt.substring(0, 10)}
            </td>
            <td>{order.paymentMethod}</td>
            <td>
                {updatedIsPaid ? (
                    <BsFillCheckCircleFill style={{ fill: "#70BF63" }} />
                ) : (
                    <BsFillCheckCircleFill style={{ fill: "#ed4337" }} />
                )}
            </td>
            <td>
                <select
                    name="status"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                    {statusOptions.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                <button onClick={handleOrderStatusSave}>ok</button>
            </td>
            <td>{order.promocode}</td>
            <td>{order.discount} %</td>
            <td>{Math.round(order.costAfterDiscount).toLocaleString("uk-UA")} ₴</td>
            <td>

                <OrderDetails
                    order={order}
                    orderId={order._id}
                    open={open}
                    setOpen={setOpen}
                />

                <button
                    onClick={() => {
                        setOpen(true)
                    }}
                >
                    <BsEyeFill style={{ fill: "#81528C" }} />
                </button>
            </td>
        </tr>
    );
}