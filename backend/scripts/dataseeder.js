import 'dotenv/config';
import mongoose from 'mongoose';
import {Transaction} from '../models/Transaction.model.js'; 
import {Account} from '../models/Account.model.js';       

// Paste the transaction details you forgot to add here
const MISSED_TRANSACTIONS = [
    {
        amount: 407,
        type: "EXPENSE",
        category: "Food",
        accountName: "HDFC", 
        description: "Pizza",
        date: "2026-08-30", 
        userId: "user_3EcWcmIwzMPMUibZXigJqneXzrl" 
    },
];

const injectData = async () => {
    try {
        // Connect to MongoDB using your existing URI
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is missing from your .env file");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected securely to MongoDB...");

        for (const tx of MISSED_TRANSACTIONS) {
            // Find the correct account belonging to this user by its name
            const account = await Account.findOne({ name: tx.accountName, userId: tx.userId });
            
            if (!account) {
                console.error(`Skipping: Account '${tx.accountName}' not found for user.`);
                continue;
            }

            // Adjust the bank balance math accurately
            if (tx.type === "EXPENSE") {
                account.currentBalance -= tx.amount;
            } else if (tx.type === "INCOME") {
                account.currentBalance += tx.amount;
            }

            // Save the updated account balance
            await account.save();

            // Create and save the historical transaction
            await Transaction.create({
                userId: tx.userId,
                amount: tx.amount,
                type: tx.type,
                category: tx.category,
                account: account._id, // Assigning the true Object ID
                description: tx.description,
                date: new Date(tx.date)
            });

            console.log(`Successfully injected ${tx.type}: ₹${tx.amount} under ${tx.category}`);
        }

        console.log("All transactions processed successfully.");
    } catch (error) {
        console.error("Injection failed:", error.message);
    } finally {
        await mongoose.disconnect();
        console.log("Disconnected from MongoDB.");
    }
};

injectData();


// npm run add:bank-account -- --userId user_3EcWcmIwzMPMUibZXigJqneXzrl --name "ICICI" --balance 0