"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Shield, Palette, Globe, Save, CheckCircle } from "lucide-react";

const c = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } };

export default function Settings() {
  const [saved, setSaved] = useState(false);
  const [profile, setProfile] = useState({ name: "Admin User", email: "admin@osnexus.ai", role: "Admin", business: "OS Nexus Commerce" });
  const [notifs, setNotifs] = useState({ orders: true, lowStock: true, payments: true, deliveries: false, aiInsights: true });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <motion.div variants={c} initial="hidden" animate="show" className="p-6 space-y-5 max-w-3xl mx-auto">
      <motion.div variants={item}>
        <h2 className="text-xl font-bold text-white">Account Settings</h2>
        <p className="text-sm text-slate-400">Manage your profile, notifications and preferences</p>
      </motion.div>

      {/* Profile */}
      <motion.div variants={item} className="glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <User className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white">Profile Information</h3>
        </div>
        <div className="flex items-center gap-4 mb-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-black text-white shadow-lg shadow-indigo-500/20">
            AU
          </div>
          <div>
            <p className="font-semibold text-white">{profile.name}</p>
            <p className="text-sm text-slate-400">{profile.email}</p>
            <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 mt-1 inline-block">{profile.role}</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Full Name", key: "name" },
            { label: "Email Address", key: "email" },
            { label: "Business Name", key: "business" },
          ].map(f => (
            <div key={f.key} className={f.key === "business" ? "md:col-span-2" : ""}>
              <label className="text-xs text-slate-400 mb-1 block">{f.label}</label>
              <input value={(profile as any)[f.key]} onChange={e => setProfile(p => ({ ...p, [f.key]: e.target.value }))}
                className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"/>
            </div>
          ))}
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Role</label>
            <select value={profile.role} onChange={e => setProfile(p => ({ ...p, role: e.target.value }))}
              className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all">
              {["Admin", "Owner", "Staff", "Accountant", "Delivery Manager"].map(r => <option key={r}>{r}</option>)}
            </select>
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div variants={item} className="glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white">Notification Preferences</h3>
        </div>
        <div className="space-y-3">
          {Object.entries(notifs).map(([key, val]) => {
            const labels: Record<string, string> = {
              orders: "New Order Alerts", lowStock: "Low Stock Alerts", payments: "Payment Confirmations",
              deliveries: "Delivery Status Updates", aiInsights: "AI Insights & Recommendations",
            };
            return (
              <div key={key} className="flex items-center justify-between py-2.5 border-b border-slate-700/40 last:border-0">
                <p className="text-sm text-slate-300">{labels[key]}</p>
                <button onClick={() => setNotifs(n => ({ ...n, [key]: !n[key as keyof typeof n] }))}
                  className={`relative w-11 h-6 rounded-full transition-all duration-300 ${val ? "bg-indigo-500" : "bg-slate-700"}`}>
                  <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${val ? "left-5.5 translate-x-0.5" : "left-0.5"}`}
                    style={{ left: val ? "22px" : "2px" }} />
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Security */}
      <motion.div variants={item} className="glass-card p-5 rounded-2xl">
        <div className="flex items-center gap-3 mb-5">
          <Shield className="w-4 h-4 text-indigo-400" />
          <h3 className="font-bold text-white">Security</h3>
        </div>
        <div className="space-y-3">
          <div>
            <label className="text-xs text-slate-400 mb-1 block">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"/>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-400 mb-1 block">New Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"/>
            </div>
            <div>
              <label className="text-xs text-slate-400 mb-1 block">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-3 py-2.5 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition-all"/>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={item} className="flex justify-end">
        <button onClick={handleSave}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-semibold text-sm transition-all ${saved ? "bg-emerald-500 text-white" : "bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25"}`}>
          {saved ? <><CheckCircle className="w-4 h-4" /> Saved!</> : <><Save className="w-4 h-4" /> Save Changes</>}
        </button>
      </motion.div>
    </motion.div>
  );
}
