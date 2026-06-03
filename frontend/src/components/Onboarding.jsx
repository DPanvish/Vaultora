import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Landmark, Wallet, Plus, ArrowRight, Loader2, IndianRupee } from 'lucide-react';
import { useSetupAccounts } from '../hooks/useFinance';

const Onboarding = () => {
  const { mutate: setupAccounts, isPending } = useSetupAccounts();
  
  const [accounts, setAccounts] = useState([
    { id: 1, name: '', type: 'BANK', currentBalance: '' },
    { id: 2, name: 'Pocket Cash', type: 'CASH', currentBalance: '' }
  ]);

  const handleAddAccount = () => {
    setAccounts([...accounts, { id: Date.now(), name: '', type: 'BANK', currentBalance: '' }]);
  };

  const handleUpdateAccount = (id, field, value) => {
    setAccounts(accounts.map(acc => acc.id === id ? { ...acc, [field]: value } : acc));
  };

  const handleComplete = () => {
    const validAccounts = accounts
      .filter(acc => acc.name.trim() !== '' && acc.currentBalance !== '')
      .map(acc => ({
        name: acc.name,
        type: acc.type,
        currentBalance: Number(acc.currentBalance)
      }));

    if (validAccounts.length > 0) {
      setupAccounts(validAccounts);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="w-full max-w-lg bg-[#0A0A0A] border border-white/[0.08] rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.15)] overflow-hidden"
      >
        <div className="p-8 text-center border-b border-white/[0.04]">
          <div className="w-12 h-12 bg-violet-600/20 text-violet-400 rounded-full flex items-center justify-center mx-auto mb-4 border border-violet-500/30">
            <Landmark size={24} />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Vault Setup</h2>
          <p className="text-gray-400 text-sm">Enter your starting balances to initialize your ledger.</p>
        </div>

        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          <AnimatePresence>
            {accounts.map((acc) => (
              <motion.div 
                key={acc.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="flex gap-3 items-center bg-[#050505] p-3 rounded-xl border border-white/[0.06]"
              >
                <div className={`p-2 rounded-lg ${acc.type === 'BANK' ? 'bg-blue-500/10 text-blue-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                  {acc.type === 'BANK' ? <Landmark size={18} /> : <Wallet size={18} />}
                </div>
                
                <input 
                  type="text" 
                  placeholder={acc.type === 'CASH' ? "Wallet Name" : "Bank Name (e.g. SBI)"}
                  value={acc.name}
                  disabled={acc.type === 'CASH'} // Lock name for default cash
                  onChange={(e) => handleUpdateAccount(acc.id, 'name', e.target.value)}
                  className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none focus:ring-0 disabled:text-gray-500"
                />
                
                <div className="flex items-center gap-1 bg-black/50 px-3 py-2 rounded-lg border border-white/[0.04]">
                  <IndianRupee size={14} className="text-gray-500" />
                  <input 
                    type="number"
                    placeholder="0.00"
                    value={acc.currentBalance}
                    onChange={(e) => handleUpdateAccount(acc.id, 'currentBalance', e.target.value)}
                    className="w-24 bg-transparent border-none text-white text-right font-display focus:outline-none focus:ring-0"
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <button 
            onClick={handleAddAccount}
            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-violet-400 hover:text-violet-300 transition-colors py-2 px-1"
          >
            <Plus size={14} /> Add Another Bank
          </button>
        </div>

        <div className="p-6 border-t border-white/[0.04] bg-[#080808]">
          <button 
            onClick={handleComplete}
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white text-black font-bold tracking-wide shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-gray-200 transition-all duration-300 disabled:opacity-50"
          >
            {isPending ? <Loader2 size={18} className="animate-spin" /> : 'Initialize Vault'}
            {!isPending && <ArrowRight size={18} />}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Onboarding;