import express from 'express';
import { requireAuth } from '@clerk/express';
import { getTransactionByCategory } from '../controllers/analytics.controller.js';

const router = express.Router();

router.get("/categories", requireAuth(), getTransactionByCategory);

export default router;