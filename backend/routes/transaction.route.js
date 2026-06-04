import express from 'express';
import { createTransaction, getTransactions, deleteTransaction } from '../controllers/transaction.controller.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

router.post("/", requireAuth(), createTransaction);
router.get("/", requireAuth(), getTransactions);
router.delete('/:id', requireAuth(), deleteTransaction);

export default router;