"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Countdown timer interface
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function DealsOfTheMonth() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 2,
    hours: 6,
    minutes: 5,
    seconds: 30,
  });

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

  return (
    <section className="w-full py-12 px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="container mx-auto">
        {/* Grid container for the deal images */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-8">
          {/* First image - takes 3 columns on large screens */}
          <div className="lg:col-span-3 h-full">
            <div className="relative h-[330px] md:h-[415px] lg:h-[600px] rounded-[10px] overflow-hidden border-3 border-white">
              <Image
                src="/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png"
                alt="Garden pottery scene"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={false}
                loading="lazy"
              />
            </div>
          </div>

          {/* Second image - takes 3 columns on large screens */}
          <div className="lg:col-span-3 h-full">
            <div className="relative h-[330px] md:h-[415px] lg:h-[600px] rounded-[10px] overflow-hidden border-3 border-white">
              <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              <Image
                src="/images/Leonardo_Phoenix_10_I_want_a_visually_appealing_still_life_ima_2 (1).png"
                alt="Still life pottery image"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading="lazy"
              />
            </div>
          </div>

          {/* Third image with content overlay - takes 6 columns on large screens */}
          <div className="lg:col-span-6 h-full">
            <div className="relative h-[415px] md:h-[500px] lg:h-[600px] rounded-[10px] overflow-hidden border-3 border-white">
              <div className="absolute inset-0 bg-black bg-opacity-60"></div>
              <Image
                src="/images/ceramic-pottery-tools-still-life.png"
                alt="Pottery tools still life"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />

              {/* Content overlay */}
              <div className="absolute inset-0 flex flex-col justify-center p-6 md:p-10 lg:p-12">
                <h2 className="text-3xl md:text-4xl lg:text-[48px] font-bold text-white mb-3 font-['Gill_Sans_MT']">
                  Deals Of The Month
                </h2>
                <p className="text-base md:text-lg lg:text-[18px] text-white mb-6 max-w-[400px] font-['Gill_Sans_MT']">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Scelerisque duis ultrices sollicitudin aliquam sem.
                  Scelerisque duis ultrices sollicitudin
                </p>

                {/* Shop now button */}
                <Button
                  className="w-[260px] md:w-[300px] lg:w-[350px] h-[45px] md:h-[55px] lg:h-[60px] bg-[--primary] hover:bg-[#018e01] text-white rounded-[30px] shadow-lg text-lg font-['Gill_Sans_MT'] mt-3"
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

                {/* Countdown timer section */}
                <div className="mt-12 md:mt-16 lg:mt-20">
                  <p className="text-xl md:text-2xl lg:text-[32px] text-white mb-3 font-['Gill_Sans_MT']">
                    Hurry, Before It&apos;s Too Late!
                  </p>
                  <div className="flex gap-3 md:gap-5">
                    {/* Days */}
                    <div className="flex flex-col items-center">
                      <div className="w-[55px] h-[55px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl lg:text-[28px] text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                          {formatNumber(timeLeft.days)}
                        </span>
                      </div>
                      <span className="text-base md:text-lg lg:text-xl text-white mt-1.5">
                        Days
                      </span>
                    </div>

                    {/* Hours */}
                    <div className="flex flex-col items-center">
                      <div className="w-[55px] h-[55px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl lg:text-[28px] text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                          {formatNumber(timeLeft.hours)}
                        </span>
                      </div>
                      <span className="text-base md:text-lg lg:text-xl text-white mt-1.5">
                        Hr
                      </span>
                    </div>

                    {/* Minutes */}
                    <div className="flex flex-col items-center">
                      <div className="w-[55px] h-[55px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl lg:text-[28px] text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                          {formatNumber(timeLeft.minutes)}
                        </span>
                      </div>
                      <span className="text-base md:text-lg lg:text-xl text-white mt-1.5">
                        Mins
                      </span>
                    </div>

                    {/* Seconds */}
                    <div className="flex flex-col items-center">
                      <div className="w-[55px] h-[55px] md:w-[65px] md:h-[65px] lg:w-[70px] lg:h-[70px] bg-white rounded-[10px] shadow-md flex items-center justify-center">
                        <span className="text-xl md:text-2xl lg:text-[28px] text-[#484848] font-['Digital_Numbers', 'Arial', 'sans-serif']">
                          {formatNumber(timeLeft.seconds)}
                        </span>
                      </div>
                      <span className="text-base md:text-lg lg:text-xl text-white mt-1.5">
                        Sec
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
