"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const customers = [
  { id: "C001", name: "Priya Sharma", email: "priya@example.com", phone: "9876543210", city: "Bangalore", orders: 5, totalSpent: 8600, lastOrder: "Mar 5, 2026", status: "active" },
  { id: "C002", name: "Rajesh Kumar", email: "rajesh@example.com", phone: "9123456780", city: "Mumbai", orders: 3, totalSpent: 4950, lastOrder: "Mar 5, 2026", status: "active" },
  { id: "C003", name: "Anita Nair", email: "anita@example.com", phone: "9012345678", city: "Chennai", orders: 7, totalSpent: 12400, lastOrder: "Mar 4, 2026", status: "active" },
  { id: "C004", name: "Suresh Mehta", email: "suresh@example.com", phone: "9234567890", city: "Pune", orders: 2, totalSpent: 2800, lastOrder: "Mar 4, 2026", status: "active" },
  { id: "C005", name: "Deepa Iyer", email: "deepa@example.com", phone: "9345678901", city: "Hyderabad", orders: 1, totalSpent: 3250, lastOrder: "Mar 3, 2026", status: "blocked" },
  { id: "C006", name: "Mohan Das", email: "mohan@example.com", phone: "9456789012", city: "Delhi", orders: 4, totalSpent: 6800, lastOrder: "Mar 3, 2026", status: "active" },
  { id: "C007", name: "Kavita Reddy", email: "kavita@example.com", phone: "9567890123", city: "Kolkata", orders: 6, totalSpent: 9600, lastOrder: "Mar 2, 2026", status: "active" },
  { id: "C008", name: "Arun Pillai", email: "arun@example.com", phone: "9678901234", city: "Ahmedabad", orders: 2, totalSpent: 3100, lastOrder: "Mar 2, 2026", status: "active" },
  { id: "C009", name: "Sunita Verma", email: "sunita@example.com", phone: "9789012345", city: "Jaipur", orders: 3, totalSpent: 5200, lastOrder: "Mar 1, 2026", status: "active" },
  { id: "C010", name: "Vijay Krishnan", email: "vijay@example.com", phone: "9890123456", city: "Coimbatore", orders: 1, totalSpent: 800, lastOrder: "Mar 1, 2026", status: "active" },
];

export default function AdminCustomersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = customers
    .filter(c => statusFilter === "all" || c.status === statusFilter)
    .filter(c =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
    );

  const totalRevenue = customers.reduce((s, c) => s + c.totalSpent, 0);
  const avgOrderValue = Math.round(totalRevenue / customers.reduce((s, c) => s + c.orders, 0));

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Customers</h1>
        <p className="text-sm text-gray-500 mt-1">{customers.length} registered customers</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Customers", value: customers.length.toString(), icon: "👥" },
          { label: "Active", value: customers.filter(c => c.status === "active").length.toString(), icon: "✅" },
          { label: "Total Revenue", value: `₹${(totalRevenue / 1000).toFixed(0)}k`, icon: "💰" },
          { label: "Avg Order Value", value: `₹${avgOrderValue.toLocaleString()}`, icon: "🛒" },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <div className="text-2xl mb-2">{stat.icon}</div>
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="text-xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name, email, city…"
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Location</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Total Spent</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Last Order</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-12 text-gray-400">No customers found</td></tr>
              ) : (
                filtered.map(customer => (
                  <tr key={customer.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#01A401]/20 flex items-center justify-center text-[#01A401] text-sm font-bold flex-shrink-0">
                          {customer.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{customer.name}</p>
                          <p className="text-xs text-gray-400">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-gray-500 hidden sm:table-cell">{customer.city}</td>
                    <td className="px-4 py-4 text-right font-medium text-gray-900">{customer.orders}</td>
                    <td className="px-4 py-4 text-right font-medium text-gray-900 hidden md:table-cell">
                      ₹{customer.totalSpent.toLocaleString()}
                    </td>
                    <td className="px-4 py-4 text-gray-400 text-sm hidden lg:table-cell">{customer.lastOrder}</td>
                    <td className="px-4 py-4">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold",
                        customer.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {customer.status === "active" ? "Active" : "Blocked"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button className="text-xs text-[#01A401] font-medium hover:underline">View</button>
                        <button className="text-xs text-gray-400 hover:text-red-600 font-medium transition-colors">
                          {customer.status === "active" ? "Block" : "Unblock"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filtered.length} of {customers.length} customers
        </div>
      </div>
    </div>
  );
}
