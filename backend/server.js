import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import AssetRouter from "./routes/assetRoutes.js"; 

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const PORT = process.env.PORT || 5000;

app.use("/api", AssetRouter);

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
