import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import User from "../../../models/User";
import UsersTable from "../../../components/admin/users/table";
import { useState } from "react";

export default function Users({ users }) {
  const [data, setData] = useState(users);
  return (
    <Layout>
      <UsersTable users={data} setUsers={setData} />
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const users = await User.find({}).sort({ updateAt: -1 }).lean();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
