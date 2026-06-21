"use client";

import { motion } from "framer-motion";
import { Users, Star, ShoppingCart } from "lucide-react";
import { customers } from "@/lib/dummyData";

const statusStyle: Record<string, string> = {
  "VIP": "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  "Active": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "New": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
};

const platformColor: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-400",
  TikTok: "bg-slate-700 text-slate-300",
  WhatsApp: "bg-emerald-500/20 text-emerald-400",
  Facebook: "bg-blue-500/20 text-blue-400",
  YouTube: "bg-red-500/20 text-red-400",
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Customers() {
  const totalSpent = customers.reduce((s, c) => s + c.spent, 0);
  const vips = customers.filter(c => c.status === "VIP");

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length, color: "text-white" },
          { label: "VIP Customers", value: vips.length, color: "text-yellow-400" },
          { label: "Total Revenue", value: `Rs ${(totalSpent/1000).toFixed(0)}K`, color: "text-emerald-400" },
          { label: "Avg. Lifetime Value", value: `Rs ${(totalSpent/customers.length/1000).toFixed(1)}K`, color: "text-indigo-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 rounded-2xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* VIP banner */}
      {vips.length > 0 && (
        <motion.div variants={item} className="glass-card p-4 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <p className="text-sm font-semibold text-yellow-400">VIP Customers — High Value</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {vips.map(v => (
              <span key={v.id} className="text-xs px-2 py-1 rounded-lg border border-yellow-400/20 text-yellow-400 bg-yellow-400/10">
                {v.name} · Rs {v.spent.toLocaleString()}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Table */}
      <motion.div variants={item} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["ID", "Name", "Platform", "City", "Orders", "Total Spent", "Joined", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {customers.map((cu, idx) => (
                <motion.tr key={cu.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.04 }}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-400 font-semibold">{cu.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0">
                        {cu.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="text-white font-medium">{cu.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${platformColor[cu.platform] || "bg-slate-700 text-slate-300"}`}>{cu.platform}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{cu.city}</td>
                  <td className="px-4 py-3 text-center text-white font-semibold">{cu.orders}</td>
                  <td className="px-4 py-3 text-white font-semibold">Rs {cu.spent.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-500 text-xs">{cu.joined}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyle[cu.status]}`}>
                      {cu.status === "VIP" && "⭐ "}{cu.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}
