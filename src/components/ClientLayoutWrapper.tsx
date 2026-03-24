'use client';

import React from 'react';
import ScriptLoader from "@/components/script-loader";
import { CartProvider } from "@/context/CartContext";
import { MiniCart } from "@/components/MiniCart";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  bodyClassName: string;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children, bodyClassName }) => {
  return (
    <body className={bodyClassName}>
      <CartProvider>
        <ScriptLoader />
        <MiniCart />
        {children}
      </CartProvider>
    </body>
  );
};

export default ClientLayoutWrapper;
