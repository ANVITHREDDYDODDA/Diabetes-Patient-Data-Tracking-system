import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./helpers/connect.js";
import users from "./data/Users.js";
import doctors from "./data/Doctors.js";
import tests from "./data/Tests.js";
import User from "./models/User.js";
import Doctor from "./models/Doctor.js";
import Test from "./models/Test.js";

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();
    await Test.deleteMany();

    await User.insertMany(users);
    await Doctor.insertMany(doctors);
    await Test.insertMany(tests);

    console.log("---DATA HAS BEEN IMPORTED---");
    process.exit();
  } catch (error) {
    console.log("---IMPORT FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Doctor.deleteMany();
    await Test.deleteMany();

    console.log("---DATA HAS BEEN DESTROYED---");
    process.exit();
  } catch (error) {
    console.log("---DESTROY FAILED---");
    console.log(`ERROR:${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
