import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

const CalendarPicker = ({ selectedDate, onSelectDate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const popoverRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(selectedDate ? new Date(selectedDate) : new Date());
    }
  }, [isOpen, selectedDate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  
  const totalDays = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  
  const days = Array.from({ length: totalDays }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDay }, (_, i) => i);

  const handlePrevMonth = () => setCurrentMonth(new Date(year, month - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(year, month + 1, 1));

  const handleDateSelect = (day) => {
    onSelectDate(new Date(year, month, day));
    setIsOpen(false);
  };

  const formatDate = (date) => {
    if (!date) return 'Specific Date';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="relative" ref={popoverRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl transition-all duration-300 border ${
          isOpen || selectedDate 
            ? 'bg-violet-600/10 border-violet-500/50 text-violet-300 shadow-[0_0_15px_rgba(139,92,246,0.15)]' 
            : 'bg-[#050505] border-white/[0.06] text-gray-400 hover:text-white hover:border-white/[0.15]'
        }`}
      >
        <CalendarIcon size={14} className={selectedDate ? "text-violet-400" : "text-gray-400"} />
        <span>{formatDate(selectedDate)}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="absolute right-0 z-50 mt-2 p-4 w-72 bg-[#0A0A0A] border border-white/[0.08] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            <div className="flex justify-between items-center mb-4">
              <button onClick={handlePrevMonth} className="p-1 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors">
                <ChevronLeft size={16} />
              </button>
              <span className="text-white text-sm font-semibold tracking-wide">
                {monthNames[month]} {year}
              </span>
              <button onClick={handleNextMonth} className="p-1 rounded-lg hover:bg-white/[0.05] text-gray-400 hover:text-white transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {daysOfWeek.map(day => (
                <div key={day} className="text-center text-[10px] font-semibold text-gray-500 uppercase tracking-wider py-1">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {blanks.map(blank => (
                <div key={`blank-${blank}`} className="p-2" />
              ))}
              {days.map(day => {
                const isSelected = selectedDate?.getDate() === day && selectedDate?.getMonth() === month && selectedDate?.getFullYear() === year;
                const isToday = new Date().getDate() === day && new Date().getMonth() === month && new Date().getFullYear() === year;

                return (
                  <button
                    key={day}
                    onClick={() => handleDateSelect(day)}
                    className={`p-2 text-xs rounded-lg transition-all flex items-center justify-center ${
                      isSelected
                        ? 'bg-violet-600 text-white font-bold shadow-[0_0_10px_rgba(139,92,246,0.5)]'
                        : isToday
                        ? 'bg-white/[0.08] text-white font-semibold hover:bg-white/[0.12]'
                        : 'text-gray-400 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            
            {selectedDate && (
              <div className="mt-4 pt-3 border-t border-white/[0.05] text-center">
                 <button 
                   onClick={() => { onSelectDate(null); setIsOpen(false); }}
                   className="text-[10px] uppercase tracking-wider text-gray-500 hover:text-rose-400 transition-colors"
                 >
                   Clear Selection
                 </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPicker;