import asyncHandler from 'express-async-handler';
import { userModel as User } from '../models/User.js'; // Import as named export
import Assignment from '../models/Assignment.js';
import Asset from '../models/Asset.js';

// @desc    Get all employees
// @route   GET /api/employees
// @access  Private (Admin only, or authenticated users)
const getEmployees = asyncHandler(async (req, res) => {
  const employees = await User.find({}).select('-password'); // Exclude password from results
  res.json(employees);
});

// @desc    Get assets assigned to a specific employee
// @route   GET /api/employees/:id/assets
// @access  Private (Admin or the employee themselves)
const getEmployeeAssets = asyncHandler(async (req, res) => {
  const employeeId = req.params.id;

  // Find assignments for the given employee
  const assignments = await Assignment.find({ employee: employeeId }).populate('asset');

  // If no assignments are found, return an empty array instead of 404
  if (!assignments || assignments.length === 0) {
    return res.json([]);
  }

  const assets = assignments.map(assignment => ({
    id: assignment.asset._id,
    name: assignment.asset.assetName,
    category: assignment.asset.category,
    serialNumber: assignment.asset.serialNumber,
    assignedDate: assignment.assignmentDate,
  }));
  res.json(assets);
});

export {
  getEmployees,
  getEmployeeAssets,
};
