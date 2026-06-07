import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { connectDB } from './config/db.js';
import transactionRouter from './routes/transaction.route.js';
import exportRouter from './routes/export.route.js';
import accountRouter from './routes/account.route.js';
import insightsRouter from './routes/insights.route.js';
import analyticsRouter from './routes/analytics.route.js';

dotenv.config();

connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); 

// Clerk Authentication Middleware
app.use(clerkMiddleware());

// Public Route Test
app.get('/', (req, res) => {
  res.send('Vaultora API is running...');
});

// Routes
app.use('/api/transactions', transactionRouter);
app.use('/api/export', exportRouter);
app.use('/api/accounts', accountRouter);
app.use('/api/insights', insightsRouter);
app.use('/api/analytics', analyticsRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Vaultora server running on port ${PORT}`);
});