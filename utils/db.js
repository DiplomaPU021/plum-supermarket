import mongoose from "mongoose";
const connection = {};
mongoose.set('strictQuery', true);
export async function connectDb() {
     if (connection.isConnected) {
         console.log("Already connected to database");
         return;
    }
    if (mongoose.connections.length > 0) {
        connection.isConnected = mongoose.connections[0].readyState;
        if (connection.isConnected === 1) {
            console.log("Use previous connection to database");
            return;
        }
        await mongoose.disconnect();
    }
    const db = await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    );
    console.log("New connection to database");
    connection.isConnected = db.connections[0].readyState;
}
export async function disconnectDb() {
    if (connection.isConnected) {
        if (process.env.NODE_ENV === "production") {

            await mongoose.disconnect();
            connection.isConnected = false;
        } else {
            console.log("Not disconnecting from database");
        }
    }
}
const db = { connectDb, disconnectDb };
export default db;