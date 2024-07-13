import mongoose from "mongoose";
import "dotenv/config";

const connectToDB = async () => {
  const connectionUrl = process.env.DATABASE_URL;

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Connected to DB"))
    .catch((err) => console.log(err));
};

export default connectToDB;
