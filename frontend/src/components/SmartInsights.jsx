import { motion } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import {useAIInsights} from "../hooks/useFinance.js";
import {useQueryClient} from "@tanstack/react-query";

const SmartInsights = () => {
    const {data, isLoading, isFetching} = useAIInsights();
    const queryClient = useQueryClient();

    const handleRefresh = () => {
        queryClient.invalidateQueries({queryKey: ['ai-insights']});
    }

    return (
        <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            className="col-span-1 lg:col-span-3 rounded-2xl bg-gradient-to-br from-[`#120B29`] to-[`#0A0A0A`] p-6 border border-violet-500/20 relative overflow-hidden group"
        >
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-violet-400">
                    <Sparkles size={18} className="animate-pulse" />
                    <h3 className="text-xs font-semibold tracking-wider uppercase">Vaultora AI Analyst</h3>
                </div>

                <button
                    onClick={handleRefresh}
                    disabled={isLoading || isFetching}
                    className="p-2 rounded-lg bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white transition-all disabled:opacity-50"
                >
                    <RefreshCw size={14} className={isFetching ? "animate-spin text-violet-400" : ""} />
                </button>
            </div>

            <div className="relative z-10">
                {isLoading ? (
                    <div className="animate-pulse space-y-3">
                        <div className="h-4 bg-white/[0.05] rounded w-3/4"></div>
                        <div className="h-4 bg-white/[0.05] rounded w-full"></div>
                        <div className="h-4 bg-white/[0.05] rounded w-5/6"></div>
                    </div>
                ) : (
                    <p className="text-gray-300 text-sm leading-relaxed font-medium">
                        {data?.insight || "Your ledger is looking healthy. Keep tracking your expenses to unlock deeper financial insights."}
                    </p>
                )}
            </div>
        </motion.div>
    )
}
export default SmartInsights
