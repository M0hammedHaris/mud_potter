"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const initialProducts = [
  { id: "1", name: "Classic Mud Pot", category: "Water Pots", price: 1200, stock: 45, status: "active", image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png", sales: 124 },
  { id: "2", name: "Earthen Cooker", category: "Cookware", price: 1800, stock: 28, status: "active", image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png", sales: 89 },
  { id: "3", name: "Terracotta Vase", category: "Garden Decors", price: 950, stock: 62, status: "active", image: "/images/vase.png", sales: 156 },
  { id: "4", name: "Sacred Lamp", category: "Sacred Crafts", price: 650, stock: 0, status: "out_of_stock", image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png", sales: 72 },
  { id: "5", name: "Garden Planter", category: "Planters", price: 1100, stock: 19, status: "active", image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png", sales: 48 },
  { id: "6", name: "Cooking Handi", category: "Cookware", price: 1400, stock: 7, status: "low_stock", image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png", sales: 203 },
  { id: "7", name: "Water Storage Pot", category: "Water Pots", price: 2200, stock: 33, status: "active", image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png", sales: 178 },
  { id: "8", name: "Decorative Pot", category: "Garden Decors", price: 800, stock: 0, status: "draft", image: "/images/ceramic-pottery-tools-still-life.png", sales: 61 },
  { id: "9", name: "Herb Planter Set", category: "Planters", price: 1600, stock: 14, status: "active", image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png", sales: 95 },
];

const statusConfig: Record<string, { label: string; classes: string }> = {
  active: { label: "Active", classes: "bg-green-100 text-green-700" },
  low_stock: { label: "Low Stock", classes: "bg-yellow-100 text-yellow-700" },
  out_of_stock: { label: "Out of Stock", classes: "bg-red-100 text-red-700" },
  draft: { label: "Draft", classes: "bg-gray-100 text-gray-600" },
};

const categories = ["All", "Water Pots", "Cookware", "Garden Decors", "Sacred Crafts", "Planters"];

export default function AdminProductsPage() {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = products
    .filter(p => categoryFilter === "All" || p.category === categoryFilter)
    .filter(p => statusFilter === "All" || p.status === statusFilter)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase()));

  const toggleSelect = (id: string) =>
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const toggleSelectAll = () =>
    setSelectedIds(selectedIds.length === filtered.length ? [] : filtered.map(p => p.id));

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    setDeleteConfirm(null);
    setSelectedIds(prev => prev.filter(x => x !== id));
  };

  const bulkDelete = () => {
    setProducts(prev => prev.filter(p => !selectedIds.includes(p.id)));
    setSelectedIds([]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6 max-w-screen-2xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} products in catalog</p>
        </div>
        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 bg-[#01A401] text-white px-5 py-2.5 rounded-xl font-medium hover:bg-[#01A401]/90 transition-colors shadow-sm"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Product
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-wrap gap-3">
        {/* Search */}
        <div className="relative flex-1 min-w-[180px]">
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30 focus:border-[#01A401]"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </div>
        {/* Category filter */}
        <select
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
        >
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        {/* Status filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#01A401]/30"
        >
          <option value="All">All Status</option>
          <option value="active">Active</option>
          <option value="low_stock">Low Stock</option>
          <option value="out_of_stock">Out of Stock</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      {/* Bulk actions */}
      {selectedIds.length > 0 && (
        <div className="bg-[#01A401]/10 border border-[#01A401]/30 rounded-xl px-4 py-3 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">{selectedIds.length} selected</span>
          <button onClick={bulkDelete} className="text-sm text-red-600 font-medium hover:underline">
            Delete selected
          </button>
          <button onClick={() => setSelectedIds([])} className="text-sm text-gray-500 hover:underline ml-auto">
            Clear selection
          </button>
        </div>
      )}

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-4 py-3 w-10">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-gray-300 text-[#01A401] focus:ring-[#01A401]"
                  />
                </th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell">Category</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">Stock</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell">Sales</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-12 text-gray-400">No products found</td>
                </tr>
              ) : (
                filtered.map(product => (
                  <tr key={product.id} className={cn("hover:bg-gray-50/80 transition-colors", selectedIds.includes(product.id) && "bg-green-50/50")}>
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded border-gray-300 text-[#01A401] focus:ring-[#01A401]"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg overflow-hidden relative flex-shrink-0 bg-gray-100">
                          <Image src={product.image} alt={product.name} fill sizes="40px" className="object-cover" />
                        </div>
                        <span className="font-medium text-gray-900">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-500 hidden sm:table-cell">{product.category}</td>
                    <td className="px-4 py-3 text-right font-medium text-gray-900">₹{product.price.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right hidden md:table-cell">
                      <span className={cn("font-medium", product.stock === 0 ? "text-red-500" : product.stock <= 10 ? "text-yellow-600" : "text-gray-700")}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-gray-500 hidden lg:table-cell">{product.sales}</td>
                    <td className="px-4 py-3">
                      <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", statusConfig[product.status].classes)}>
                        {statusConfig[product.status].label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 transition-colors"
                          title="Edit"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        {deleteConfirm === product.id ? (
                          <span className="flex items-center gap-1">
                            <button onClick={() => deleteProduct(product.id)} className="text-xs text-red-600 font-medium px-2 py-1 rounded hover:bg-red-50">Confirm</button>
                            <button onClick={() => setDeleteConfirm(null)} className="text-xs text-gray-500 px-2 py-1 rounded hover:bg-gray-100">Cancel</button>
                          </span>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(product.id)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination hint */}
        <div className="px-6 py-3 border-t border-gray-100 text-xs text-gray-400">
          Showing {filtered.length} of {products.length} products
        </div>
      </div>
    </div>
  );
}
