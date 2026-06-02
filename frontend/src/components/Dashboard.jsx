import { useState } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { Plus, Download, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpenseOverview from './ExpenseOverview';
import BalanceCard from './BalanceCard';
import TransactionModal from './TransactionModal';
import ExpenseChart from './ExpenseChart'; // Import Chart

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRange, setActiveRange] = useState('1 Month');

  const ranges = ['Today', '7 Days', '1 Month', '6 Months', '1 Year', 'Overall'];

  const dummyAccounts = [
    { _id: '1', name: 'HDFC Bank', balance: 45000, type: 'BANK' },
    { _id: '2', name: 'SBI Bank', balance: 32000, type: 'BANK' },
    { _id: '3', name: 'Pocket Cash', balance: 1500, type: 'CASH' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto w-full pt-12">
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 border-b border-white/[0.04] pb-8 gap-6">
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
            onClick={() => setIsModalOpen(true)} 
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

      {/* FILTER BAR SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
        {/* Time Ranges Segmented Control */}
        <div className="flex p-1 bg-white/[0.02] border border-white/[0.04] rounded-xl overflow-x-auto max-w-full custom-scrollbar relative">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => setActiveRange(range)}
              className="relative px-5 py-2 text-xs font-medium tracking-wide whitespace-nowrap transition-colors z-10"
            >
              <span className={`relative z-10 ${activeRange === range ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                {range}
              </span>
              {activeRange === range && (
                <motion.div
                  layoutId="activeRangePill"
                  className="absolute inset-0 bg-white/[0.06] border border-white/[0.08] rounded-lg"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Calendar Picker Trigger */}
        <button className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-gray-400 bg-[#050505] border border-white/[0.06] rounded-xl hover:text-white hover:border-white/[0.15] transition-all">
          <Calendar size={14} />
          <span>Specific Date</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
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
        {/* The New Chart Area */}
        <ExpenseChart />
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;