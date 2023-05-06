import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "../../../models/User"
import Order from "../../../models/Order"
import Product from "../../../models/Product"
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown"
import { TbUsers } from "react-icons/tb"
import { GiTakeMyMoney } from "react-icons/gi";
import { SlHandbag } from "react-icons/sl"
import { SiProducthunt } from "react-icons/si"
import { BsFillCheckCircleFill } from 'react-icons/bs';
import Link from "next/link"

export default function dashboard({ users, products, orders }) {
    const { data: session } = useSession();
    return (
        <div>
            <Layout>
                <div className={styles.header}>
                    <div className={styles.header_search}>
                        <label htmlFor="">
                            <input type="text" placeholder="Search here..." />
                        </label>
                    </div>
                    <div className={styles.header_right}>
                        <Dropdown userImage={session?.user?.image} />
                    </div>
                </div>
                <div className={styles.cards}>
                    <div className={styles.card}>
                        <div className={styles.card_icon}>
                            <TbUsers />
                        </div>
                        <div className={styles.card_infos}>
                            <h4>+{users.length}</h4>
                            <span>Users</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_icon}>
                            <SlHandbag />
                        </div>
                        <div className={styles.card_infos}>
                            <h4>+{orders.length}</h4>
                            <span>Orders</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_icon}>
                            <SiProducthunt />
                        </div>
                        <div className={styles.card_infos}>
                            <h4>+{products.length}</h4>
                            <span>Products</span>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.card_icon}>
                            <GiTakeMyMoney />
                        </div>
                        <div className={styles.card_infos}>
                            <h4>+{orders.reduce((a, val) => a + val.costAfterDiscount, 0).toLocaleString('uk-UA')} ₴</h4>
                            <h5>-{orders
                                .filter((o) => !o.isPaid)
                                .reduce((a, val) => a + val.costAfterDiscount, 0).toLocaleString('uk-UA')} ₴ Unpaid yet</h5>
                            <span>Total Earnings</span>
                        </div>
                    </div>
                </div>
                <div className={styles.data}>
                    <div className={styles.orders}>
                        <div className={styles.heading}>
                            <h2>Recent orders</h2>
                            <Link href="/admin/dashboard/orders">View all</Link>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Number of Order</th>
                                    <th>Payment method</th>
                                    <th>Is Paid</th>
                                    <th>Status</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders?.slice(0, 10).map((order, i) => (
                                    <tr key={i}>
                                        <td>№{order._id.substring(0, 6)} від {order.createdAt.substring(0, 10)}</td>
                                        <td>{order.paymentMethod}</td>
                                        <td>{order.isPaid ? (<BsFillCheckCircleFill style={{ fill: "#6cc070" }} />) : (<BsFillCheckCircleFill style={{ fill: "#ed4337" }} />)}</td>
                                        <td>{order.status}</td>
                                        <td>{order.costAfterDiscount} ₴</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.users}>
                        <div className={styles.heading}>
                            <h2>Recent users</h2>
                            <Link href="/admin/dashboard/users">View all</Link>
                        </div>
                        <table>
                            <tbody>
                                {users?.map((user, i) => (
                                    <tr key={i}>
                                        <td className={styles.user}>
                                            <div className={styles.user_img}>
                                                {user.image !== 'profile.gif' ?
                                                    (<img width="40px" height="40px" src={user.image} alt="photo" />)
                                                    :
                                                    (<img width="40px" height="40px" src="../../../../../profile/account2.png" alt="pic" />)
                                                }
                                            </div>
                                        </td>
                                        <td>
                                            <h5>{user.firstName} {user.lastName}</h5>
                                            <span>{user.email}</span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Layout>
        </div>
    )
}


export async function getServerSideProps(context) {
    // db.connectDb();
    const users = await User.find().lean();
    const orders = await Order.find().populate('user').lean();
    const products = await Product.find().lean();
    return {
        props: {
            users: JSON.parse(JSON.stringify(users)),
            orders: JSON.parse(JSON.stringify(orders)),
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}

