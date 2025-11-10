import { assetModel } from "../models/Asset.js";

export const createAsset = async (req, res) => {
  try {
    const asset = await assetModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Asset created successfully",
      data: asset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create asset",
      error: error.message,
    });
  }
};

export const getAllAssets = async (req, res) => {
  try {
    const assets = await assetModel.find();
    res.status(200).json({
      success: true,
      data: assets,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch assets",
      error: error.message,
    });
  }
};

export const updateAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedAsset = await assetModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true } // important
    );

    if (!updatedAsset) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Asset updated successfully",
      data: updatedAsset,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update asset",
      error: error.message,
    });
  }
};

export const deleteAsset = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await assetModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Asset not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Asset deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete asset",
      error: error.message,
    });
  }
};
