import Asset from "../models/Asset.js";

// @desc    Create Asset
// @route   POST /api/assets
// @access  Private
export const createAsset = async (req, res) => {
  try {
    const newAsset = await Asset.create(req.body);
    res.status(201).json({ success: true, data: newAsset });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get All Assets
// @route   GET /api/assets
// @access  Private
export const getAllAssets = async (req, res) => {
  try {
    const assets = await Asset.find();
    res.status(200).json({ success: true, data: assets });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update Asset
// @route   PUT /api/assets/:id
// @access  Private
export const updateAsset = async (req, res) => {
  try {
    const updatedAsset = await Asset.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json({ success: true, data: updatedAsset });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Delete Asset
// @route   DELETE /api/assets/:id
// @access  Private
export const deleteAsset = async (req, res) => {
  try {
    await Asset.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Asset deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Seed dummy assets
// @route   POST /api/assets/seed
// @access  Private (Admin only, temporary)
export const seedAssets = async (req, res) => {
  try {
    await Asset.deleteMany({}); // Clear existing assets
    const dummyAssets = [
      {
        assetName: 'MacBook Pro 16"',
        category: "Laptop",
        serialNumber: "MBP-2023-001",
        purchaseDate: new Date("2023-01-15"),
        cost: "2499",
        status: "Available",
        warranty: 12,
        supplier: "Apple",
        location: "Office A",
      },
      {
        assetName: 'Dell Monitor 27"',
        category: "Monitor",
        serialNumber: "DEL-MON-2023-001",
        purchaseDate: new Date("2023-02-20"),
        cost: "399",
        status: "Available",
        warranty: 36,
        supplier: "Dell",
        location: "Office B",
      },
      {
        assetName: "iPhone 14 Pro",
        category: "Phone",
        serialNumber: "IPH-14P-2023-001",
        purchaseDate: new Date("2023-03-10"),
        cost: "1099",
        status: "Available",
        warranty: 24,
        supplier: "Apple",
        location: "Office C",
      },
      {
        assetName: "HP Printer LaserJet",
        category: "Printer",
        serialNumber: "HPP-2022-001",
        purchaseDate: new Date("2022-11-05"),
        cost: "549",
        status: "Available",
        warranty: 12,
        supplier: "HP",
        location: "Office A",
      },
    ];

    const createdAssets = await Asset.insertMany(dummyAssets);
    res.status(201).json({ message: "Assets seeded successfully", data: createdAssets });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
