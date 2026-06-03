import { useState, useMemo } from 'react';
import { UserButton } from "@clerk/clerk-react";
import { Plus, Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import ExpenseOverview from './ExpenseOverview';
import BalanceCard from './BalanceCard';
import TransactionModal from './TransactionModal';
import ExpenseChart from './ExpenseChart';
import CalendarPicker from './CalendarPicker';
import Onboarding from './Onboarding';
import { useDashboardData, useAccounts } from '../hooks/useFinance';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRange, setActiveRange] = useState('1 Month');
  const [selectedDate, setSelectedDate] = useState(null);

  const ranges = ['Today', '7 Days', '1 Month', '6 Months', '1 Year', 'Overall'];

  const { data: transactions = [], isLoading: isLoadingTx } = useDashboardData({
    range: activeRange,
    date: selectedDate?.toISOString(),
  });
  
  const { data: accounts = [], isLoading: isLoadingAcc } = useAccounts();

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach(tx => {
      if (tx.type === 'INCOME') income += tx.amount;
      if (tx.type === 'EXPENSE') expense += tx.amount;
    });

    return { income, expense, savings: income - expense };
  }, [transactions]);

  const chartData = useMemo(() => {
    const grouped = transactions
      .filter(tx => tx.type === 'EXPENSE')
      .reduce((acc, tx) => {
        const dateStr = new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        acc[dateStr] = (acc[dateStr] || 0) + tx.amount;
        return acc;
      }, {});

    return Object.keys(grouped).map(date => ({
      date,
      expenses: grouped[date]
    })).reverse(); 
  }, [transactions]);

  const handleRangeClick = (range) => {
    setActiveRange(range);
    setSelectedDate(null); 
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (date) {
      setActiveRange(null); 
    } else {
      setActiveRange('1 Month'); 
    }
  };

  if (isLoadingTx || isLoadingAcc) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col font-sans">
        <div className="absolute inset-0 opacity-20 pointer-events-none filter blur-xl">
          <div className="max-w-6xl mx-auto w-full pt-12 h-full border border-white/5" />
        </div>
        <Onboarding />
      </div>
    );
  }

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

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex p-1 bg-white/[0.02] border border-white/[0.04] rounded-xl overflow-x-auto max-w-full custom-scrollbar relative">
          {ranges.map((range) => (
            <button
              key={range}
              onClick={() => handleRangeClick(range)}
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

        <CalendarPicker 
          selectedDate={selectedDate} 
          onSelectDate={handleDateSelect} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <ExpenseOverview 
          expense={totals.expense} 
          income={totals.income} 
          savings={totals.savings} 
        />
        
        {accounts.map((acc, i) => (
          <BalanceCard 
            key={acc._id}
            index={i}
            title={acc.name}
            amount={acc.currentBalance}
            type={acc.type}
          />
        ))}

        <ExpenseChart data={chartData} />
      </div>

      <TransactionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;