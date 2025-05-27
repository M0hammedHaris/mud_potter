'use client';

import React, { useState, useEffect } from 'react';
import ScriptLoader from "@/components/script-loader";
import CursorArrow from "@/components/CursorArrow";

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
      <ScriptLoader />
      {isClient && <CursorArrow />}
      {children}
    </body>
  );
};

export default ClientLayoutWrapper;
