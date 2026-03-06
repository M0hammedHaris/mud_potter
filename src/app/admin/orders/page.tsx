"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const allOrders = [
  { id: "ORD-1042", customer: "Priya Sharma", email: "priya@example.com", items: 2, product: "Classic Mud Pot × 2", amount: 2400, status: "delivered", date: "Mar 5, 2026", city: "Bangalore" },
  { id: "ORD-1041", customer: "Rajesh Kumar", email: "rajesh@example.com", items: 1, product: "Earthen Cooker × 1", amount: 1800, status: "shipped", date: "Mar 5, 2026", city: "Mumbai" },
  { id: "ORD-1040", customer: "Anita Nair", email: "anita@example.com", items: 3, product: "Terracotta Vase × 3", amount: 2850, status: "processing", date: "Mar 4, 2026", city: "Chennai" },
  { id: "ORD-1039", customer: "Suresh Mehta", email: "suresh@example.com", items: 1, product: "Garden Planter × 1", amount: 1100, status: "pending", date: "Mar 4, 2026", city: "Pune" },
  { id: "ORD-1038", customer: "Deepa Iyer", email: "deepa@example.com", items: 5, product: "Sacred Lamp × 5", amount: 3250, status: "cancelled", date: "Mar 3, 2026", city: "Hyderabad" },
  { id: "ORD-1037", customer: "Mohan Das", email: "mohan@example.com", items: 1, product: "Water Storage Pot × 1", amount: 2200, status: "delivered", date: "Mar 3, 2026", city: "Delhi" },
  { id: "ORD-1036", customer: "Kavita Reddy", email: "kavita@example.com", items: 2, product: "Herb Planter Set × 2", amount: 3200, status: "delivered", date: "Mar 2, 2026", city: "Kolkata" },
  { id: "ORD-1035", customer: "Arun Pillai", email: "arun@example.com", items: 1, product: "Cooking Handi × 1", amount: 1400, status: "shipped", date: "Mar 2, 2026", city: "Ahmedabad" },
  { id: "ORD-1034", customer: "Sunita Verma", email: "sunita@example.com", items: 4, product: "Sacred Lamp × 4", amount: 2600, status: "processing", date: "Mar 1, 2026", city: "Jaipur" },
  { id: "ORD-1033", customer: "Vijay Krishnan", email: "vijay@example.com", items: 1, product: "Decorative Pot × 1", amount: 800, status: "pending", date: "Mar 1, 2026", city: "Coimbatore" },
  { id: "ORD-1032", customer: "Meena Gopalan", email: "meena@example.com", items: 2, product: "Terracotta Vase × 2", amount: 1900, status: "delivered", date: "Feb 28, 2026", city: "Kochi" },
  { id: "ORD-1031", customer: "Ravi Shankar", email: "ravi@example.com", items: 1, product: "Classic Mud Pot × 1", amount: 1200, status: "cancelled", date: "Feb 28, 2026", city: "Lucknow" },
];

type Status = "all" | "pending" | "processing" | "shipped" | "delivered" | "cancelled";

const statusConfig: Record<string, { label: string; classes: string }> = {
  delivered: { label: "Delivered", classes: "bg-green-100 text-green-700" },
  shipped: { label: "Shipped", classes: "bg-blue-100 text-blue-700" },
  processing: { label: "Processing", classes: "bg-yellow-100 text-yellow-700" },
  pending: { label: "Pending", classes: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-700" },
};

const tabCounts: Record<string, number> = {
  all: allOrders.length,
  pending: allOrders.filter(o => o.status === "pending").length,
  processing: allOrders.filter(o => o.status === "processing").length,
  shipped: allOrders.filter(o => o.status === "shipped").length,
  delivered: allOrders.filter(o => o.status === "delivered").length,
  cancelled: allOrders.filter(o => o.status === "cancelled").length,
};

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState<Status>("all");
  const [search, setSearch] = useState("");

  const filtered = allOrders
    .filter(o => activeTab === "all" || o.status === activeTab)
    .filter(o =>
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase())
    );

  const tabs: { key: Status; label: string }[] = [
    { key: "all", label: "All" },
    { key: "pending", label: "Pending" },
    { key: "processing", label: "Processing" },
    { key: "shipped", label: "Shipped" },
    { key: "delivered", label: "Delivered" },
    { key: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500 mt-1">{allOrders.length} total orders</p>
        </div>
        <button className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export CSV
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit flex-wrap">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5",
              activeTab === tab.key ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700"
            )}
          >
            {tab.label}
            <span className={cn("text-xs rounded-full px-1.5 py-0.5", activeTab === tab.key ? "bg-[#01A401]/10 text-[#01A401]" : "bg-gray-200 text-gray-500")}>
              {tabCounts[tab.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative w-full max-w-sm">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search order ID, customer, product…"
          className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
        />
        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Product(s)</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Date</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No orders found</td></tr>
              ) : (
                filtered.map(order => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{order.id}</td>
                    <td className="px-4 py-4">
                      <p className="font-medium text-gray-900">{order.customer}</p>
                      <p className="text-xs text-gray-400">{order.city}</p>
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden md:table-cell max-w-[180px] truncate">{order.product}</td>
                    <td className="px-4 py-4 text-right font-semibold text-gray-900">₹{order.amount.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", statusConfig[order.status].classes)}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-gray-400 hidden lg:table-cell">{order.date}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-sm text-[#01A401] font-medium hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filtered.length} of {allOrders.length} orders
        </div>
      </div>
    </div>
  );
}
