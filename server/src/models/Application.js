
import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },

    hunter: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    provider: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    coverLetter: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 2000,
    },

    experience: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: "",
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "withdrawn"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

// Prevent a Hunter from applying to the same job more than once.
applicationSchema.index(
  { job: 1, hunter: 1 },
  { unique: true }
);

// Make it easier to retrieve applications for a Provider.
applicationSchema.index({ provider: 1, status: 1 });

const Application = mongoose.model("Application", applicationSchema);

export default Application;
