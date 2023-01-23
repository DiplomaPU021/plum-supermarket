import mongoose from "mongoose";

const { ObjectId} = mongoose.Schema;

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: [2, "must be at least 2 characters"],
            maxlength: [32, "must be no more than 32 characters"],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
    }, 
    {
        timestamps: true,
    }
);

const Category = mongoose.models.Category || mongoose.model("Category", categorySchema);

export default Category;