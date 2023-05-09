import Layout from "../../../components/admin/layout";
import db from '../../../utils/db';
import Category from "../../../models/Category";
import GroupSubCategory from "../../../models/GroupSubCategory";
import { useState } from 'react'
import Create from "../../../components/admin/groupSubCategories/Create";
import List from "../../../components/admin/groupSubCategories/List";

export default function groupSubCategories({ categories, groupSubCategories }) {
    const [data, setData] = useState(groupSubCategories);
    return (
        <Layout>
            <div>
                <Create setGroupSubCategories={setData} categories={categories} />
                <List
                    groupSubCategories={data}
                    setGroupSubCategories={setData}
                    categories={categories}
                />
            </div>
        </Layout>)
}

export async function getServerSideProps(context) {
    await db.connectDb();
    const categories = await Category.find({}).sort({ name: 1 }).lean();
    const groupSubCategories = await GroupSubCategory.find({}).populate({ path: "parent", model: Category }).sort({ name: 1 }).lean();
    await db.disconnectDb();
    return {
        props: {
            categories: JSON.parse(JSON.stringify(categories)),
            groupSubCategories: JSON.parse(JSON.stringify(groupSubCategories)),
        },
    };
}