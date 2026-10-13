
import Job from "../models/Job.js";

// @desc    Create a new job
// @route   POST /api/jobs
// @access  Service Provider only
export const createJob = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      budget,
      budgetType,
      workType,
      location,
      skillsRequired,
    } = req.body;

    const job = await Job.create({
      title,
      description,
      category,
      budget,
      budgetType,
      workType,
      location,
      skillsRequired,
      provider: req.user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    console.error("Create job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to create job",
    });
  }
};

// @desc    Get all open jobs
// @route   GET /api/jobs
// @access  Authenticated users
export const getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ status: "open" })
      .populate("provider", "name avatar")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch jobs",
    });
  }
};

// @desc    Get jobs posted by the logged-in Provider
// @route   GET /api/jobs/my-jobs
// @access  Service Provider only
export const getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ provider: req.user.userId })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: jobs.length,
      jobs,
    });
  } catch (error) {
    console.error("Get my jobs error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your jobs",
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!/^[a-f\d]{24}$/i.test(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    const job = await Job.findOne({
      _id: id,
      status: "open",
    })
      .populate("provider", "name avatar bio location")
      .lean();

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or no longer available",
      });
    }

    return res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    console.error("Get job details error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch job details",
    });
  }
};