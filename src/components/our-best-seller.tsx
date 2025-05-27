"use client";
import Image from "next/image";
import { ViewMoreButton } from "@/components/ui/view-more-button";

// Product interface for TypeScript type safety
interface Product {
  id: string;
  title: string;
  image: string;
  price: number;
}

// Props interface for component
interface OurBestSellerProps {
  products?: Product[];
}

export function OurBestSeller({ products }: OurBestSellerProps) {
  // Default products if none are provided
  const defaultProducts: Product[] = [
    {
      id: "1",
      title: "Mud Pot",
      image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png",
      price: 1200,
    },
    {
      id: "2",
      title: "Mud Cooker",
      image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png",
      price: 1200,
    },
    {
      id: "3",
      title: "Mud Pot",
      image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png",
      price: 1200,
    }
  ];

  // Use provided products or default to the sample data
  const displayProducts = products || defaultProducts;

  return (
    <section className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]">
      <div className="container mx-auto max-w-full">
        {/* Header with Title and View More */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-['Gill_Sans_MT'] text-foreground">
            Our Best Seller
          </h2>
          <ViewMoreButton href="/products/best-seller" />
        </div>
        
        {/* Separator Line */}
        <hr className="mb-8 md:mb-12 border-t border-[var(--border)]" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {displayProducts.map((product) => (
            <div 
              key={product.id} 
              className="flex flex-col gap-6 group cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-3 hover:shadow-xl rounded-lg"
            >
              {/* Product Image */}
              <div className="relative rounded-lg overflow-hidden h-[400px] md:h-[480px] lg:h-[520px] shadow-sm">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              
              {/* Product Title and Price */}
              <div className="flex justify-between items-center px-2">
                <div className="flex flex-col">
                  <h3 className="text-2xl md:text-3xl font-bold font-['Gill_Sans_MT'] text-foreground">
                    {product.title}
                  </h3>
                  <div className="flex items-center gap-1">
                    <span className="text-muted-foreground">₹</span>
                    <span className="text-2xl md:text-3xl font-bold font-['Gill_Sans_MT'] text-muted-foreground">
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
