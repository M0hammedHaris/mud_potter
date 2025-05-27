"use client"

import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import "./navigation.css";

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSearch, setActiveSearch] = useState(false);

    // Navigation items data
    const navItems = [
        { label: "Home", isActive: true },
        { label: "Shop", isActive: false },
        { label: "About", isActive: false }
    ];

    // Close menu when ESC key is pressed
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        
        // Clean up
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open - only runs on client
    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (isMobileMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            
            return () => {
                document.body.style.overflow = '';
            };
        }
    }, [isMobileMenuOpen]);

    // Fix for hydration: use useEffect to render client-only debugging elements
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <header className="absolute top-4 left-4 right-4 z-50">
            {/* Debug indicator - only rendered on client side to avoid hydration errors */}
            {isClient && process.env.NODE_ENV !== 'production' && (
                <div className="menu-debug">
                    Menu state: {isMobileMenuOpen ? 'Open' : 'Closed'}
                </div>
            )}
            <nav className="flex items-center justify-between px-6 py-4 md:px-16 rounded-t-[20px]">
                {/* Mobile menu toggle button */}
                <div className="md:hidden relative z-50">
                    <Button
                        variant="ghost"
                        className="rounded-full bg-white/30 backdrop-blur-sm p-3 transition-all hover:bg-white/40 hamburger-menu focus:outline-none focus:ring-2 focus:ring-white/50"
                        onClick={() => {
                            setIsMobileMenuOpen(!isMobileMenuOpen);
                            console.log("Hamburger clicked, menu state:", !isMobileMenuOpen);
                        }}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </Button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-4" style={{ width: "auto", height: "36px" }}>
                    {/* Navigation Items */}
                    {navItems.map((item, index) => (
                        <Button 
                            key={item.label}
                            variant="ghost" 
                            className={`flex justify-center items-center px-4 py-1 w-[90px] h-[36px] text-[16px] font-semibold transition-all ${
                                index === activeIndex 
                                ? "bg-secondary rounded-[18px] text-primary" 
                                : "bg-transparent text-white/80 hover:bg-white/30 hover:rounded-[18px]"
                            }`}
                            onClick={() => setActiveIndex(index)}
                        >
                            {item.label}
                        </Button>
                    ))}
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold text-white">LOGO</div>
                
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <div className={`flex items-center transition-all duration-500 ease-in-out ${
                            activeSearch 
                                ? "w-64 bg-white/20 backdrop-blur-sm rounded-full border border-white/30" 
                                : "w-10 h-10 bg-white/30 rounded-full"
                        }`}>
                            <Button 
                                variant="ghost" 
                                className="rounded-full backdrop-blur-sm hover:bg-white/10 p-3 flex-shrink-0"
                                onClick={() => setActiveSearch(!activeSearch)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </Button>
                            {activeSearch && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="flex-1 bg-transparent text-white placeholder-white/70 px-4 py-2 outline-none text-sm animate-fade-in"
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden bg-gray-200">
                        <Image 
                            src="/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Slide-in Menu */}
            <div 
                id="mobile-menu"
                className={`fixed top-0 left-0 h-full w-[280px] bg-black/90 backdrop-blur-lg ${isClient && isMobileMenuOpen ? 'slide-in' : '-translate-x-full'} md:hidden z-50 shadow-xl`}
            >
                {/* Close button at the top */}
                <div className="flex justify-end p-6">
                    <Button
                        variant="ghost"
                        className="rounded-full bg-white/20 backdrop-blur-sm p-2 hover:bg-white/30"
                        onClick={() => setIsMobileMenuOpen(false)}
                        aria-label="Close menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </Button>
                </div>
                
                {/* Navigation links */}
                <div className="flex flex-col items-center gap-6 p-4 mt-6">
                    {navItems.map((item, index) => (
                        <Button 
                            key={item.label}
                            variant="ghost" 
                            className={`flex justify-center items-center px-4 py-2 w-full h-[48px] rounded-[24px] text-[18px] font-semibold transition-all ${
                                index === activeIndex 
                                ? "bg-secondary text-primary" 
                                : "bg-white/20 text-white/80 hover:bg-white/30"
                            }`}
                            onClick={() => {
                                setActiveIndex(index);
                                // Close the menu when a navigation item is clicked
                                setIsMobileMenuOpen(false);
                            }}
                        >
                            {item.label}
                            <span className="ml-2 opacity-70">→</span>
                        </Button>
                    ))}
                </div>
                
                {/* Additional menu items or social links could go here */}
                <div className="absolute bottom-10 w-full flex justify-center space-x-4 px-4">
                    <Button 
                        variant="ghost"
                        className="rounded-full bg-white/20 p-3 hover:bg-white/30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                        </svg>
                    </Button>
                    <Button 
                        variant="ghost"
                        className="rounded-full bg-white/20 p-3 hover:bg-white/30"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                        </svg>
                    </Button>
                </div>
            </div>
            
            {/* Overlay for clicking outside to close the menu - only rendered on client */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isClient && isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-hidden="true"
            />
        </header>
    );
}
