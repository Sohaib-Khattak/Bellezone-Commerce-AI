// ─── ORDERS ────────────────────────────────────────────────────────────────
export const orders = [
  { id: "ORD-5521", customer: "Ayesha Khan", platform: "Instagram", product: "Summer Lawn Suit", qty: 2, amount: 4800, payment: "JazzCash", status: "Delivered", city: "Lahore", date: "2026-05-10" },
  { id: "ORD-5520", customer: "Bilal Ahmed", platform: "TikTok", product: "Men Chino Pants", qty: 1, amount: 2200, payment: "COD", status: "Shipped", city: "Karachi", date: "2026-05-10" },
  { id: "ORD-5519", customer: "Sara Malik", platform: "WhatsApp", product: "Silk Dupatta", qty: 3, amount: 3600, payment: "EasyPaisa", status: "Pending", city: "Islamabad", date: "2026-05-09" },
  { id: "ORD-5518", customer: "Usman Tariq", platform: "Facebook", product: "Sports Sneakers", qty: 1, amount: 5500, payment: "Stripe", status: "Confirmed", city: "Faisalabad", date: "2026-05-09" },
  { id: "ORD-5517", customer: "Nida Farooq", platform: "Instagram", product: "Embroidered Kurti", qty: 2, amount: 3200, payment: "COD", status: "Delivered", city: "Multan", date: "2026-05-08" },
  { id: "ORD-5516", customer: "Hassan Raza", platform: "TikTok", product: "Slim Fit Jeans", qty: 1, amount: 2800, payment: "JazzCash", status: "Cancelled", city: "Rawalpindi", date: "2026-05-08" },
  { id: "ORD-5515", customer: "Zainab Ali", platform: "WhatsApp", product: "Bridal Lehenga", qty: 1, amount: 18500, payment: "Bank Transfer", status: "Confirmed", city: "Lahore", date: "2026-05-07" },
  { id: "ORD-5514", customer: "Faisal Qureshi", platform: "YouTube", product: "Casual T-Shirt Pack", qty: 5, amount: 6500, payment: "COD", status: "Shipped", city: "Peshawar", date: "2026-05-07" },
  { id: "ORD-5513", customer: "Maria Shah", platform: "Instagram", product: "Palazzo Pants", qty: 2, amount: 2900, payment: "EasyPaisa", status: "Pending", city: "Quetta", date: "2026-05-06" },
  { id: "ORD-5512", customer: "Tariq Mehmood", platform: "Facebook", product: "Formal Shirt", qty: 3, amount: 4200, payment: "Stripe", status: "Delivered", city: "Sialkot", date: "2026-05-06" },
];

// ─── REVENUE DATA ───────────────────────────────────────────────────────────
export const weeklyRevenue = [
  { day: "Mon", tiktok: 18000, instagram: 12000, facebook: 8000, whatsapp: 6000 },
  { day: "Tue", tiktok: 22000, instagram: 15000, facebook: 9500, whatsapp: 7200 },
  { day: "Wed", tiktok: 19500, instagram: 13000, facebook: 11000, whatsapp: 5800 },
  { day: "Thu", tiktok: 31000, instagram: 20000, facebook: 14000, whatsapp: 9000 },
  { day: "Fri", tiktok: 42000, instagram: 28000, facebook: 16500, whatsapp: 11000 },
  { day: "Sat", tiktok: 38000, instagram: 25000, facebook: 18000, whatsapp: 13000 },
  { day: "Sun", tiktok: 29000, instagram: 19000, facebook: 12000, whatsapp: 8500 },
];

export const monthlyRevenue = [
  { month: "Jan", revenue: 320000 }, { month: "Feb", revenue: 280000 },
  { month: "Mar", revenue: 410000 }, { month: "Apr", revenue: 390000 },
  { month: "May", revenue: 520000 }, { month: "Jun", revenue: 480000 },
];

export const platformRevenue = [
  { name: "TikTok Shop", value: 42, color: "#06B6D4" },
  { name: "Instagram", value: 28, color: "#7C3AED" },
  { name: "Facebook", value: 18, color: "#4F46E5" },
  { name: "WhatsApp", value: 8, color: "#10B981" },
  { name: "YouTube", value: 4, color: "#F59E0B" },
];

// ─── INVENTORY ───────────────────────────────────────────────────────────────
export const inventory = [
  { id: "SKU-001", name: "Summer Lawn Suit", category: "Women", stock: 3, threshold: 5, price: 2400, sold: 248, status: "Low Stock" },
  { id: "SKU-002", name: "Men Chino Pants", category: "Men", stock: 45, threshold: 10, price: 2200, sold: 132, status: "In Stock" },
  { id: "SKU-003", name: "Silk Dupatta", category: "Accessories", stock: 0, threshold: 8, price: 1200, sold: 89, status: "Out of Stock" },
  { id: "SKU-004", name: "Sports Sneakers", category: "Footwear", stock: 18, threshold: 10, price: 5500, sold: 67, status: "In Stock" },
  { id: "SKU-005", name: "Embroidered Kurti", category: "Women", stock: 2, threshold: 5, price: 1600, sold: 315, status: "Low Stock" },
  { id: "SKU-006", name: "Slim Fit Jeans", category: "Men", stock: 72, threshold: 15, price: 2800, sold: 204, status: "In Stock" },
  { id: "SKU-007", name: "Bridal Lehenga", category: "Women", stock: 0, threshold: 3, price: 18500, sold: 12, status: "Out of Stock" },
  { id: "SKU-008", name: "Casual T-Shirt Pack", category: "Men", stock: 1, threshold: 10, price: 1300, sold: 420, status: "Low Stock" },
  { id: "SKU-009", name: "Palazzo Pants", category: "Women", stock: 33, threshold: 8, price: 1450, sold: 178, status: "In Stock" },
  { id: "SKU-010", name: "Formal Shirt", category: "Men", stock: 56, threshold: 12, price: 1400, sold: 156, status: "In Stock" },
];

// ─── DELIVERIES ──────────────────────────────────────────────────────────────
export const deliveries = [
  { id: "TRK-8821", order: "ORD-5521", customer: "Ayesha Khan", courier: "TCS", tracking: "TCS-44829192", city: "Lahore", status: "Delivered", eta: "2026-05-10", updated: "2026-05-10" },
  { id: "TRK-8820", order: "ORD-5520", customer: "Bilal Ahmed", courier: "Leopard", tracking: "LPD-88291023", city: "Karachi", status: "Out for Delivery", eta: "2026-05-12", updated: "2026-05-11" },
  { id: "TRK-8819", order: "ORD-5518", customer: "Usman Tariq", courier: "M&P", tracking: "MNP-99182736", city: "Faisalabad", status: "In Transit", eta: "2026-05-13", updated: "2026-05-10" },
  { id: "TRK-8818", order: "ORD-5517", customer: "Nida Farooq", courier: "TCS", tracking: "TCS-44819284", city: "Multan", status: "Delivered", eta: "2026-05-09", updated: "2026-05-09" },
  { id: "TRK-8817", order: "ORD-5515", customer: "Zainab Ali", courier: "DHL", tracking: "DHL-19283746", city: "Lahore", status: "Processing", eta: "2026-05-14", updated: "2026-05-11" },
  { id: "TRK-8816", order: "ORD-5514", customer: "Faisal Qureshi", courier: "Leopard", tracking: "LPD-77291038", city: "Peshawar", status: "In Transit", eta: "2026-05-13", updated: "2026-05-11" },
  { id: "TRK-8815", order: "ORD-5512", customer: "Tariq Mehmood", courier: "M&P", tracking: "MNP-66182036", city: "Sialkot", status: "Delivered", eta: "2026-05-08", updated: "2026-05-08" },
];

// ─── PAYMENTS ────────────────────────────────────────────────────────────────
export const payments = [
  { id: "PAY-3301", order: "ORD-5521", customer: "Ayesha Khan", amount: 4800, method: "JazzCash", status: "Completed", date: "2026-05-10" },
  { id: "PAY-3300", order: "ORD-5520", customer: "Bilal Ahmed", amount: 2200, method: "COD", status: "Pending", date: "2026-05-10" },
  { id: "PAY-3299", order: "ORD-5519", customer: "Sara Malik", amount: 3600, method: "EasyPaisa", status: "Completed", date: "2026-05-09" },
  { id: "PAY-3298", order: "ORD-5518", customer: "Usman Tariq", amount: 5500, method: "Stripe", status: "Completed", date: "2026-05-09" },
  { id: "PAY-3297", order: "ORD-5517", customer: "Nida Farooq", amount: 3200, method: "COD", status: "Completed", date: "2026-05-08" },
  { id: "PAY-3296", order: "ORD-5516", customer: "Hassan Raza", amount: 2800, method: "JazzCash", status: "Refunded", date: "2026-05-08" },
  { id: "PAY-3295", order: "ORD-5515", customer: "Zainab Ali", amount: 18500, method: "Bank Transfer", status: "Completed", date: "2026-05-07" },
  { id: "PAY-3294", order: "ORD-5514", customer: "Faisal Qureshi", amount: 6500, method: "COD", status: "Pending", date: "2026-05-07" },
];

// ─── CUSTOMERS ───────────────────────────────────────────────────────────────
export const customers = [
  { id: "C-101", name: "Ayesha Khan", platform: "Instagram", city: "Lahore", orders: 8, spent: 32400, joined: "2025-11-12", status: "VIP" },
  { id: "C-102", name: "Bilal Ahmed", platform: "TikTok", city: "Karachi", orders: 3, spent: 7800, joined: "2026-01-05", status: "Active" },
  { id: "C-103", name: "Sara Malik", platform: "WhatsApp", city: "Islamabad", orders: 5, spent: 14200, joined: "2025-12-20", status: "Active" },
  { id: "C-104", name: "Usman Tariq", platform: "Facebook", city: "Faisalabad", orders: 2, spent: 9800, joined: "2026-02-14", status: "New" },
  { id: "C-105", name: "Nida Farooq", platform: "Instagram", city: "Multan", orders: 12, spent: 48600, joined: "2025-09-03", status: "VIP" },
  { id: "C-106", name: "Zainab Ali", platform: "WhatsApp", city: "Lahore", orders: 1, spent: 18500, joined: "2026-05-07", status: "New" },
  { id: "C-107", name: "Faisal Qureshi", platform: "YouTube", city: "Peshawar", orders: 4, spent: 18200, joined: "2025-10-18", status: "Active" },
  { id: "C-108", name: "Maria Shah", platform: "Instagram", city: "Quetta", orders: 6, spent: 22100, joined: "2025-08-22", status: "Active" },
];

// ─── NOTIFICATIONS ──────────────────────────────────────────────────────────
export const notifications = [
  { id: 1, type: "order", message: "New order ORD-5522 from TikTok — Ayesha Khan", time: "2 min ago", read: false },
  { id: 2, type: "alert", message: "⚠️ SKU-003 (Silk Dupatta) is Out of Stock!", time: "15 min ago", read: false },
  { id: 3, type: "payment", message: "Payment PAY-3295 of Rs 18,500 completed via Bank Transfer", time: "1 hr ago", read: false },
  { id: 4, type: "delivery", message: "Order TRK-8820 is Out for Delivery in Karachi", time: "2 hr ago", read: true },
  { id: 5, type: "ai", message: "AI Agent detected a spike in TikTok orders — 34 new orders in last hour", time: "3 hr ago", read: true },
  { id: 6, type: "alert", message: "⚠️ SKU-001 (Summer Lawn Suit) is running Low Stock", time: "5 hr ago", read: true },
  { id: 7, type: "order", message: "New order ORD-5514 from YouTube — Faisal Qureshi", time: "Yesterday", read: true },
];

// ─── AI INSIGHTS ─────────────────────────────────────────────────────────────
export const aiInsights = [
  { id: 1, type: "revenue", title: "TikTok Revenue Spike", body: "TikTok Shop sales are up 42% this week compared to last week. The viral reel posted on May 9th appears to have driven a significant boost in the Lawn Suit category.", action: "View TikTok Analytics" },
  { id: 2, type: "inventory", title: "Restock Summer Lawn Suit Urgently", body: "Based on current sales velocity (248 units sold in 30 days), the remaining 3 units of SKU-001 will sell out within 6 hours. Order at least 100 units to cover the next 12 days.", action: "Create Restock Order" },
  { id: 3, type: "customer", title: "5 Churning VIP Customers", body: "Customers Nida Farooq, Ayesha Khan, and 3 others haven't placed an order in 14+ days despite being VIP. A targeted WhatsApp message with a 10% discount coupon is recommended.", action: "Send WhatsApp Campaign" },
  { id: 4, type: "forecast", title: "May Revenue Forecast: Rs 680,000", body: "Based on current order trajectory and seasonal trends, May 2026 revenue is forecasted at Rs 680,000 — an 18% increase over April. Expect peak sales around May 23-26.", action: "View Full Report" },
  { id: 5, type: "payment", title: "COD Refusal Rate is High", body: "28% of COD orders in Peshawar and Quetta are being refused at delivery. Consider switching these regions to prepaid-only or adding a partial advance requirement.", action: "Configure Payment Rules" },
];
