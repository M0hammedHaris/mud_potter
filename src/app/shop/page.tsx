"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const categories = ["All", "Water Pots", "Cookware", "Garden Decors", "Sacred Crafts", "Planters"];

const products = [
  { id: "1", title: "Classic Mud Pot", category: "Water Pots", price: 1200, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png", rating: 4.8, reviews: 124 },
  { id: "2", title: "Earthen Cooker", category: "Cookware", price: 1800, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png", rating: 4.7, reviews: 89 },
  { id: "3", title: "Terracotta Vase", category: "Garden Decors", price: 950, image: "/images/vase.png", rating: 4.9, reviews: 156 },
  { id: "4", title: "Sacred Lamp", category: "Sacred Crafts", price: 650, image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png", rating: 4.6, reviews: 72 },
  { id: "5", title: "Garden Planter", category: "Planters", price: 1100, image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png", rating: 4.5, reviews: 48 },
  { id: "6", title: "Cooking Handi", category: "Cookware", price: 1400, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png", rating: 4.8, reviews: 203 },
  { id: "7", title: "Water Storage Pot", category: "Water Pots", price: 2200, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png", rating: 4.9, reviews: 178 },
  { id: "8", title: "Decorative Pot", category: "Garden Decors", price: 800, image: "/images/ceramic-pottery-tools-still-life.png", rating: 4.4, reviews: 61 },
  { id: "9", title: "Herb Planter Set", category: "Planters", price: 1600, image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png", rating: 4.7, reviews: 95 },
];

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Best Rated", "Most Reviewed"];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchQuery, setSearchQuery] = useState("");
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

  const filteredProducts = products
    .filter(p => activeCategory === "All" || p.category === activeCategory)
    .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "Price: Low to High") return a.price - b.price;
      if (sortBy === "Price: High to Low") return b.price - a.price;
      if (sortBy === "Best Rated") return b.rating - a.rating;
      if (sortBy === "Most Reviewed") return b.reviews - a.reviews;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[280px] bg-[#111] overflow-hidden">
        <Image
          src="/images/close-up-hands-working-pottery.png"
          alt="Shop banner"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold font-['Gill_Sans_MT'] mb-4">Our Shop</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl">
            Discover handcrafted pottery made with love and tradition
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 py-12 max-w-7xl">
        {/* Filters Bar */}
        <div className={cn("flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-10", isVisible ? "animate-fade-in" : "opacity-0")}>
          {/* Search */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[var(--border)] bg-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] text-sm"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-[var(--muted-foreground)] whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 rounded-lg border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
            >
              {sortOptions.map(opt => <option key={opt}>{opt}</option>)}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className={cn("flex flex-wrap gap-2 mb-8", isVisible ? "animate-fade-in delay-100" : "opacity-0")}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                activeCategory === cat
                  ? "bg-[var(--primary)] text-white shadow-md"
                  : "bg-white text-[var(--muted-foreground)] border border-[var(--border)] hover:border-[var(--primary)] hover:text-[var(--primary)]"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results count */}
        <p className={cn("text-sm text-[var(--muted-foreground)] mb-6", isVisible ? "animate-fade-in delay-200" : "opacity-0")}>
          Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
        </p>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-[var(--muted-foreground)]">No products found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProducts.map((product, index) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div
                  className={cn("group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500", isVisible ? "animate-fade-in" : "opacity-0")}
                  style={{ animationDelay: `${200 + index * 100}ms` }}
                >
                  <div className="relative h-72 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[var(--primary)]">
                      {product.category}
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-1">{product.title}</h3>
                    <div className="flex items-center gap-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={cn("w-3.5 h-3.5", i < Math.floor(product.rating) ? "text-[#FFD500]" : "text-gray-200")} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-[var(--muted-foreground)] ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-[var(--foreground)]">₹{product.price.toLocaleString()}</span>
                      <div className="w-10 h-10 bg-[var(--primary)] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transform rotate-[-35deg]">
                          <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
