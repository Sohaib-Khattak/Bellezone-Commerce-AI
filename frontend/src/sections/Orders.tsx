"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Download, ShoppingCart } from "lucide-react";
import { orders } from "@/lib/dummyData";

const statusColor: Record<string, string> = {
  Delivered: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  Shipped: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  Pending: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  Confirmed: "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  Cancelled: "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const platformColor: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-400",
  TikTok: "bg-slate-700 text-slate-300",
  WhatsApp: "bg-emerald-500/20 text-emerald-400",
  Facebook: "bg-blue-500/20 text-blue-400",
  YouTube: "bg-red-500/20 text-red-400",
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const i = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Orders() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = orders.filter(o =>
    (filter === "All" || o.status === filter) &&
    (o.customer.toLowerCase().includes(search.toLowerCase()) || o.id.toLowerCase().includes(search.toLowerCase()))
  );

  const stats = [
    { label: "Total Orders", value: orders.length, color: "text-white" },
    { label: "Pending", value: orders.filter(o => o.status === "Pending").length, color: "text-amber-400" },
    { label: "Shipped", value: orders.filter(o => o.status === "Shipped").length, color: "text-cyan-400" },
    { label: "Delivered", value: orders.filter(o => o.status === "Delivered").length, color: "text-emerald-400" },
    { label: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length, color: "text-rose-400" },
  ];

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Stats Row */}
      <motion.div variants={i} className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {stats.map(s => (
          <div key={s.label} className="glass-card p-4 rounded-2xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Controls */}
      <motion.div variants={i} className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search orders or customers…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["All", "Pending", "Confirmed", "Shipped", "Delivered", "Cancelled"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-indigo-500 text-white" : "bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700"}`}>
              {f}
            </button>
          ))}
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-slate-800/60 border border-slate-700 text-slate-400 hover:text-white rounded-xl text-sm transition-all">
          <Download className="w-4 h-4" /> Export
        </button>
      </motion.div>

      {/* Table */}
      <motion.div variants={i} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["Order ID", "Customer", "Platform", "Product", "Qty", "Amount", "Payment", "City", "Status", "Date"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((o, idx) => (
                <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-400 font-semibold">{o.id}</td>
                  <td className="px-4 py-3 text-white font-medium whitespace-nowrap">{o.customer}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${platformColor[o.platform] || "bg-slate-700 text-slate-300"}`}>{o.platform}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-300 whitespace-nowrap">{o.product}</td>
                  <td className="px-4 py-3 text-slate-400 text-center">{o.qty}</td>
                  <td className="px-4 py-3 text-white font-semibold whitespace-nowrap">Rs {o.amount.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-400 whitespace-nowrap">{o.payment}</td>
                  <td className="px-4 py-3 text-slate-400">{o.city}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColor[o.status] || ""}`}>{o.status}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-500 text-xs whitespace-nowrap">{o.date}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <ShoppingCart className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No orders found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
