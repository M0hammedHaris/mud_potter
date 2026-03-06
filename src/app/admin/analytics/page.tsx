"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const monthlyRevenue = [
  { month: "Sep", revenue: 18500, orders: 62 },
  { month: "Oct", revenue: 24200, orders: 81 },
  { month: "Nov", revenue: 21800, orders: 74 },
  { month: "Dec", revenue: 33600, orders: 112 },
  { month: "Jan", revenue: 35400, orders: 118 },
  { month: "Feb", revenue: 41200, orders: 138 },
  { month: "Mar", revenue: 49800, orders: 168 },
];

const maxRevenue = Math.max(...monthlyRevenue.map(d => d.revenue));

const categoryBreakdown = [
  { name: "Cookware", revenue: 85400, pct: 35, color: "bg-[#01A401]" },
  { name: "Water Pots", revenue: 61200, pct: 25, color: "bg-blue-500" },
  { name: "Garden Decors", revenue: 48800, pct: 20, color: "bg-purple-500" },
  { name: "Planters", revenue: 29200, pct: 12, color: "bg-orange-400" },
  { name: "Sacred Crafts", revenue: 14700, pct: 6, color: "bg-yellow-500" },
  { name: "Decorative", revenue: 4900, pct: 2, color: "bg-gray-400" },
];

const trafficSources = [
  { source: "Organic Search", sessions: 4820, conversion: "3.2%", color: "bg-[#01A401]" },
  { source: "Direct", sessions: 2140, conversion: "4.8%", color: "bg-blue-500" },
  { source: "Social Media", sessions: 1680, conversion: "2.1%", color: "bg-pink-500" },
  { source: "Referral", sessions: 890, conversion: "5.6%", color: "bg-purple-500" },
  { source: "Email", sessions: 460, conversion: "7.2%", color: "bg-orange-400" },
];

const maxSessions = Math.max(...trafficSources.map(t => t.sessions));

const kpis = [
  { label: "Total Revenue", value: "₹2,45,800", change: "+18.2%", up: true },
  { label: "Avg Order Value", value: "₹1,914", change: "+5.4%", up: true },
  { label: "Conversion Rate", value: "3.8%", change: "+0.6pp", up: true },
  { label: "Return Rate", value: "4.2%", change: "-1.1pp", up: false },
];

type Period = "7d" | "30d" | "90d" | "1y";

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<Period>("30d");

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics</h1>
          <p className="text-sm text-gray-500 mt-1">Performance overview for your store</p>
        </div>
        {/* Period Selector */}
        <div className="flex gap-1 bg-gray-100 p-1 rounded-xl">
          {(["7d", "30d", "90d", "1y"] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-all", period === p ? "bg-white shadow-sm text-gray-900" : "text-gray-500 hover:text-gray-700")}
            >
              {p === "7d" ? "7 Days" : p === "30d" ? "30 Days" : p === "90d" ? "90 Days" : "1 Year"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map(kpi => (
          <div key={kpi.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-500">{kpi.label}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{kpi.value}</p>
            <p className={cn("text-xs font-medium mt-1", kpi.up ? "text-green-600" : "text-red-500")}>
              {kpi.change} vs prev. period
            </p>
          </div>
        ))}
      </div>

      {/* Revenue Bar Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trend</h2>
            <p className="text-sm text-gray-400">Monthly revenue & orders</p>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-400">
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#01A401] inline-block" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-blue-200 inline-block" />Orders</span>
          </div>
        </div>
        {/* Chart area */}
        <div className="flex items-end gap-4 h-52">
          {monthlyRevenue.map((d, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
              <div className="w-full flex items-end gap-1 h-40">
                {/* Revenue bar */}
                <div
                  className="flex-1 rounded-t-lg bg-[#01A401] transition-all duration-500"
                  style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                  title={`₹${d.revenue.toLocaleString()}`}
                />
                {/* Orders bar */}
                <div
                  className="flex-1 rounded-t-lg bg-blue-200 transition-all duration-500"
                  style={{ height: `${(d.orders / 168) * 100}%` }}
                  title={`${d.orders} orders`}
                />
              </div>
              <span className="text-xs text-gray-400">{d.month}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Revenue by Category</h2>
          <div className="space-y-4">
            {categoryBreakdown.map(cat => (
              <div key={cat.name}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{cat.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400">₹{(cat.revenue / 1000).toFixed(0)}k</span>
                    <span className="text-sm font-semibold text-gray-900 w-8 text-right">{cat.pct}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={cn("h-2 rounded-full transition-all duration-700", cat.color)}
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-5">Traffic Sources</h2>
          <div className="space-y-4">
            {trafficSources.map(source => (
              <div key={source.source}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-medium text-gray-700">{source.source}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-green-600 font-medium">{source.conversion}</span>
                    <span className="text-sm text-gray-500 w-14 text-right">{source.sessions.toLocaleString()}</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className={cn("h-2 rounded-full transition-all duration-700", source.color)}
                    style={{ width: `${(source.sessions / maxSessions) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 mt-4">* Conversion = orders / sessions</p>
        </div>
      </div>

      {/* Top 5 products table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Top Performing Products</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Units Sold</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Avg Rating</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {[
              { name: "Cooking Handi", units: 203, revenue: 284200, rating: 4.8 },
              { name: "Water Storage Pot", units: 178, revenue: 391600, rating: 4.9 },
              { name: "Terracotta Vase", units: 156, revenue: 148200, rating: 4.9 },
              { name: "Classic Mud Pot", units: 124, revenue: 148800, rating: 4.8 },
              { name: "Herb Planter Set", units: 95, revenue: 152000, rating: 4.7 },
            ].map((p, i) => (
              <tr key={p.name} className="hover:bg-gray-50/80">
                <td className="px-6 py-3 font-medium text-gray-900">
                  <span className="text-gray-400 mr-3 text-xs">#{i + 1}</span>{p.name}
                </td>
                <td className="px-4 py-3 text-right text-gray-700">{p.units}</td>
                <td className="px-4 py-3 text-right font-semibold text-gray-900">₹{(p.revenue / 1000).toFixed(0)}k</td>
                <td className="px-6 py-3 text-right">
                  <span className="inline-flex items-center gap-1 text-yellow-500 font-medium">
                    ★ {p.rating}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
