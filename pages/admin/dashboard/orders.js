import Layout from "../../../components/admin/layout"
import db from '../../../utils/db';
import Order from "../../../models/Order";
import OrdersTable from "@/components/admin/orders/table";

export default function users({ orders }) {
    console.log(orders)
    return (
        <Layout>
            <OrdersTable orders={orders} />
        </Layout>
    )
}


export async function getServerSideProps(context) {
    db.connectDb();
    const orders = await Order.find({}).populate('user').sort({ updateAt: -1 }).lean();
    return {
        props: {
            orders: JSON.parse(JSON.stringify(orders.reverse())),
        },
    };
}