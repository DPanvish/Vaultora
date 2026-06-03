import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Calendar } from 'lucide-react';

const TransactionList = ({ transactions }) => {
  return (
    <div className="mt-8 bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden col-span-1 lg:col-span-3">
      <div className="p-6 border-b border-white/[0.04] flex items-center justify-between">
        <h3 className="text-white font-semibold tracking-tight text-lg">Transaction Ledger</h3>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {transactions.length} Records
        </span>
      </div>
      
      <div className="divide-y divide-white/[0.02] max-h-[400px] overflow-y-auto custom-scrollbar">
        {transactions.length === 0 ? (
          <div className="p-8 text-center text-gray-500 text-sm">
            No transactions found for this period.
          </div>
        ) : (
          transactions.map((tx, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              key={tx._id} 
              className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-xl ${tx.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {tx.type === 'INCOME' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{tx.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-xs">{tx.account?.name || 'Wallet'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                    <span className="text-gray-500 text-xs flex items-center gap-1">
                      <Calendar size={10} />
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className={`font-display font-semibold tracking-tight ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-white'}`}>
                  {tx.type === 'INCOME' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                </p>
                {tx.description && (
                  <p className="text-gray-500 text-xs mt-1 truncate max-w-[120px] sm:max-w-[200px]">{tx.description}</p>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;