import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { clerkMiddleware, requireAuth } from '@clerk/express';
import { connectDB } from './config/db.js';

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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Vaultora server running on port ${PORT}`);
});