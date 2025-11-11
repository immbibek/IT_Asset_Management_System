import express from 'express';
import {
  getEmployees,
  getEmployeeAssets,
} from '../controllers/employeeController.js';

const router = express.Router();

router.get('/', getEmployees);
router.get('/:id/assets', getEmployeeAssets);

export default router;
