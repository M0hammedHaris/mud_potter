"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";

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
    </div>
  );
}
