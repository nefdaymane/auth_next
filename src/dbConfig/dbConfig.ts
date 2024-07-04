import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connect = async () => {
  try {
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO_URL is not defined in the environment variables.");
    }

    console.log('MONGO_URL:', process.env.MONGO_URL);
    

    await mongoose.connect(process.env.MONGO_URL);

    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("Connected to database");
    });

    connection.on("error", (err) => {
      console.log("Error connecting to database", err);
    });

    connection.on("disconnected", () => {
      console.log("Disconnected from database");
    });
  } catch (error) {
    console.log("Error connecting to database", error);
  }
};

export default connect;
