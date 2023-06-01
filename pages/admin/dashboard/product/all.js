import styles from "../../../../styles/products.module.scss";
import Layout from "../../../../components/admin/layout";
import db from "../../../../utils/db";
import Product from "../../../../models/Product";
import Category from "../../../../models/Category";
import ProductCard from "../../../../components/admin/products/productCard";
import SubCategory from "../../../../models/SubCategory";
import GroupSubCategory from "../../../../models/GroupSubCategory";
import FloatingButton from "../../../../components/FloatingButton";

export default function All({ products }) {
  return (
    <Layout>
       <FloatingButton />
      <div className={styles.header}>Всі продукти</div>
      {products.map((p, i) => (
        <ProductCard product={p} key={`${p._id}_${i}`} />
      ))}
    </Layout>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const products = await Product.find({})
    .populate({ path: "category", model: Category })
    .populate({
      path: "subCategories",
      model: SubCategory,
      populate: { path: "parent", model: GroupSubCategory },
    })
    .sort({ name: 1 })
    .lean();

  let newProducts = products.map((product) => {
    let style = -1;
    let mode = -1;

    product.subProducts.forEach((subProduct, subIndex) => {
      subProduct.sizes.forEach((size, sizeIndex) => {
        if (size.qty > 0 && style === -1) {
          style = subIndex;
          mode = sizeIndex;
        }
      });
    });

    let color = product.subProducts[style]
      ? product.subProducts[style].color?.color
      : "";
    let size = mode !== -1 ? product.subProducts[style].sizes[mode].size : "";

    return {
      ...product,
      style,
      mode,
      color,
      size,
    };
  });

  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
