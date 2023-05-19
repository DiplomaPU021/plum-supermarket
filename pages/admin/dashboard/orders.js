import Layout from "@/components/admin/layout";
import db from "@/utils/db";
import Order from "@/models/Order";
import OrdersTable from "@/components/admin/orders/table";
import { useState } from "react";

export default function Orders({ orders }) {
  const [ordersForTable, setOrdersForTable] = useState(orders);
  return (
    <Layout>
      <OrdersTable orders={ordersForTable} setOrdersForTable={setOrdersForTable}/>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const orders = await Order.find()
    .select(
      "paymentMethod status isPaid totalPrice createdAt costAfterDiscount promocode discount products deliveryMethod shippingAddress"
    )
    .sort({ updateAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders.reverse())),
    },
  };
}
