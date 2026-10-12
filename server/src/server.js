import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Security and middleware
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json({ limit: "10kb" }));
app.use("/api/auth", authRoutes);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false,
  })
);


// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "BOSS API is running 🚀",
  });
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`BOSS server running at http://localhost:${PORT}`);
  });
};

startServer();