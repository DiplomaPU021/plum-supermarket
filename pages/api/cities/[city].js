import nc from "next-connect";
import City from "../../..//models/City";
import db from "../../..//utils/db";

const handler = nc();

handler.get(async (req, res) => {
    try {
        await db.connectDb();
        const city = req.query.city;
        const cities = await City.find({
            object_name: { $regex: city, $options: 'i' }
        }).lean().limit(10);
        // const cities = await City.find({
        //          object_name: { 
        //         $regex: `^${city}$`, // повне співпадіння зі значенням city
        //         $options: 'i'
        //     }
        // }).lean().limit(10);
        // const cities = await City.find({
        //     object_name: { 
        //         $regex: `^${city}$`, // повне співпадіння зі значенням city
        //         $options: 'i'
        //     }
        // }).sort([
        //     { object_name: { $eq: city } }, // сортувати спочатку за повним співпадінням
        //     { object_name: { $regex: city, $options: 'i' } } // потім за частковим
        // ]).lean().limit(10);
    //   console.log("cities", cities);
        // function javascript_abort()
// {
//    throw new Error('This is not an error. This is just to abort javascript');
// }
// javascript_abort();
        await db.disconnectDb();
        return res.status(200).json({
            cities,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);
export default handler;