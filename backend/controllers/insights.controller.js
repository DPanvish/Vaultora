import { getAuth } from "@clerk/express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Transaction } from "../models/Transaction.model.js";

const genAI = new GoogleGenerativeAI("");

// @desc      Get AI insights based on recent transactions
// @route     GET /api/insights
export const getInsights = async(req, res) => {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({error: "Unauthorized"});
        }

        const transactions = await Transaction.find({userId})
            .select("amount type category date description -_id")
            .sort({date: -1})
            .limit(100);

        if(transactions.length === 0){
            return res.status(404).json({insight: "You haven't logged any transactions yet. Start tracking to get smart insights!"});
        }

        const prompt = `
            You are a sharp, modern financial advisor analyzing a user's recent expenses and income.
            Here is the JSON data of their recent transactions:
            ${JSON.stringify(transactions)}

            Please provide a concise, 3-to-4 sentence financial analysis. 
            Include:
            1. One positive habit you notice.
            2. One area where they might be spending too much (if applicable).
            3. A short, encouraging final thought.
            Do not use markdown formatting like asterisks or hashtags. Keep it conversational and punchy.
        `;

        const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash" });
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        res.status(200).json({insight: responseText});
    }catch(error){
        console.error("AI Insight Error:", error.message);
        res.status(500).json({ error: "Failed to generate AI insights." });
    }
}