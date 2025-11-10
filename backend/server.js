import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
app.use(express.json());

connectDB();

const PORT = 3000;

app.get("/", (req, res) => {
  res.send("successful");
});

app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
