"use client";

import { motion } from "framer-motion";
import { weeklyRevenue, monthlyRevenue, platformRevenue } from "@/lib/dummyData";
import { TrendingUp } from "lucide-react";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } };
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } };

export default function Revenue() {
  const totalWeek = weeklyRevenue.reduce((s, d) => s + d.tiktok + d.instagram + d.facebook + d.whatsapp, 0);

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5">
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "This Week", value: `Rs ${(totalWeek / 1000).toFixed(0)}K`, trend: "+22%" },
          { label: "This Month", value: "Rs 520K", trend: "+18%" },
          { label: "Avg Order Value", value: "Rs 4,700", trend: "+5%" },
          { label: "Top Channel", value: "TikTok", trend: "42% share" },
        ].map(k => (
          <div key={k.label} className="glass-card p-4 rounded-2xl">
            <p className="text-xs text-slate-400 mb-2">{k.label}</p>
            <p className="text-xl font-bold text-white">{k.value}</p>
            <span className="text-xs text-emerald-400 flex items-center gap-1 mt-1"><TrendingUp className="w-3 h-3" />{k.trend}</span>
          </div>
        ))}
      </motion.div>

      <motion.div variants={item} className="glass-card p-5 rounded-2xl">
        <h3 className="font-bold text-white mb-4">Weekly Revenue by Channel</h3>
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyRevenue} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="rv-t" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3}/><stop offset="95%" stopColor="#06B6D4" stopOpacity={0}/></linearGradient>
                <linearGradient id="rv-i" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3}/><stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/></linearGradient>
                <linearGradient id="rv-f" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/></linearGradient>
                <linearGradient id="rv-w" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/><stop offset="95%" stopColor="#10B981" stopOpacity={0}/></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
              <XAxis dataKey="day" stroke="#475569" fontSize={11} tickLine={false} axisLine={false}/>
              <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v: number) => `${v/1000}k`}/>
              <Tooltip contentStyle={{ backgroundColor:"#0f172a", border:"1px solid #334155", borderRadius:"10px", color:"#f8fafc" }} formatter={(v: any) => [`Rs ${Number(v).toLocaleString()}`, ""]}/>
              <Area type="monotone" dataKey="tiktok" stroke="#06B6D4" strokeWidth={2} fill="url(#rv-t)" name="TikTok"/>
              <Area type="monotone" dataKey="instagram" stroke="#7C3AED" strokeWidth={2} fill="url(#rv-i)" name="Instagram"/>
              <Area type="monotone" dataKey="facebook" stroke="#4F46E5" strokeWidth={2} fill="url(#rv-f)" name="Facebook"/>
              <Area type="monotone" dataKey="whatsapp" stroke="#10B981" strokeWidth={2} fill="url(#rv-w)" name="WhatsApp"/>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <motion.div variants={item} className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="glass-card p-5 rounded-2xl">
          <h3 className="font-bold text-white mb-4">Monthly Revenue 2026</h3>
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyRevenue} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false}/>
                <XAxis dataKey="month" stroke="#475569" fontSize={11} tickLine={false} axisLine={false}/>
                <YAxis stroke="#475569" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v:number) => `${v/1000}k`}/>
                <Tooltip contentStyle={{ backgroundColor:"#0f172a", border:"1px solid #334155", borderRadius:"10px", color:"#f8fafc" }} formatter={(v: any) => [`Rs ${Number(v).toLocaleString()}`, "Revenue"]}/>
                <Bar dataKey="revenue" fill="#4F46E5" radius={[6,6,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-5 rounded-2xl">
          <h3 className="font-bold text-white mb-4">Revenue Share by Platform</h3>
          <div className="h-44 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={platformRevenue} cx="50%" cy="50%" outerRadius={75} dataKey="value" nameKey="name">
                  {platformRevenue.map((e, idx) => <Cell key={idx} fill={e.color}/>)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor:"#0f172a", border:"1px solid #334155", borderRadius:"10px", color:"#f8fafc" }} formatter={(v: any) => [`${v}%`, ""]}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-3 justify-center mt-2">
            {platformRevenue.map(p => (
              <span key={p.name} className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: p.color }}/>
                {p.name} <span className="text-white font-semibold">{p.value}%</span>
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
