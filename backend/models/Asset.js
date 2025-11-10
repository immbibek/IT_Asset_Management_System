import mongoose from "mongoose";

const assetSchema = new mongoose.Schema({
  assetName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  purchaseDate: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["assigned", "available", "under maintenance", "retired"],
    required: true,
    default: "available",
  },
  cost: {
    type: String,
    required: true,
  },
});

export const assetModel =
  mongoose.models.assetCollections ||
  mongoose.model("assetCollections", assetSchema);
