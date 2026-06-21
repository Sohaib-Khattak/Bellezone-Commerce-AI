"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertTriangle, Package } from "lucide-react";
import { inventory } from "@/lib/dummyData";

const statusStyle: Record<string, string> = {
  "In Stock": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Low Stock": "text-amber-400 bg-amber-400/10 border-amber-400/20",
  "Out of Stock": "text-rose-400 bg-rose-400/10 border-rose-400/20",
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.05 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Inventory() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const filtered = inventory.filter(p =>
    (filter === "All" || p.status === filter) &&
    (p.name.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Summary cards */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Products", value: inventory.length, color: "text-white" },
          { label: "In Stock", value: inventory.filter(i => i.status === "In Stock").length, color: "text-emerald-400" },
          { label: "Low Stock", value: inventory.filter(i => i.status === "Low Stock").length, color: "text-amber-400" },
          { label: "Out of Stock", value: inventory.filter(i => i.status === "Out of Stock").length, color: "text-rose-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 rounded-2xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Alerts */}
      {inventory.filter(i => i.status !== "In Stock").length > 0 && (
        <motion.div variants={item} className="glass-card p-4 rounded-2xl border border-amber-500/20 bg-amber-500/5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <p className="text-sm font-semibold text-amber-400">Stock Alerts</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {inventory.filter(i => i.status !== "In Stock").map(p => (
              <span key={p.id} className={`text-xs px-2 py-1 rounded-lg border ${statusStyle[p.status]}`}>
                {p.name} — {p.status} ({p.stock} left)
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* Controls */}
      <motion.div variants={item} className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-3 items-start md:items-center">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or SKU…"
            className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"/>
        </div>
        <div className="flex gap-2">
          {["All", "In Stock", "Low Stock", "Out of Stock"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === f ? "bg-indigo-500 text-white" : "bg-slate-800/60 text-slate-400 hover:text-white border border-slate-700"}`}>
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Table */}
      <motion.div variants={item} className="glass-card rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-700/60">
                {["SKU", "Product", "Category", "Stock", "Threshold", "Price", "Sold", "Status"].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/30">
              {filtered.map((p, idx) => (
                <motion.tr key={p.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: idx * 0.03 }}
                  className="hover:bg-slate-800/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-400 font-semibold">{p.id}</td>
                  <td className="px-4 py-3 text-white font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-slate-400">{p.category}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-slate-700 rounded-full h-1.5 w-16">
                        <div className={`h-1.5 rounded-full ${p.stock === 0 ? "bg-rose-500" : p.stock <= p.threshold ? "bg-amber-400" : "bg-emerald-500"}`}
                          style={{ width: `${Math.min((p.stock / (p.threshold * 3)) * 100, 100)}%` }} />
                      </div>
                      <span className="text-white font-semibold text-xs">{p.stock}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-center">{p.threshold}</td>
                  <td className="px-4 py-3 text-white font-semibold">Rs {p.price.toLocaleString()}</td>
                  <td className="px-4 py-3 text-slate-400">{p.sold}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyle[p.status]}`}>{p.status}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>No products found.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
