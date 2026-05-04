import mongoose from "mongoose"
import serverConfig from "./serverConfig"

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(serverConfig.MONGO_URI as string);
        if (conn.connection.host) {
            console.log("DB connected successfully");
        }
    } catch (error) {
        console.error("Error connecting to DB");
        process.exit(1);
    }
}

export default connectDB;