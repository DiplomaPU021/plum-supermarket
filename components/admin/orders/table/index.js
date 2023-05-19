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
