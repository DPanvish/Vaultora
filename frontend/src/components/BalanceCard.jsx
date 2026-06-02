import { motion } from 'framer-motion';
import { Wallet, Landmark } from 'lucide-react';

const BalanceCard = ({ title, amount, type, index }) => {
  const isBank = type === 'BANK';
  const Icon = isBank ? Landmark : Wallet;
  
  const designProfile = isBank 
    ? {
        borderHover: 'hover:border-indigo-500/30',
        bgGlow: 'bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent',
        shadowHover: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.12)]',
        iconColor: 'text-indigo-400 group-hover:text-indigo-300'
      }
    : {
        borderHover: 'hover:border-emerald-500/30',
        bgGlow: 'bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent',
        shadowHover: 'hover:shadow-[0_0_40px_rgba(16,185,129,0.12)]',
        iconColor: 'text-emerald-400 group-hover:text-emerald-300'
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ 
        type: 'spring',
        stiffness: 260,
        damping: 18,
        delay: index * 0.08
      }}
      className={`group relative overflow-hidden rounded-2xl bg-[#0A0A0A] p-6 border border-white/[0.06] backdrop-blur-xl transition-all duration-300 cursor-pointer ${designProfile.borderHover} ${designProfile.shadowHover}`}
    >

      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none ${designProfile.bgGlow}`} />

      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/[0.12] to-transparent"></div>

      <div className="relative z-10 flex items-center justify-between mb-8">
        <h3 className="text-gray-400 font-medium text-xs tracking-wider uppercase group-hover:text-gray-200 transition-colors duration-300">
          {title}
        </h3>
        <div className={`p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] group-hover:scale-110 transition-transform duration-300 ${designProfile.iconColor}`}>
          <Icon size={18} strokeWidth={1.5} />
        </div>
      </div>
      
      <div className="relative z-10 flex items-baseline gap-2">
        <span className="text-4xl font-display font-bold text-white tracking-tight transition-transform duration-300">
          ₹{amount.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default BalanceCard;