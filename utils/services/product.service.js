import Product from "@/models/Product";


const getOneById = async (id) => {
    const product = await Product.findById(id);
    return product;
};
const getAll = async () => {
    const result = await Product.find();
    return result;
}
const findByReviewByAndUpdate = async (userId, productId, review, reviewerName,
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
            await product.populate("reviews.reviewBy");
            return product;
        }

    }
    return product;
};
const findByIdAndUpdateReviews = async (userId, productId, review) => {
    // const updatedProduct = await Product.findByIdAndUpdate(
    //     productId,
    //     { $push: { reviews: review } },
    //     { new: true }
    //   );
    // return updatedProduct;
    // const product = await Product.findById(productId);

    // const hasReviewByUser = product.reviews.some((r) => r.reviewBy==userId);

    // if (!hasReviewByUser) {
    //   product.reviews.push(review);
    //   await product.save();
    //   return true;
    // }
    // return false;
    const product = await Product.findById(productId);

    // Перевіряємо, чи є вже review з вказаним userId
    const existingReviewIndex = product.reviews.findIndex(
        (r) => r.reviewBy.toString() === userId
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
};

export default productService;