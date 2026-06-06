import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Calendar, TrendingDown, ArrowRight } from 'lucide-react';
import { useCategoryAnalytics } from '../hooks/useFinance';

// A neon color matrix mapped to financial categories
const CATEGORY_COLORS = {
  Food: '#FF4681',        // Neon Pink
  Entertainment: '#8B5CF6', // Violet Glow
  Utilities: '#06B6D4',     // Cyber Cyan
  Salaries: '#10B981',      // Emerald
  Transport: '#F59E0B',     // Amber
  Shopping: '#EC4899',      // Deep Pink
  Other: '#6B7280'          // Slate Gray
};

const AdvancedAnalytics = () => {
  const [range, setRange] = useState('30d');
  const [customDates, setCustomDates] = useState({ startDate: '', endDate: '' });

  const { data: analyticsData = [], isLoading } = useCategoryAnalytics({
    range,
    ...((range === 'custom') ? customDates : {})
  });

  const totalExpense = analyticsData.reduce((sum, item) => sum + item.value, 0);

  // Math calculation variables for the dynamic SVG Donut rings
  let accumulatedAngle = 0;
  const radius = 50;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-[#0A0A0A] border border-white/[0.06] rounded-2xl p-6 col-span-1 lg:col-span-3">
      {/* Header & Range Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/[0.04] pb-5 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-violet-500/10 rounded-xl text-violet-400">
            <PieChart size={20} />
          </div>
          <div>
            <h3 className="text-white font-semibold tracking-tight">Expense Distribution</h3>
            <p className="text-gray-500 text-xs mt-0.5">Category-level structural spending analysis</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-[#121212] p-1 rounded-xl border border-white/[0.04] self-start sm:self-auto">
          {['7d', '30d', 'custom'].map((t) => (
            <button
              key={t}
              onClick={() => setRange(t)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all capitalize ${
                range === t 
                  ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : 'Custom'}
            </button>
          ))}
        </div>
      </div>

      {/* Custom Date Picker Sub-Panel */}
      <AnimatePresence>
        {range === 'custom' && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden flex flex-wrap gap-4 items-end bg-[#111] p-4 rounded-xl border border-white/[0.04] mb-6"
          >
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Start Date</label>
              <input 
                type="date" 
                value={customDates.startDate}
                onChange={(e) => setCustomDates(prev => ({ ...prev, startDate: e.target.value }))}
                className="bg-[#161616] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white [color-scheme:dark]"
              />
            </div>
            <ArrowRight size={14} className="text-gray-600 mb-2 hidden sm:block" />
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase font-bold tracking-wider text-gray-500">End Date</label>
              <input 
                type="date" 
                value={customDates.endDate}
                onChange={(e) => setCustomDates(prev => ({ ...prev, endDate: e.target.value }))}
                className="bg-[#161616] border border-white/[0.08] rounded-lg px-3 py-1.5 text-xs text-white [color-scheme:dark]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chart Section */}
      {isLoading ? (
        <div className="h-64 flex items-center justify-center text-gray-500 text-sm animate-pulse">
          Computing aggregate data frameworks...
        </div>
      ) : analyticsData.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/[0.04] rounded-xl">
          <TrendingDown size={28} className="text-gray-600 mb-2" />
          <p className="text-gray-400 text-sm font-medium">No historical expenses found</p>
          <p className="text-gray-600 text-xs mt-1">Try expanding your selected time interval parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Hardware Accelerated SVG Donut Visualization */}
          <div className="flex justify-center relative py-4">
            <svg width="220" height="220" viewBox="0 0 140 140" className="transform -rotate-90">
              <circle cx="70" cy="70" r={radius} fill="transparent" stroke="rgba(255,255,255,0.02)" strokeWidth="12" />
              {analyticsData.map((item) => {
                const percentage = item.value / totalExpense;
                const strokeDashoffset = circumference - (percentage * circumference);
                const currentStrokeColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;
                
                const currentOffsetAngle = accumulatedAngle;
                accumulatedAngle += percentage * 360;

                return (
                  <motion.circle
                    key={item.category}
                    cx="70"
                    cy="70"
                    r={radius}
                    fill="transparent"
                    stroke={currentStrokeColor}
                    strokeWidth="12"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{
                      transformOrigin: '70px 70px',
                      transform: `rotate(${currentOffsetAngle}deg)`,
                      filter: `drop-shadow(0px 0px 3px ${currentStrokeColor}40)`
                    }}
                    strokeLinecap="round"
                  />
                );
              })}
            </svg>
            
            {/* Centered Aggregation Metrics Display */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Total Outflow</span>
              <span className="text-xl font-bold tracking-tight text-white mt-0.5">
                ₹{totalExpense.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Categorized Metric Legends List */}
          <div className="space-y-3.5">
            {analyticsData.map((item) => {
              const percentage = ((item.value / totalExpense) * 100).toFixed(1);
              const color = CATEGORY_COLORS[item.category] || CATEGORY_COLORS.Other;

              return (
                <div key={item.category} className="flex items-center justify-between group p-1.5 rounded-xl hover:bg-white/[0.01] transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
                    <span className="text-sm font-medium text-gray-300 truncate">{item.category}</span>
                  </div>
                  <div className="text-right shrink-0 flex items-center gap-4">
                    <span className="text-xs text-gray-500 font-mono">{percentage}%</span>
                    <span className="text-sm font-semibold text-white tracking-tight w-20">
                      ₹{item.value.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}
    </div>
  );
};

export default AdvancedAnalytics;