import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const TestReportSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Test",
    },
    name: {
      type: String,
      required: true,
    },
    weight: { type: String },
    height: { type: String },
    age: { type: String },
    bp: { type: String },
    hba1c: { type: String },
    fast: { type: String },
    post: { type: String },
    random: { type: String },
    pulse: { type: String },
    report: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ReadingSchema = new mongoose.Schema(
  {
    weight: { type: String },
    bp: { type: String },
    sugar: { type: String },
    a1c: { type: String },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    testReport: [TestReportSchema],
    readings: [ReadingSchema],
  },
  { timestamps: true }
);

userSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
const User = mongoose.model("User", userSchema);

export default User;
