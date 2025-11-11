import express from 'express';
import {
  createIssue,
  getIssues,
  getIssueById,
  updateIssue,
  deleteIssue,
  getIssueSummary, // Import the new summary function
} from '../controllers/issueController.js';

const router = express.Router();

router.route('/').post(createIssue).get(getIssues);
router.get('/summary', getIssueSummary); // New route for issue summary
router.route('/:id').get(getIssueById).put(updateIssue).delete(deleteIssue);

export default router;
