import styles from "../../styles/product.module.scss";
//import db from "../../utils/db";
import Product from "../../models/Product";

export default function product({product}) {
  
  console.log(product);
  return <div>[SLUG]</div>;
}
export async function getServerSideProps(context) {
  const { query } = context;
  const slug = query.slug;
  const style = query.style;
  const size = query.size || 0;
  //db.connectDb();
  //----------------
  //from db
  //let product = await Product.findOne({slug}).lean();
  let product = Product.find((el) => el.slug == slug);
  let subProduct = product.subProducts[style];
  let prices = subProduct.sizes
    .map((s) => {
      return s.price;
    })
    .sort((a, b) => {
      return a - b;
    });

  let newProduct = {
    ...product,
    images: subProduct.images,
    sizes: subProduct.sizes,
    discount: subProduct.discount,
    sku: subProduct.sku,
    colors: product.subProducts.map((p) => {
      return p.color;
    }),
    priceRange:
      prices.length > 1
        ? `From ${prices[0]} to ${prices[prices.length - 1]}`
        : "",
    price:
      subProduct.discount > 0
        ? (
            subProduct.sizes[size].price -
            subProduct.sizes[size].price / subProduct.discount
          ).toFixed(2)
        : subProduct.sizes[size].price,
    priseBerofe: subProduct.sizes[size].price,
    quantity: subProduct.sizes[size].qty,
  };
  //----------------
  //db.disconnectDb();
  return {
    props: {product: JSON.parse(JSON.stringify(newProduct))},
  };
}
