import express from 'express';
import {
  assignAsset,
  unassignAsset,
  getAssignments,
  getEmployeeAssignments,
  getAssetAssignments,
} from '../controllers/assignmentController.js';

const router = express.Router();

router.post('/', assignAsset);
router.put('/:id/unassign', unassignAsset);
router.get('/', getAssignments);
router.get('/employee/:employeeId', getEmployeeAssignments);
router.get('/asset/:assetId', getAssetAssignments);

export default router;
