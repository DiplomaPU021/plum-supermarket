import Product from "@/models/Product";
import User from "@/models/User";


const getOneById = async (id) => {
    const product = await Product.findById(id);
    return product;
};
const getAll = async () => {
    const result = await Product.find();
    return result;
}
const findByReviewByAndUpdate = async (
    userId,
    productId,
    review,
    reviewerName,
    rating,
    experience,
    advantages,
    disadvantages,
    images) => {
    const product = await Product.findById(productId);
    if (product) {
        const exist = product.reviews.findIndex((x) => x.reviewBy.toString() === userId);
        if (exist != -1) {
            await Product.updateOne(
                {
                    _id: productId,
                    "reviews._id": product.reviews[exist]._id,
                },
                {
                    $set: {
                        "reviews.$.review": review,
                        "reviews.$.reviewerName": reviewerName,
                        "reviews.$.rating": rating,
                        "reviews.$.experience": experience,
                        "reviews.$.advantages": advantages,
                        "reviews.$.disadvantages": disadvantages,
                        "reviews.$.images": images,
                    }
                },
                {
                    new: true,
                });
            const updatedProduct = await Product.findById(productId);
            updatedProduct.numReviews = updatedProduct.reviews.length;
            updatedProduct.rating = updatedProduct.reviews.reduce((a, r) => r.rating + a, 0) / updatedProduct.reviews.length;
            await updatedProduct.save();
            await updatedProduct.populate("reviews.reviewBy");
            return updatedProduct;
        }
        else {
            const newReview = {
                reviewBy: userId,
                review: review,
                reviewerName: reviewerName,
                rating: rating,
                experience: experience,
                advantages: advantages,
                disadvantages: disadvantages,
                images: images,
            };
            product.reviews.push(newReview);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((a, r) => r.rating + a, 0) / product.reviews.length;
            const res = await product.save();
            await product.populate({ path: "reviews.reviewBy", model: User })
            return product;
        }

    }
    return product;
};
const findByIdAndUpdateQuantity = async (products) => {
    try {
        let newProducts=[];
        for (let j = 0;  j < products.length; j++) {
            const product = await Product.findById(products[j].product);
            if (!product) {
                throw new Error(`Product with ID ${products[j].product} not found`);
            }
    
            let subProductIndex = -1;
            let sizeIndex = -1;
    
            // Шукаємо індекс підтовару та розміру у підтоварі
            for (let i = 0; i < product.subProducts.length; i++) {
                const subProduct = product.subProducts[i];
                sizeIndex = subProduct.sizes.findIndex((size) => size.code?.toString() === products[j].code?.toString());
                if (sizeIndex !== -1) {
                    subProductIndex = i;
                    break;
                }
            }
            if (subProductIndex === -1 || sizeIndex === -1) {
                throw new Error(`Sub-product with size code ${products[j].code} not found`);
            }
    
            // Зменшуємо кількість товару на величину quantity
            product.subProducts[subProductIndex].sizes[sizeIndex].qty -= products[j].qty;
    
            // Зберігаємо зміни у базі даних
            await product.save();
            newProducts.push(product);
        }
       

        return newProducts;;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
const findByIdAndUpdateReviews = async (userId, productId, review) => {
    const product = await Product.findById(productId);

    // Перевіряємо, чи є вже review з вказаним userId
    const existingReviewIndex = product.reviews.findIndex(
        (r) => r.reviewBy?.toString() === userId
    );

    if (existingReviewIndex === -1) {
        // Якщо review з вказаним userId ще не існує, додаємо новий
        product.reviews.push(review);

        // Оновлюємо дані продукту
        const result = await product.save();
        return result;
    } else {
        // Якщо review з вказаним userId вже існує, повертаємо помилку
        throw new Error("Review with this user already exists.");
    }
};
const findByIdAndDelete = async (id) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
};
const createProduct = async (
    name,
    description,
    brand,
    slug,
    category,
    subCategories,
    details,
    reviews,
    rating,
    numReviews,
    subProducts
) => {
    const product = await new Product(
        {
            name,
            description,
            brand,
            slug,
            category,
            subCategories,
            details,
            reviews,
            rating,
            numReviews,
            subProducts
        }
    ).save();
    return product;
};
const findBySlug = async (slug) => {
    const product = await Product.findOne({ slug });
    return product;
};

const productService = {
    getOneById,
    getAll,
    findByReviewByAndUpdate,
    findByIdAndUpdateReviews,
    findByIdAndDelete,
    createProduct,
    findBySlug,
    findByIdAndUpdateQuantity
};

export default productService;