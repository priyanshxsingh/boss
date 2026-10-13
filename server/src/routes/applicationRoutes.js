
import express from "express";
import { applyForJob, getMyApplications } from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/my-applications", authorize("hunter"), getMyApplications);

router.post(
  "/jobs/:id",
  authorize("hunter"),
  applyForJob
);

export default router;
