import mongoose from "mongoose";
const connection = {};
mongoose.set("strictQuery", true);
async function connectDb() {
  if (connection.isConnected) {
    return;
  }
  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState;
    if (connection.isConnected === 1) {
      return;
    }
    await mongoose.disconnect();
  }
  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  connection.isConnected = db.connections[0].readyState;
  connection.isConnected =
    db && db.connections && db.connections[0] && db.connections[0].readyState;

  return db;
}
async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === "production") {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
    }
  }
}
const db = { connectDb, disconnectDb };
export default db;
