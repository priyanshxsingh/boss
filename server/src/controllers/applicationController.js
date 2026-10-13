
import mongoose from "mongoose";
import Application from "../models/Application.js";
import Job from "../models/Job.js";

export const applyForJob = async (req, res) => {
  try {
    const { id } = req.params;
    const { coverLetter, experience = "" } = req.body;

    // Validate job ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid job ID",
      });
    }

    // Validate cover letter
    if (
      typeof coverLetter !== "string" ||
      coverLetter.trim().length < 20 ||
      coverLetter.trim().length > 2000
    ) {
      return res.status(400).json({
        success: false,
        message: "Cover letter must be between 20 and 2000 characters",
      });
    }

    // Validate experience
    if (
      typeof experience !== "string" ||
      experience.trim().length > 1000
    ) {
      return res.status(400).json({
        success: false,
        message: "Experience must be 1000 characters or fewer",
      });
    }

    // Find an open job
    const job = await Job.findOne({
      _id: id,
      status: "open",
    }).select("provider");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found or no longer available",
      });
    }

    // Prevent the provider from applying to their own job
    if (job.provider.toString() === req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You cannot apply to your own job",
      });
    }

    // Create the application
    const application = await Application.create({
      job: job._id,
      hunter: req.user.userId,
      provider: job.provider,
      coverLetter: coverLetter.trim(),
      experience: experience.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Application submitted successfully",
      application,
    });
  } catch (error) {
    // Handle duplicate applications
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    console.error("Apply for job error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to submit application",
    });
  }
};


export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      hunter: req.user.userId,
    })
      .populate("job", "title category budget budgetType workType location status")
      .populate("provider", "name avatar")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get my applications error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your applications",
    });
  }
};


export const getApplicants = async (req, res) => {
  try {
    const { jobId } = req.params;

    // Find the job and verify that the logged-in provider owns it
    const job = await Job.findById(jobId).select("provider title");

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    if (job.provider.toString() !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "You can only review applicants for your own jobs",
      });
    }

    const applications = await Application.find({ job: jobId })
      .populate("hunter", "name avatar bio location")
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      job: {
        _id: job._id,
        title: job.title,
      },
      count: applications.length,
      applications,
    });
  } catch (error) {
    console.error("Get applicants error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch applicants",
    });
  }
};


export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Status must be accepted or rejected",
      });
    }

    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Application not found",
      });
    }

    // Verify that the logged-in provider owns the job.
    const job = await Job.findOne({
      _id: application.job,
      provider: req.user.userId,
    });

    if (!job) {
      return res.status(403).json({
        success: false,
        message: "You cannot manage this application",
      });
    }

    if (application.status !== "pending") {
      return res.status(409).json({
        success: false,
        message: "Only pending applications can be updated",
      });
    }

    application.status = status;
    await application.save();

    return res.status(200).json({
      success: true,
      message: `Application ${status} successfully`,
      application,
    });
  } catch (error) {
    console.error("Update application status error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Failed to update application status",
    });
  }
};
