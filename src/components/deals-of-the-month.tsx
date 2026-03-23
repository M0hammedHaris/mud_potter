"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ViewMoreButton } from "@/components/ui/view-more-button";
import "../styles/animations.css";

// Countdown timer interface
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface Deal {
	id: string;
	title: string;
	description: string;
	image: string;
	linkUrl: string;
	linkLabel: string;
	expiresAt: string;
}

function calcTimeLeft(expiresAt: string): TimeLeft {
  const diff = Math.max(0, new Date(expiresAt).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function DealsOfTheMonth() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  // Per-deal timers keyed by deal id
  const [timers, setTimers] = useState<Record<string, TimeLeft>>({});
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Fetch deals from API
  useEffect(() => {
    fetch("/api/deals")
      .then((r) => r.json())
      .then((data: Deal[]) => {
        setDeals(data);
        // Expand first deal by default
        if (data.length > 0) {
          setExpandedId(data[0].id);
          // Initialize per-deal timers from each deal's expiresAt
          const initialTimers: Record<string, TimeLeft> = {};
          data.forEach((deal) => {
            if (deal.expiresAt) {
              initialTimers[deal.id] = calcTimeLeft(deal.expiresAt);
            }
          });
          setTimers(initialTimers);
        }
      })
      .catch((err) => {
        console.error("Failed to load deals:", err);
      });
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const currentSectionRef = sectionRef.current;

    if (currentSectionRef) {
      observer.observe(currentSectionRef);
    }

    return () => {
      if (currentSectionRef) {
        observer.unobserve(currentSectionRef);
      }
    };
  }, []);

  // Tick all deal timers every second (only starts once deals are loaded)
  const tickTimers = useCallback(() => {
    setTimers((prev) => {
      const next: Record<string, TimeLeft> = {};
      for (const id in prev) {
        const t = prev[id];
        if (t.seconds > 0) {
          next[id] = { ...t, seconds: t.seconds - 1 };
        } else if (t.minutes > 0) {
          next[id] = { ...t, minutes: t.minutes - 1, seconds: 59 };
        } else if (t.hours > 0) {
          next[id] = { ...t, hours: t.hours - 1, minutes: 59, seconds: 59 };
        } else if (t.days > 0) {
          next[id] = { ...t, days: t.days - 1, hours: 23, minutes: 59, seconds: 59 };
        } else {
          next[id] = t; // expired
        }
      }
      return next;
    });
  }, []);

  const hasTimers = Object.keys(timers).length > 0;

  useEffect(() => {
    if (!hasTimers) return;
    const interval = setInterval(tickTimers, 1000);
    return () => clearInterval(interval);
  }, [hasTimers, tickTimers]);

  // Format the number to always have two digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const handleDealClick = (dealId: string) => {
    setExpandedId(dealId);
  };

  const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
	};

  return (
    <section 
      ref={sectionRef} 
      className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)] overflow-hidden"
    >
      <div className="container mx-auto max-w-full">
        {/* Header: Title and View More button */}
        <div className="flex flex-row justify-between items-center mb-6 sm:mb-8 md:mb-12">
          <h2 className={cn(
            "text-3xl md:text-4xl lg:text-5xl font-bold font-['Gill_Sans_MT'] text-foreground",
            isVisible ? "animate-fade-in-left" : "opacity-0"
          )}>
            Deals of the Month
          </h2>
          <ViewMoreButton 
            href="/deals" 
            textClassName="hidden sm:inline"
            className={cn(isVisible ? "animate-fade-in-right" : "opacity-0")}
          />
        </div>
        
        {/* Separator Line */}
        <hr className={cn("mb-8 md:mb-12 border-t border-[var(--border)]", 
            isVisible ? "animate-fade-in delay-200" : "opacity-0"
        )} />
        
        {/* Grid container for the deal images */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="flex flex-col lg:flex-row gap-4 lg:gap-8"
        >
          {deals.map((deal, index) => (
            <motion.div
              key={deal.id}
              variants={itemVariants}
              className="transition-all duration-500 cursor-pointer"
              style={{
                flex: expandedId === deal.id ? "2 1 0%" : "1 1 0%",
                transition: "flex 0.5s ease-in-out"
              }}
              onClick={() => handleDealClick(deal.id)}
              role="button"
              tabIndex={0}
              aria-expanded={expandedId === deal.id}
              aria-label={`${deal.title} - click to expand`}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleDealClick(deal.id); } }}
            >
              <DealCard
                deal={deal}
                isExpanded={expandedId === deal.id}
                isFirst={index === 0}
                timeLeft={timers[deal.id]}
                formatNumber={formatNumber}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface DealCardProps {
  deal: Deal;
  isExpanded: boolean;
  isFirst: boolean;
  timeLeft?: TimeLeft;
  formatNumber: (num: number) => string;
}

function DealCard({ deal, isExpanded, isFirst, timeLeft, formatNumber }: DealCardProps) {
  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden transition-all duration-500 min-h-[450px] h-auto md:h-[500px] lg:h-[600px] border-3 border-white`}
      animate={{
        scale: isExpanded ? 1.02 : 0.98
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 transition-opacity duration-300 ${
          isExpanded ? "opacity-90" : "opacity-100"
        }`}
      ></div>
      <Image
        src={deal.image}
        alt={deal.title}
        fill
        className={`object-cover transition-transform duration-500 ${
          isExpanded ? "scale-110" : "scale-100"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
      />

      {/* "Closing Soon" badge for the first deal */}
      {isFirst && (
        <div className="absolute top-4 left-4 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full animate-pulse">
          🔥 Closing Soon
        </div>
      )}

      <div className="absolute bottom-0 left-0 w-full p-6 z-20 transition-all duration-500">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            y: isExpanded ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Gill_Sans_MT']`}
        >
          {deal.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isExpanded ? 1 : 0,
            height: isExpanded ? "auto" : 0,
            marginTop: isExpanded ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-white text-sm sm:text-lg line-clamp-3 sm:line-clamp-none"
        >
          {deal.description}
        </motion.div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Link href={deal.linkUrl} onClick={(e) => e.stopPropagation()}>
            <Button
              className="w-[150px] sm:w-[200px] h-[40px] sm:h-[50px] bg-[--primary] hover:bg-[#018e01] text-white rounded-[30px] shadow-lg text-sm sm:text-lg font-['Gill_Sans_MT'] mt-4"
              aria-label={deal.linkLabel}
            >
              {deal.linkLabel}
              <span className="ml-4 inline-block">
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  className="text-white"
                >
                  <path
                    d="M1 6h14m-6-5l5 5-5 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Button>
            </Link>

            {timeLeft && (
              <div className="mt-4 sm:mt-8">
                <p className="text-lg sm:text-xl md:text-2xl text-white mb-2 sm:mb-3 font-['Gill_Sans_MT']">
                  Hurry, Before It&apos;s Too Late!
                </p>
                <div className="flex flex-wrap gap-2 md:gap-5">
                  {/* Days */}
                  <div className="flex flex-col items-center">
                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                      <span className="text-lg sm:text-xl text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                        {formatNumber(timeLeft.days)}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-white mt-1.5">
                      Days
                    </span>
                  </div>

                  {/* Hours */}
                  <div className="flex flex-col items-center">
                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                      <span className="text-lg sm:text-xl text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                        {formatNumber(timeLeft.hours)}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-white mt-1.5">
                      Hr
                    </span>
                  </div>

                  {/* Minutes */}
                  <div className="flex flex-col items-center">
                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                      <span className="text-lg sm:text-xl text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                        {formatNumber(timeLeft.minutes)}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-white mt-1.5">
                      Mins
                    </span>
                  </div>

                  {/* Seconds */}
                  <div className="flex flex-col items-center">
                    <div className="w-[45px] sm:w-[55px] h-[45px] sm:h-[55px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                      <span className="text-lg sm:text-xl text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                        {formatNumber(timeLeft.seconds)}
                      </span>
                    </div>
                    <span className="text-sm sm:text-base text-white mt-1.5">
                      Sec
                    </span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
