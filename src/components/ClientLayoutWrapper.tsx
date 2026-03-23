'use client';

import React, { useState, useEffect } from 'react';
import ScriptLoader from "@/components/script-loader";
import CursorArrow from "@/components/CursorArrow";
import { CartProvider } from "@/context/CartContext";
import { MiniCart } from "@/components/MiniCart";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
  bodyClassName: string;
}

const ClientLayoutWrapper: React.FC<ClientLayoutWrapperProps> = ({ children, bodyClassName }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <body className={bodyClassName}>
      <CartProvider>
        <ScriptLoader />
        {isClient && <CursorArrow />}
        <MiniCart />
        {children}
      </CartProvider>
    </body>
  );
};

export default ClientLayoutWrapper;
