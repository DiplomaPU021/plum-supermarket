import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const streetSchema = new mongoose.Schema(
    {
        city_name: String,        
        district: String,
        street_type: String,
        name: String,
    }
);

const Street = mongoose.models.Street || mongoose.model("Street", streetSchema);

export default Street;