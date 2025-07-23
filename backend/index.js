import path from "path";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./helpers/connect.js";
//
import { notFound, errorHandler } from "./helpers/middlewares/error.js";

//routes
import userRoutes from "./routes/user.js";
import doctorRoutes from "./routes/doctor.js";
import appointmentRoutes from "./routes/appointment.js";
import testRoutes from "./routes/test.js";
import labRoutes from "./routes/lab.js";

dotenv.config();
const port = process.env.PORT || 8000;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectDB();
app.get("/", (req, res) => {
  res.send("api running");
});

app.use("/api/users", userRoutes);
app.use("/api/doctor", doctorRoutes);
app.use("/api/appointment", appointmentRoutes);
app.use("/api/test", testRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/config/pay", (req, res) =>
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID })
);

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Application is running on ${port}`);
});
