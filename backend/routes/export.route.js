import express from 'express';
import { exportTransactions } from '../controllers/export.controller.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.get("/csv", requireAuth(), exportTransactions);

export default router;