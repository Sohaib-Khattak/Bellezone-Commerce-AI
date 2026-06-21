"use client";

import { motion } from "framer-motion";
import { TrendingUp, Package, ShoppingCart, DollarSign, Activity, Users, Truck, Sparkles } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const revenueData = [
  { name: 'Mon', total: 4000 },
  { name: 'Tue', total: 3000 },
  { name: 'Wed', total: 5000 },
  { name: 'Thu', total: 2780 },
  { name: 'Fri', total: 8900 },
  { name: 'Sat', total: 4390 },
  { name: 'Sun', total: 6490 },
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
};

export default function Dashboard() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="p-8 space-y-6"
    >
      {/* 10. Business Health & AI Overview */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl md:col-span-3 flex items-center justify-between border-l-4 border-l-indigo-500">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Welcome back, Admin! 👋</h2>
            <p className="text-slate-400">Your AI agent processed <span className="text-emerald-400 font-semibold">142</span> new orders from TikTok and Instagram while you were away.</p>
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition-colors font-medium">
            <Sparkles className="w-4 h-4" />
            View AI Summary
          </button>
        </div>
        
        <div className="glass-card p-6 rounded-2xl flex flex-col justify-center items-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full" />
          <h3 className="text-sm font-medium text-slate-400 mb-2 z-10">Business Health Score</h3>
          <div className="flex items-end gap-2 z-10">
            <span className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">98</span>
            <span className="text-lg text-slate-500 mb-1">/100</span>
          </div>
        </div>
      </motion.div>

      {/* KPI Metrics */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Revenue Analytics" value="$24,500" trend="+14.5%" icon={DollarSign} color="text-indigo-400" />
        <MetricCard title="Orders Overview" value="1,245" trend="+8.2%" icon={ShoppingCart} color="text-cyan-400" />
        <MetricCard title="Customer Analytics" value="8,432" trend="+12.4%" icon={Users} color="text-purple-400" />
        <MetricCard title="Inventory Management" value="Low: 12" trend="-4 items" icon={Package} color="text-rose-400" />
      </motion.div>

      {/* Charts & Activity */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Revenue Chart */}
        <div className="glass-card p-6 rounded-2xl lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-white">Revenue Analytics (7 Days)</h3>
            <select className="bg-slate-800 border border-slate-700 text-slate-300 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block p-2">
              <option>All Channels</option>
              <option>TikTok Shop</option>
              <option>Instagram</option>
            </select>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94A3B8" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1E293B', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#F8FAFC' }}
                />
                <Area type="monotone" dataKey="total" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorTotal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Delivery Tracking / Notifications */}
        <div className="glass-card p-6 rounded-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">Delivery Tracking</h3>
            <span className="bg-rose-500/20 text-rose-400 text-xs px-2 py-1 rounded-full font-medium">3 Delayed</span>
          </div>
          
          <div className="space-y-4 flex-1 overflow-y-auto pr-2">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-xl hover:bg-slate-800/50 transition-colors border border-transparent hover:border-slate-700">
                <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-4 h-4 text-slate-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-white">Order #TK-{8493 + i}</p>
                  <p className="text-xs text-slate-400 mt-1">Out for delivery in Dubai</p>
                </div>
                <div className="ml-auto text-xs font-medium text-emerald-400">On Time</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}

function MetricCard({ title, value, trend, icon: Icon, color }: any) {
  const isPositive = trend.startsWith("+");
  return (
    <div className="glass-card p-6 rounded-2xl flex flex-col relative overflow-hidden group">
      <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150 blur-xl bg-current ${color}`} />
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full ${isPositive ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'}`}>
          {isPositive ? <TrendingUp className="w-3 h-3" /> : <Activity className="w-3 h-3" />}
          {trend}
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-slate-400 mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
