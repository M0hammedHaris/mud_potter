"use client";

import { useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const ordersData: Record<string, {
  id: string; customer: string; email: string; phone: string;
  address: string; city: string; state: string; pincode: string;
  items: { name: string; qty: number; price: number; image: string }[];
  subtotal: number; shipping: number; discount: number; total: number;
  status: string; paymentMethod: string; date: string; notes: string;
}> = {
  "ORD-1042": {
    id: "ORD-1042", customer: "Priya Sharma", email: "priya@example.com", phone: "9876543210",
    address: "12 Green Park, MG Road", city: "Bangalore", state: "Karnataka", pincode: "560001",
    items: [
      { name: "Classic Mud Pot", qty: 2, price: 1200, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png" },
    ],
    subtotal: 2400, shipping: 0, discount: 0, total: 2400,
    status: "delivered", paymentMethod: "UPI", date: "Mar 5, 2026", notes: "",
  },
  "ORD-1041": {
    id: "ORD-1041", customer: "Rajesh Kumar", email: "rajesh@example.com", phone: "9123456780",
    address: "45 Andheri West", city: "Mumbai", state: "Maharashtra", pincode: "400053",
    items: [
      { name: "Earthen Cooker", qty: 1, price: 1800, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png" },
    ],
    subtotal: 1800, shipping: 150, discount: 0, total: 1950,
    status: "shipped", paymentMethod: "Credit Card", date: "Mar 5, 2026", notes: "Please pack securely.",
  },
};

const allStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];

const statusConfig: Record<string, { label: string; classes: string }> = {
  delivered: { label: "Delivered", classes: "bg-green-100 text-green-700" },
  shipped: { label: "Shipped", classes: "bg-blue-100 text-blue-700" },
  processing: { label: "Processing", classes: "bg-yellow-100 text-yellow-700" },
  pending: { label: "Pending", classes: "bg-orange-100 text-orange-700" },
  cancelled: { label: "Cancelled", classes: "bg-red-100 text-red-700" },
};

export default function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const order = ordersData[id] ?? ordersData["ORD-1042"];
  const [status, setStatus] = useState(order.status);
  const [saved, setSaved] = useState(false);

  const handleStatusUpdate = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-4 justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{order.id}</h1>
            <p className="text-sm text-gray-500 mt-0.5">Placed on {order.date}</p>
          </div>
        </div>
        <span className={cn("px-3 py-1.5 rounded-full text-sm font-semibold", statusConfig[status].classes)}>
          {statusConfig[status].label}
        </span>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Order status updated to <strong>{statusConfig[status].label}</strong>
        </div>
      )}

      {/* Order Timeline */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <h2 className="text-base font-semibold text-gray-900 mb-4">Order Status</h2>
        <div className="flex items-center gap-0">
          {allStatuses.filter(s => s !== "cancelled").map((s, i, arr) => {
            const stepIndex = arr.indexOf(status === "cancelled" ? "pending" : status);
            const done = i <= stepIndex && status !== "cancelled";
            const isCancelled = status === "cancelled";
            return (
              <div key={s} className="flex items-center flex-1 last:flex-none">
                <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 border-2",
                  isCancelled ? "border-gray-200 bg-white text-gray-300"
                    : done ? "border-[#01A401] bg-[#01A401] text-white" : "border-gray-200 bg-white text-gray-400"
                )}>
                  {done && !isCancelled ? "✓" : i + 1}
                </div>
                <div className="flex-1 mx-1 last:hidden">
                  <div className={cn("h-0.5", done && !isCancelled && i < allStatuses.filter(x => x !== "cancelled").indexOf(status) ? "bg-[#01A401]" : "bg-gray-200")} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex mt-2">
          {allStatuses.filter(s => s !== "cancelled").map(s => (
            <div key={s} className="flex-1 text-center text-xs text-gray-400 capitalize last:flex-none last:text-left">
              {s}
            </div>
          ))}
        </div>
        {status === "cancelled" && (
          <p className="mt-3 text-sm text-red-600 font-medium">⚠ This order has been cancelled.</p>
        )}

        {/* Status update control */}
        <div className="mt-5 flex flex-wrap gap-3 items-center border-t border-gray-100 pt-5">
          <label className="text-sm font-medium text-gray-700">Update Status:</label>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="px-3 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
          >
            {allStatuses.map(s => (
              <option key={s} value={s} className="capitalize">{statusConfig[s].label}</option>
            ))}
          </select>
          <button
            onClick={handleStatusUpdate}
            className="bg-[#01A401] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#01A401]/90 transition-colors"
          >
            Save Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Items */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-base font-semibold text-gray-900">Order Items</h2>
            </div>
            <ul className="divide-y divide-gray-50">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-center gap-4 px-6 py-4">
                  <div className="w-14 h-14 rounded-xl overflow-hidden relative bg-gray-100 flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-400">Qty: {item.qty} × ₹{item.price.toLocaleString()}</p>
                  </div>
                  <p className="font-semibold text-gray-900 flex-shrink-0">₹{(item.qty * item.price).toLocaleString()}</p>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 border-t border-gray-100 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>₹{order.subtotal.toLocaleString()}</span></div>
              {order.discount > 0 && <div className="flex justify-between text-green-600"><span>Discount</span><span>-₹{order.discount}</span></div>}
              <div className="flex justify-between text-gray-500"><span>Shipping</span><span>{order.shipping === 0 ? "Free" : `₹${order.shipping}`}</span></div>
              <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2">
                <span>Total</span><span>₹{order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-yellow-800 mb-1">Customer Note</h3>
              <p className="text-sm text-yellow-700">{order.notes}</p>
            </div>
          )}
        </div>

        {/* Customer + Shipping */}
        <div className="space-y-5">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-4">Customer</h2>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#01A401]/20 flex items-center justify-center text-[#01A401] font-bold text-sm">
                {order.customer.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-900 text-sm">{order.customer}</p>
                <p className="text-xs text-gray-400">{order.email}</p>
              </div>
            </div>
            <div className="text-sm space-y-1.5 text-gray-600">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                {order.phone}
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                {order.email}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Shipping Address</h2>
            <div className="text-sm text-gray-600 space-y-0.5">
              <p className="font-medium text-gray-800">{order.customer}</p>
              <p>{order.address}</p>
              <p>{order.city}, {order.state} {order.pincode}</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="text-base font-semibold text-gray-900 mb-3">Payment</h2>
            <div className="text-sm text-gray-600 space-y-1">
              <div className="flex justify-between"><span>Method</span><span className="font-medium text-gray-900">{order.paymentMethod}</span></div>
              <div className="flex justify-between"><span>Amount Paid</span><span className="font-medium text-gray-900">₹{order.total.toLocaleString()}</span></div>
              <div className="flex justify-between"><span>Status</span>
                <span className="text-green-600 font-medium">{status === "cancelled" ? "Refunded" : "Paid"}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
