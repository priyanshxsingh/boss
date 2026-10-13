import express from "express";
import {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/my-applications", authorize("hunter"), getMyApplications);

router.post("/jobs/:id", authorize("hunter"), applyForJob);

router.get("/jobs/:jobId/applicants", authorize("provider"), getApplicants);

router.patch("/:id/status", authorize("provider"), updateApplicationStatus);

export default router;
