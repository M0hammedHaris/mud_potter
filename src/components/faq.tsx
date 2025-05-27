"use client";

import React, { useState } from "react";
import { ViewMoreButton } from "@/components/ui/view-more-button"; // Assuming this path is correct

interface FAQItemProps {
  id: string;
  question: string;
  answer: string;
  isOpen: boolean;
  toggleItem: () => void;
}

const FAQItemComponent: React.FC<FAQItemProps> = ({ id, question, answer, isOpen, toggleItem }) => {
  return (
    <div className="bg-white rounded-lg shadow-md" data-testid={`faq-item-${id}`}>
      <h2>
        <button
          type="button"
          onClick={toggleItem}
          aria-expanded={isOpen}
          aria-controls={`faq-answer-${id}`}
          data-testid={`faq-question-${id}`}
          className="flex items-center justify-between w-full p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <span className="text-xl md:text-2xl font-semibold text-card-foreground">{question}</span>
          <span className="ml-6 flex-shrink-0">
            <svg
              className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
                isOpen ? "rotate-180" : "rotate-0"
              } text-card-foreground`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={`faq-answer-${id}`}
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          isOpen ? "max-h-[1000px]" : "max-h-0"
        }`}
        data-testid={`faq-answer-${id}`}
      >
        <div className="p-6 pt-0">
          <p className="text-base md:text-lg text-muted-foreground">{answer}</p>
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

  const toggleItem = (id: string) => {
    setOpenItems((prevOpenItems) => ({
      ...prevOpenItems,
      [id]: !prevOpenItems[id],
    }));
  };

  return (
    // <section className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]">
    //   <div className="container mx-auto max-w-full"></div>
    <section className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)]" data-testid="faq-section">
      <div className="container mx-auto max-w-full">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 md:mb-12">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 sm:mb-0">
            FAQ
          </h2>
          <ViewMoreButton href="/faq" />
        </div>
        <hr className="border-t border-border mb-8 md:mb-12" />
        <div className="space-y-10">
          {faqData.map((item) => (
            <FAQItemComponent
              key={item.id}
              id={item.id}
              question={item.question}
              answer={item.answer}
              isOpen={!!openItems[item.id]}
              toggleItem={() => toggleItem(item.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
