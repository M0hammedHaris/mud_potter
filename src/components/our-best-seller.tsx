"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ViewMoreButton } from "@/components/ui/view-more-button";
import { cn } from "@/lib/utils";

// Product interface for TypeScript type safety
interface Product {
  id: string;
  title: string;
  image: string;
  hoverImage?: string; // Optional second image for hover effect
  price: number;
}

// Props interface for component
interface OurBestSellerProps {
  products?: Product[];
}

export function OurBestSeller({ products }: OurBestSellerProps) {
  // State to track which elements are in viewport for animations
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Default products if none are provided
  const defaultProducts: Product[] = [
    {
      id: "1",
      title: "Mud Pot",
      image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png",
      hoverImage: "/images/ceramic-pottery-tools-still-life.png",
      price: 1200,
    },
    {
      id: "2",
      title: "Mud Cooker",
      image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png",
      hoverImage: "/images/kitchen-utensils-arrangement-top-view.png",
      price: 1200,
    },
    {
      id: "3",
      title: "Mud Pot",
      image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png",
      hoverImage: "/images/close-up-hands-working-pottery.png",
      price: 1200,
    }
  ];

  // Use provided products or default to the sample data
  const displayProducts = products || defaultProducts;
  
  // Effect to handle scroll detection using Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection
        setIsVisible(entry.isIntersecting);
        // Do not disconnect - we want the animation to play every time
      },
      {
        // Trigger when at least 10% of the element is in the viewport
        threshold: 0.1,
        // Start observing a bit before the element enters viewport
        rootMargin: '0px 0px -10% 0px'
      }
    );
    
    // Get the current section element
    const currentSection = sectionRef.current;
    
    // Start observing the section
    if (currentSection) {
      observer.observe(currentSection);
    }
    
    // Preload all hover images for smoother transitions
    const preloadImages = () => {
      displayProducts.forEach(product => {
        if (product.hoverImage) {
          const img = document.createElement('img');
          img.src = product.hoverImage;
          // We don't need to append this to the DOM
        }
      });
    };
    
    // Run preload after a small delay to prioritize main content loading
    const preloadTimer = setTimeout(preloadImages, 1000);
    
    // Clean up observer on component unmount
    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
      clearTimeout(preloadTimer);
    };
  }, [displayProducts]);

  return (
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]">
      {/* Animations are imported from /src/styles/animations.css */}
      <div className="container mx-auto max-w-full">
        {/* Header with Title and View More */}
        <div className="flex flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold font-['Gill_Sans_MT'] text-foreground",
            isVisible ? "animate-fade-in-left" : "opacity-0"
          )}>
            Our Best Seller
          </h2>
          <ViewMoreButton 
            href="/products/best-seller"
            textClassName="hidden sm:inline" 
            className={cn(isVisible ? "animate-fade-in-right" : "opacity-0")}
          />
        </div>
        
        {/* Separator Line */}
        <hr className={cn("mb-8 md:mb-12 border-t border-[var(--border)]", 
            isVisible ? "animate-fade-in delay-200" : "opacity-0"
        )} />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProducts.map((product, index) => (
            <div 
              key={product.id} 
              className={`flex flex-col gap-6 group cursor-pointer transition-all duration-500 ease-in-out rounded-lg ${isVisible ? 'animate-fade-in' : 'animate-fade-out'}`}
              style={{ 
                animationDelay: `${200 + (index * 200)}ms` // Base delay + staggered delay
              }}
            >
              {/* Product Image */}
              <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[480px] lg:h-[520px] shadow-sm group-hover:shadow-md">
                {/* Main Image */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={index < 3} // Only priority load first few images
                  style={{
                    opacity: product.hoverImage ? '1' : '1',
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '0.5s',
                    transitionTimingFunction: 'ease'
                  }}
                  onMouseEnter={(e) => {
                    if (product.hoverImage) {
                      (e.target as HTMLImageElement).style.opacity = '0';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (product.hoverImage) {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    }
                  }}
                />
                
                {/* Hover Image (alternative view) */}
                {product.hoverImage && (
                  <Image
                    src={product.hoverImage}
                    alt={`${product.title} - alternate view`}
                    fill
                    className="object-cover absolute inset-0"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{
                      opacity: '0',
                      transitionProperty: 'opacity',
                      transitionDuration: '0.5s',
                      transitionTimingFunction: 'ease'
                    }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '1';
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLImageElement).style.opacity = '0';
                    }}
                  />
                )}
              </div>
              
              {/* Product Title and Price */}
              <div className="flex justify-between items-center px-2">
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold font-['Gill_Sans_MT'] text-foreground">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-sm">₹</span>
                    <span className="text-lg md:text-xl font-bold font-['Gill_Sans_MT'] text-gray-500">
                      {product.price}
                    </span>
                  </div>
                </div>
                
                {/* Arrow Button */}
                <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center relative transition-transform duration-300 group-hover:scale-110">
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
          ))}
        </div>
      </div>
    </section>
  );
}
