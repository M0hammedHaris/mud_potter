"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ViewMoreButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  arrowClassName?: string;
  textClassName?: string;
  variant?: "default" | "accent";
}

export function ViewMoreButton({
  href,
  onClick,
  className,
  arrowClassName,
  textClassName,
  variant = "default",
}: ViewMoreButtonProps) {
  // Button content
  const buttonContent = (
    <>
      <span
        className={cn(
          "text-base md:text-xl lg:text-2xl font-medium whitespace-nowrap transition-colors duration-300",
          variant === "accent"
            ? "text-accent-foreground"
            : "text-muted-foreground",
          textClassName
        )}
      >
        View More
      </span>
      <div
        className={cn(
          "w-10 h-10 sm:w-11 sm:h-11 md:w-14 md:h-14 rounded-full flex items-center justify-center relative transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:shadow-md",
          variant === "accent" ? "bg-accent" : "bg-primary",
          arrowClassName
        )}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transform rotate-[-35deg] sm:scale-110 scale-90 transition-transform duration-300 group-hover:scale-125"
        >
          <path
            d="M5 12H19M19 12L12 5M19 12L12 19"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </>
  );

  // Base classes for the container
  const containerClasses = cn(
    "flex items-center gap-3 sm:gap-4 md:gap-5 group cursor-pointer hover:opacity-90 transition-all duration-300",
    className
  );

  // Return link or button based on whether href is provided
  return href ? (
    <Link href={href} className={containerClasses}>
      {buttonContent}
    </Link>
  ) : (
    <div onClick={onClick} className={containerClasses}>
      {buttonContent}
    </div>
  );
}
