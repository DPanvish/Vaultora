import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Wallet, Tag, AlignLeft, IndianRupee, Loader2, Plus, Check } from 'lucide-react';
import CustomDropdown from './CustomDropdown';
import { useAddTransaction, useAccounts } from '../hooks/useFinance'; 

const TransactionModal = ({ isOpen, onClose }) => {
  const initialFormState = {
    type: 'EXPENSE',
    amount: '',
    category: '',
    account: '', 
    description: ''
  };

  const [formData, setFormData] = useState(initialFormState);
  
  const [customCategories, setCustomCategories] = useState([]);
  const [isAddingCustom, setIsAddingCustom] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const { data: accountsData = [] } = useAccounts();
  const accountNames = accountsData.map(acc => acc.name);

  const { mutate: addTransaction, isPending } = useAddTransaction(); 

  useEffect(() => {
    if (isOpen) {
      setFormData(initialFormState);
      setIsAddingCustom(false);
      setNewCategoryName('');
      document.body.style.overflow = 'hidden'; 
    } else {
      document.body.style.overflow = 'unset'; 
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const defaultCategories = ['Rent', 'Groceries', 'Utilities', 'Salary', 'Leisure'];
  const allCategories = [...defaultCategories, ...customCategories]; 

  const handleAddCustomCategory = () => {
    if (newCategoryName.trim() !== '') {
      const formattedName = newCategoryName.trim();
      if (!allCategories.includes(formattedName)) {
        setCustomCategories([...customCategories, formattedName]);
      }
      setFormData({ ...formData, category: formattedName }); 
      setNewCategoryName('');
      setIsAddingCustom(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedAccountObj = accountsData.find(acc => acc.name === formData.account);

    if (!selectedAccountObj) {
      console.error("Please select a valid wallet.");
      return;
    }

    addTransaction({
      ...formData,
      amount: Number(formData.amount),
      account: selectedAccountObj._id 
    }, {
      onSuccess: () => onClose()
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-md bg-[#0A0A0A] border border-white/[0.08] rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-visible"
          >
            <div className="flex items-center justify-between p-6 border-b border-white/[0.04]">
              <h2 className="text-lg font-semibold text-white tracking-tight">Log Transaction</h2>
              <button onClick={onClose} className="p-2 rounded-xl text-gray-500 hover:text-white hover:bg-white/[0.05] transition-colors">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              
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
                <motion.div
                  className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-lg ${formData.type === 'EXPENSE' ? 'bg-rose-500/20 border border-rose-500/30' : 'bg-emerald-500/20 border border-emerald-500/30'}`}
                  initial={false}
                  animate={{ left: formData.type === 'EXPENSE' ? '4px' : 'calc(50%)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              </div>

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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs tracking-wider text-gray-500 uppercase block">Category</label>
                    <button 
                      type="button" 
                      onClick={() => setIsAddingCustom(!isAddingCustom)}
                      className="text-[10px] text-violet-400 hover:text-violet-300 uppercase tracking-wider font-semibold transition-colors"
                    >
                      {isAddingCustom ? 'Cancel' : '+ New'}
                    </button>
                  </div>
                  
                  {isAddingCustom ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2"
                    >
                      <input
                        type="text"
                        autoFocus
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomCategory())}
                        placeholder="Name..."
                        className="w-full bg-[#050505] border border-violet-500/50 rounded-xl py-3 px-3 text-white text-sm focus:outline-none shadow-[0_0_15px_rgba(139,92,246,0.15)]"
                      />
                      <button 
                        type="button"
                        onClick={handleAddCustomCategory}
                        className="p-3 bg-violet-600 rounded-xl text-white hover:bg-violet-500 transition-colors"
                      >
                        <Check size={16} />
                      </button>
                    </motion.div>
                  ) : (
                    <CustomDropdown 
                      options={allCategories}
                      value={formData.category}
                      onChange={(val) => setFormData({ ...formData, category: val })}
                      placeholder="Select..."
                      icon={Tag}
                    />
                  )}
                </div>

                <div>
                  <label className="text-xs tracking-wider text-gray-500 uppercase mb-2 block">Wallet</label>
                  <CustomDropdown 
                    options={accountNames}
                    value={formData.account}
                    onChange={(val) => setFormData({ ...formData, account: val })}
                    placeholder="Select..."
                    icon={Wallet}
                  />
                </div>
              </div>

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

              <button 
                type="submit"
                disabled={isPending}
                className="w-full py-3.5 rounded-xl bg-violet-600 text-white font-semibold tracking-wide shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Confirm Transaction'
                )}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TransactionModal;