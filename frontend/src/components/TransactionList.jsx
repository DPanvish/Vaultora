import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownLeft, Calendar, Trash2, Loader2 } from 'lucide-react';
import { useDeleteTransaction } from '../hooks/useFinance'; 

const TransactionList = ({ transactions }) => {
  const { mutate: deleteTransaction, isPending, variables: deletingId } = useDeleteTransaction();

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction? Your wallet balance will be adjusted automatically.")) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="mt-8 bg-[#0A0A0A] border border-white/[0.06] rounded-2xl overflow-hidden col-span-1 lg:col-span-3">
      <div className="p-6 border-b border-white/[0.04] flex items-center justify-between">
        <h3 className="text-white font-semibold tracking-tight text-lg">Transaction Ledger</h3>
        <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
          {transactions.length} Records
        </span>
      </div>
      
      <div className="divide-y divide-white/[0.02] max-h-[400px] overflow-y-auto custom-scrollbar pr-1">
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
              className="p-5 flex items-center justify-between hover:bg-white/[0.03] transition-colors group cursor-default"
            >
              {/* Left Side: Icon & Details */}
              <div className="flex items-center gap-4 overflow-hidden pr-4">
                <div className={`p-3 rounded-xl shrink-0 ${tx.type === 'INCOME' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {tx.type === 'INCOME' ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                </div>
                <div className="truncate">
                  <p className="text-white font-medium text-sm truncate">{tx.category}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-gray-500 text-xs truncate">{tx.account?.name || 'Wallet'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-700 shrink-0"></span>
                    <span className="text-gray-500 text-xs flex items-center gap-1 shrink-0">
                      <Calendar size={10} />
                      {new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Right Side: Amount & Delete Button */}
              <div className="flex items-center justify-end">
                
                {/* Amount Container */}
                <div className="text-right shrink-0">
                  <p className={`font-display font-semibold tracking-tight ${tx.type === 'INCOME' ? 'text-emerald-400' : 'text-white'}`}>
                    {tx.type === 'INCOME' ? '+' : '-'}₹{tx.amount.toLocaleString('en-IN')}
                  </p>
                  {tx.description && (
                    <p className="text-gray-500 text-xs mt-1 truncate max-w-[120px] sm:max-w-[180px]">{tx.description}</p>
                  )}
                </div>

                <div className="w-0 overflow-hidden opacity-0 group-hover:w-10 group-hover:opacity-100 flex justify-end transition-all duration-300 ease-out group-hover:pl-2 shrink-0">
                  <button
                    onClick={() => handleDelete(tx._id)}
                    disabled={isPending && deletingId === tx._id}
                    className="p-2 text-gray-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-lg shrink-0 transition-colors"
                  >
                    {isPending && deletingId === tx._id ? (
                      <Loader2 size={16} className="animate-spin text-rose-500" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>

              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;