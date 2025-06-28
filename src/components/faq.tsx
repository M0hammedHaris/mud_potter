"use client";

import React, { useState, useEffect, useRef } from "react";
import { ViewMoreButton } from "@/components/ui/view-more-button";
import { cn } from "@/lib/utils";

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  toggleItem: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, toggleItem }) => {
  return (
    <div className="rounded-lg border border-border bg-white w-full overflow-hidden" data-testid={`faq-item-${id}`}>
      <h2>
        <button
          type="button"
          onClick={toggleItem}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          data-testid={`faq-question-${id}`}
          className="flex items-center justify-between w-full p-4 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors hover:bg-muted/30"
        >
          <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-foreground pr-2 break-words">{question}</span>
          <span className="ml-2 sm:ml-6 flex-shrink-0">
            <svg
              className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              } text-primary`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              strokeWidth="2"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`faq-answer-${id}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
        data-testid={`faq-answer-${id}`}
      >
        <div className="p-4 sm:p-6 pt-0 pb-6 sm:pb-8">
          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground break-words">{answer}</p>
        </div>
      </div>
    </div>
  );
};

const faqData = [
  {
    id: "q1",
    question: "HOW DO I TRACK MY ORDER?",
    answer: "Once your order has shipped, you will receive an email with a tracking number and a link to the carrier\'s website. You can use this information to track the status of your delivery.",
  },
  {
    id: "q2",
    question: "WHAT IS YOUR RETURN AND EXCHANGE POLICY?",
    answer: "We offer a 30-day return and exchange policy for most items. Please visit our returns page for detailed information and instructions.",
  },
  {
    id: "q3",
    question: "HOW LONG WILL IT TAKE FOR MY ORDER TO ARRIVE?",
    answer: "Order processing typically takes 1-2 business days. Shipping times vary depending on your location and the shipping method selected. Standard shipping usually takes 3-7 business days.",
  },
  {
    id: "q4",
    question: "HOW CAN I CONTACT CUSTOMER SUPPORT?",
    answer: "You can contact our customer support team via email at support@mudpotter.com or by calling our toll-free number at 1-800-MUD-POTS during business hours (Monday-Friday, 9 AM - 5 PM EST).",
  },
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement | null>(null);

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

  const toggleItem = (id: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  return (
    <section 
      ref={sectionRef} 
      className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-8 overflow-hidden" 
      data-testid="faq-section"
    >
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center mb-6 sm:mb-8 md:mb-12">
          <h2 className={cn(
            "text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground",
            isVisible ? "animate-fade-in-left" : "opacity-0"
          )}>
            FAQ
          </h2>
          <ViewMoreButton 
            href="/faq" 
            variant="accent"
            arrowClassName="bg-primary md:w-16 md:h-16"
            className={cn(isVisible ? "animate-fade-in-right" : "opacity-0")}
          />
        </div>
        <hr className={cn("border-t border-border mb-6 sm:mb-8 md:mb-12", isVisible ? "animate-fade-in delay-200" : "opacity-0")} />
        <div 
          ref={itemsContainerRef}
          className="space-y-4 sm:space-y-8"
        >
          {faqData.map((item, index) => (
            <div 
              key={item.id}
              className={cn(
                isVisible ? "animate-fade-in" : "opacity-0",
                `delay-${(index + 2) * 100}`
              )}
            >
              <FAQItemComponent
                id={item.id}
                question={item.question}
                answer={item.answer}
                isOpen={!!openItems[item.id]}
                toggleItem={() => toggleItem(item.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
