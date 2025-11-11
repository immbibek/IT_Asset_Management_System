import mongoose from "mongoose";

const assetSchema = new mongoose.Schema(
  {
    assetName: { type: String, required: true },
    category: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    purchaseDate: { type: Date },
    cost: { type: String, required: true },
    status: {
      type: String,
      required: true,
    },
    warranty : {
      type : Number,
      required : true
    },
    supplier : {
        type : String,
        required : true
    },
    location : {
        type : String,
        required :true
    },
    lifespan: {
      type: Number,
      required: true,
      default: 5, // Default to 5 years if not provided
    }
  },
  
);

// Correct Model Naming
const Asset = mongoose.models.Asset || mongoose.model("Asset", assetSchema);

export default Asset;
