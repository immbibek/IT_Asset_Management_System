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
  const { employeeId, searchTerm, statusFilter } = req.query;

  let query = {};
  if (employeeId) {
    query.reportingEmployee = employeeId;
  }

  if (statusFilter && statusFilter !== 'All') {
    query.status = statusFilter;
  }

  if (searchTerm) {
    query.$or = [
      { description: { $regex: searchTerm, $options: 'i' } },
      // Assuming assetName can be searched if populated
      // This will require a separate lookup or a change in how assetName is stored/indexed
      // For now, we'll search on populated asset.assetName in the next step
    ];
  }

  let issues = await IssueReport.find(query)
    .populate('asset', 'assetName category serialNumber')
    .populate('reportingEmployee', 'name email');

  // Client-side filtering for assetName if searchTerm is present and assetName is populated
  if (searchTerm) {
    issues = issues.filter(issue =>
      issue.asset && issue.asset.assetName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  res.json(issues);
});

// @desc    Get issue summary (counts by status)
// @route   GET /api/issues/summary
// @access  Private
const getIssueSummary = asyncHandler(async (req, res) => {
  const totalRequests = await IssueReport.countDocuments();
  const openRequests = await IssueReport.countDocuments({ status: 'Open' });
  const inProgressRequests = await IssueReport.countDocuments({ status: 'In Progress' });
  const resolvedRequests = await IssueReport.countDocuments({ status: 'Resolved' });
  const closedRequests = await IssueReport.countDocuments({ status: 'Closed' }); // Include Closed status

  res.json({
    totalRequests,
    openRequests,
    inProgressRequests,
    resolvedRequests,
    closedRequests,
  });
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
  getIssueSummary,
};
