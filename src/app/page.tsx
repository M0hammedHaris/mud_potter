"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { BrowseCategory } from "@/components/browse-category";
import { TrendingProducts } from "@/components/trending-products";
import { DealsOfTheMonth } from "@/components/deals-of-the-month";
import { OurBestSeller } from "@/components/our-best-seller";
import CustomerReviews from "@/components/customer-reviews";
import { OurBlog } from "@/components/our-blog";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  // Define the carousel images - using 4 different pottery-related images
  const carouselImages = [
    "/images/close-up-hands-working-pottery.png",
    "/images/ceramic-pottery-tools-still-life.png",
    "/images/close-up-hands-working-pottery.png",    
    "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero 
        title="Explore the Creative World of Mud Crafting"
        images={carouselImages}
      />
      <BrowseCategory />
      <OurBestSeller />
      <DealsOfTheMonth />
      <TrendingProducts />
      <CustomerReviews />
      <OurBlog />
      <FAQ />
      <Footer />
    </div>
  );
}
