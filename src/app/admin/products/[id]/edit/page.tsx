"use client";

import { useState, use } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const categories = ["Water Pots", "Cookware", "Garden Decors", "Sacred Crafts", "Planters", "Decorative"];

const productsData: Record<string, {
  name: string; category: string; price: string; originalPrice: string;
  stock: string; description: string; material: string; weight: string;
  dimensions: string; status: string; image: string;
}> = {
  "1": { name: "Classic Mud Pot", category: "Water Pots", price: "1200", originalPrice: "1500", stock: "45", description: "A timeless classic, this handcrafted mud pot is made by skilled artisans using traditional techniques.", material: "Natural clay / terracotta", weight: "1.2 kg", dimensions: "Height: 30cm, Diameter: 25cm", status: "active", image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png" },
  "2": { name: "Earthen Cooker", category: "Cookware", price: "1800", originalPrice: "2200", stock: "28", description: "Cook your favorite dishes the traditional way in this authentic earthen cooker.", material: "Terracotta clay", weight: "1.5 kg", dimensions: "Height: 20cm, Diameter: 22cm", status: "active", image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png" },
  "3": { name: "Terracotta Vase", category: "Garden Decors", price: "950", originalPrice: "1200", stock: "62", description: "Elevate your home décor with this elegant terracotta vase.", material: "Terracotta", weight: "0.8 kg", dimensions: "Height: 35cm, Diameter: 15cm", status: "active", image: "/images/vase.png" },
};

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

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const initial = productsData[id] ?? productsData["1"];
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState<Partial<typeof initial>>({});
  const [saved, setSaved] = useState(false);

  const set = (field: keyof typeof initial) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const validate = () => {
    const errs: Partial<typeof initial> = {};
    if (!form.name.trim()) errs.name = "Product name is required";
    if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) errs.price = "Valid price required";
    if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) errs.stock = "Valid stock quantity required";
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSaved(true);
    setTimeout(() => router.push("/admin/products"), 1200);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Product</h1>
          <p className="text-sm text-gray-500 mt-0.5">Update product details for <strong>{initial.name}</strong></p>
        </div>
      </div>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 flex items-center gap-3 text-green-700 text-sm font-medium">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Changes saved! Redirecting…
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Basic Information</h2>
              <Field label="Product Name *" error={errors.name}>
                <input type="text" value={form.name} onChange={set("name")} className={inputCls(!!errors.name)} />
              </Field>
              <Field label="Description">
                <textarea value={form.description} onChange={set("description")} rows={4} className={cn(inputCls(false), "resize-none")} />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Category">
                  <select value={form.category} onChange={set("category")} className={inputCls(false)}>
                    {categories.map(c => <option key={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Status">
                  <select value={form.status} onChange={set("status")} className={inputCls(false)}>
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                    <option value="out_of_stock">Out of Stock</option>
                  </select>
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Pricing & Inventory</h2>
              <div className="grid grid-cols-3 gap-4">
                <Field label="Selling Price (₹) *" error={errors.price}>
                  <input type="number" value={form.price} onChange={set("price")} min="0" className={inputCls(!!errors.price)} />
                </Field>
                <Field label="Original Price (₹)">
                  <input type="number" value={form.originalPrice} onChange={set("originalPrice")} min="0" className={inputCls(false)} />
                </Field>
                <Field label="Stock Qty *" error={errors.stock}>
                  <input type="number" value={form.stock} onChange={set("stock")} min="0" className={inputCls(!!errors.stock)} />
                </Field>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="text-base font-semibold text-gray-900">Specifications</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Field label="Material">
                  <input type="text" value={form.material} onChange={set("material")} className={inputCls(false)} />
                </Field>
                <Field label="Weight">
                  <input type="text" value={form.weight} onChange={set("weight")} className={inputCls(false)} />
                </Field>
                <Field label="Dimensions">
                  <input type="text" value={form.dimensions} onChange={set("dimensions")} className={inputCls(false)} />
                </Field>
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
              <h2 className="text-base font-semibold text-gray-900">Product Image</h2>
              <div className="relative h-48 rounded-xl overflow-hidden bg-gray-100">
                <Image src={form.image} alt={form.name} fill sizes="(max-width: 1024px) 100vw, 33vw" className="object-cover" />
              </div>
              <button type="button" className="w-full py-2 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Change Image
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
              <h2 className="text-base font-semibold text-gray-900">Actions</h2>
              <button type="submit" className="w-full bg-[#01A401] text-white py-3 rounded-xl font-semibold hover:bg-[#01A401]/90 transition-colors shadow-sm">
                Save Changes
              </button>
              <Link href="/admin/products" className="w-full border border-gray-200 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
