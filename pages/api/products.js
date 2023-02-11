import nc from "next-connect";
import Product from "@/models/Product";
import db from "@/utils/db";

const handler = nc();

handler.get(async (req, res) => {
    try {
        db.connectDb();
        db.disconnectDb();
        res.status(200).json({ name: 'John Doe' })
    } catch (error) { }
}
)


export default handler;