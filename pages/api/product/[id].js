import nc from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

const handler = nc();

handler.get(async (req, res) => {
    try {
        // db.connectDb();
        // const id = req.query.id;
        // const style = req.query.style;
        // const size = req.query.size;
        // const product = await Product.findById(id).lean();
        // let discount = product.subProducts[style].discount;
        // let priceBefore = product.subProducts[style].sizes[size].price;
        // let price = discount ? priceBefore - priceBefore / discount : priceBefore
        db.connectDb();
        const id = req.query.id;
        const product = await Product.findById(id).lean();
        db.disconnectDb();
        return res.status(200).json({
            // _id: product._id,
            // style: Number(style),
            // name: product.name,
            // description: product.description,
            // slug: product.slug,
            // sku: product.subProducts[style].sku,
            // brand: product.brand,
            // shipping: product.shipping,
            // images: product.subProducts[style].images,
            // color: product.subProducts[style].color,
            // price,
            // priceBefore,
            // quantity: product.subProducts[style].sizes[sise].qty,
            _id: product._id,
            name: product.name,
            description: product.description,
            slug: product.slug,
            category_id: product.category,
            subCategory_id: product.subCategories[0],
            details: product.details,
            shipping: product.shipping,
code: product.subProducts[0].code,


        });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
);
export default handler;