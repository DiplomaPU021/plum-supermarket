import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const citySchema = new mongoose.Schema({
  level_1: String,
  level_2: String,
  level_3: String,
  level_4: String,
  object_category: String,
  object_name: String,
  object_code: String,
  region: String,
  community: String,
});

const City = mongoose.models.City || mongoose.model("City", citySchema);

export default City;
