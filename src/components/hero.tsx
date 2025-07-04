"use client";

import * as React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Facebook, Instagram, XIcon } from "lucide-react"; // Import icons from lucide-react

interface HeroProps {
  title: string;
  images: string[];
}

export function Hero({ title, images }: HeroProps) {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [isPaused, setIsPaused] = React.useState(false);

  // States for animations
  const [curtainsOpen, setCurtainsOpen] = React.useState(false);
  const [animateTitle, setAnimateTitle] = React.useState(false);

  // Effect to open curtains
  React.useEffect(() => {
    const curtainTimer = setTimeout(() => {
      setCurtainsOpen(true);
    }, 500); // Delay before curtains start opening
    return () => clearTimeout(curtainTimer);
  }, []);

  // Effect to animate title after curtains are open
  React.useEffect(() => {
    if (curtainsOpen) {
      // Wait for curtain animation to complete (1.5s) before showing text
      const titleTimer = setTimeout(() => {
        setAnimateTitle(true);
      }, 1500); // This delay is from the point curtainsOpen becomes true
      return () => clearTimeout(titleTimer);
    }
  }, [curtainsOpen]);

  // Setup keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!api) return;

      if (event.key === "ArrowRight") {
        api.scrollNext();
      } else if (event.key === "ArrowLeft") {
        api.scrollPrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [api]);

  // Track current slide
  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrentSlide(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    onSelect(); // Initialize current slide

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle pause on hover
  React.useEffect(() => {
    if (!api || isPaused) return;

    // Set a slightly longer interval (5 seconds) for better viewing experience
    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, [api, isPaused]);

  // Pause when user interacts with controls
  const handleControlInteraction = () => {
    setIsPaused(true);
    // Resume auto-switching after a delay
    const timeoutId = setTimeout(() => setIsPaused(false), 8000);
    return () => clearTimeout(timeoutId);
  };

  return (
    <section
      className="relative h-screen bg-[#FAEFCA] p-0 md:p-4"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setTimeout(() => setIsPaused(false), 5000)}
    >
      {/* Social Media Icons */}
      <div className="hidden lg:block absolute right-6 top-1/2 -translate-y-1/2 w-[70px] h-[350px] bg-white/10 backdrop-blur-md rounded-full z-20">
        <div className="flex flex-col items-center justify-center h-full gap-10">
          <a
            href="#"
            className="transition-transform hover:scale-110 text-white"
            aria-label="Facebook"
          >
            <Facebook size={28} />
          </a>
          <a
            href="#"
            className="transition-transform hover:scale-110 text-white"
            aria-label="Instagram"
          >
            <Instagram size={28} />
          </a>
          <a
            href="#"
            className="transition-transform hover:scale-110 text-white"
            aria-label="Twitter"
          >
            <XIcon size={28} />
          </a>
        </div>
      </div>

      {/* Main background that changes with slides */}
      <div className="absolute inset-4 z-0 rounded-[20px] overflow-hidden">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`Pottery crafting background ${index + 1}`}
              fill
              className={`object-cover brightness-75 transition-transform duration-3000 ${
                index === currentSlide ? "scale-105" : "scale-100"
              }`}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              style={{
                transition: "transform 7s ease-in-out, opacity 1s ease-in-out",
                transform: index === currentSlide ? "scale(1.05)" : "scale(1)",
              }}
            />
            {/* Add a subtle overlay to ensure text readability */}
            <div className="absolute inset-0 bg-overlay rounded-[20px]"></div>
          </div>
        ))}
      </div>

      {/* Theatre Curtains - covering the image area initially */}
      <div
        className={`absolute inset-4 rounded-[20px] overflow-hidden pointer-events-none ${
          curtainsOpen ? "curtains-open" : ""
        }`}
      >
        <div className="theatre-curtain theatre-curtain-left"></div>
        <div className="theatre-curtain theatre-curtain-right"></div>
      </div>

      {/* Hero content */}
      <div className="relative z-10 flex flex-col justify-between h-full pointer-events-none rounded-[20px]">
        {/* Hero text - pointer-events-auto restores pointer events just for the text content */}
        <div className="pt-28 md:pt-36 px-6 md:px-16 mt-16">
          <div className="inline-block px-6 py-4 rounded-lg pointer-events-auto">
            <h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white max-w-xl leading-tight ${
                animateTitle ? "animate-title" : "opacity-0"
              }`}
            >
              {title.split(" ").map((word, index) => (
                <span
                  key={index}
                  className="word"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {word}&nbsp;
                </span>
              ))}
            </h1>
          </div>
        </div>

        {/* Controls and navigation */}
        <div className="absolute bottom-10 w-full px-6 md:px-16">
          {/* Current slide indicator and navigation controls - aligned horizontally */}
          <div className="flex items-center justify-between w-full z-10 pointer-events-auto">
            {/* Slide indicator - left side */}
            <div className="flex items-center space-x-3 backdrop-blur-sm bg-overlay bg-opacity-20 px-4 py-2 rounded-full">
              <span className="text-white font-medium">
            {String(currentSlide + 1).padStart(2, "0")}
              </span>
              <div className="w-24 sm:w-48 h-2 bg-gray/50 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-300 ease-in-out"
              style={{
                width: `${((currentSlide + 1) / images.length) * 100}%`,
              }}
            ></div>
              </div>
              <span className="text-white font-medium">
            {String(images.length).padStart(2, "0")}
              </span>
            </div>

            {/* Navigation controls - right side */}
            <div className="flex space-x-6">
              <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-overlay backdrop-blur-sm border-none text-white hover:bg-primary h-12 w-12 md:h-14 md:w-14 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            onClick={() => {
              api?.scrollPrev();
              handleControlInteraction();
            }}
            aria-label="Previous slide"
              >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 md:w-7 md:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
              </Button>
              <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-primary/80 backdrop-blur-sm border-none text-white hover:bg-primary h-12 w-12 md:h-14 md:w-14 shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl"
            onClick={() => {
              api?.scrollNext();
              handleControlInteraction();
            }}
            aria-label="Next slide"
              >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6 md:w-7 md:h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            </Button>
            </div>
          </div>
        </div>

        {/* Hidden Carousel - Keeps API functionality without visual thumbnails */}
        <Carousel
          opts={{ align: "start", loop: true }}
          setApi={setApi}
          className="w-0 h-0 overflow-hidden opacity-0 absolute pointer-events-none"
        >
          <CarouselContent>
            {images.map((image, index) => (
            <CarouselItem key={index}>
              {/* Empty item - just to maintain carousel functionality */}
              <div />
            </CarouselItem>
              ))}
          </CarouselContent>
        </Carousel>

        {/* Mouse icon - hidden on mobile */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-[35px] h-[60px] border-2 border-white rounded-[40px] pointer-events-none hidden md:block">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-1 h-4 bg-white rounded-full animate-scroll-down"></div>
        </div>
      </div>
    </section>
  );
}
