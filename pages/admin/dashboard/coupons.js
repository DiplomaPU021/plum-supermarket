import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import Coupon from "../../../models/Coupon";
import { useState } from "react";
import Create from "../../../components/admin/coupons/Create";
import CouponList from "../../../components/admin/coupons/CouponList";

export default function Coupons({ coupons }) {
  const [data, setData] = useState(coupons);
  return (
    <Layout>
      <div>
        <Create setCoupons={setData} />
        <CouponList coupons={data} setCoupons={setData} />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const coupons = await Coupon.find({}).sort({ updatedAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      coupons: JSON.parse(JSON.stringify(coupons)),
    },
  };
}
