import Maintenance from '../models/Maintainance.js';
import asyncHandler from 'express-async-handler';

// @desc    Get all maintenance records
// @route   GET /api/maintenance
// @access  Private (assuming authentication middleware)
const getMaintenanceRecords = asyncHandler(async (req, res) => {
  const { search, status } = req.query;
  let query = {};

  if (search) {
    query.$or = [
      { assetName: { $regex: search, $options: 'i' } },
      // Assuming recordId is the MongoDB _id, or a custom field if added to schema
      // { _id: search } // This would require a valid ObjectId
    ];
  }

  if (status) {
    query.status = status;
  }

  const records = await Maintenance.find(query).populate('assetId', 'name'); // Populate asset details if needed
  res.json(records);
});

// @desc    Get maintenance statistics
// @route   GET /api/maintenance/stats
// @access  Private
const getMaintenanceStats = asyncHandler(async (req, res) => {
  const inProgress = await Maintenance.countDocuments({ status: 'In Progress' });
  const completedThisMonth = await Maintenance.countDocuments({
    status: 'Completed',
    startDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
  });
  const totalCostThisMonth = await Maintenance.aggregate([
    {
      $match: {
        startDate: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: '$cost' }
      }
    }
  ]);

  res.json({
    inProgress,
    completedThisMonth,
    totalCostThisMonth: totalCostThisMonth.length > 0 ? totalCostThisMonth[0].total : 0,
  });
});


// @desc    Add a new maintenance record
// @route   POST /api/maintenance
// @access  Private
const addMaintenanceRecord = asyncHandler(async (req, res) => {
  const { assetId, assetName, issueType, startDate, estimatedCompletion, status, cost, notes } = req.body;

  if (!assetId || !assetName || !issueType || !startDate || !cost) {
    res.status(400);
    throw new Error('Please enter all required fields');
  }

  const maintenanceRecord = await Maintenance.create({
    assetId,
    assetName,
    issueType,
    startDate,
    estimatedCompletion,
    status,
    cost,
    notes,
  });

  res.status(201).json(maintenanceRecord);
});

export {
  getMaintenanceRecords,
  getMaintenanceStats,
  addMaintenanceRecord,
};
