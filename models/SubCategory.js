import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const subSchema = new mongoose.Schema(
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
       top_parent: {
            type: ObjectId,
            ref: "Category",
            required: true,
        },
        parent: {
            type: ObjectId,
            ref: "SubCategory",
            required: false,
        },
    }
);

const SubCategory = mongoose.models.SubCategory || mongoose.model("SubCategory", SubCategory);

export default SubCategory;