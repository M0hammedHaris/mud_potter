"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const teamMembers = [
  {
    name: "Arjun Kumar",
    role: "Master Potter",
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png",
    bio: "With over 30 years of experience, Arjun is the heart of Mud Potter. He learned the craft from his grandfather and has trained hundreds of young artisans.",
  },
  {
    name: "Priya Nair",
    role: "Design Lead",
    image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png",
    bio: "Priya blends contemporary aesthetics with traditional forms. Her designs have won multiple national craft awards and are loved worldwide.",
  },
  {
    name: "Rajan Mehta",
    role: "Founder & CEO",
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
    bio: "Rajan started Mud Potter to preserve the dying art of traditional pottery while making it accessible to modern consumers everywhere.",
  },
];

const values = [
  { icon: "🌿", title: "Eco-Friendly", description: "All our pottery is made from natural, sustainably sourced clay. We leave no harmful footprint on the earth." },
  { icon: "🤲", title: "Handcrafted", description: "Every single piece is hand-thrown and hand-painted by skilled artisans, ensuring each item is truly one-of-a-kind." },
  { icon: "🏺", title: "Traditional Craft", description: "We preserve centuries-old pottery techniques while innovating for the modern world." },
  { icon: "❤️", title: "Community First", description: "We employ local artisans and pay fair wages, supporting rural communities and keeping traditions alive." },
];

const milestones = [
  { year: "2008", event: "Mud Potter founded in a small workshop in Rajasthan" },
  { year: "2012", event: "Expanded to 50+ artisan families across 5 states" },
  { year: "2016", event: "Launched our first e-commerce platform" },
  { year: "2019", event: "Won the National Craft Excellence Award" },
  { year: "2022", event: "Reached 10,000+ happy customers across India" },
  { year: "2024", event: "Opened our first flagship store in Bangalore" },
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[320px] overflow-hidden">
        <Image
          src="/images/close-up-hands-working-pottery.png"
          alt="About Mud Potter"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold font-['Gill_Sans_MT'] mb-4">Our Story</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl">
            From a small village workshop to your doorstep — bringing the timeless art of mud pottery to the modern world
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 max-w-6xl">

        {/* Mission */}
        <div className="py-16 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className={cn(isVisible ? "animate-fade-in-left" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">
              Preserving Ancient Craft, One Pot at a Time
            </h2>
            <p className="text-[var(--muted-foreground)] text-lg leading-relaxed mb-6">
              Mud Potter was born from a simple yet powerful vision: to preserve the centuries-old tradition of Indian pottery while making it accessible to every household. We believe that in a world of mass production, there is profound beauty in things made by human hands.
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-8">
              Each piece in our collection carries the fingerprints of the artisan who made it. It tells a story of generations of knowledge, of clay shaped by practiced hands, of art fired in traditional kilns. When you buy from Mud Potter, you become part of this living tradition.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all"
            >
              Shop Our Collection
            </Link>
          </div>
          <div className={cn("relative h-[400px] rounded-2xl overflow-hidden shadow-xl", isVisible ? "animate-fade-in-right" : "opacity-0")}>
            <Image
              src="/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png"
              alt="Our artisans at work"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Values */}
        <div className="py-12 md:py-16">
          <div className={cn("text-center mb-12", isVisible ? "animate-fade-in" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">Our Values</h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
              These principles guide everything we do at Mud Potter
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={value.title}
                className={cn("bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow", isVisible ? "animate-fade-in" : "opacity-0")}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-3">{value.title}</h3>
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="py-12 md:py-16">
          <div className={cn("text-center mb-12", isVisible ? "animate-fade-in" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">Meet Our Team</h2>
            <p className="text-[var(--muted-foreground)] text-lg max-w-xl mx-auto">
              The passionate people behind every beautiful piece of pottery
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={member.name}
                className={cn("bg-white rounded-2xl overflow-hidden shadow-sm border border-[var(--border)] hover:shadow-xl transition-all duration-500 group", isVisible ? "animate-fade-in" : "opacity-0")}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">{member.name}</h3>
                  <p className="text-sm font-medium text-[var(--primary)] mb-3">{member.role}</p>
                  <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="py-12 md:py-16">
          <div className={cn("text-center mb-12", isVisible ? "animate-fade-in" : "opacity-0")}>
            <h2 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">Our Journey</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[var(--border)] h-full hidden md:block" />
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div
                  key={milestone.year}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-4",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse",
                    isVisible ? "animate-fade-in" : "opacity-0"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={cn("flex-1 text-center md:text-right", index % 2 !== 0 ? "md:text-left" : "")}>
                    <div className={cn("inline-block bg-white rounded-2xl px-6 py-4 shadow-sm border border-[var(--border)]", index % 2 === 0 ? "md:mr-8" : "md:ml-8")}>
                      <span className="text-2xl font-bold text-[var(--primary)] block">{milestone.year}</span>
                      <p className="text-[var(--muted-foreground)] mt-1">{milestone.event}</p>
                    </div>
                  </div>
                  <div className="w-4 h-4 bg-[var(--primary)] rounded-full border-4 border-[var(--background)] relative z-10 hidden md:block flex-shrink-0" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={cn("py-12 md:py-16 bg-white rounded-3xl px-8 mb-16 shadow-sm border border-[var(--border)]", isVisible ? "animate-fade-in" : "opacity-0")}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "10,000+", label: "Happy Customers" },
              { value: "50+", label: "Artisan Families" },
              { value: "200+", label: "Unique Products" },
              { value: "15+", label: "Years of Craft" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-[var(--primary)] font-['Gill_Sans_MT']">{stat.value}</div>
                <div className="text-sm text-[var(--muted-foreground)] mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
