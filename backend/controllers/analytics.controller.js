import { getAuth } from "@clerk/express";
import { Transaction } from "../models/Transaction.model.js";

export const getTransactionByCategory = async(req, res) => {
    try{
        const {userId} = getAuth(req);
        if(!userId){
            return res.status(401).json({error: "Unauthorized"});
        }

        const {range, startDate, endDate} = req.query;
        let queryDate = {};

        const now = new Date();
        if(range === '7d'){
            queryDate = { $gte: new Date(now.setDate(now.getDate() - 7)) };
        }else if(range === '30d'){
            queryDate = { $gte: new Date(now.setDate(now.getDate() - 30)) };
        }else if(range === 'custom' && startDate && endDate){
            const start = new Date(startDate);
            const end = new Date(endDate);

            if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || start > end) {
                return res.status(400).json({ error: "Invalid custom date range." });
            }

            // Include the entire end day
            end.setHours(23, 59, 59, 999);
            queryDate = { $gte: start, $lte: end };
         }else{
            // Default to last 30 days if unspecified
            queryDate = { $gte: new Date(now.setDate(now.getDate() - 30)) };
        }

        const stats = await Transaction.aggregate([
            {
                $match: {
                    userId,
                    date: queryDate,
                    type: 'EXPENSE'
                }
            },
            {
                $group: {
                    _id: '$category',
                    totalAmount: { $sum: '$amount' }
                }
            },
            {
                $sort: { totalAmount: -1 }
            }
        ]);

        const formattedStats = stats.map(stat => ({
            category: stat._id,
            value: stat.totalAmount
        }));

        res.status(200).json(formattedStats);
    }catch(error){
        console.error("Analytics Engine Error:", error.message);
        res.status(500).json({ error: "Failed to fetch category analytics." });
    }
}