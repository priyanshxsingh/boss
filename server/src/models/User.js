import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 80,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },

    role: {
      type: String,
      enum: ["provider", "hunter", "admin"],
      required: true,
      default: "hunter",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    location: {
      city: { type: String, default: "" },
      state: { type: String, default: "" },
      country: { type: String, default: "India" },
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;