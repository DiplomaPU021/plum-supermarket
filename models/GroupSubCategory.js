import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const groupSubCategorySchema = new mongoose.Schema({
  slug: {
    type: String,
    required: true,
  },
  parent: {
    type: ObjectId,
    ref: "Category",
    required: true,
  },
});

const GroupSubCategory =
  mongoose.models.GroupSubCategory ||
  mongoose.model("GroupSubCategory", groupSubCategorySchema);

export default GroupSubCategory;
