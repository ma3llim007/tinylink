import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionInstanace = await mongoose.connect(process.env.MONGODB_URL);
        global.mongooseConnection = connectionInstanace.connection;

        console.log(`🛠️  MONGODB Connected! DB NAME: ${connectionInstanace.connection.db.databaseName}`);
    } catch (error) {
        console.error(`💀  MONGODB CONNETION ERROR `, error.message);
        process.exit(1);
    }
};

export default connectDB;
