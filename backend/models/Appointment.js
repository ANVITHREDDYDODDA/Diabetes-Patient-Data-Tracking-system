import mongoose from "mongoose";

const prescriptionSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Doctor",
    },
    name: {
      type: String,
      required: true,
    },
    medicine: {
      type: String,
      required: true,
    },
    qty: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
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

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    details: {
      testName: { type: String, required: true },
      appointmentDate: { type: String, required: true },
      appointmentTime: { type: String, required: true },
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Test",
    },
    feedback: { type: String },

    paymentID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
    },
    slot_id: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
      default: 0.0,
    },
    testReport: [TestReportSchema],
    prescription: [prescriptionSchema],
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },

    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    Status: {
      type: String,
      required: true,
      default: "Pending",
    },
    paidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model("Appointment", appointmentSchema);

export default Appointment;
