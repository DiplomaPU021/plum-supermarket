import { getToken } from "next-auth/jwt";
export default async (req, res, next) => {
    // const trialToken = req.headers["x-access-token"].toString();
    // console.log("trialToken", trialToken);

    const token = await getToken({
        req,
        secret: process.env.JWT_SECRET,
        secureCookie: process.env.NODE_ENV === 'production',
    });
    // console.log(("TokenInMiddlevaerAuth", token));
    if (token) {
        //signed in
        req.user = token.sub; // sub has userID
        next();
    } else {
       return res.status(401).json({ message: "Будь ласка авторизуйтесь!" });

    }
    // res.end();
};