"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["Water Pots", "Cookware", "Garden Decors", "Sacred Crafts", "Planters", "Decorative"];

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  originalPrice: string;
  stock: string;
  description: string;
  material: string;
  weight: string;
  dimensions: string;
  status: string;
}

const empty: ProductFormData = {
  name: "", category: "Water Pots", price: "", originalPrice: "", stock: "",
  description: "", material: "", weight: "", dimensions: "", status: "active",
};

export default function NewProductPage() {
  const router = useRouter();
  const [form, setForm] = useState<ProductFormData>(empty);
  const [errors, setErrors] = useState<Partial<ProductFormData>>({});
  const [saved, setSaved] = useState(false);

  const set = (field: keyof ProductFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs: Partial<ProductFormData> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = "Valid price required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) errs.stock = "Valid stock quantity required";
    if (!form.description.trim()) errs.description = "Description is required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  const previewImage = "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png";

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add New Product</h1>
          <p className="text-sm text-gray-500 mt-0.5">Fill in the details below to add a product to your catalog</p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Product saved! Redirecting…
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: main details */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>
              <Field label="Product Name *" error={errors.name}>
                <input type="text" value={form.name} onChange={set("name")} placeholder="e.g. Classic Mud Pot"
                  className={inputCls(!!errors.name)} />
              </Field>
              <Field label="Description *" error={errors.description}>
                <textarea value={form.description} onChange={set("description")} rows={4}
                  placeholder="Describe the product, its craftsmanship, and uses…"
                  className={cn(inputCls(!!errors.description), "resize-none")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category *">
                  <select value={form.category} onChange={set("category")} className={inputCls(false)}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={set("status")} className={inputCls(false)}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </Field>
              </div>
            </div>

            {/* Pricing & Stock */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Selling Price (₹) *" error={errors.price}>
                  <input type="number" value={form.price} onChange={set("price")} placeholder="1200"
                    min="0" className={inputCls(!!errors.price)} />
                </Field>
                <Field label="Original Price (₹)">
                  <input type="number" value={form.originalPrice} onChange={set("originalPrice")} placeholder="1500"
                    min="0" className={inputCls(false)} />
                </Field>
                <Field label="Stock Qty *" error={errors.stock}>
                  <input type="number" value={form.stock} onChange={set("stock")} placeholder="50"
                    min="0" className={inputCls(!!errors.stock)} />
                </Field>
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Material">
                  <input type="text" value={form.material} onChange={set("material")} placeholder="Natural clay" className={inputCls(false)} />
                </Field>
                <Field label="Weight">
                  <input type="text" value={form.weight} onChange={set("weight")} placeholder="1.2 kg" className={inputCls(false)} />
                </Field>
                <Field label="Dimensions">
                  <input type="text" value={form.dimensions} onChange={set("dimensions")} placeholder="H: 30cm, D: 25cm" className={inputCls(false)} />
                </Field>
              </div>
            </div>
          </div>

          {/* Right: image + actions */}
          <div className="space-y-5">
            {/* Image Upload */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Product Image</h2>
              <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-200">
                <Image src={previewImage} alt="Preview" fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover opacity-50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500">
                  <svg className="w-8 h-8 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">Click to upload image</span>
                </div>
              </div>
              <button type="button" className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Browse Files
              </button>
            </div>

            {/* Publish card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <h2 className="text-base font-semibold text-gray-900">Publish</h2>
              <p className="text-sm text-gray-500">Save as draft or publish immediately.</p>
              <button
                type="submit"
                className="w-full bg-[#01A401] text-white py-3 rounded-xl font-semibold hover:bg-[#01A401]/90 transition-colors shadow-sm"
              >
                Save & Publish
              </button>
              <button
                type="button"
                onClick={() => { setForm(f => ({ ...f, status: "draft" })); handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
                className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Save as Draft
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return cn(
    "w-full px-3 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors",
    hasError
      ? "border-red-300 bg-red-50 focus:ring-red-200"
      : "border-gray-200 focus:ring-[#01A401]/30 focus:border-[#01A401]"
  );
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
