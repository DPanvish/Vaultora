import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

const ExpenseOverview = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-purple-900/20 p-8 border border-indigo-500/20 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-50"></div>
      
      <h2 className="text-indigo-200/80 mb-2 font-medium">Total Expenses (This Month)</h2>
      <div className="text-5xl font-extrabold text-white tracking-tighter mb-6 flex items-center gap-4">
        ₹42,500
        <span className="text-sm font-medium px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 flex items-center gap-1">
          <TrendingUp size={14} /> +12%
        </span>
      </div>

      <div className="flex gap-8 text-sm">
        <div>
          <span className="text-gray-500 block mb-1">Total Income</span>
          <span className="text-emerald-400 font-semibold text-lg">₹1,20,000</span>
        </div>
        <div className="w-px h-10 bg-white/10"></div>
        <div>
          <span className="text-gray-500 block mb-1">Net Savings</span>
          <span className="text-blue-400 font-semibold text-lg">₹77,500</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseOverview;