'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export function MiniCart() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } = useCart();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart();
    };
    if (isOpen) window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, closeCart]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slider panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-400 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">
              Your Cart
            </h2>
            <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
              {totalQty} item{totalQty !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto py-4 px-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-20 h-20 bg-[var(--accent)] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-[var(--primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-[var(--foreground)] mb-1">Your cart is empty</p>
              <p className="text-sm text-[var(--muted-foreground)] mb-6">Add some handcrafted pottery to get started!</p>
              <button
                onClick={closeCart}
                className="px-6 py-3 bg-[var(--primary)] text-white rounded-full font-semibold text-sm hover:bg-[var(--primary)]/90 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 bg-gray-50 rounded-xl p-3">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-1">
                    <div className="min-w-0">
                      <span className="text-xs text-[var(--primary)] font-medium block">{item.category}</span>
                      <h3 className="text-sm font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] truncate">{item.title}</h3>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      aria-label={`Remove ${item.title}`}
                      className="text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-base font-bold text-[var(--foreground)] mt-1">₹{item.price.toLocaleString()}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-full overflow-hidden bg-white">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="px-2.5 py-1 hover:bg-gray-100 transition-colors text-sm font-medium"
                        aria-label="Decrease quantity"
                      >−</button>
                      <span className="px-2.5 py-1 text-sm font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="px-2.5 py-1 hover:bg-gray-100 transition-colors text-sm font-medium"
                        aria-label="Increase quantity"
                      >+</button>
                    </div>
                    <span className="text-xs text-[var(--muted-foreground)]">
                      = ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-6 py-5 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-base font-semibold text-[var(--foreground)]">Subtotal</span>
              <span className="text-xl font-bold text-[var(--foreground)]">₹{subtotal.toLocaleString()}</span>
            </div>
            <p className="text-xs text-[var(--muted-foreground)]">Shipping & taxes calculated at checkout</p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="w-full bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold text-center block hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg text-sm"
            >
              Proceed to Checkout →
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-sm text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors"
            >
              ← Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
