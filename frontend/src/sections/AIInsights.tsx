"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Package, Users, CreditCard, ArrowUpRight, Bot, Send } from "lucide-react";
import { aiInsights } from "@/lib/dummyData";

const typeColor: Record<string, string> = {
  revenue: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  inventory: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  customer: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  forecast: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  payment: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const typeIcon: Record<string, any> = {
  revenue: TrendingUp, inventory: Package, customer: Users, forecast: Sparkles, payment: CreditCard,
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function AIInsights() {

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Header */}
      <motion.div variants={item} className="glass-card p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 flex items-center gap-4">
        <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-white">AI Business Intelligence</h2>
          <p className="text-sm text-slate-400">Powered by GPT-4o · Updated just now · 5 insights detected</p>
        </div>
      </motion.div>

      <div className="max-w-4xl">
        {/* Insight Cards */}
        <div className="space-y-4">
          <motion.div variants={item}><p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-3">AI Generated Insights</p></motion.div>
          {aiInsights.map((insight, idx) => {
            const Icon = typeIcon[insight.type] || Sparkles;
            return (
              <motion.div key={insight.id} variants={item} transition={{ delay: idx * 0.05 }}
                className={`glass-card p-4 rounded-2xl border hover:border-opacity-60 transition-all cursor-pointer ${typeColor[insight.type]}`}>
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl border flex-shrink-0 ${typeColor[insight.type]}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white mb-1">{insight.title}</p>
                    <p className="text-xs text-slate-400 leading-relaxed">{insight.body}</p>
                    <button className="mt-2 text-xs font-semibold flex items-center gap-1 hover:opacity-80 transition-opacity" style={{ color: "inherit" }}>
                      {insight.action} <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
