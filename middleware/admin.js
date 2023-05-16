import User from "@/models/User";
import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });
    let user = await User.findById(token.sub);
    if (user.role == "admin") {
        next();
    } else {
      return  res.status(401).json({ message: "Access denied, Admin resources." })
    }

};