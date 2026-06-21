"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { TrendingUp, Package, ShoppingCart, DollarSign, Activity, Users, Truck, Sparkles, ArrowUpRight } from "lucide-react";
import { weeklyRevenue, orders, aiInsights, inventory } from "@/lib/dummyData";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const i = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } } };

const statusColor: Record<string, string> = {
  Delivered: "text-emerald-400 bg-emerald-400/10",
  Shipped: "text-cyan-400 bg-cyan-400/10",
  Pending: "text-amber-400 bg-amber-400/10",
  Confirmed: "text-indigo-400 bg-indigo-400/10",
  Cancelled: "text-rose-400 bg-rose-400/10",
};

const platformColor: Record<string, string> = {
  Instagram: "bg-pink-500/20 text-pink-400",
  TikTok: "bg-slate-700 text-slate-300",
  WhatsApp: "bg-emerald-500/20 text-emerald-400",
  Facebook: "bg-blue-500/20 text-blue-400",
  YouTube: "bg-red-500/20 text-red-400",
};

export default function Overview() {
  const totalRevenue = weeklyRevenue.reduce((s, d) => s + d.tiktok + d.instagram + d.facebook + d.whatsapp, 0);
  const totalOrders = orders.length;
  const lowStock = inventory.filter(it => it.status !== "In Stock").length;

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-6">
      {/* Welcome Banner */}
      <motion.div variants={i} className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="glass-card p-5 rounded-2xl md:col-span-3 flex items-center justify-between border-l-4 border-l-indigo-500">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Welcome back, Admin! 👋</h2>
            <p className="text-slate-400 text-sm">AI agent processed <span className="text-emerald-400 font-semibold">142 new orders</span> from TikTok and Instagram today.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium text-sm hover:opacity-90 transition-opacity shadow-lg shadow-indigo-500/25">
            <Sparkles className="w-4 h-4" /> AI Summary
          </button>
        </div>
        <div className="glass-card p-5 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/10 rounded-bl-full" />
          <h3 className="text-xs font-medium text-slate-400 mb-1 z-10">Business Health</h3>
          <div className="flex items-end gap-1 z-10">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">98</span>
            <span className="text-slate-500 mb-1">/100</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-medium mt-1 z-10">↑ Excellent</span>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div variants={i} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          { title: "Total Revenue", value: `Rs ${(totalRevenue / 1000).toFixed(0)}K`, trend: "+14.5%", icon: DollarSign, color: "text-indigo-400" },
          { title: "Total Orders", value: String(totalOrders), trend: "+8.2%", icon: ShoppingCart, color: "text-cyan-400" },
          { title: "Active Customers", value: "8,432", trend: "+12.4%", icon: Users, color: "text-purple-400" },
          { title: "Stock Alerts", value: `${lowStock} Items`, trend: "Needs Action", icon: Package, color: "text-rose-400" },
        ].map((card) => (
          <div key={card.title} className="glass-card p-5 rounded-2xl flex flex-col relative overflow-hidden group cursor-pointer hover:border-indigo-500/30 transition-all border border-transparent">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 rounded-xl bg-slate-800/80 border border-slate-700/50 ${card.color}`}>
                <card.icon className="w-5 h-5" />
              </div>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${card.trend.startsWith("+") ? "text-emerald-400 bg-emerald-400/10" : "text-rose-400 bg-rose-400/10"}`}>
                {card.trend.startsWith("+") ? <TrendingUp className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
                {card.trend}
              </span>
            </div>
            <h3 className="text-xs text-slate-400 mb-1">{card.title}</h3>
            <p className="text-2xl font-bold text-white">{card.value}</p>
          </div>
        ))}
      </motion.div>

      {/* Chart + Recent Orders */}
      <motion.div variants={i} className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="glass-card p-5 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-white">Revenue This Week</h3>
            <span className="text-xs text-slate-400 bg-slate-800/60 px-2 py-1 rounded-lg">All Channels</span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weeklyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="ov-t" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ov-i" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/><stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v / 1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: "#0f172a", border: "1px solid #334155", borderRadius: "10px", color: "#f8fafc" }} formatter={(v: any) => [`Rs ${Number(v).toLocaleString()}`, ""]} />
                <Area type="monotone" dataKey="tiktok" stroke="#06B6D4" strokeWidth={2} fill="url(#ov-t)" name="TikTok" />
                <Area type="monotone" dataKey="instagram" stroke="#7C3AED" strokeWidth={2} fill="url(#ov-i)" name="Instagram" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Orders</h3>
            <span className="text-xs text-rose-400 bg-rose-400/10 px-2 py-1 rounded-full font-medium">5 Pending</span>
          </div>
          <div className="space-y-2.5 flex-1 overflow-y-auto">
            {orders.slice(0, 6).map((o) => (
              <div key={o.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-800/50 transition-colors">
                <div className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0 ${platformColor[o.platform] || "bg-slate-700 text-slate-300"}`}>
                  {o.platform.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{o.customer}</p>
                  <p className="text-[10px] text-slate-500 truncate">{o.product}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-xs font-semibold text-white">Rs {o.amount.toLocaleString()}</p>
                  <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${statusColor[o.status] || ""}`}>{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI Insight Banner */}
      <motion.div variants={i} className="glass-card p-5 rounded-2xl border border-purple-500/20 bg-gradient-to-r from-purple-500/5 to-indigo-500/5">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400 flex-shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <p className="text-xs text-purple-400 font-semibold uppercase tracking-wider mb-1">AI Insight</p>
            <p className="text-sm text-slate-300">{aiInsights[0].body}</p>
          </div>
          <button className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 font-medium flex-shrink-0">
            {aiInsights[0].action} <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </motion.div>

    </motion.div>
  );
}
