import mongoose from "mongoose";
import { getAuth } from "@clerk/express";
import { Transaction } from "../models/Transaction.model.js";
import { Account } from "../models/Account.model.js";

// @desc      Create a new transaction
// @route     POST /api/transactions
export const createTransaction = async(req, res) => {
    const { amount, type, description, category, account, date } = req.body;
    const { userId } = getAuth(req);

    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const newTransaction = new Transaction({
            userId,
            amount,
            type,
            description,
            category,
            account,
            date
        });

        await newTransaction.save({session});

        const targetAccount = await Account.findOne({_id: account, userId}).session(session);

        if(!targetAccount){
            throw new Error("Account not found");
        }

        if(type === "EXPENSE"){
            targetAccount.currentBalance -= amount;
        }else if(type === "INCOME"){
            targetAccount.currentBalance += amount;
        }

        await targetAccount.save({session});

        await session.commitTransaction();
        res.status(201).json(newTransaction);
    }catch(error){
        await session.abortTransaction();
        res.status(400).json({error: error.message});
    }finally{
        session.endSession();
    }
};

// @desc      Get all transactions
// @route     GET /api/transactions
export const getTransactions = async(req, res) => {
    try{
        const { userId } = getAuth(req);
        const transactions = await Transaction.find({userId})
            .populate("category", "name")
            .populate("account", "name")
            .sort({date: -1})
            .limit(50)

        res.status(200).json(transactions);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};