import { Container, Row, Col, Table } from "react-bootstrap";
import styles from "./styles.module.scss";
import { useState } from "react";
import { BsFillCheckCircleFill, BsEyeFill } from "react-icons/bs";
import OrderDetails from "../orderDetails";
import axios from "axios";
import TableItem from "./TableItem";

export default function OrdersTable({ orders, setOrdersForTable }) {
  const [activeOrder, setActiveOrder] = useState();
//   const [open, setOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState({id:"", orderStatus:""});
  const statusOptions = [
    "Нове замовлення",
    "В обробці",
    "Надіслано",
    "Завершено",
    "Скасовано",
  ];

  const detailsHandler = (order) => {
    setActiveOrder(order);
    setOpen(true);
  };
  const handleOrderStatus=async (order, e)=>{
    setActiveOrder(order);
    setUpdatedStatus({id:order._id, orderStatus: e.target.value});
  }
  const handleOrderStatusSave = async (order) => {
    setActiveOrder(order);
    if (updatedStatus.id===activeOrder._id) {
        const result = await axios.put("/api/admin/order", {
            id: activeOrder._id,
            status: updatedStatus.orderStatus,
        });
        const newOrders = await axios.get("/api/admin/order");
        setOrdersForTable(newOrders);
    } else {
        console.log("36 Nok");
    }
  };
  return (
    <>
      <div className={styles.header}>Замовлення</div>
     
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
          {orders?.map((order) => (
            <TableItem key={order._id} order={order} />
          ))}
        </tbody>
      </Table>
    </>
  );
}
