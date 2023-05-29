import { Table } from "react-bootstrap";
import styles from "./styles.module.scss";
import "bootstrap/dist/css/bootstrap.min.css";


import TableItem from "./TableItem";

export default function OrdersTable({ orders }) {

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
