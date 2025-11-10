import express from "express";
import {
  createAsset,
  getAllAssets,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

const AssetRouter = express.Router();

AssetRouter.post("/assets", createAsset);
AssetRouter.get("/assets", getAllAssets);
AssetRouter.put("/assets/:id", updateAsset);
AssetRouter.delete("/assets/:id", deleteAsset);

export default AssetRouter;
