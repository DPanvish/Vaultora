import express from 'express';
import { requireAuth } from '@clerk/express';
import { getInsights } from '../controllers/insights.controller.js';

const router = express.Router();

router.get("/", requireAuth(), getInsights);

export default router;