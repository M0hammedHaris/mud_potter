"use client";

import React, { useState, useEffect } from 'react';

const CursorArrow: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', updateMousePosition);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
        };
    }, []);

    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            style={{
                position: 'fixed',
                left: `${position.x + 12}px`,  
                top: `${position.y + 12}px`,
                zIndex: 9999,
                pointerEvents: 'none',
                transition: 'transform 0.05s ease-out',
            }}
            fill="black"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M0 0 L0 16 L4.5 12.5 L7 18 L9 17 L6.5 11.5 L12 11.5 L0 0" />
        </svg>
    );
};

export default CursorArrow;
