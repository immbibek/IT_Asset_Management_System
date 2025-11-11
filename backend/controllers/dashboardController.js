import Asset from "../models/Asset.js";
import Assignment from "../models/Assignment.js";
import Maintainance from "../models/Maintainance.js";
import IssueReport from "../models/IssueReport.js";

export const getDashboardData = async (req, res) => {
  try {
    // Stats
    const totalAssets = await Asset.countDocuments();
    const assignedAssets = await Assignment.countDocuments();
    const maintenanceAssets = await Maintainance.countDocuments({
      status: { $in: ["In Progress", "Pending Parts"] },
    }); // Count assets with 'In Progress' or 'Pending Parts' status for maintenance
    const openRequests = await IssueReport.countDocuments({
      status: { $in: ["Open", "In Progress"] },
    }); // Count issue reports with 'Open' or 'In Progress' status

    const stats = {
      totalAssets,
      assigned: assignedAssets,
      maintenance: maintenanceAssets,
      
      openRequests,
    };

    // Assets by Category
    const assetsByCategory = await Asset.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          _id: 0,
        },
      },
    ]);

    // Asset Status Distribution
    const statusDistribution = await Asset.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          name: "$_id",
          value: "$count",
          color: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", "Available"] }, then: "#10b981" },
                { case: { $eq: ["$_id", "Assigned"] }, then: "#3b82f6" },
                { case: { $eq: ["$_id", "Under Maintenance"] }, then: "#f59e0b" },
                { case: { $eq: ["$_id", "Retired"] }, then: "#ef4444" },
              ],
              default: "#6b7280", // Default color for other statuses
            },
          },
          _id: 0,
        },
      },
    ]);

    // Asset Growth Trend (Monthly)
    const assetGrowthTrend = await Asset.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$purchaseDate" },
            month: { $month: "$purchaseDate" },
          },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1 },
      },
      {
        $project: {
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id.month", 1] }, then: "Jan" },
                { case: { $eq: ["$_id.month", 2] }, then: "Feb" },
                { case: { $eq: ["$_id.month", 3] }, then: "Mar" },
                { case: { $eq: ["$_id.month", 4] }, then: "Apr" },
                { case: { $eq: ["$_id.month", 5] }, then: "May" },
                { case: { $eq: ["$_id.month", 6] }, then: "Jun" },
                { case: { $eq: ["$_id.month", 7] }, then: "Jul" },
                { case: { $eq: ["$_id.month", 8] }, then: "Aug" },
                { case: { $eq: ["$_id.month", 9] }, then: "Sep" },
                { case: { $eq: ["$_id.month", 10] }, then: "Oct" },
                { case: { $eq: ["$_id.month", 11] }, then: "Nov" },
                { case: { $eq: ["$_id.month", 12] }, then: "Dec" },
              ],
              default: "Unknown",
            },
          },
          assets: "$count",
          _id: 0,
        },
      },
    ]);

    // Recently Added Assets
    const recentAssets = await Asset.find()
      .sort({ purchaseDate: -1 })
      .limit(4)
      .select("_id assetName category status"); // Select _id and assetName

    res.status(200).json({
      stats,
      assetCategoryData: assetsByCategory,
      monthlyTrend: assetGrowthTrend,
      statusData: statusDistribution,
      recentAssets: recentAssets.map(asset => ({
        id: asset._id, // Use _id for the key
        name: asset.assetName, // Use assetName for the name
        category: asset.category,
        status: asset.status,
      })),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
