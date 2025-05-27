"use client";
import Image from "next/image";
import { ViewMoreButton } from "@/components/ui/view-more-button";

export function BrowseCategory() {
  return (
    <section className="py-12 md:py-16 lg:py-20 bg-[var(--background)] px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Header: Title and View More button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-4 sm:mb-0">
            Browse by Category
          </h2>
          <ViewMoreButton href="/categories" />
        </div>

        {/* Separator Line */}
        <hr className="mb-8 md:mb-12 border-t border-[var(--border)]" />

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Garden Decors - Large Card */}
          <div className="relative rounded-lg overflow-hidden h-[498px]">
            <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/40 to-transparent z-10"></div>
            <Image 
              src="/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png"
              alt="Garden Decors" 
              fill
              className="object-cover"
            />
            <h3 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white z-20 font-['Gill_Sans_MT']">
              Garden Decors
            </h3>
          </div>
          
          {/* Right column with two cards */}
          <div className="flex flex-col gap-4">
            {/* Cookware */}
            <div className="relative rounded-lg overflow-hidden h-[240px]">
              <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/30 to-transparent z-10"></div>
              <Image 
                src="/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png"
                alt="Cookware" 
                fill
                className="object-cover"
              />
              <h3 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white z-20 font-['Gill_Sans_MT']">
                Cookware
              </h3>
            </div>
            
            {/* Sacred Crafts */}
            <div className="relative rounded-lg overflow-hidden h-[240px]">
              <div className="absolute inset-0 bg-gradient-to-t from-overlay via-overlay/30 to-transparent z-10"></div>
              <Image 
                src="/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png"
                alt="Sacred Crafts" 
                fill
                className="object-cover"
              />
              <h3 className="absolute bottom-6 left-6 text-3xl md:text-4xl font-bold text-white z-20 font-['Gill_Sans_MT']">
                Sacred Crafts
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
