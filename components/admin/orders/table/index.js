import { Container, Row, Col, Table, Form } from 'react-bootstrap'
import styles from './styles.module.scss';
import { useState } from "react";
import { BsFillCheckCircleFill, BsEyeFill } from 'react-icons/bs';
import OrderDetails from "../orderDetails"


export default function OrdersTable({ orders }) {
    const [activeOrder, setActiveOrder] = useState()
    const [open, setOpen] = useState(false)

    const detailsHandler = (order) => {
        setActiveOrder(order)
        setOpen(true);
    }

    return (
        <>
            <div className={styles.header}>Замовлення</div>
            {open ? (<OrderDetails order={activeOrder} orderId={activeOrder._id} open={open} setOpen={setOpen} />) : null}
            <Table className={styles.ordertable} striped>
                <thead>
                    <tr>
                        <th>Номер замовлення</th>
                        <th>Спосіб оплати</th>
                        <th>Оплата</th>
                        <th>Статус</th>
                        <th>Промокод</th>
                        <th>Знижка</th>
                        <th>Сумма</th>
                        <th>Деталі</th>
                    </tr>
                </thead>
                <tbody>
                    {orders?.map((order, i) => (
                        <tr key={i}>
                            <td>№{order._id.substring(0, 6)} від {order.createdAt.substring(0, 10)}</td>
                            <td>{order.paymentMethod}</td>
                            <td>{order.isPaid ? (<BsFillCheckCircleFill style={{ fill: "#70BF63" }} />) : (<BsFillCheckCircleFill style={{ fill: "#ed4337" }} />)}</td>
                            <td>{order.status}</td>
                            <td>{order.promocode}</td>
                            <td>{order.discount} %</td>
                            <td>{order.costAfterDiscount} ₴</td>
                            <td><button onClick={() => { detailsHandler(order) }}><BsEyeFill style={{ fill: "#81528C" }} /></button></td>
                        </tr>
                    ))}
                </tbody>
            </Table >
        </>
    );
}