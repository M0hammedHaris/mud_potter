"use client";

import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]">
      <div className="container mx-auto max-w-full">
        {/* Header: Title and View More button */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-10">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[var(--foreground)] mb-4 sm:mb-0">
            Our Blog
          </h2>
          <Link href="/blog" passHref>
            <button 
              aria-label="View More Blog Posts"
              className="flex items-center text-lg sm:text-xl md:text-2xl text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors group"
            >
              View More
              <span className="ml-3 flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-[var(--primary)] text-[var(--white)] group-hover:opacity-90 transition-opacity">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  strokeWidth={2.5} 
                  stroke="currentColor" 
                  className="w-5 h-5 sm:w-6 sm:h-6 transform transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </Link>
        </div>

        {/* Separator Line */}
        <hr className="mb-8 md:mb-12 border-t border-[var(--border)]" />

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.map((post) => (
            <Link key={post.id} href={post.link} passHref>
              <div className="group block bg-[var(--card)] rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                <div className="relative w-full aspect-[4/3]"> {/* Adjusted aspect ratio for better display */}
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
                    Discover the latest trends and insights in the world of pottery and ceramics.
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
