import express from "express";
const router = express.Router();
import {
  addTest,
  deleteTest,
  getTestById,
  getTests,
  updateTest,
} from "../controllers/test.js";

router.route("/").get(getTests).post(addTest);
router.route("/:id").get(getTestById).put(updateTest).delete(deleteTest);

export default router;
