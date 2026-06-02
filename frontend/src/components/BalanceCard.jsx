import { motion } from 'framer-motion';
import { Wallet, Landmark } from 'lucide-react';

const BalanceCard = ({ title, amount, type, index }) => {
  const isBank = type === 'BANK';
  const Icon = isBank ? Landmark : Wallet;
  const glowColor = isBank 
    ? 'group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]' 
    : 'group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]';
  const iconColor = isBank ? 'text-blue-400' : 'text-emerald-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group relative overflow-hidden rounded-2xl bg-gray-900/50 p-6 border border-white/5 backdrop-blur-xl transition-all duration-300 ${glowColor}`}
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5 blur-3xl group-hover:bg-white/10 transition-colors duration-500"></div>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-400 font-medium">{title}</h3>
        <div className={`p-2 rounded-lg bg-white/5 ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
      
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-white tracking-tight">
          ₹{amount.toLocaleString()}
        </span>
      </div>
    </motion.div>
  );
};

export default BalanceCard;