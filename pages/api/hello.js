// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import db from "../../utils/db";
export default async function  handler  (req, res) {
 await db.connectDb();
 await db.disconnectDb();
  res.status(200).json({ name: 'John Doe' })
}
