"use client"

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import "./navigation.css";

const shopCategories = [
    { name: "Water Pots", icon: "🏺", description: "Keep water cool & fresh naturally", href: "/shop?category=Water%20Pots" },
    { name: "Cookware", icon: "🍲", description: "Traditional clay cooking vessels", href: "/shop?category=Cookware" },
    { name: "Garden Decors", icon: "🌿", description: "Handcrafted garden pottery pieces", href: "/shop?category=Garden%20Decors" },
    { name: "Sacred Crafts", icon: "🪔", description: "Spiritual & ceremonial pottery", href: "/shop?category=Sacred%20Crafts" },
    { name: "Planters", icon: "🌱", description: "Beautiful terracotta planters", href: "/shop?category=Planters" },
];

export function Navigation() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSearch, setActiveSearch] = useState(false);
    const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
    const [mobileShopExpanded, setMobileShopExpanded] = useState(false);
    const pathname = usePathname();
    const { openCart, totalItems } = useCart();
    const shopDropdownRef = useRef<HTMLDivElement>(null);

    // Pages that have a dark hero image behind the nav — white text works there.
    // All other pages have a light background and need dark-styled nav.
    const darkHeroPages = ['/', '/shop'];
    const isLightPage = !darkHeroPages.includes(pathname);

    // Navigation items rendered after the Shop dropdown
    const navItems = [
        { label: "About", href: "/about" },
    ];

    // Close menu when ESC key is pressed
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
                if (shopDropdownOpen) setShopDropdownOpen(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isMobileMenuOpen, shopDropdownOpen]);

    // Prevent body scroll when mobile menu is open - only runs on client
    useEffect(() => {
        if (typeof document !== 'undefined') {
            if (isMobileMenuOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
            return () => { document.body.style.overflow = ''; };
        }
    }, [isMobileMenuOpen]);

    // Fix for hydration: use useEffect to render client-only debugging elements
    const [isClient, setIsClient] = useState(false);
    useEffect(() => { setIsClient(true); }, []);

    const isShopActive = pathname === '/shop' || pathname.startsWith('/shop');

    return (
        <header className={cn(
            "absolute top-4 left-4 right-4 z-50",
            isLightPage && "rounded-2xl bg-white/95 backdrop-blur-sm shadow-md"
        )}>
            <nav className="flex items-center justify-between px-6 py-4 md:px-16 rounded-t-[20px]">
                {/* Mobile menu toggle button */}
                <div className="md:hidden relative z-50">
                    <Button
                        variant="ghost"
                        className={cn(
                            "rounded-full backdrop-blur-sm p-3 transition-all hamburger-menu focus:outline-none focus:ring-2",
                            isLightPage
                                ? "bg-[var(--accent)] hover:bg-[var(--accent)]/70 focus:ring-[var(--primary)]/30"
                                : "bg-white/30 hover:bg-white/40 focus:ring-white/50"
                        )}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-menu"
                        style={{ minHeight: '44px', minWidth: '44px' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={cn("w-6 h-6", isLightPage ? "text-[var(--foreground)]" : "text-white")}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </Button>
                </div>

                {/* Desktop navigation */}
                <div className="hidden md:flex items-center gap-2">
                    {/* Home */}
                    <Link
                        href="/"
                        className={cn(
                            "flex justify-center items-center px-4 py-1 h-[36px] text-[16px] font-semibold transition-all rounded-[18px]",
                            pathname === '/'
                                ? "bg-[var(--primary)] text-white"
                                : isLightPage
                                    ? "text-[var(--foreground)] hover:bg-[var(--accent)]"
                                    : "bg-transparent text-white/80 hover:bg-white/30"
                        )}
                    >
                        Home
                    </Link>

                    {/* Shop with dropdown */}
                    <div
                        ref={shopDropdownRef}
                        className="relative"
                        onMouseEnter={() => setShopDropdownOpen(true)}
                        onMouseLeave={() => setShopDropdownOpen(false)}
                    >
                        <Link
                            href="/shop"
                            className={cn(
                                "flex items-center gap-1 px-4 py-1 h-[36px] text-[16px] font-semibold transition-all rounded-[18px]",
                                isShopActive
                                    ? "bg-[var(--primary)] text-white"
                                    : isLightPage
                                        ? "text-[var(--foreground)] hover:bg-[var(--accent)]"
                                        : "bg-transparent text-white/80 hover:bg-white/30"
                            )}
                        >
                            Shop
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2.5}
                                stroke="currentColor"
                                className={cn("w-3.5 h-3.5 transition-transform duration-200", shopDropdownOpen && "rotate-180")}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </Link>

                        {/* Dropdown mega-menu */}
                        <div
                            className={cn(
                                "absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[200] transition-all duration-200 origin-top",
                                shopDropdownOpen
                                    ? "opacity-100 scale-y-100 translate-y-0 pointer-events-auto"
                                    : "opacity-0 scale-y-95 -translate-y-1 pointer-events-none"
                            )}
                        >
                            <div className="bg-[#fff9e5] rounded-2xl shadow-2xl border border-[var(--border)] p-6 w-[540px]">
                                <p className="text-[11px] font-bold text-[var(--muted-foreground)] uppercase tracking-[0.15em] mb-4">
                                    Shop by Category
                                </p>
                                <div className="grid grid-cols-2 gap-2 mb-5">
                                    {shopCategories.map(cat => (
                                        <Link
                                            key={cat.name}
                                            href={cat.href}
                                            onClick={() => setShopDropdownOpen(false)}
                                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--accent)] transition-colors duration-150 group"
                                        >
                                            <span className="text-2xl flex-shrink-0 mt-0.5">{cat.icon}</span>
                                            <div className="min-w-0">
                                                <p className="font-semibold text-sm text-[var(--foreground)] group-hover:text-[var(--primary)] transition-colors">
                                                    {cat.name}
                                                </p>
                                                <p className="text-xs text-[var(--muted-foreground)] leading-tight mt-0.5">
                                                    {cat.description}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link
                                    href="/shop"
                                    onClick={() => setShopDropdownOpen(false)}
                                    className="flex items-center justify-center gap-2 w-full py-3 bg-[var(--primary)] text-white rounded-xl font-semibold text-sm hover:bg-[var(--primary)]/90 transition-colors duration-150"
                                >
                                    View All Products
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex justify-center items-center px-4 py-1 h-[36px] text-[16px] font-semibold transition-all rounded-[18px]",
                                pathname === item.href
                                    ? "bg-[var(--primary)] text-white"
                                    : isLightPage
                                        ? "text-[var(--foreground)] hover:bg-[var(--accent)]"
                                        : "bg-transparent text-white/80 hover:bg-white/30"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className={cn("absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold", isLightPage ? "text-[var(--foreground)]" : "text-white")}>
                    <Link href="/">LOGO</Link>
                </div>
                
                <div className="flex items-center space-x-4">
                    {/* Cart Icon */}
                    <button
                        onClick={openCart}
                        aria-label="Shopping cart"
                        className="relative"
                    >
                        <div className={cn(
                            "w-10 h-10 backdrop-blur-sm rounded-full flex items-center justify-center transition-colors",
                            isLightPage ? "bg-[var(--accent)] hover:bg-[var(--accent)]/70" : "bg-white/30 hover:bg-white/40"
                        )}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cn("w-5 h-5", isLightPage ? "text-[var(--foreground)]" : "text-white")}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </div>
                        {totalItems > 0 && (
                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--primary)] text-white text-xs font-bold rounded-full flex items-center justify-center">
                                {totalItems > 9 ? '9+' : totalItems}
                            </span>
                        )}
                    </button>
                    <div className="relative">
                        <div className={cn(
                            "flex items-center transition-all duration-500 ease-in-out",
                            activeSearch
                                ? cn("w-64 backdrop-blur-sm rounded-full border", isLightPage ? "bg-[var(--accent)]/50 border-[var(--border)]" : "bg-white/20 border-white/30")
                                : cn("w-10 h-10 rounded-full", isLightPage ? "bg-[var(--accent)]" : "bg-white/30")
                        )}>
                            <Button 
                                variant="ghost" 
                                className="rounded-full backdrop-blur-sm hover:bg-white/10 p-3 flex-shrink-0"
                                onClick={() => setActiveSearch(!activeSearch)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={cn("w-4 h-4 md:w-5 md:h-5", isLightPage ? "text-[var(--foreground)]" : "text-white")}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                                </svg>
                            </Button>
                            {activeSearch && (
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className={cn("flex-1 bg-transparent px-4 py-2 outline-none text-sm animate-fade-in", isLightPage ? "text-[var(--foreground)] placeholder-[var(--muted-foreground)]" : "text-white placeholder-white/70")}
                                    autoFocus
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
                        <Image 
                            src="/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="object-cover"
                        />
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Slide-in Menu */}
            <div 
                id="mobile-menu"
                className={`fixed top-0 left-0 h-full w-[280px] bg-black/90 backdrop-blur-lg ${isClient && isMobileMenuOpen ? 'slide-in' : '-translate-x-full'} md:hidden z-50 shadow-xl overflow-y-auto`}
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
                <div className="flex flex-col items-center gap-3 p-4 mt-2">
                    {/* Home */}
                    <Link
                        href="/"
                        className={`flex justify-center items-center px-4 py-2 w-full h-[48px] rounded-[24px] text-[18px] font-semibold transition-all ${
                            pathname === '/' ? "bg-secondary text-primary" : "bg-white/20 text-white/80 hover:bg-white/30"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        Home
                        <span className="ml-2 opacity-70">→</span>
                    </Link>

                    {/* Shop (expandable) */}
                    <div className="w-full">
                        <button
                            className={`flex justify-between items-center px-4 py-2 w-full h-[48px] rounded-[24px] text-[18px] font-semibold transition-all ${
                                isShopActive ? "bg-secondary text-primary" : "bg-white/20 text-white/80 hover:bg-white/30"
                            }`}
                            onClick={() => setMobileShopExpanded(!mobileShopExpanded)}
                            aria-expanded={mobileShopExpanded}
                        >
                            <span>Shop</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className={cn("w-4 h-4 transition-transform duration-200", mobileShopExpanded && "rotate-180")}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>

                        {/* Shop sub-categories */}
                        {mobileShopExpanded && (
                            <div className="mt-2 ml-2 flex flex-col gap-1 animate-fade-in">
                                {shopCategories.map(cat => (
                                    <Link
                                        key={cat.name}
                                        href={cat.href}
                                        onClick={() => { setIsMobileMenuOpen(false); setMobileShopExpanded(false); }}
                                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-white/70 hover:text-white hover:bg-white/10 transition-colors text-[15px]"
                                    >
                                        <span className="text-lg">{cat.icon}</span>
                                        {cat.name}
                                    </Link>
                                ))}
                                <Link
                                    href="/shop"
                                    onClick={() => { setIsMobileMenuOpen(false); setMobileShopExpanded(false); }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-[var(--primary)] hover:bg-white/10 transition-colors text-[15px] font-semibold"
                                >
                                    View All →
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* About */}
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={`flex justify-center items-center px-4 py-2 w-full h-[48px] rounded-[24px] text-[18px] font-semibold transition-all ${
                                pathname === item.href ? "bg-secondary text-primary" : "bg-white/20 text-white/80 hover:bg-white/30"
                            }`}
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {item.label}
                            <span className="ml-2 opacity-70">→</span>
                        </Link>
                    ))}
                </div>
                
                {/* Social links */}
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

