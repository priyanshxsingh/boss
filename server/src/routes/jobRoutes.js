
import express from "express";
import { createJob, getJobs, getMyJobs, getJobById } from "../controllers/jobController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes require authentication
router.use(protect);

// Hunters browse available jobs
router.get("/", getJobs);

// Providers view their own jobs
router.get("/my-jobs", authorize("provider"), getMyJobs);

router.get("/:id", authorize("hunter"), getJobById);

// Only Providers can post jobs
router.post("/", authorize("provider"), createJob);

export default router;
