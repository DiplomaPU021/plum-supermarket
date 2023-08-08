import Layout from "../../../components/admin/layout";
import db from "../../../utils/db";
import Category from "../../../models/Category";
import SubCategory from "../../../models/SubCategory";
import GroupSubCategory from "../../../models/GroupSubCategory";
import { useState } from "react";
import Create from "../../../components/admin/subCategories/Create";
import List from "../../../components/admin/subCategories/List";

export default function SubCategories({
  categories,
  subCategories,
  groupSubCategories,
}) {
  const [data, setData] = useState(subCategories);
  return (
    <Layout>
      <div>
        <Create
          setSubCategories={setData}
          categories={categories}
          groupSubCategories={groupSubCategories}
        />
        <List
          subCategories={data}
          setSubCategories={setData}
          categories={categories}
          groupSubCategories={groupSubCategories}
        />
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  const subCategories = await SubCategory.find({})
    .populate({ path: "parent", model: GroupSubCategory })
    .populate({ path: "top_parent", model: Category })
    .sort({ name: 1 })
    .lean();
  const groupSubCategories = await GroupSubCategory.find({})
    .populate({ path: "parent", model: Category })
    .sort({ name: 1 })
    .lean();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      subCategories: JSON.parse(JSON.stringify(subCategories)),
      groupSubCategories: JSON.parse(JSON.stringify(groupSubCategories)),
    },
  };
}
