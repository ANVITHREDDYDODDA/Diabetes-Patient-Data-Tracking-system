import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO);
    console.log(`MONGODB CONNECTED`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
