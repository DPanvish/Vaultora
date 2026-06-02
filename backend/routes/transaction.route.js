import express from 'express';
import { createTransaction, getTransactions } from '../controllers/transaction.controller.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.post("/", requireAuth(), createTransaction);
router.get("/", requireAuth(), getTransactions);

export default router;