"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
      </svg>
    ),
    title: "Visit Us",
    lines: ["123 Pottery Lane, Artisan District", "Bangalore, Karnataka 560001"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
      </svg>
    ),
    title: "Call Us",
    lines: ["+91 98765 43210", "Mon–Sat, 9 AM – 6 PM"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
      </svg>
    ),
    title: "Email Us",
    lines: ["info@mudpotter.com", "support@mudpotter.com"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Working Hours",
    lines: ["Monday – Saturday", "9:00 AM – 6:00 PM IST"],
  },
];

export default function ContactPage() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      {/* Hero */}
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden">
        <Image
          src="/images/ceramic-pottery-tools-still-life.png"
          alt="Contact Mud Potter"
          fill
          sizes="100vw"
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pt-20">
          <h1 className="text-4xl md:text-6xl font-bold font-['Gill_Sans_MT'] mb-4">Get in Touch</h1>
          <p className="text-lg md:text-xl text-white/80 max-w-xl">
            We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
          </p>
        </div>
      </div>

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 max-w-6xl py-16">

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {contactInfo.map((info, index) => (
            <div
              key={info.title}
              className={cn("bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] hover:shadow-md transition-shadow text-center", isVisible ? "animate-fade-in" : "opacity-0")}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-green-50 text-[var(--primary)] rounded-full flex items-center justify-center mx-auto mb-4">
                {info.icon}
              </div>
              <h3 className="font-bold text-[var(--foreground)] mb-2">{info.title}</h3>
              {info.lines.map((line, i) => (
                <p key={i} className="text-sm text-[var(--muted-foreground)]">{line}</p>
              ))}
            </div>
          ))}
        </div>

        {/* Form and Map */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Form */}
          <div className={cn(isVisible ? "animate-fade-in-left" : "opacity-0")}>
            <h2 className="text-3xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">Send Us a Message</h2>

            {isSubmitted ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Message Sent!</h3>
                <p className="text-green-700 mb-6">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[var(--primary)] font-medium hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Full Name *</label>
                    <input
                      {...register("name")}
                      placeholder="Rahul Sharma"
                      className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors", errors.name ? "border-red-400 bg-red-50" : "border-[var(--border)] bg-white")}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Phone (Optional)</label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="9876543210"
                      className="w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Email Address *</label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="rahul@example.com"
                    className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors", errors.email ? "border-red-400 bg-red-50" : "border-[var(--border)] bg-white")}
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Subject *</label>
                  <input
                    {...register("subject")}
                    placeholder="Order inquiry, Custom pottery request..."
                    className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors", errors.subject ? "border-red-400 bg-red-50" : "border-[var(--border)] bg-white")}
                  />
                  {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium text-[var(--foreground)] block mb-2">Message *</label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us how we can help you..."
                    className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors resize-none", errors.message ? "border-red-400 bg-red-50" : "border-[var(--border)] bg-white")}
                  />
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send Message →"}
                </button>
              </form>
            )}
          </div>

          {/* Right side: Image + FAQ hint */}
          <div className={cn("flex flex-col gap-8", isVisible ? "animate-fade-in-right" : "opacity-0")}>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png"
                alt="Our workshop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="bg-white rounded-2xl p-6 border border-[var(--border)] shadow-sm">
              <h3 className="text-xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-3">Common Questions</h3>
              <div className="space-y-3 text-sm">
                {[
                  { q: "Do you accept custom orders?", a: "Yes! Contact us with your requirements and our artisans will craft it for you." },
                  { q: "What is your return policy?", a: "We offer 30-day returns for damaged or defective items." },
                  { q: "How long does shipping take?", a: "Standard shipping takes 5–7 business days across India." },
                ].map(({ q, a }) => (
                  <div key={q} className="pb-3 border-b border-[var(--border)] last:border-0 last:pb-0">
                    <p className="font-medium text-[var(--foreground)] mb-1">{q}</p>
                    <p className="text-[var(--muted-foreground)]">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
