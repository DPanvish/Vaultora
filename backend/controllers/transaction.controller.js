import mongoose from "mongoose";
import { getAuth } from "@clerk/express";
import { Transaction } from "../models/Transaction.model.js";
import { Account } from "../models/Account.model.js";

// @desc      Create a new transaction
// @route     POST /api/transactions
export const createTransaction = async (req, res) => {
    const { amount, type, description, category, account, date } = req.body;
    const { userId } = getAuth(req);

    console.log("WHAT THE FRONTEND SENT:", req.body);
    console.log("WHO CLERK THINKS THIS IS:", getAuth(req).userId);

    if(!userId){
        return res.status(401).json({ error: "Unauthorized: Missing Clerk User ID" });
    }

    if(!amount || !type || !category || !account){
        return res.status(400).json({ error: "Missing required transaction fields." });
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const newTransaction = new Transaction({
            userId,
            amount: Number(amount),
            type,
            description,
            category, 
            account,
            date: date ? new Date(date) : new Date()
        });

        await newTransaction.save({ session });

        const targetAccount = await Account.findOne({ _id: account, userId }).session(session);

        if(!targetAccount){
            throw new Error("Bank account not found or unauthorized.");
        }

        if(type === "EXPENSE"){
            targetAccount.currentBalance -= Number(amount);
        }else if(type === "INCOME"){
            targetAccount.currentBalance += Number(amount);
        }

        await targetAccount.save({ session });

        await session.commitTransaction();
        res.status(201).json(newTransaction);
    }catch(error){
        await session.abortTransaction();
        console.error("Transaction Creation Error:", error.message);
        res.status(400).json({ error: error.message });
    }finally{
        session.endSession();
    }
};

// @desc      Get all transactions
// @route     GET /api/transactions
export const getTransactions = async (req, res) => {
    try {
        const { userId } = getAuth(req);
        const { range, date } = req.query;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized: Missing Clerk User ID" });
        }

        let query = { userId };

        if (date) {
            const targetDate = new Date(date);
            const startOfDay = new Date(targetDate.setHours(0, 0, 0, 0));
            const endOfDay = new Date(targetDate.setHours(23, 59, 59, 999));
            query.date = { $gte: startOfDay, $lte: endOfDay };
        } else if (range && range !== 'Overall') {
            const now = new Date();
            let startDate = new Date();
            
            if (range === 'Today') startDate.setHours(0, 0, 0, 0);
            else if (range === '7 Days') startDate.setDate(now.getDate() - 7);
            else if (range === '1 Month') startDate.setMonth(now.getMonth() - 1);
            else if (range === '6 Months') startDate.setMonth(now.getMonth() - 6);
            else if (range === '1 Year') startDate.setFullYear(now.getFullYear() - 1);
            
            query.date = { $gte: startDate };
        }

        const transactions = await Transaction.find(query)
            .populate("account", "name") 
            .sort({ date: -1 }); 

        res.status(200).json(transactions);
    } catch (error) {
        console.error("Fetch Transactions Error:", error.message);
        res.status(400).json({ error: error.message });
    }
};