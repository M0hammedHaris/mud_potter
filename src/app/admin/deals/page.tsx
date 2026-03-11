"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  linkLabel: string;
  expiresAt: string;
}

function inputCls() {
  return "w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30 focus:border-[#01A401] transition-colors";
}

export default function AdminDealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<Deal>>({});

  useEffect(() => {
    fetch("/api/deals")
      .then((r) => r.json())
      .then((data: Deal[]) => {
        setDeals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const startEdit = (deal: Deal) => {
    setEditingId(deal.id);
    setEditForm({ ...deal });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const saveEdit = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const res = await fetch(`/api/deals/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        const updated: Deal = await res.json();
        setDeals((prev) => prev.map((d) => (d.id === editingId ? updated : d)));
        setEditingId(null);
        setEditForm({});
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      }
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof Deal, value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Deals of the Month</h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage the promotional deals shown on the landing page
        </p>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Deal saved successfully!
        </div>
      )}

      {loading ? (
        <div className="text-center py-16 text-gray-400">Loading deals…</div>
      ) : (
        <div className="space-y-6">
          {deals.map((deal) => (
            <div
              key={deal.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
            >
              {editingId === deal.id ? (
                /* Edit form */
                <div className="p-6 space-y-4">
                  <h2 className="text-base font-semibold text-gray-900 mb-2">
                    Editing: {deal.title}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Title
                      </label>
                      <input
                        value={editForm.title ?? ""}
                        onChange={(e) => handleChange("title", e.target.value)}
                        className={inputCls()}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Expiry Date
                      </label>
                      <input
                        type="datetime-local"
                        value={
                          editForm.expiresAt
                            ? new Date(editForm.expiresAt).toISOString().slice(0, 16)
                            : ""
                        }
                        onChange={(e) =>
                          handleChange("expiresAt", new Date(e.target.value).toISOString())
                        }
                        className={inputCls()}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Description
                      </label>
                      <textarea
                        rows={3}
                        value={editForm.description ?? ""}
                        onChange={(e) => handleChange("description", e.target.value)}
                        className={cn(inputCls(), "resize-none")}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Image Path
                      </label>
                      <input
                        value={editForm.image ?? ""}
                        onChange={(e) => handleChange("image", e.target.value)}
                        className={inputCls()}
                        placeholder="/images/my-image.png"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Button Label
                      </label>
                      <input
                        value={editForm.linkLabel ?? ""}
                        onChange={(e) => handleChange("linkLabel", e.target.value)}
                        className={inputCls()}
                        placeholder="Shop Now"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Link URL (where &quot;Shop Now&quot; goes)
                      </label>
                      <input
                        value={editForm.linkUrl ?? ""}
                        onChange={(e) => handleChange("linkUrl", e.target.value)}
                        className={inputCls()}
                        placeholder="/shop?category=Garden+Decors"
                      />
                      <p className="text-xs text-gray-400 mt-1">
                        Examples: <code>/shop</code>, <code>/shop?category=Cookware</code>,{" "}
                        <code>/products/6</code>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={saveEdit}
                      disabled={saving}
                      className="bg-[#01A401] text-white px-5 py-2 rounded-xl text-sm font-medium hover:bg-[#01A401]/90 transition-colors disabled:opacity-60"
                    >
                      {saving ? "Saving…" : "Save Changes"}
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="px-5 py-2 rounded-xl text-sm font-medium text-gray-600 border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Preview card */
                <div className="flex flex-col sm:flex-row gap-0">
                  <div className="relative w-full sm:w-48 h-48 flex-shrink-0 bg-gray-100">
                    <Image
                      src={deal.image}
                      alt={deal.title}
                      fill
                      sizes="(max-width: 640px) 100vw, 192px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 p-5 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{deal.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                        {deal.description}
                      </p>
                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                        <span>
                          <span className="font-medium text-gray-700">Link:</span>{" "}
                          <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-600">
                            {deal.linkUrl}
                          </code>
                        </span>
                        <span>
                          <span className="font-medium text-gray-700">Button:</span>{" "}
                          {deal.linkLabel}
                        </span>
                        <span>
                          <span className="font-medium text-gray-700">Expires:</span>{" "}
                          {new Date(deal.expiresAt).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => startEdit(deal)}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-700 border border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                        Edit Deal
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
