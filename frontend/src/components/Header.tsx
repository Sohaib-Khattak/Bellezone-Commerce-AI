"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Bell, X, ShoppingCart, Package, CreditCard, Truck, Bot, ChevronRight } from "lucide-react";
import { notifications } from "@/lib/dummyData";
import type { Section } from "@/app/page";

const typeIcon: Record<string, any> = {
  order: ShoppingCart, alert: Package, payment: CreditCard, delivery: Truck, ai: Bot,
};
const typeColor: Record<string, string> = {
  order: "text-cyan-400 bg-cyan-400/10", alert: "text-rose-400 bg-rose-400/10",
  payment: "text-emerald-400 bg-emerald-400/10", delivery: "text-indigo-400 bg-indigo-400/10",
  ai: "text-purple-400 bg-purple-400/10",
};

const sectionLabels: Record<Section, string> = {
  overview: "Overview", orders: "Orders", revenue: "Revenue Analytics",
  inventory: "Inventory Management", deliveries: "Delivery Tracking",
  payments: "Payment Management", customers: "Customer Analytics",
  "ai-insights": "AI Insights", settings: "Settings",
};

interface Props { activeSection: Section; setActiveSection: (s: Section) => void; }

export default function Header({ activeSection, setActiveSection }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifs, setNotifs] = useState(notifications);
  const unread = notifs.filter(n => !n.read).length;

  const markAllRead = () => setNotifs(n => n.map(x => ({ ...x, read: true })));
  const dismiss = (id: number) => setNotifs(n => n.filter(x => x.id !== id));

  const handleSearch = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      
      // Keywords to sections mapping
      const searchMap: Record<string, Section> = {
        overview: "overview", dashboard: "overview", home: "overview",
        orders: "orders", sales: "orders", transactions: "orders", sale: "orders", order: "orders",
        revenue: "revenue", finance: "revenue", profit: "revenue",
        inventory: "inventory", stock: "inventory", products: "inventory", product: "inventory", items: "inventory",
        deliveries: "deliveries", shipping: "deliveries", delivery: "deliveries", track: "deliveries",
        payments: "payments", banking: "payments", card: "payments", payment: "payments",
        customers: "customers", clients: "customers", customer: "customers", client: "customers", staff: "customers",
        insights: "ai-insights", ai: "ai-insights", analysis: "ai-insights", intelligence: "ai-insights",
        settings: "settings", profile: "settings", config: "settings", account: "settings"
      };

      // Check for direct keyword matches
      for (const [key, section] of Object.entries(searchMap)) {
        if (query.includes(key)) {
          setActiveSection(section);
          setSearchTerm("");
          return;
        }
      }
      
      // Fallback: If no match, maybe it's a specific search term we can't handle yet
      // For now, let's just clear or show a hint
      setSearchTerm("");
    }
  };

  return (
    <header className="h-16 glass border-b border-slate-700/50 sticky top-0 z-40 px-6 flex items-center justify-between">
      {/* Page title */}
      <div>
        <h2 className="text-lg font-bold text-white">{sectionLabels[activeSection]}</h2>
        <p className="text-xs text-slate-500">powered by Agent X</p>
      </div>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-8">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-indigo-400 transition-colors" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Search tabs, orders, clients..."
            className="w-full pl-9 pr-4 py-2 bg-slate-800/60 border border-slate-700 rounded-xl text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all"
          />
        </div>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-all"
          >
            <Bell className="w-5 h-5" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-[9px] font-bold text-white flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-12 w-80 glass-card rounded-2xl border border-slate-700/60 overflow-hidden shadow-2xl"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-700/50">
                  <h3 className="text-sm font-bold text-white">Notifications</h3>
                  <button onClick={markAllRead} className="text-xs text-indigo-400 hover:text-indigo-300">Mark all read</button>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-slate-700/30">
                  {notifs.map(n => {
                    const Icon = typeIcon[n.type] || Bell;
                    return (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-800/40 transition-colors ${!n.read ? "bg-indigo-500/5" : ""}`}>
                        <div className={`p-1.5 rounded-lg flex-shrink-0 ${typeColor[n.type]}`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-slate-300 leading-relaxed">{n.message}</p>
                          <p className="text-[10px] text-slate-500 mt-1">{n.time}</p>
                        </div>
                        <button onClick={() => dismiss(n.id)} className="text-slate-600 hover:text-slate-400 flex-shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </div>
                <div className="px-4 py-2.5 border-t border-slate-700/50">
                  <button className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                    View all <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Profile avatar */}
        <button
          onClick={() => setActiveSection("settings")}
          className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white hover:scale-105 transition-transform"
        >
          AU
        </button>
      </div>
    </header>
  );
}
