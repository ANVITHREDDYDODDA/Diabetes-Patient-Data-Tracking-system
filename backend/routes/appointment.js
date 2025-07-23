import express from "express";
const router = express.Router();
import { protect } from "../helpers/middlewares/authMiddleware.js";
import {
  createAppointment,
  createPrescription,
  createTestReport,
  getAllAppointments,
  getAppointmentById,
  getMyAppointments,
  updateAppointmentToCancel,
  updateAppointmentToPaid,
  updateStatus,
} from "../controllers/Appointment.js";
router.route("/").post(protect, createAppointment).get(getAllAppointments);
router.route("/:id").get(getAppointmentById).put(updateStatus);
router.route("/:id/pay").put(updateAppointmentToPaid);
router.route("/:id/cancel").put(updateAppointmentToCancel);
router.route("/myappointments/:id").get(getMyAppointments);
router.route("/:id/testreport").post(createTestReport);
router.route("/:id/pre").post(createPrescription);
router.route("/:id/feed").post(updateStatus);
export default router;
