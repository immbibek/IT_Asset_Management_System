import express from 'express';
import {
  getDepreciationSummary,
  getDepreciationDetails,
  getAssetValueTrend,
} from '../controllers/depreciationController.js';

const router = express.Router();

router.get('/summary', getDepreciationSummary);
router.get('/details', getDepreciationDetails);
router.get('/trend', getAssetValueTrend);

export default router;
