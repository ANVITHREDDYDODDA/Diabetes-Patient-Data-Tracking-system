import mongoose from "mongoose";

const TestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },

    schedule: [{ slot: String, unavailableDates: { type: [Date] } }],
  },
  { timestamps: true }
);

const Test = mongoose.model("Test", TestSchema);

export default Test;
