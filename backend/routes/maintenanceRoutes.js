import express from 'express';
const router = express.Router();
import {
  getMaintenanceRecords,
  getMaintenanceStats,
  addMaintenanceRecord,
} from '../controllers/maintenanceController.js';
// Assuming protect middleware for authentication
// const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getMaintenanceRecords) // .get(protect, getMaintenanceRecords)
  .post(addMaintenanceRecord); // .post(protect, addMaintenanceRecord)

router.get('/stats', getMaintenanceStats); // .get(protect, getMaintenanceStats)

export default router;
