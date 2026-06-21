"use client";

import { motion } from "framer-motion";
import {
  LayoutDashboard, ShoppingCart, LineChart, Package,
  Truck, CreditCard, Users, Lightbulb, Settings, Bot, ChevronRight
} from "lucide-react";
import type { Section } from "@/app/page";

const menuItems: { icon: any; label: string; key: Section; badge?: number }[] = [
  { icon: LayoutDashboard, label: "Overview", key: "overview" },
  { icon: ShoppingCart, label: "Orders", key: "orders", badge: 5 },
  { icon: LineChart, label: "Revenue", key: "revenue" },
  { icon: Package, label: "Inventory", key: "inventory", badge: 3 },
  { icon: Truck, label: "Deliveries", key: "deliveries" },
  { icon: CreditCard, label: "Payments", key: "payments" },
  { icon: Users, label: "Customers", key: "customers" },
  { icon: Lightbulb, label: "AI Insights", key: "ai-insights", badge: 2 },
];

interface Props {
  activeSection: Section;
  setActiveSection: (s: Section) => void;
}

export default function Sidebar({ activeSection, setActiveSection }: Props) {
  return (
    <motion.aside
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className="w-64 h-screen fixed left-0 top-0 glass border-r border-slate-700/50 flex flex-col z-50"
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
          <Bot className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            Bellezone
          </h1>
          <p className="text-[10px] text-slate-500 font-medium tracking-widest uppercase">powered by Agent X</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] text-slate-500 font-semibold tracking-widest uppercase px-3 mb-2">Main Menu</p>
        {menuItems.map((item) => {
          const isActive = activeSection === item.key;
          return (
            <button
              key={item.key}
              onClick={() => setActiveSection(item.key)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
                  : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
              }`}
            >
              <item.icon className={`w-[18px] h-[18px] flex-shrink-0 ${isActive ? "text-indigo-400" : "group-hover:text-slate-200"}`} />
              <span className="font-medium text-sm flex-1 text-left">{item.label}</span>
              {item.badge && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-500/30 text-indigo-300">
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
            </button>
          );
        })}
      </nav>

      {/* Profile + Settings */}
      <div className="p-3 border-t border-slate-700/40 space-y-1">
        <button
          onClick={() => setActiveSection("settings")}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
            activeSection === "settings"
              ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
              : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/60"
          }`}
        >
          <Settings className="w-[18px] h-[18px]" />
          <span className="font-medium text-sm">Settings</span>
        </button>

        <div className="glass-card p-3 rounded-xl flex items-center gap-3 mt-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0 text-xs font-bold text-white">
            AU
          </div>
          <div className="text-left min-w-0">
            <p className="text-xs font-semibold text-white truncate">Admin User</p>
            <p className="text-[10px] text-slate-400">Enterprise Plan</p>
          </div>
          <div className="ml-auto w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
        </div>
      </div>
    </motion.aside>
  );
}
