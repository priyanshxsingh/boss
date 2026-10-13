import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    description: {
      type: String,
      required: [true, "Job description is required"],
      trim: true,
      minlength: 20,
      maxlength: 3000,
    },

    category: {
      type: String,
      required: [true, "Job category is required"],
      trim: true,
      maxlength: 60,
    },

    budget: {
      type: Number,
      required: [true, "Job budget is required"],
      min: [1, "Budget must be greater than zero"],
    },

    budgetType: {
      type: String,
      enum: ["fixed", "hourly"],
      default: "fixed",
    },

    workType: {
      type: String,
      enum: ["online", "offline", "hybrid"],
      required: true,
    },

    location: {
      type: String,
      trim: true,
      maxlength: 150,
      default: "",
    },

    skillsRequired: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["open", "in-progress", "completed", "cancelled"],
      default: "open",
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    hiredHunter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

jobSchema.index({ status: 1, createdAt: -1 });

const Job = mongoose.model("Job", jobSchema);

export default Job;
