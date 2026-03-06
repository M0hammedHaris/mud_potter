"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ── Mock data ────────────────────────────────────────────────────────────────

const stats = [
  {
    label: "Total Revenue",
    value: "₹2,45,800",
    change: "+18.2%",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: "bg-green-100 text-green-600",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+12.5%",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    color: "bg-blue-100 text-blue-600",
  },
  {
    label: "Customers",
    value: "3,742",
    change: "+8.1%",
    up: true,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    color: "bg-purple-100 text-purple-600",
  },
  {
    label: "Active Products",
    value: "9",
    change: "-2 this month",
    up: false,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
    color: "bg-orange-100 text-orange-600",
  },
];

const recentOrders = [
  { id: "ORD-1042", customer: "Priya Sharma", product: "Classic Mud Pot × 2", amount: 2400, status: "delivered", date: "Mar 5, 2026" },
  { id: "ORD-1041", customer: "Rajesh Kumar", product: "Earthen Cooker × 1", amount: 1800, status: "shipped", date: "Mar 5, 2026" },
  { id: "ORD-1040", customer: "Anita Nair", product: "Terracotta Vase × 3", amount: 2850, status: "processing", date: "Mar 4, 2026" },
  { id: "ORD-1039", customer: "Suresh Mehta", product: "Garden Planter × 1", amount: 1100, status: "pending", date: "Mar 4, 2026" },
  { id: "ORD-1038", customer: "Deepa Iyer", product: "Sacred Lamp × 5", amount: 3250, status: "cancelled", date: "Mar 3, 2026" },
  { id: "ORD-1037", customer: "Mohan Das", product: "Water Storage Pot × 1", amount: 2200, status: "delivered", date: "Mar 3, 2026" },
];

const topProducts = [
  { id: "6", name: "Cooking Handi", sales: 203, revenue: 284200, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png" },
  { id: "7", name: "Water Storage Pot", sales: 178, revenue: 391600, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png" },
  { id: "3", name: "Terracotta Vase", sales: 156, revenue: 148200, image: "/images/vase.png" },
  { id: "1", name: "Classic Mud Pot", sales: 124, revenue: 148800, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png" },
];

// Monthly revenue data for sparkline bars (last 7 months, relative scale 0-100)
const revenueData = [38, 52, 45, 68, 72, 83, 100];
const revenueLabels = ["Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];

const orderStatusData = [
  { label: "Delivered", count: 842, color: "bg-green-500" },
  { label: "Shipped", count: 217, color: "bg-blue-500" },
  { label: "Processing", count: 143, color: "bg-yellow-500" },
  { label: "Pending", count: 61, color: "bg-orange-400" },
  { label: "Cancelled", count: 21, color: "bg-red-400" },
];
const totalOrderStatus = orderStatusData.reduce((s, d) => s + d.count, 0);

const statusConfig: Record<string, { label: string; classes: string }> = {
  delivered: { label: "Delivered", classes: "bg-green-100 text-green-700" },
  shipped: { label: "Shipped", classes: "bg-blue-100 text-blue-700" },
  processing: { label: "Processing", classes: "bg-yellow-100 text-yellow-700" },
  pending: { label: "Pending", classes: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-700" },
};

const quickActions = [
  { label: "Add Product", href: "/admin/products/new", icon: "➕" },
  { label: "View Orders", href: "/admin/orders", icon: "📦" },
  { label: "Analytics", href: "/admin/analytics", icon: "📊" },
  { label: "Settings", href: "/admin/settings", icon: "⚙️" },
];

// ── Component ────────────────────────────────────────────────────────────────

export default function AdminDashboard() {
  const [orderFilter] = useState("all");

  const filteredOrders = orderFilter === "all"
    ? recentOrders
    : recentOrders.filter(o => o.status === orderFilter);

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      {/* Page header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1 text-sm">Welcome back, Admin · {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-start gap-4">
            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0", stat.color)}>
              {stat.icon}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-gray-500 truncate">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{stat.value}</p>
              <p className={cn("text-xs mt-1 font-medium", stat.up ? "text-green-600" : "text-red-500")}>
                {stat.change} vs last month
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm flex items-center gap-3 hover:border-[#01A401] hover:shadow-md transition-all duration-200 group"
          >
            <span className="text-2xl">{action.icon}</span>
            <span className="text-sm font-medium text-gray-700 group-hover:text-[#01A401] transition-colors">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Revenue Chart + Order Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Bars */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Monthly Revenue</h2>
              <p className="text-sm text-gray-500">Last 7 months</p>
            </div>
            <span className="text-2xl font-bold text-gray-900">₹2,45,800</span>
          </div>
          <div className="flex items-end gap-3 h-40">
            {revenueData.map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div
                  className="w-full rounded-t-lg bg-[#01A401] opacity-80 hover:opacity-100 transition-opacity"
                  style={{ height: `${val}%` }}
                  title={`${revenueLabels[i]}: ${val}%`}
                />
                <span className="text-xs text-gray-400">{revenueLabels[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Order status breakdown */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
          <div className="flex rounded-full overflow-hidden h-3 mb-4">
            {orderStatusData.map((d) => (
              <div
                key={d.label}
                className={d.color}
                style={{ width: `${(d.count / totalOrderStatus) * 100}%` }}
                title={d.label}
              />
            ))}
          </div>
          <ul className="space-y-3">
            {orderStatusData.map((d) => (
              <li key={d.label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <span className={cn("w-2.5 h-2.5 rounded-full", d.color)} />
                  <span className="text-gray-600">{d.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{d.count}</span>
                  <span className="text-gray-400 text-xs">{Math.round((d.count / totalOrderStatus) * 100)}%</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recent Orders + Top Products */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Orders Table */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
            <Link href="/admin/orders" className="text-sm text-[#01A401] font-medium hover:underline">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Product</th>
                  <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50/80 transition-colors">
                    <td className="px-6 py-3 font-medium text-gray-900">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-[#01A401] transition-colors">
                        {order.id}
                      </Link>
                    </td>
                    <td className="px-6 py-3 text-gray-600">{order.customer}</td>
                    <td className="px-4 py-3 text-gray-500 hidden md:table-cell max-w-[160px] truncate">{order.product}</td>
                    <td className="px-6 py-3 text-right font-medium text-gray-900">₹{order.amount.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", statusConfig[order.status].classes)}>
                        {statusConfig[order.status].label}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Top Products</h2>
            <Link href="/admin/products" className="text-sm text-[#01A401] font-medium hover:underline">
              View all →
            </Link>
          </div>
          <ul className="divide-y divide-gray-50">
            {topProducts.map((p, i) => (
              <li key={p.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/80 transition-colors">
                <span className="text-gray-400 font-bold text-sm w-4 flex-shrink-0">{i + 1}</span>
                <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0 bg-gray-100">
                  <Image src={p.image} alt={p.name} fill sizes="40px" className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-400">{p.sales} sold</p>
                </div>
                <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
                  ₹{(p.revenue / 1000).toFixed(0)}k
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
