"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  address: z.string().min(5, "Please enter your full address"),
  city: z.string().min(2, "Please enter your city"),
  state: z.string().min(2, "Please enter your state"),
  pincode: z.string().length(6, "Please enter a valid 6-digit pincode"),
  paymentMethod: z.enum(["cod", "card", "upi"]),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const cartItems = [
  { id: "1", title: "Classic Mud Pot", price: 1200, quantity: 2, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png" },
  { id: "2", title: "Earthen Cooker", price: 1800, quantity: 1, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png" },
  { id: "3", title: "Terracotta Vase", price: 950, quantity: 1, image: "/images/vase.png" },
];

const steps = ["Shipping", "Payment", "Review"];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const subtotal = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const shipping = subtotal > 2000 ? 0 : 150;
  const total = subtotal + shipping;

  const { register, handleSubmit, watch, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: { paymentMethod: "cod" },
  });

  const paymentMethod = watch("paymentMethod");

  const onSubmit = () => {
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[var(--background)]">
        <Navigation />
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center pb-20">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-fade-in">
            <svg className="w-14 h-14 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4 animate-fade-in delay-100">
            Order Placed Successfully!
          </h1>
          <p className="text-[var(--muted-foreground)] max-w-md mb-2 animate-fade-in delay-200">
            Thank you for your purchase. We&apos;ve received your order and will start processing it right away.
          </p>
          <p className="text-[var(--muted-foreground)] mb-8 animate-fade-in delay-200">
            Order confirmation has been sent to your email.
          </p>
          <div className="flex flex-wrap gap-4 justify-center animate-fade-in delay-300">
            <Link href="/shop" className="bg-[var(--primary)] text-white px-8 py-4 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all">
              Continue Shopping
            </Link>
            <Link href="/" className="border border-[var(--border)] text-[var(--foreground)] px-8 py-4 rounded-full font-semibold hover:bg-[var(--accent)] transition-all">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      <div ref={sectionRef} className="container mx-auto px-4 md:px-8 py-8 max-w-6xl pt-28">
        {/* Page Header */}
        <div className={cn("mb-8", isVisible ? "animate-fade-in" : "opacity-0")}>
          <h1 className="text-4xl md:text-5xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">Checkout</h1>
        </div>

        {/* Step Indicator */}
        <div className={cn("flex items-center gap-2 mb-10", isVisible ? "animate-fade-in delay-100" : "opacity-0")}>
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-2">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                i < currentStep ? "bg-[var(--primary)] text-white" : i === currentStep ? "bg-[var(--primary)] text-white" : "bg-[var(--border)] text-[var(--muted-foreground)]"
              )}>
                {i < currentStep ? "✓" : i + 1}
              </div>
              <span className={cn("text-sm font-medium hidden sm:block", i === currentStep ? "text-[var(--foreground)]" : "text-[var(--muted-foreground)]")}>{step}</span>
              {i < steps.length - 1 && <div className={cn("w-8 md:w-16 h-0.5 mx-1", i < currentStep ? "bg-[var(--primary)]" : "bg-[var(--border)]")} />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              {currentStep === 0 && (
                <div className={cn("bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border)]", isVisible ? "animate-fade-in delay-200" : "opacity-0")}>
                  <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">Shipping Information</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { name: "firstName" as const, label: "First Name", placeholder: "Rahul" },
                      { name: "lastName" as const, label: "Last Name", placeholder: "Sharma" },
                    ].map(({ name, label, placeholder }) => (
                      <div key={name}>
                        <label className="text-sm font-medium text-[var(--foreground)] block mb-2">{label}</label>
                        <input
                          {...register(name)}
                          placeholder={placeholder}
                          className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors", errors[name] ? "border-red-400 bg-red-50" : "border-[var(--border)]")}
                        />
                        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
                      </div>
                    ))}
                    {[
                      { name: "email" as const, label: "Email Address", placeholder: "rahul@example.com", type: "email", colSpan: false },
                      { name: "phone" as const, label: "Phone Number", placeholder: "9876543210", type: "tel", colSpan: false },
                      { name: "address" as const, label: "Street Address", placeholder: "123 Main St, Apartment 4B", type: "text", colSpan: true },
                      { name: "city" as const, label: "City", placeholder: "Bangalore", type: "text", colSpan: false },
                      { name: "state" as const, label: "State", placeholder: "Karnataka", type: "text", colSpan: false },
                      { name: "pincode" as const, label: "Pincode", placeholder: "560001", type: "text", colSpan: false },
                    ].map(({ name, label, placeholder, type, colSpan }) => (
                      <div key={name} className={colSpan ? "sm:col-span-2" : ""}>
                        <label className="text-sm font-medium text-[var(--foreground)] block mb-2">{label}</label>
                        <input
                          {...register(name)}
                          type={type}
                          placeholder={placeholder}
                          className={cn("w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)] transition-colors", errors[name] ? "border-red-400 bg-red-50" : "border-[var(--border)]")}
                        />
                        {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]?.message}</p>}
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="mt-8 w-full bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg"
                  >
                    Continue to Payment →
                  </button>
                </div>
              )}

              {currentStep === 1 && (
                <div className={cn("bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border)]", isVisible ? "animate-fade-in" : "opacity-0")}>
                  <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    {[
                      { value: "cod", label: "Cash on Delivery", icon: "💵", desc: "Pay when your order arrives" },
                      { value: "upi", label: "UPI Payment", icon: "📱", desc: "Pay via UPI apps like GPay, PhonePe" },
                      { value: "card", label: "Credit / Debit Card", icon: "💳", desc: "Secure payment via card" },
                    ].map(({ value, label, icon, desc }) => (
                      <label
                        key={value}
                        className={cn(
                          "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200",
                          paymentMethod === value ? "border-[var(--primary)] bg-green-50" : "border-[var(--border)] hover:border-[var(--primary)]/50"
                        )}
                      >
                        <input type="radio" value={value} {...register("paymentMethod")} className="sr-only" />
                        <div className={cn("w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center", paymentMethod === value ? "border-[var(--primary)]" : "border-gray-300")}>
                          {paymentMethod === value && <div className="w-2.5 h-2.5 rounded-full bg-[var(--primary)]" />}
                        </div>
                        <span className="text-2xl">{icon}</span>
                        <div>
                          <div className="font-semibold text-[var(--foreground)]">{label}</div>
                          <div className="text-xs text-[var(--muted-foreground)]">{desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-4 mt-8">
                    <button type="button" onClick={() => setCurrentStep(0)} className="flex-1 border border-[var(--border)] text-[var(--foreground)] py-4 px-6 rounded-full font-semibold hover:bg-[var(--accent)] transition-all">
                      ← Back
                    </button>
                    <button type="button" onClick={() => setCurrentStep(2)} className="flex-1 bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg">
                      Review Order →
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className={cn("bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-[var(--border)]", isVisible ? "animate-fade-in" : "opacity-0")}>
                  <h2 className="text-2xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-6">Review Your Order</h2>
                  <div className="space-y-4 mb-6">
                    {cartItems.map(item => (
                      <div key={item.id} className="flex gap-4 items-center py-3 border-b border-[var(--border)]">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                          <Image src={item.image} alt={item.title} fill sizes="64px" className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-[var(--foreground)]">{item.title}</p>
                          <p className="text-sm text-[var(--muted-foreground)]">Qty: {item.quantity}</p>
                        </div>
                        <p className="font-bold text-[var(--foreground)]">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => setCurrentStep(1)} className="flex-1 border border-[var(--border)] text-[var(--foreground)] py-4 px-6 rounded-full font-semibold hover:bg-[var(--accent)] transition-all">
                      ← Back
                    </button>
                    <button type="submit" className="flex-1 bg-[var(--primary)] text-white py-4 px-6 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all hover:shadow-lg">
                      Place Order ₹{total.toLocaleString()}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary Sidebar */}
            <div className={cn("bg-white rounded-2xl p-6 shadow-sm border border-[var(--border)] h-fit lg:sticky lg:top-28", isVisible ? "animate-fade-in delay-300" : "opacity-0")}>
              <h2 className="text-xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-5">Order Summary</h2>
              <div className="space-y-3 mb-5">
                {cartItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-[var(--muted-foreground)]">{item.title} × {item.quantity}</span>
                    <span className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[var(--border)] pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-foreground)]">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? <span className="text-green-600">Free</span> : `₹${shipping}`}</span>
                </div>
              </div>
              <div className="border-t border-[var(--border)] mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="text-lg font-bold text-[var(--foreground)]">Total</span>
                  <span className="text-xl font-bold text-[var(--foreground)]">₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
