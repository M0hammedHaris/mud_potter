"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface ViewMoreButtonProps {
  href?: string;
  onClick?: () => void;
  className?: string;
  arrowClassName?: string;
  textClassName?: string;
}

export function ViewMoreButton({
  href,
  onClick,
  className,
  arrowClassName,
  textClassName,
}: ViewMoreButtonProps) {
  // Button content
  const buttonContent = (
    <>
      <span className={cn("text-base md:text-xl lg:text-2xl font-medium text-muted-foreground whitespace-nowrap", textClassName)}>
        View More
      </span>
      <div className={cn("w-9 h-9 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center relative transition-transform duration-300 ease-in-out group-hover:scale-110", arrowClassName)}>
        <svg 
          width="18" 
          height="18" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="transform rotate-[-35deg] sm:scale-100 scale-75"
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
    </>
  );

  // Base classes for the container
  const containerClasses = cn(
    "flex items-center gap-2 sm:gap-3 md:gap-4 group cursor-pointer",
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
