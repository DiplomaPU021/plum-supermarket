import nc from "next-connect";
import Street from "../../../../models/Street";
import db from "../../../../utils/db";

const handler = nc();

handler.get(async (req, res) => {
    try {
        await db.connectDb();
        const street = req.query.street;
        const city = req.query.city;
        const streets = await Street.find({
            city_name: { $regex: new RegExp(`^${city}$`, 'i') },
            name: { $regex: street, $options: 'i' }
        })
            .lean().limit(10);
            // await db.connectDb();
            // const street = req.query.street;
            // const cityCode = req.query.city;
            // console.log("cityCode", cityCode);
            // const streets = await Street.find({
            //     city_code: cityCode,
            //     name: { $regex: street, $options: 'i' }
            // }).lean().limit(10);
        // const streets = await Street.find({
        //     city_name: {
        //         $regexMatch: { input: city, regex: new RegExp(`^${city}$`, 'i') }
        //     },
        //      
        // }).lean();

        await db.disconnectDb();
        return res.status(200).json({
            streets,
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
);
export default handler;