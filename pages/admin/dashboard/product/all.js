import styles from "@/styles/products.module.scss"
import Layout from "@/components/admin/layout"
import db from "@/utils/db"
import Product from "@/models/Product"
import Category from "@/models/Category"
import ProductCard from "@/components/admin/products/productCard"

export default function all({ products }) {
    return (
        <Layout>
            <div className={styles.header}>Всі продукти</div>
            {
                products.map((product, i) => (
                    <ProductCard product={product} key={`${product._id}_${i}`} />
                ))
            }
        </Layout>
    )
}

export async function getServerSideProps(context) {
    await db.connectDb();
    const products = await Product.find({})
        .populate({ path: "category", model: Category })
        .sort({ updatedAt: -1 }).lean();
    await db.disconnectDb();
    return {
        props: {
            products: JSON.parse(JSON.stringify(products)),
        },
    };
}