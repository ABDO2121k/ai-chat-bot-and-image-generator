import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`database connected ${db.connection.host}`);
  } catch (err) {
    console.log("error", err);
    process.exit(1); // hadi hia die
  }
};

export const disConnect = async () => {
  try {
    await mongoose.disconnect();
    console.log("database disconnected successfully");
  } catch (err) {
    console.log("error", err);
  }
};
