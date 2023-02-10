import nc from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

const handler = nc();

handler.get(async (req, res) => {
    try {
        // db.connectDb();
        // const id = req.query.id;

        // const size = req.query.size;
        // const product = await Product.findById(id).lean();
        // let discount = product.subProducts[style].discount;
        // let priceBefore = product.subProducts[style].sizes[size].price;
        // let price = discount ? priceBefore - priceBefore / discount : priceBefore
        db.connectDb();
        const id = req.query.id;
        const style = req.query.style;
        const code = req.query.code;
        const product = await Product.findById(id).lean();
        let discount = product.subProducts[style].discount;
        let priceBefore = product.subProducts[style].sizes[code].price;
        let price = discount ? priceBefore - priceBefore / discount : priceBefore
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
            // quantity: product.subProducts[style].sizes[size].qty,
            _id: product._id,
            style: Number(style),
            name: product.name,
            description: product.description,
            slug: product.slug,
            brand: product.brand,
            category_id: product.category,
            subCategory_id: product.subCategories[0],
            details: product.details,
            // shipping: product.shipping,
            code: product.subProducts[style].sizes[code].code,
            images: product.subProducts[style].images.map(image => image.public_url),
            discount,
            color: product.subProducts[style].color,
            size: product.subProducts[style].sizes[code].size,
            price,
            priceBefore,
            quantity: product.subProducts[style].sizes[code].qty,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });

    }
}
);
export default handler;