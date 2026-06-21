"use client";

import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Overview from "@/sections/Overview";
import Orders from "@/sections/Orders";
import Revenue from "@/sections/Revenue";
import Inventory from "@/sections/Inventory";
import Deliveries from "@/sections/Deliveries";
import Payments from "@/sections/Payments";
import Customers from "@/sections/Customers";
import AIInsights from "@/sections/AIInsights";
import Settings from "@/sections/Settings";
import AIChatBot from "@/components/AIChatBot";

export type Section = "overview" | "orders" | "revenue" | "inventory" | "deliveries" | "payments" | "customers" | "ai-insights" | "settings";

function ActiveSection({ section }: { section: Section }) {
  switch (section) {
    case "overview":    return <Overview />;
    case "orders":      return <Orders />;
    case "revenue":     return <Revenue />;
    case "inventory":   return <Inventory />;
    case "deliveries":  return <Deliveries />;
    case "payments":    return <Payments />;
    case "customers":   return <Customers />;
    case "ai-insights": return <AIInsights />;
    case "settings":    return <Settings />;
    default:            return <Overview />;
  }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState<Section>("overview");

  return (
    <div className="min-h-screen flex text-slate-100 bg-slate-900 relative selection:bg-indigo-500/30">
      {/* Ambient background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-[150px] mix-blend-screen" />
      </div>

      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />

      <main className="flex-1 ml-64 flex flex-col min-h-screen z-10 relative">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
        <div className="flex-1 overflow-x-hidden">
          <ActiveSection section={activeSection} />
        </div>
      </main>

      <AIChatBot />
    </div>
  );
}
