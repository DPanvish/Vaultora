import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Tag, AlignLeft, IndianRupee } from 'lucide-react';

const TransactionModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    type: 'EXPENSE',
    amount: '',
    category: '',
    account: '',
    description: ''
  });

  const categories = ['Rent', 'Groceries', 'Utilities', 'Salary', 'Leisure'];
  const accounts = ['HDFC Bank', 'SBI Bank', 'Pocket Cash'];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Transaction Data:", formData);

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/[0.08] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.04]">
              <h2 className="text-lg font-semibold text-white tracking-tight">Log Transaction</h2>
              <button 
                onClick={onClose}
                className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
              {/* Type Toggle */}
              <div className="flex p-1 bg-white/[0.02] border border-white/[0.04] rounded-xl relative">
                {['EXPENSE', 'INCOME'].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, type })}
                    className={`flex-1 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg z-10 transition-colors duration-300 ${
                      formData.type === type ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {type}
                  </button>
                ))}
                {/* Active Pill Animation */}
                <motion.div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg ${formData.type === 'EXPENSE' ? 'bg-rose-500/20 border border-rose-500/30' : 'bg-emerald-500/20 border border-emerald-500/30'}`}
                  initial={false}
                  animate={{ left: formData.type === 'EXPENSE' ? '4px' : 'calc(50%)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>

              {/* Amount */}
              <div>
                <label className="text-xs tracking-wider text-gray-500 uppercase mb-2 block">Amount</label>
                <div className="relative flex items-center">
                  <div className="absolute left-4 text-gray-400">
                    <IndianRupee size={16} />
                  </div>
                  <input 
                    type="number" 
                    required
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-full bg-[#050505] border border-white/[0.06] rounded-xl py-3 pl-11 pr-4 text-white font-display text-lg focus:outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/50 transition-all placeholder:text-gray-700"
                    placeholder="0.00"
                  />
                </div>
              </div>

              {/* Category & Account Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs tracking-wider text-gray-500 uppercase mb-2 block">Category</label>
                  <div className="relative">
                    <select 
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.06] rounded-xl py-3 px-4 text-gray-300 text-sm focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select...</option>
                      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <Tag size={14} className="absolute right-4 top-3.5 text-gray-600 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="text-xs tracking-wider text-gray-500 uppercase mb-2 block">Wallet</label>
                  <div className="relative">
                    <select 
                      required
                      value={formData.account}
                      onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                      className="w-full bg-[#050505] border border-white/[0.06] rounded-xl py-3 px-4 text-gray-300 text-sm focus:outline-none focus:border-violet-500/50 appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select...</option>
                      {accounts.map(acc => <option key={acc} value={acc}>{acc}</option>)}
                    </select>
                    <Wallet size={14} className="absolute right-4 top-3.5 text-gray-600 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs tracking-wider text-gray-500 uppercase mb-2 block">Description</label>
                <div className="relative">
                  <div className="absolute left-4 top-3.5 text-gray-600">
                    <AlignLeft size={16} />
                  </div>
                  <input 
                    type="text" 
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-[#050505] border border-white/[0.06] rounded-xl py-3 pl-11 pr-4 text-gray-300 text-sm focus:outline-none focus:border-violet-500/50 transition-all placeholder:text-gray-700"
                    placeholder="E.g., Bought veggies for the week"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300"
              >
                Confirm Transaction
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;