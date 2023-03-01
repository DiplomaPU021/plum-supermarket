import { getToken } from "next-auth/jwt";

export default async (req, res, next) => {
    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });

    if (token) {
        //signed in
        req.user=token.sub; // sun has userID
        next();
    } else {
        res.status(401).json({ message: "Будь ласка авторизуйтесь!" });

    }
    res.end();

}