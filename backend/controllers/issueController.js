import asyncHandler from 'express-async-handler';
import IssueReport from '../models/IssueReport.js';
import Asset from '../models/Asset.js';
import { userModel as User } from '../models/User.js'; // Import as named export

// @desc    Create a new issue report
// @route   POST /api/issues
// @access  Private
const createIssue = asyncHandler(async (req, res) => {
  const { assetId, issueType, priority, description, reportingEmployeeId } = req.body;

  if (!assetId || !issueType || !priority || !description || !reportingEmployeeId) {
    res.status(400);
    throw new Error('All fields are required');
  }

  const newIssue = await IssueReport.create({
    asset: assetId,
    issueType,
    priority,
    description,
    reportingEmployee: reportingEmployeeId,
  });

  res.status(201).json(newIssue);
});

// @desc    Get all issues or issues by employee
// @route   GET /api/issues
// @access  Private
const getIssues = asyncHandler(async (req, res) => {
  const { employeeId } = req.query; // Use query for filtering

  let query = {};
  if (employeeId) {
    query = { reportingEmployee: employeeId };
  }

  const issues = await IssueReport.find(query)
    .populate('asset', 'assetName category serialNumber')
    .populate('reportingEmployee', 'name email');

  res.json(issues);
});

// @desc    Get single issue by ID
// @route   GET /api/issues/:id
// @access  Private
const getIssueById = asyncHandler(async (req, res) => {
  const issue = await IssueReport.findById(req.params.id)
    .populate('asset', 'assetName category serialNumber')
    .populate('reportingEmployee', 'name email');

  if (issue) {
    res.json(issue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Update an issue
// @route   PUT /api/issues/:id
// @access  Private
const updateIssue = asyncHandler(async (req, res) => {
  const { assetId, issueType, priority, description, status } = req.body;

  const issue = await IssueReport.findById(req.params.id);

  if (issue) {
    issue.asset = assetId || issue.asset;
    issue.issueType = issueType || issue.issueType;
    issue.priority = priority || issue.priority;
    issue.description = description || issue.description;
    issue.status = status || issue.status;

    const updatedIssue = await issue.save();
    res.json(updatedIssue);
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

// @desc    Delete an issue
// @route   DELETE /api/issues/:id
// @access  Private
const deleteIssue = asyncHandler(async (req, res) => {
  const issue = await IssueReport.findById(req.params.id);

  if (issue) {
    await issue.deleteOne();
    res.json({ message: 'Issue removed' });
  } else {
    res.status(404);
    throw new Error('Issue not found');
  }
});

export {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
};
