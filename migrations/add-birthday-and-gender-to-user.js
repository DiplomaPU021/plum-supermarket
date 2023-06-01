import db from "../utils/db";
import User from "../models/User";
import { getSession } from "next-auth/react";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "./lib/mongodb";

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const { method } = req;
  const client = await clientPromise;
  const dbInstance = client.db();
  const adapter = new MongoDBAdapter(dbInstance);
  await adapter.getAdapter({});

  await db.connectDb();

  switch (method) {
    case "PUT":
      try {
        const { userId, style, mode } = req.body;
        const user = await User.findByIdAndUpdate(
          userId,
          { style, mode },
          { new: true }
        );

        if (!user) {
          res.status(404).json({ message: "User not found" });
          return;
        }

        res.status(200).json(user);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Something went wrong" });
      }
      break;

    default:
      res.setHeader("Allow", ["PUT"]);
      res.status(405).json({ message: `Method ${method} Not Allowed` });
  }

  await db.disconnectDb();
};