import { UserButton } from "@clerk/clerk-react";
import ExpenseOverview from './ExpenseOverview';
import BalanceCard from './BalanceCard';

const Dashboard = () => {
  const dummyAccounts = [
    { _id: '1', name: 'HDFC Bank', balance: 45000, type: 'BANK' },
    { _id: '2', name: 'SBI Bank', balance: 32000, type: 'BANK' },
    { _id: '3', name: 'Pocket Cash', balance: 1500, type: 'CASH' },
  ];

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse"></div>
            Vaultora
          </h1>
          <p className="text-gray-400 mt-1">Welcome back. Here is your financial snapshot.</p>
        </div>
        <div className="p-1 rounded-full bg-white/5 border border-white/10">
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10" } }} />
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExpenseOverview />
        {dummyAccounts.map((acc, i) => (
          <BalanceCard 
            key={acc._id}
            index={i}
            title={acc.name}
            amount={acc.balance}
            type={acc.type}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;