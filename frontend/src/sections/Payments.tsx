"use client";

import { motion } from "framer-motion";
import { CreditCard, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { payments } from "@/lib/dummyData";

const statusStyle: Record<string, string> = {
  "Completed": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Pending": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Refunded": "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const methodColor: Record<string, string> = {
  "JazzCash": "text-orange-400 bg-orange-400/10",
  "EasyPaisa": "text-green-400 bg-green-400/10",
  "COD": "text-slate-300 bg-slate-700",
  "Stripe": "text-indigo-400 bg-indigo-400/10",
  "Bank Transfer": "text-cyan-400 bg-cyan-400/10",
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Payments() {
  const total = payments.reduce((s, p) => s + p.amount, 0);
  const completed = payments.filter(p => p.status === "Completed").reduce((s, p) => s + p.amount, 0);
  const pending = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Processed", value: `Rs ${total.toLocaleString()}`, icon: CreditCard, color: "text-indigo-400" },
          { label: "Completed", value: `Rs ${completed.toLocaleString()}`, icon: CheckCircle, color: "text-emerald-400" },
          { label: "Pending (COD)", value: `Rs ${pending.toLocaleString()}`, icon: Clock, color: "text-amber-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-5 rounded-2xl flex items-center gap-4">
            <div className={`p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 ${s.color}`}><s.icon className="w-5 h-5"/></div>
            <div>
              <p className="text-xs text-slate-400">{s.label}</p>
              <p className="text-xl font-bold text-white">{s.value}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Payment Methods Breakdown */}
      <motion.div variants={item} className="glass-card p-5 rounded-2xl">
        <h3 className="font-bold text-white mb-4">Payment Methods Breakdown</h3>
        <div className="flex flex-wrap gap-3">
          {["COD", "JazzCash", "EasyPaisa", "Stripe", "Bank Transfer"].map(method => {
            const count = payments.filter(p => p.method === method).length;
            const pct = Math.round((count / payments.length) * 100);
            return (
              <div key={method} className="glass-card p-3 rounded-xl flex-1 min-w-[120px]">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${methodColor[method] || "bg-slate-700 text-slate-300"}`}>{method}</span>
                <p className="text-2xl font-black text-white mt-2">{pct}%</p>
                <p className="text-xs text-slate-500">{count} transactions</p>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["Payment ID", "Order", "Customer", "Amount", "Method", "Status", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {payments.map((p, idx) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                  className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-400 font-semibold">{p.id}</td>
                  <td className="px-4 py-3 text-slate-300">{p.order}</td>
                  <td className="px-4 py-3 text-white font-medium">{p.customer}</td>
                  <td className="px-4 py-3 text-white font-semibold">Rs {p.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${methodColor[p.method] || "bg-slate-700 text-slate-300"}`}>{p.method}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyle[p.status]}`}>{p.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{p.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
