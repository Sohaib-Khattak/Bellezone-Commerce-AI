"use client";

import { motion } from "framer-motion";
import { Truck, CheckCircle, Clock, Package } from "lucide-react";
import { deliveries } from "@/lib/dummyData";

const statusStyle: Record<string, string> = {
  "Delivered": "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  "Out for Delivery": "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  "In Transit": "text-indigo-400 bg-indigo-400/10 border-indigo-400/20",
  "Processing": "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const statusIcon: Record<string, any> = {
  "Delivered": CheckCircle,
  "Out for Delivery": Truck,
  "In Transit": Package,
  "Processing": Clock,
};

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.07 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Deliveries() {
  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      {/* Stats */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Shipments", value: deliveries.length, color: "text-white" },
          { label: "Delivered", value: deliveries.filter(d => d.status === "Delivered").length, color: "text-emerald-400" },
          { label: "In Transit", value: deliveries.filter(d => d.status === "In Transit").length, color: "text-indigo-400" },
          { label: "Out for Delivery", value: deliveries.filter(d => d.status === "Out for Delivery").length, color: "text-cyan-400" },
        ].map(s => (
          <div key={s.label} className="glass-card p-4 rounded-2xl text-center">
            <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Delivery Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {deliveries.map((d, idx) => {
          const Icon = statusIcon[d.status] || Truck;
          return (
            <motion.div key={d.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.05 }}
              className="glass-card p-4 rounded-2xl hover:border-indigo-500/20 border border-transparent transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${statusStyle[d.status]} border`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{d.order}</p>
                    <p className="text-xs text-slate-400">{d.customer}</p>
                  </div>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusStyle[d.status]}`}>{d.status}</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                <span>🚚 {d.courier}</span>
                <span>📍 {d.city}</span>
                <span className="font-mono text-indigo-400 col-span-2">{d.tracking}</span>
                <span>📅 ETA: {d.eta}</span>
                <span>🔄 Updated: {d.updated}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
