import express from "express";
import {
  applyForJob,
  getMyApplications,
  getApplicants,
  updateApplicationStatus,
  hireApplicant,
  submitWork,
  confirmWorkCompletion,
} from "../controllers/applicationController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/my-applications", authorize("hunter"), getMyApplications);

router.post("/jobs/:id", authorize("hunter"), applyForJob);

router.get("/jobs/:jobId/applicants", authorize("provider"), getApplicants);

router.patch("/:id/hire", authorize("provider"), hireApplicant);

router.patch("/:id/status", authorize("provider"), updateApplicationStatus);

router.patch("/jobs/:jobId/submit-work", authorize("hunter"), submitWork);

router.patch("/jobs/:jobId/confirm-completion", authorize("provider"), confirmWorkCompletion);

export default router;
