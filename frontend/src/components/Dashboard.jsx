import { UserButton } from "@clerk/clerk-react";
import { Plus, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpenseOverview from './ExpenseOverview';
import BalanceCard from './BalanceCard';

const Dashboard = () => {
  const dummyAccounts = [
    { _id: '1', name: 'HDFC Bank', balance: 45000, type: 'BANK' },
    { _id: '2', name: 'SBI Bank', balance: 32000, type: 'BANK' },
    { _id: '3', name: 'Pocket Cash', balance: 1500, type: 'CASH' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full pt-12">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 border-b border-white/[0.04] pb-8 gap-6">
        <div>
          <h1 className="text-2xl font-semibold text-white tracking-tight">Vaultora</h1>
          <p className="text-gray-500 text-sm mt-1">Independent Living Ledger</p>
        </div>
        
        <div className="flex items-center gap-4 self-end sm:self-auto">
          <motion.button 
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-gray-400 uppercase rounded-xl border border-white/[0.06] bg-white/[0.01] hover:bg-white/[0.04] hover:text-white hover:border-white/[0.12] transition-all duration-300 cursor-pointer"
          >
            <Download size={14} />
            Export CSV
          </motion.button>

          <motion.button 
            whileHover={{ scale: 1.02, y: -1, boxShadow: '0 0 25px rgba(139,92,246,0.4)' }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider text-white uppercase rounded-xl bg-violet-600 border border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:bg-violet-500 transition-all duration-300 cursor-pointer"
          >
            <Plus size={14} />
            Log Transaction
          </motion.button>

          <div className="hidden sm:block h-8 w-px bg-white/[0.08] mx-1"></div>

          <div className="p-1 rounded-full bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
            <UserButton appearance={{ elements: { avatarBox: "w-8 h-8" } }} />
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <ExpenseOverview />
        {dummyAccounts.map((acc, i) => (
          <BalanceCard 
            key={acc._id}
            index={i}
            title={acc.name}
            amount={acc.balance}
            type={acc.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;