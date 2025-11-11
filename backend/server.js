import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import assetRoutes from "./routes/assetRoutes.js";
import assignmentRoutes from "./routes/assignmentRoutes.js"; // Import assignment routes
import userRoutes from "./routes/userRoutes.js"; // Import user routes
import authRoutes from "./routes/authRoutes.js"; // Import auth routes
import employeeRoutes from "./routes/employeeRoutes.js"; // Import employee routes
import issueRoutes from "./routes/issueRoutes.js"; // Import issue routes
import maintenanceRoutes from "./routes/maintenanceRoutes.js"; // Import maintenance routes
import depreciationRoutes from "./routes/depreciationRoutes.js"; // Import depreciation routes

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/assets", assetRoutes);
app.use("/api/assignments", assignmentRoutes); // Use assignment routes
app.use("/api/users", userRoutes); // Use user routes
app.use("/api/auth", authRoutes); // Use auth routes
app.use("/api/employees", employeeRoutes); // Use employee routes
app.use("/api/issues", issueRoutes); // Use issue routes
app.use("/api/maintenance", maintenanceRoutes); // Use maintenance routes
app.use("/api/depreciation", depreciationRoutes); // Use depreciation routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
