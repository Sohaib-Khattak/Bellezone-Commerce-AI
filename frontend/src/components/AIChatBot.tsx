"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, X, Send, Bot, User, Loader2 } from "lucide-react";

type Message = {
  id: number;
  text: string;
  sender: "user" | "ai";
};

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm Agent X. How can I help you manage your business today?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Date.now(), text: input.trim(), sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response logic
    setTimeout(() => {
      const lowerInput = userMessage.text.toLowerCase();
      let reply = "I'm here to help you manage your store. You can ask me about revenue, orders, inventory, or our team!";
      
      if (lowerInput.includes("revenue") || lowerInput.includes("sales") || lowerInput.includes("money")) {
        reply = "Our total revenue this week is up by 14.5% across all channels! TikTok Shop is performing exceptionally well.";
      } else if (lowerInput.includes("order") || lowerInput.includes("shipping") || lowerInput.includes("delivery")) {
        reply = "We have 142 new orders today. 5 orders are currently pending and 3 deliveries are delayed in Dubai. Would you like me to flag those?";
      } else if (lowerInput.includes("inventory") || lowerInput.includes("stock")) {
        reply = "You have 12 items running low on stock. I recommend restocking 'Silk Evening Gown' before the weekend sale.";
      } else if (lowerInput.includes("manager") || lowerInput.includes("team") || lowerInput.includes("staff")) {
        reply = "Your team is doing great! Sarah handled 45 customer tickets today, and Mike processed the new inventory batch. No immediate managerial actions required.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
        reply = "Hello! Ready to optimize our social commerce operations today?";
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: "ai" }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-8 w-80 sm:w-96 h-[500px] z-50 glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-indigo-500/30"
          >
            {/* Header */}
            <div className="px-4 py-3 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white leading-tight">Agent X</h3>
                  <p className="text-[10px] text-emerald-400 font-medium">● Online</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`flex gap-2 max-w-[80%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${msg.sender === "user" ? "bg-slate-700" : "bg-gradient-to-tr from-indigo-500 to-cyan-500"}`}>
                      {msg.sender === "user" ? <User className="w-3.5 h-3.5 text-slate-300" /> : <Bot className="w-3.5 h-3.5 text-white" />}
                    </div>
                    <div className={`px-3 py-2 rounded-2xl text-sm ${msg.sender === "user" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm"}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 max-w-[80%] flex-row">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-500 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="px-4 py-2.5 rounded-2xl bg-slate-800/80 border border-slate-700/50 text-slate-200 rounded-tl-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-slate-700/50 bg-slate-800/30">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="relative flex items-center"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Agent X..."
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-xl pl-4 pr-12 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-2 p-1.5 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:hover:bg-indigo-500 text-white rounded-lg transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full shadow-xl shadow-indigo-500/30 flex items-center justify-center transition-all duration-300 group ${isOpen ? "bg-slate-800 hover:bg-slate-700 text-slate-400" : "bg-gradient-to-tr from-indigo-600 to-cyan-500 hover:scale-110 text-white"}`}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Sparkles className="w-6 h-6 group-hover:animate-pulse" />
          )}
        </button>
      </div>
    </>
  );
}
