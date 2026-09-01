import 'dotenv/config';
import mongoose from 'mongoose';
import { Account } from '../models/Account.model.js';

const args = process.argv.slice(2);

const printUsage = () => {
  console.log(`
Usage:
  npm run add:bank-account -- --userId <clerk-user-id> --name <account-name> --balance <opening-balance>

Example:
  npm run add:bank-account -- --userId user_123 --name "HDFC Bank" --balance 5000
`);
};

const getArgValue = (flag) => {
  const index = args.indexOf(flag);
  return index === -1 ? undefined : args[index + 1];
};

const userId = getArgValue('--userId');
const name = getArgValue('--name');
const balanceInput = getArgValue('--balance') ?? '0';
const currentBalance = Number(balanceInput);

const addBankAccount = async () => {
  try {
    if (args.includes('--help') || args.includes('-h')) {
      printUsage();
      return;
    }

    if (!userId || !name || !Number.isFinite(currentBalance)) {
      printUsage();
      throw new Error('Missing or invalid required arguments');
    }

    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing from your .env file');
    }

    await mongoose.connect(process.env.MONGO_URI);

    const account = await Account.create({
      userId,
      name,
      type: 'BANK',
      currentBalance,
    });

    console.log('Bank account added successfully:');
    console.log(`  ID: ${account._id}`);
    console.log(`  User: ${account.userId}`);
    console.log(`  Name: ${account.name}`);
    console.log(`  Balance: ${account.currentBalance}`);
  } catch (error) {
    console.error(`Failed to add bank account: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

addBankAccount();
