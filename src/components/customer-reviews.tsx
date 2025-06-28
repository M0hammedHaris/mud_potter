import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from "@/lib/utils";

const StarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354l-4.543 2.883c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
  </svg>
);

const mockReviews = [
  {
    customerName: "Sarah M.",
    rating: 5,
    reviewText: "Absolutely love the quality and craftsmanship. My new favorite mug!",
    date: "2025-05-20T10:00:00.000Z",
    avatar: "/images/user_image.jpeg" 
  },
  {
    customerName: "John B.",
    rating: 4,
    reviewText: "Great products, though the shipping took a bit longer than expected. The pottery itself is fantastic.",
    date: "2025-05-18T14:30:00.000Z",
    avatar: "/images/user_image_2.png"
  },
  {
    customerName: "Lisa P.",
    rating: 5,
    reviewText: "These are the most beautiful pieces I own. The glaze is stunning and they feel very sturdy.",
    date: "2025-05-15T09:15:00.000Z",
    avatar: "/images/user_image.jpeg"
  },
  {
    customerName: "David K.",
    rating: 3,
    reviewText: "Nice design, but one of the plates arrived with a small chip. Customer service was helpful though.",
    date: "2025-05-12T11:05:00.000Z",
    avatar: "/images/user_image_2.png"
  },
  {
    customerName: "Emily R.",
    rating: 5,
    reviewText: "I bought a set as a gift and my friend was thrilled! Excellent quality and unique designs.",
    date: "2025-05-10T16:45:00.000Z",
    avatar: "/images/user_image.jpeg"
  },
  {
    customerName: "Michael C.",
    rating: 4,
    reviewText: "The colors are even more vibrant in person. Very happy with my purchase.",
    date: "2025-05-08T08:00:00.000Z",
    avatar: "/images/user_image_2.png"
  }
];

const CustomerReviews = () => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % mockReviews.length);
  };

  const handlePrevReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + mockReviews.length) % mockReviews.length);
  };

  // Touch handlers for swipe functionality
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextReview();
    } else if (isRightSwipe) {
      handlePrevReview();
    }
  };

  const currentReview = mockReviews[currentReviewIndex];

  return (
    <section 
      ref={sectionRef}
      aria-labelledby="customer-reviews-heading" 
      // Use min-h-screen for full viewport height, and ensure content is centered if it doesn't fill the screen.
      className="bg-[var(--review-section-bg)] py-16 px-4 sm:px-8 flex flex-col items-center justify-center min-h-screen overflow-hidden"
    >
      <div className="max-w-6xl w-full flex flex-col items-center gap-8 md:gap-12 relative">
        
        {/* Section heading first to ensure it's at the top of the visual structure */}
        <h2 
          id="customer-reviews-heading" 
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl lg:text-[100px] xl:text-[120px] font-bold text-[var(--review-heading-text)] text-center mb-8 md:mb-12",
            isVisible ? "animate-fade-in-left" : "opacity-0"
          )}
          style={{ fontFamily: "'Gill Sans MT', sans-serif" }}
        >
          What People Say
        </h2>
        
        {/* Mobile Previous Button - Bottom Left */}
        <div className="absolute left-4 bottom-4 block md:hidden z-10">
          <button 
            aria-label="Previous review" 
            onClick={handlePrevReview}
            className="p-3 bg-green-600/70 backdrop-blur-sm rounded-full hover:bg-green-600/90 transition-all duration-200 shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Desktop Previous Button */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:block -ml-2 sm:-ml-4 md:-ml-6 lg:-ml-10 xl:-ml-16 z-10">
          <button 
            aria-label="Previous review" 
            onClick={handlePrevReview}
            className="p-3 bg-primary rounded-l-xl rounded-r-none hover:bg-opacity-80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
        </div>
        <div 
          className="flex flex-col items-center text-center z-10 px-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <Image 
            src={currentReview.avatar} // Use dynamic avatar
            alt={`${currentReview.customerName}\'s photo`} // Dynamic alt text
            width={192}
            height={192}
            className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover mb-6 shadow-lg border-4 border-white"
          />
          <p 
            // Reduced text size for lg breakpoint and overall, adjusted min-height for new text sizes
            className="text-xl md:text-2xl lg:text-4xl leading-relaxed font-bold text-black max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl min-h-[80px] md:min-h-[120px]"
            style={{ fontFamily: "\'Gill Sans MT\', sans-serif" }}
          >
            &quot;{currentReview.reviewText}&quot; {/* Use dynamic review text */}
          </p>
          <div className="flex mt-6 mb-2"> {/* Reduced bottom margin */}
            {[...Array(currentReview.rating)].map((_, i) => ( // Use dynamic rating
              <StarIcon key={i} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-[var(--star-color)] mx-1" />
            ))}
            {[...Array(5 - currentReview.rating)].map((_, i) => ( // Add empty stars
              <StarIcon key={`empty-${i}`} className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-gray-300 mx-1" />
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1 mb-8">{currentReview.customerName} - {new Date(currentReview.date).toLocaleDateString()}</p> {/* Added customer name and date */}
          
          {/* Mobile Review Indicators */}
          <div className="flex justify-center gap-2 mb-4 md:hidden">
            {mockReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReviewIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentReviewIndex 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Mobile Next Button - Bottom Right */}
        <div className="absolute right-4 bottom-4 block md:hidden z-10">
          <button 
            aria-label="Next review"
            onClick={handleNextReview}
            className="p-3 bg-green-600/70 backdrop-blur-sm rounded-full hover:bg-green-600/90 transition-all duration-200 shadow-lg min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Desktop Next Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:block -mr-2 sm:-mr-4 md:-mr-6 lg:-mr-10 xl:-mr-16 z-10">
          <button 
            aria-label="Next review"
            onClick={handleNextReview}
            className="p-3 bg-primary rounded-r-xl rounded-l-none hover:bg-opacity-80 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-10 text-white">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
