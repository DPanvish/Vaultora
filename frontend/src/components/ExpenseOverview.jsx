import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

const ExpenseOverview = ({ expense = 0, income = 0, savings = 0 }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="col-span-1 md:col-span-2 lg:col-span-3 rounded-2xl bg-gradient-to-b from-[#0e0e0e] to-[#060606] p-8 border border-white/[0.06] hover:border-violet-500/30 hover:shadow-[0_0_50px_rgba(139,92,246,0.08)] relative overflow-hidden flex flex-col justify-between transition-all duration-500 group cursor-pointer"
    >
      <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl opacity-40 group-hover:opacity-70 transition-opacity duration-700 pointer-events-none"></div>
      
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent group-hover:via-violet-400/60 transition-all duration-500"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div>
          <h2 className="text-gray-400 text-xs tracking-wider uppercase mb-2 group-hover:text-gray-300 transition-colors">Total Expenses</h2>
          <div className="text-6xl font-display font-bold text-white tracking-tighter group-hover:scale-[1.01] origin-left transition-transform duration-300">
            ₹{expense.toLocaleString('en-IN')}
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full bg-rose-500/5 border border-rose-500/20 text-xs font-semibold text-rose-400 backdrop-blur-md shadow-[0_0_15px_rgba(244,63,94,0.1)] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse"></span>
          Live Sync
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-2 gap-8 border-t border-white/[0.04] pt-6 group-hover:border-white/[0.08] transition-colors duration-500">
        <div className="flex items-center gap-3 group/item">
          <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 group-hover/item:bg-emerald-500/10 group-hover/item:scale-110 transition-all duration-300">
            <ArrowDownLeft size={16} />
          </div>
          <div>
            <span className="text-gray-500 text-xs tracking-wider uppercase block mb-0.5">Total Income</span>
            <span className="text-white font-display text-xl font-medium tracking-tight group-hover:text-emerald-400 transition-colors duration-300">
              ₹{income.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-3 group/item">
          <div className="p-2 rounded-xl bg-blue-500/5 border border-blue-500/10 text-blue-400 group-hover/item:bg-blue-500/10 group-hover/item:scale-110 transition-all duration-300">
            <ArrowUpRight size={16} />
          </div>
          <div>
            <span className="text-gray-500 text-xs tracking-wider uppercase block mb-0.5">Net Savings</span>
            <span className="text-white font-display text-xl font-medium tracking-tight group-hover:text-blue-400 transition-colors duration-300">
              ₹{savings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseOverview;