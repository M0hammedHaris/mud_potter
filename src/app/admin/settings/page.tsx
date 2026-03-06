"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

type Section = "general" | "shipping" | "payment" | "notifications" | "account";

const sections: { key: Section; label: string; icon: React.ReactNode }[] = [
  {
    key: "general", label: "General", icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )
  },
  {
    key: "shipping", label: "Shipping", icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
    )
  },
  {
    key: "payment", label: "Payment", icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
    )
  },
  {
    key: "notifications", label: "Notifications", icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
    )
  },
  {
    key: "account", label: "Account", icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
    )
  },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={cn("relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#01A401]/30", enabled ? "bg-[#01A401]" : "bg-gray-200")}
    >
      <span className={cn("inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform", enabled ? "translate-x-6" : "translate-x-1")} />
    </button>
  );
}

function inputCls() {
  return "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30 focus:border-[#01A401] transition-colors";
}

export default function AdminSettingsPage() {
  const [activeSection, setActiveSection] = useState<Section>("general");
  const [saved, setSaved] = useState(false);

  // General settings state
  const [storeName, setStoreName] = useState("Mud Potter");
  const [storeEmail, setStoreEmail] = useState("info@mudpotter.com");
  const [storePhone, setStorePhone] = useState("+91 98765 43210");
  const [storeAddress, setStoreAddress] = useState("123 Pottery Lane, Artisan District, Bangalore, Karnataka 560001");
  const [currency, setCurrency] = useState("INR");
  const [timezone, setTimezone] = useState("Asia/Kolkata");

  // Shipping settings state
  const [freeShippingThreshold, setFreeShippingThreshold] = useState("2000");
  const [standardShippingRate, setStandardShippingRate] = useState("150");
  const [expressEnabled, setExpressEnabled] = useState(true);
  const [expressRate, setExpressRate] = useState("350");
  const [codEnabled, setCodEnabled] = useState(true);

  // Payment methods state
  const [upiEnabled, setUpiEnabled] = useState(true);
  const [cardEnabled, setCardEnabled] = useState(true);
  const [netbankingEnabled, setNetbankingEnabled] = useState(false);

  // Notification toggles state
  const [notifs, setNotifs] = useState({
    newOrder: true,
    orderShipped: true,
    orderDelivered: false,
    lowStock: true,
    newCustomer: false,
    reviewSubmitted: true,
  });

  // Account state
  const [adminName, setAdminName] = useState("Admin User");
  const [adminEmail, setAdminEmail] = useState("admin@mudpotter.com");

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your store configuration</p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Settings saved successfully!
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar tabs */}
        <nav className="lg:w-48 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible bg-white rounded-2xl border border-gray-100 shadow-sm p-2 h-fit flex-shrink-0">
          {sections.map(s => (
            <button
              key={s.key}
              onClick={() => setActiveSection(s.key)}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all whitespace-nowrap",
                activeSection === s.key ? "bg-[#01A401]/10 text-[#01A401]" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </nav>

        {/* Content Panel */}
        <form onSubmit={handleSave} className="flex-1 space-y-5">
          {activeSection === "general" && (
            <>
              <SettingsCard title="Store Information">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Name</label>
                    <input value={storeName} onChange={e => setStoreName(e.target.value)} className={inputCls()} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Contact Email</label>
                    <input type="email" value={storeEmail} onChange={e => setStoreEmail(e.target.value)} className={inputCls()} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input type="tel" value={storePhone} onChange={e => setStorePhone(e.target.value)} className={inputCls()} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Currency</label>
                    <select value={currency} onChange={e => setCurrency(e.target.value)} className={inputCls()}>
                      <option value="INR">INR – Indian Rupee (₹)</option>
                      <option value="USD">USD – US Dollar ($)</option>
                      <option value="EUR">EUR – Euro (€)</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Store Address</label>
                    <textarea value={storeAddress} onChange={e => setStoreAddress(e.target.value)} rows={2} className={cn(inputCls(), "resize-none")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Timezone</label>
                    <select value={timezone} onChange={e => setTimezone(e.target.value)} className={inputCls()}>
                      <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">America/New_York (EST)</option>
                    </select>
                  </div>
                </div>
              </SettingsCard>
            </>
          )}

          {activeSection === "shipping" && (
            <SettingsCard title="Shipping Configuration">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Free Shipping Above (₹)</label>
                    <input type="number" value={freeShippingThreshold} onChange={e => setFreeShippingThreshold(e.target.value)} min="0" className={inputCls()} />
                    <p className="text-xs text-gray-400 mt-1">Orders above this amount get free shipping</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Standard Shipping Rate (₹)</label>
                    <input type="number" value={standardShippingRate} onChange={e => setStandardShippingRate(e.target.value)} min="0" className={inputCls()} />
                  </div>
                </div>
                <hr className="border-gray-100" />
                <ToggleRow
                  label="Express Shipping"
                  description="Offer faster delivery at a premium"
                  enabled={expressEnabled}
                  onToggle={() => setExpressEnabled(e => !e)}
                />
                {expressEnabled && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Express Shipping Rate (₹)</label>
                    <input type="number" value={expressRate} onChange={e => setExpressRate(e.target.value)} min="0" className={cn(inputCls(), "max-w-[200px]")} />
                  </div>
                )}
                <hr className="border-gray-100" />
                <ToggleRow
                  label="Cash on Delivery"
                  description="Allow customers to pay upon delivery"
                  enabled={codEnabled}
                  onToggle={() => setCodEnabled(e => !e)}
                />
              </div>
            </SettingsCard>
          )}

          {activeSection === "payment" && (
            <SettingsCard title="Payment Methods">
              <div className="space-y-4">
                <ToggleRow label="UPI Payments" description="Accept Google Pay, PhonePe, Paytm, BHIM UPI" enabled={upiEnabled} onToggle={() => setUpiEnabled(e => !e)} />
                <hr className="border-gray-100" />
                <ToggleRow label="Credit / Debit Card" description="Accept Visa, Mastercard, RuPay via payment gateway" enabled={cardEnabled} onToggle={() => setCardEnabled(e => !e)} />
                <hr className="border-gray-100" />
                <ToggleRow label="Net Banking" description="Allow direct bank transfers" enabled={netbankingEnabled} onToggle={() => setNetbankingEnabled(e => !e)} />
              </div>
            </SettingsCard>
          )}

          {activeSection === "notifications" && (
            <SettingsCard title="Email Notifications">
              <div className="space-y-4">
                {[
                  { key: "newOrder" as const, label: "New Order", desc: "When a customer places a new order" },
                  { key: "orderShipped" as const, label: "Order Shipped", desc: "When an order is marked as shipped" },
                  { key: "orderDelivered" as const, label: "Order Delivered", desc: "When an order is marked as delivered" },
                  { key: "lowStock" as const, label: "Low Stock Alert", desc: "When a product stock falls below 10 units" },
                  { key: "newCustomer" as const, label: "New Customer", desc: "When a new customer registers" },
                  { key: "reviewSubmitted" as const, label: "Review Submitted", desc: "When a customer leaves a product review" },
                ].map(({ key, label, desc }, i, arr) => (
                  <div key={key}>
                    <ToggleRow label={label} description={desc} enabled={notifs[key]} onToggle={() => setNotifs(n => ({ ...n, [key]: !n[key] }))} />
                    {i < arr.length - 1 && <hr className="border-gray-100 mt-4" />}
                  </div>
                ))}
              </div>
            </SettingsCard>
          )}

          {activeSection === "account" && (
            <SettingsCard title="Admin Account">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input value={adminName} onChange={e => setAdminName(e.target.value)} className={inputCls()} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                  <input type="email" value={adminEmail} onChange={e => setAdminEmail(e.target.value)} className={inputCls()} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Current Password</label>
                  <input type="password" placeholder="••••••••" className={inputCls()} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">New Password</label>
                  <input type="password" placeholder="••••••••" className={inputCls()} />
                </div>
              </div>
            </SettingsCard>
          )}

          {/* Save button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-[#01A401] text-white px-6 py-2.5 rounded-xl font-medium hover:bg-[#01A401]/90 transition-colors shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function SettingsCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h2 className="text-base font-semibold text-gray-900 mb-5">{title}</h2>
      {children}
    </div>
  );
}

function ToggleRow({ label, description, enabled, onToggle }: { label: string; description: string; enabled: boolean; onToggle: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-gray-900">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onToggle} />
    </div>
  );
}
