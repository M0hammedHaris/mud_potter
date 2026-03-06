"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

const defaultCartItems: CartItem[] = [
  { id: "1", title: "Classic Mud Pot", price: 1200, quantity: 2, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png", category: "Water Pots" },
  { id: "2", title: "Earthen Cooker", price: 1800, quantity: 1, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png", category: "Cookware" },
  { id: "3", title: "Terracotta Vase", price: 950, quantity: 1, image: "/images/vase.png", category: "Garden Decors" },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(defaultCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal - discount + shipping;

  const applyPromo = () => {
    if (promoCode.toUpperCase() === "MUDPOT10") {
      setPromoApplied(true);
      setPromoError(false);
    } else {
      setPromoError(true);
      setPromoApplied(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 py-8 max-w-7xl pt-28">
        <div className={cn("mb-8", isVisible ? "animate-fade-in" : "opacity-0")}>
          <h1 className="text-4xl md:text-5xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">Shopping Cart</h1>
          <p className="text-[var(--muted-foreground)] mt-2">{cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in your cart</p>
        </div>

        {cartItems.length === 0 ? (
          <div className={cn("text-center py-20", isVisible ? "animate-fade-in" : "opacity-0")}>
            <div className="w-24 h-24 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">Your cart is empty</h2>
            <p className="text-[var(--muted-foreground)] mb-8">Looks like you haven&apos;t added any items yet.</p>
            <Link href="/shop" className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={item.id}
                  className={cn("bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[var(--border)] flex gap-4 md:gap-6", isVisible ? "animate-fade-in" : "opacity-0")}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.title} fill sizes="(max-width: 768px) 96px, 128px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <span className="text-xs font-medium text-[var(--primary)] block mb-1">{item.category}</span>
                        <h3 className="text-lg font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">{item.title}</h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0 p-1"
                        aria-label="Remove item"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-xl font-bold text-[var(--foreground)] mt-2">₹{item.price.toLocaleString()}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden bg-[var(--background)]">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-[var(--accent)] transition-colors text-lg font-medium">−</button>
                        <span className="px-3 py-1 font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-[var(--accent)] transition-colors text-lg font-medium">+</button>
                      </div>
                      <span className="text-sm text-[var(--muted-foreground)]">
                        Subtotal: <strong className="text-[var(--foreground)]">₹{(item.price * item.quantity).toLocaleString()}</strong>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] h-fit lg:sticky lg:top-28", isVisible ? "animate-fade-in delay-200" : "opacity-0")}>
              <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span className="font-medium text-[var(--foreground)]">₹{subtotal.toLocaleString()}</span>
                </div>
                {promoApplied && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Promo discount (MUDPOT10)</span>
                    <span>-₹{discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Shipping</span>
                  <span className="font-medium text-[var(--foreground)]">
                    {shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}
                  </span>
                </div>
                {shipping === 0 && <p className="text-xs text-green-600">🎉 You qualify for free shipping!</p>}
                {shipping > 0 && <p className="text-xs text-[var(--muted-foreground)]">Add ₹{(2000 - subtotal).toLocaleString()} more for free shipping</p>}
              </div>

              <div className="border-t border-[var(--border)] pt-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-[var(--foreground)]">Total</span>
                  <span className="text-xl font-bold text-[var(--foreground)]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Promo Code</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => { setPromoCode(e.target.value); setPromoError(false); }}
                    placeholder="Enter code (MUDPOT10)"
                    className="flex-1 px-3 py-2.5 rounded-xl border border-[var(--border)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
                  />
                  <button
                    onClick={applyPromo}
                    disabled={promoApplied}
                    className="px-4 py-2.5 bg-[var(--primary)] text-white rounded-xl text-sm font-medium hover:bg-[var(--primary)]/90 transition-colors disabled:opacity-50 whitespace-nowrap"
                  >
                    {promoApplied ? "Applied" : "Apply"}
                  </button>
                </div>
                {promoError && <p className="text-red-500 text-xs mt-1">Invalid promo code. Try MUDPOT10.</p>}
                {promoApplied && <p className="text-green-600 text-xs mt-1">✓ 10% discount applied!</p>}
              </div>

              <Link
                href="/checkout"
                className="w-full bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold text-center block hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg"
              >
                Proceed to Checkout →
              </Link>

              <Link href="/shop" className="w-full text-center block mt-4 text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                ← Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
