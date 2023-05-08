import Layout from "../../../components/admin/layout";
import db from '../../../utils/db';
import Category from "../../../models/Category";
import { useState } from 'react'
import Create from "../../../components/admin/categories/Create";
import List from "../../../components/admin/categories/List";

export default function categories({ categories }) {
    const [data, setData] = useState(categories);

    return <Layout>
        <div>
            <Create setCategories={setData} />
            <List
                categories={data}
                setCategories={setData}
            />
        </div>
    </Layout>;
}

export async function getServerSideProps(context) {
    await db.connectDb();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
await db.disconnectDb();
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
        },
    };
}