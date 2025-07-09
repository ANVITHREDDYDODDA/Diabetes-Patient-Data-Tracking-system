import express from "express";
const router = express.Router();
import {
  loginDoctor,
  logoutDoctor,
  getDoctors,
  getDoctorById,
  deleteDoctor,
  updateDoctor,
  updateDoctorProfile,
  registerDoctor,
} from "../controllers/doctor.js";
router.route("/").get(getDoctors).post(registerDoctor);
router.post("/logout", logoutDoctor);
router.post("/login", loginDoctor);
router.route("/:id").get(getDoctorById).put(updateDoctor).delete(deleteDoctor);
router.route("/:id/profile").put(updateDoctorProfile);

export default router;
