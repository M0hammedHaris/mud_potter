"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
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
	size: "large" | "small";
}

const deals: Deal[] = [
	{
		id: "deal-1",
		title: "Garden Pottery",
		description: "Beautifully crafted pottery for your garden.",
		image:
			"/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
		size: "large",
	},
	{
		id: "deal-2",
		title: "Still Life Pottery",
		description: "Artistic pottery for your home decor.",
		image:
			"/images/Leonardo_Phoenix_10_I_want_a_visually_appealing_still_life_ima_2 (1).png",
		size: "large",
	},
	{
		id: "deal-3",
		title: "Deals Of The Month",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin",
		image: "/images/ceramic-pottery-tools-still-life.png",
		size: "large",
	},
];

export function DealsOfTheMonth() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30,
  });
  
  // Animation states
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for animations
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2, // Trigger when at least 20% of the element is visible
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

  // Countdown timer logic
  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft.seconds > 0) {
        setTimeLeft({ ...timeLeft, seconds: timeLeft.seconds - 1 });
      } else if (timeLeft.minutes > 0) {
        setTimeLeft({
          ...timeLeft,
          minutes: timeLeft.minutes - 1,
          seconds: 59,
        });
      } else if (timeLeft.hours > 0) {
        setTimeLeft({
          ...timeLeft,
          hours: timeLeft.hours - 1,
          minutes: 59,
          seconds: 59,
        });
      } else if (timeLeft.days > 0) {
        setTimeLeft({
          ...timeLeft,
          days: timeLeft.days - 1,
          hours: 23,
          minutes: 59,
          seconds: 59,
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Format the number to always have two digits
  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
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
          {/* First image */}
          <motion.div
            variants={itemVariants}
            className="transition-all duration-500"
            style={{
              flex: hoveredId === deals[0].id ? "2 1 0%" : (hoveredId && hoveredId !== deals[0].id) ? "1 1 0%" : "1.5 1 0%",
              transition: "flex 0.5s ease-in-out"
            }}
          >
            <DealCard deal={deals[0]} hoveredId={hoveredId} setHoveredId={setHoveredId} isAnimationEnabled={true} timeLeft={timeLeft} formatNumber={formatNumber} />
          </motion.div>

          {/* Second image */}
          <motion.div
            variants={itemVariants}
            className="transition-all duration-500"
            style={{
              flex: hoveredId === deals[1].id ? "2 1 0%" : (hoveredId && hoveredId !== deals[1].id) ? "1 1 0%" : "1.5 1 0%",
              transition: "flex 0.5s ease-in-out"
            }}
          >
            <DealCard deal={deals[1]} hoveredId={hoveredId} setHoveredId={setHoveredId} isAnimationEnabled={true} timeLeft={timeLeft} formatNumber={formatNumber} />
          </motion.div>

          {/* Third image with content */}
          <motion.div
            variants={itemVariants}
            className="transition-all duration-500"
            style={{
              flex: hoveredId === deals[2].id ? "2 1 0%" : (hoveredId && hoveredId !== deals[2].id) ? "1 1 0%" : "1.5 1 0%",
              transition: "flex 0.5s ease-in-out"
            }}
          >
            <DealCard 
              deal={deals[2]} 
              hoveredId={hoveredId} 
              setHoveredId={setHoveredId}
              timeLeft={timeLeft}
              formatNumber={formatNumber}
              isAnimationEnabled={true}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface DealCardProps {
  deal: Deal;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
  timeLeft?: TimeLeft;
  formatNumber?: (num: number) => string;
  isAnimationEnabled?: boolean;
}

function DealCard({ deal, hoveredId, setHoveredId, timeLeft, formatNumber, isAnimationEnabled = false }: DealCardProps) {
  const isHovered = hoveredId === deal.id;
  const isShrinking = hoveredId !== null && hoveredId !== deal.id;
  const isLarge = deal.size === 'large';

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden transition-all duration-500 cursor-pointer min-h-[450px] h-auto md:h-[500px] lg:h-[600px] border-3 border-white`}
      onMouseEnter={() => isAnimationEnabled && setHoveredId(deal.id)}
      onMouseLeave={() => isAnimationEnabled && setHoveredId(null)}
      whileHover={{ scale: 1.02 }}
      animate={{
        scale: isHovered ? 1.02 : isShrinking ? 0.98 : 1
      }}
      transition={{ duration: 0.4 }}
    >
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10 transition-opacity duration-300 ${
          isHovered ? "opacity-90" : "opacity-100"
        }`}
      ></div>
      <Image
        src={deal.image}
        alt={deal.title}
        fill
        className={`object-cover transition-transform duration-500 ${
          isHovered ? "scale-110" : "scale-100"
        }`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        loading="lazy"
      />
      <div className="absolute bottom-0 left-0 w-full p-6 z-20 transition-all duration-500">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.3 }}
          className={`text-2xl sm:text-3xl md:text-4xl font-bold text-white font-['Gill_Sans_MT']`}
        >
          {deal.title}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            height: isHovered ? "auto" : 0,
            marginTop: isHovered ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="text-white text-sm sm:text-lg line-clamp-3 sm:line-clamp-none"
        >
          {deal.description}
        </motion.div>

        {(isLarge || isHovered) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <Button
              className="w-[150px] sm:w-[200px] h-[40px] sm:h-[50px] bg-[--primary] hover:bg-[#018e01] text-white rounded-[30px] shadow-lg text-sm sm:text-lg font-['Gill_Sans_MT'] mt-4"
              aria-label="Shop the deals of the month"
            >
              Shop Now
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

            {timeLeft && formatNumber && (
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
