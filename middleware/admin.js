import User from "@/models/User";
import { getToken } from "next-auth/jwt";
import db from "@/utils/db";

export default async (req, res, next) => {

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });
    await db.connectDb();
    let user = await User.findById(token.sub);
    await db.disconnectDb();
    if (user.role == "admin") {
        next();
    } else {
      return  res.status(401).json({ message: "Access denied, Admin resources." })
    }

};