"use client";
import Image from "next/image";

export function BrowseCategory() {
  return (
    <section className="py-8 px-4 md:px-8 lg:px-12 relative bg-secondary">
      <div className="max-w-[1600px] mx-auto">
        {/* Header with View More button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground font-['Gill_Sans_MT']">
            Browse By Category
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-xl md:text-2xl font-medium text-muted-foreground">
              View More
            </span>
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center relative">
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
                className="transform rotate-[-35deg]"
              >
                <path 
                  d="M5 12H19M19 12L12 5M19 12L12 19" 
                  stroke="white" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Separator line */}
        <div className="w-full h-[1px] bg-border mb-6"></div>
        
        {/* Category cards grid */}
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
