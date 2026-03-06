"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const categories = [
  {
    id: "water-pots",
    title: "Water Pots",
    description: "Naturally cool and purify water with our handcrafted clay water pots. Each pot is made using traditional methods passed down through generations.",
    image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png",
    count: 12,
    href: "/shop?category=Water+Pots",
  },
  {
    id: "cookware",
    title: "Cookware",
    description: "Experience authentic flavors with our earthen cookware. Clay cooking vessels enhance taste and retain nutrients naturally.",
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
    count: 8,
    href: "/shop?category=Cookware",
  },
  {
    id: "garden-decors",
    title: "Garden Decors",
    description: "Transform your outdoor spaces with our collection of garden pottery. From decorative urns to functional planters.",
    image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
    count: 15,
    href: "/shop?category=Garden+Decors",
  },
  {
    id: "sacred-crafts",
    title: "Sacred Crafts",
    description: "Spiritual and ceremonial pottery for your sacred practices. Each piece is crafted with intention and reverence.",
    image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png",
    count: 6,
    href: "/shop?category=Sacred+Crafts",
  },
  {
    id: "planters",
    title: "Planters",
    description: "Clay planters that breathe life into your plants. The porous material promotes healthy root growth and natural drainage.",
    image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
    count: 10,
    href: "/shop?category=Planters",
  },
  {
    id: "decorative",
    title: "Decorative Items",
    description: "Unique pieces of art for your home. Each decorative item tells a story of tradition, skill, and creativity.",
    image: "/images/ceramic-pottery-tools-still-life.png",
    count: 18,
    href: "/shop?category=Decorative",
  },
];

export default function CategoriesPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      {/* Hero Banner */}
      <div className="relative h-[40vh] min-h-[280px] bg-[#111] overflow-hidden">
        <Image
          src="/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png"
          alt="Categories banner"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold font-['Gill_Sans_MT'] mb-4">Browse Categories</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl">
            Explore our wide range of handcrafted pottery collections
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 py-16 max-w-7xl">
        {/* Intro */}
        <div className={cn("text-center max-w-2xl mx-auto mb-14", isVisible ? "animate-fade-in" : "opacity-0")}>
          <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">
            Find Your Perfect Pottery
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg">
            From functional cookware to decorative pieces, our categories cover every aspect of the pottery craft.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, index) => (
            <Link key={cat.id} href={cat.href}>
              <div
                className={cn(
                  "group relative rounded-2xl overflow-hidden cursor-pointer shadow-md transition-all duration-500",
                  isVisible ? "animate-fade-in" : "opacity-0",
                  hoveredId === cat.id ? "shadow-2xl scale-[1.02]" : ""
                )}
                style={{ animationDelay: `${index * 120}ms`, height: "380px" }}
                onMouseEnter={() => setHoveredId(cat.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Background Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent transition-opacity duration-300 group-hover:from-black/90" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold font-['Gill_Sans_MT']">{cat.title}</h3>
                    <span className="bg-[var(--primary)] text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      {cat.count} items
                    </span>
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed line-clamp-2 transition-all duration-300 group-hover:text-white/90">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[var(--primary)] opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <span>Shop Now</span>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className={cn("mt-20 text-center bg-white rounded-3xl p-10 md:p-16 shadow-sm border border-[var(--border)]", isVisible ? "animate-fade-in delay-400" : "opacity-0")}>
          <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-[var(--muted-foreground)] text-lg mb-8 max-w-xl mx-auto">
            We also accept custom orders. Tell us what you need and our artisans will craft it especially for you.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg"
          >
            Request Custom Order
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
