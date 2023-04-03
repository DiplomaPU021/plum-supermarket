import nc from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";
import SubCategory from "@/models/SubCategory";

const handler = nc();

handler.get(async (req, res) => {
    try {
       await db.connectDb();
        const id = req.query.id;
        const style = req.query.style;
        const code = req.query.code;
         //const code = 0;
        const product = await Product.findById(id)
        .populate({ path: "subCategories", model: SubCategory })
        .lean();
        let discount = product.subProducts[style].discount;
        let price = product.subProducts[style].sizes[0].price;
        let priceAfter = discount ? (100-discount)*price/100 : price
       await db.disconnectDb();
        return res.status(200).json({
            _id: product._id,
            style: Number(style),
            name: product.name,
            description: product.description,
            slug: product.slug,
            brand: product.brand,
            category_id: product.category,
            subCategory_id: product.subCategories[0]._id,
            subCategoryName: product.subCategories[0].name,
            details: product.details,
            // shipping: product.shipping,
            code: product.subProducts[style].sizes[0].code,
           // images: product.subProducts[style].images.map(image => image.public_url),
            images: product.subProducts[style].images.map(image => image.url),
            discount,
            color: product.subProducts[style].color,
            size: product.subProducts[style].sizes[0].size,
            price,
            price_unit: product.subProducts[style].sizes[0].price_unit,
            priceAfter,
            quantity: product.subProducts[style].sizes[0].qty,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);
export default handler;