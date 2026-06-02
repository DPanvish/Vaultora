import { Parser } from "json2csv"
import { Transaction } from "../models/Transaction.model.js";

// @desc      Export transactions to CSV
// @route     GET /api/export/csv
export const exportTransactions = async(req, res) => {
    const {startDate, endDate} = req.query;
    const userId = req.auth.userId;

    try{
        const query = {userId};
        if(startDate || endDate){
            query.date = {};
            if(startDate){ 
                query.date.$gte = new Date(startDate);
            }
            if(endDate){
                query.date.$lte = new Date(endDate);
            }
        }

        const transactions = await Transaction.find(query)
            .populate("category", "name")
            .populate("account", "name")
            .sort({date: -1});

        if(transactions.length === 0){
            return res.status(404).json({message: "No transactions found for this period"});
        }

        const csvData = transactions.map(t => ({
            Date: t.date.toISOString().split('T')[0],
            Type: t.type,
            Category: t.category?.name || 'Uncategorized',
            Account: t.account?.name || 'Unknown',
            Description: t.description || '',
            Amount: t.amount
        }));

        const json2csvParser = new Parser();
        const csv = json2csvParser.parse(csvData);

        res.header('Content-Type', 'text/csv');
        res.attachment(`Vaultora_Export_${new Date().toISOString().split('T')[0]}.csv`);

        res.send(csv);
    }catch(error){
        res.status(500).json({error: error.message});
    }
}