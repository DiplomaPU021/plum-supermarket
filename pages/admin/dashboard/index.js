import Layout from "../../../components/admin/layout";
import styles from "../../../styles/dashboard.module.scss";
import User from "../../../models/User";
import Order from "../../../models/Order";
import Product from "../../../models/Product";
import { useSession } from "next-auth/react";
import Dropdown from "../../../components/admin/dashboard/dropdown";
import { TbUsers } from "react-icons/tb";
import { GiTakeMyMoney } from "react-icons/gi";
import { SlHandbag } from "react-icons/sl";
import { SiProducthunt } from "react-icons/si";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Link from "next/link";
import db from "@/utils/db";
import Image from "next/image";

export default function Dashboard({ users, products, orders }) {
  const { data: session } = useSession();
  return (
    <div>
      <Layout>
        <div className={styles.header}>
          <div className={styles.header_search}>
            <label htmlFor="">
              <input type="text" placeholder="Шукати тут..." />
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
              <span>Клієнти</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <SlHandbag />
            </div>
            <div className={styles.card_infos}>
              <h4>+{orders.length}</h4>
              <span>Замовлення</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <SiProducthunt />
            </div>
            <div className={styles.card_infos}>
              <h4>+{products.length}</h4>
              <span>Продукти</span>
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.card_icon}>
              <GiTakeMyMoney />
            </div>
            <div className={styles.card_infos}>
              <h4>
                +
                {Math.round(orders
                  .reduce((a, val) => a + val.costAfterDiscount, 0))
                  .toLocaleString("uk-UA")}{" "}
                ₴
              </h4>
              <h5>
                -
                {Math.round(orders
                  .filter((o) => !o.isPaid)
                  .reduce((a, val) => a + val.costAfterDiscount, 0))
                  .toLocaleString("uk-UA")}{" "}
                ₴ Не оплачено
              </h5>
              <span>Загальний дохід</span>
            </div>
          </div>
        </div>
        <div className={styles.data}>
          <div className={styles.orders}>
            <div className={styles.heading}>
              <h2>Останні замовлення</h2>
              <Link href="/admin/dashboard/orders">Всі замовлення</Link>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Номер замовлення</th>
                  <th>Спосіб оплати</th>
                  <th>Оплата</th>
                  <th>Статус</th>
                  <th>Сумма</th>
                </tr>
              </thead>
              <tbody>
                {orders?.slice(0, 10).map((order, i) => (
                  <tr key={i}>
                    <td>
                      №{order._id.substring(0, 6)} від{" "}
                      {order.createdAt.substring(0, 10)}
                    </td>
                    <td>{order.paymentMethod}</td>
                    <td>
                      {order.isPaid ? (
                        <BsFillCheckCircleFill style={{ fill: "#6cc070" }} />
                      ) : (
                        <BsFillCheckCircleFill style={{ fill: "#ed4337" }} />
                      )}
                    </td>
                    <td>{order.status}</td>
                    <td>{Math.round(order.costAfterDiscount).toLocaleString("uk-UA")} ₴</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.users}>
            <div className={styles.heading}>
              <h2>Останні клієнти</h2>
              <Link href="/admin/dashboard/users">Всі клієнти</Link>
            </div>
            <table>
              <tbody>
                {users?.map((user, i) => (
                  <tr key={i}>
                    <td className={styles.user}>
                      <div className={styles.user_img}>
                        {user.image !== "profile.gif" ? (
                          <Image
                            width={40}
                            height={40}
                            src={user.image}
                            alt="photo"
                          />
                        ) : (
                          <Image
                            width={40}
                            height={40}
                            src="/profile/account2.png"
                            alt="pic"
                          />
                        )}
                      </div>
                    </td>
                    <td>
                      <h5>
                        {user.firstName} {user.lastName}
                      </h5>
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
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const users = await User.find()
    .select("firstName lastName email image")
    .lean();
  const orders = await Order.find()
    .select(
      "paymentMethod status isPaid totalPrice createdAt costAfterDiscount"
    )
    .lean();
  orders.reverse();
  const products = await Product.find().select("name").lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      orders: JSON.parse(JSON.stringify(orders)),
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
