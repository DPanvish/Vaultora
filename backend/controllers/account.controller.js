import { Account } from "../models/Account.model.js";
import { getAuth } from "@clerk/express";

// @desc      Get all user accounts
// @route     GET /api/accounts
export const getUserAccounts = async(req, res) => {
    try{
        const { userId } = getAuth(req);
        const accounts = await Account.find({userId});
        res.status(200).json(accounts);
    }catch(error){
        res.status(500).json({error: error.message || "Server Error"});
    }
};

// @desc      Create the user accounts in bulk
// @route     POST /api/accounts/bulk
export const createAccounts = async(req, res) => {
    console.log("--- INCOMING ONBOARDING DATA ---");
  
  try {
    const { userId } = getAuth(req);
    console.log("1. Clerk Auth Object userId:", userId);
    
    if (!userId) {
      throw new Error("Clerk authentication passed, but userId is missing.");
    }

    const payload = Array.isArray(req.body) ? req.body : req.body.accounts;
    
    if (!payload || !Array.isArray(payload) || payload.length === 0) {
      throw new Error("Data format mismatch: Expected a populated array of accounts.");
    }

    const accountsToInsert = payload.map(acc => {
      return {
        name: acc.name,
        type: acc.type,
        currentBalance: Number(acc.currentBalance),
        userId: userId
      };
    });

    console.log("2. Final formatted data going to MongoDB:", accountsToInsert);

    const insertedAccounts = await Account.insertMany(accountsToInsert);
    console.log("3. Successfully saved to MongoDB!");
    
    res.status(201).json(insertedAccounts);

  } catch (error) {
    console.error("Backend Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};
