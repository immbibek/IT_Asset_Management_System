import express from "express";
import {
  createAsset,
  getAllAssets,
  updateAsset,
  deleteAsset,
  seedAssets, // Import seedAssets
} from "../controllers/assetController.js";

const router = express.Router();

router.post("/", createAsset);
router.get("/", getAllAssets);
router.put("/:id", updateAsset);
router.delete("/:id", deleteAsset);
router.post("/seed", seedAssets); // Add a route for seeding assets

export default router;
