'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | null>(null);

// Demo defaults – in production this would be empty and populated from the backend/localStorage
const defaultItems: CartItem[] = [
  { id: "1", title: "Classic Mud Pot", price: 1200, quantity: 2, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png", category: "Water Pots" },
  { id: "2", title: "Earthen Cooker", price: 1800, quantity: 1, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png", category: "Cookware" },
  { id: "3", title: "Terracotta Vase", price: 950, quantity: 1, image: "/images/vase.png", category: "Garden Decors" },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(defaultItems);
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addItem = useCallback((newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id);
      if (existing) {
        return prev.map(i => i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, delta: number) => {
    setItems(prev =>
      prev.map(i => i.id === id ? { ...i, quantity: Math.max(1, i.quantity + delta) } : i)
    );
  }, []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, openCart, closeCart, addItem, removeItem, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
