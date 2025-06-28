"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ViewMoreButton } from "./ui/view-more-button";
import { cn } from "@/lib/utils";

// Define the structure for a blog post item
interface BlogPost {
  id: number;
  imageUrl: string;
  altText: string;
  title: string;
  link: string;
}

// Sample blog post data
const blogPosts: BlogPost[] = [
  {
    id: 1,
    imageUrl: "/images/vase.png",
    altText: "Two modern white vases with flowers",
    title: "Exploring Contemporary Vase Designs",
    link: "/blog/vase-designs",
  },
  {
    id: 2,
    imageUrl: "/images/kitchen-utensils-arrangement-top-view.png",
    altText: "Overhead view of various kitchen utensils",
    title: "The Art of Kitchen Utensil Arrangement",
    link: "/blog/kitchen-utensils",
  },
  {
    id: 3,
    imageUrl: "/images/Leonardo_Phoenix_10_I_want_a_visually_appealing_still_life_ima_2 (1).png",
    altText: "Collection of terracotta pottery",
    title: "Timeless Appeal of Terracotta Pottery",
    link: "/blog/terracotta-pottery",
  },
];

export function OurBlog() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Optional: unobserve after animation triggers to prevent re-triggering
          // observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    const currentSection = sectionRef.current;
    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]"
    >
      <div className="container mx-auto max-w-full">
        {/* Header: Title and View More button */}
        <div className="flex flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12">
          <h2 className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)]",
            isVisible ? "animate-fade-in-left" : "opacity-0"
          )}>
            Our Blog
          </h2>
          <ViewMoreButton 
            href="/blog"
            textClassName="hidden sm:inline"
            className={cn(isVisible ? "animate-fade-in-right" : "opacity-0")}
          />
        </div>

        {/* Separator Line */}
        <hr className={cn("mb-8 md:mb-12 border-t border-[var(--border)]", 
            isVisible ? "animate-fade-in delay-200" : "opacity-0"
        )} />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post, index) => (
            <Link key={post.id} href={post.link} passHref>
              <div
                className={`group block bg-[var(--card)] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden ${
                  isVisible
                    ? index === 0
                      ? "animate-fade-in-left"
                      : "animate-fade-in-right"
                    : "opacity-0"
                }`}
                style={{
                  animationDelay: `${200 + index * 200}ms`,
                }}
              >
                <div className="relative w-full aspect-[4/3]">
                  {" "}
                  {/* Adjusted aspect ratio for better display */}
                  <Image
                    src={post.imageUrl}
                    alt={post.altText}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-lg group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4 md:p-6">
                  <h3 className="text-xl md:text-2xl font-semibold text-[var(--card-foreground)] mb-2 group-hover:text-[var(--primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-foreground)] mb-3">
                    Discover the latest trends and insights in the world of
                    pottery and ceramics.
                  </p>
                  <span className="text-sm font-medium text-[var(--primary)] group-hover:underline">
                    Read More &rarr;
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
