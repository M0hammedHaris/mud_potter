import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";

const geistSans = localFont({
  src: "../../public/fonts/Geist-Variable.woff2",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMono-Variable.woff2",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Mud Potter",
  description: "Explore the Creative World of Mud Crafting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="no-js">
      <ClientLayoutWrapper bodyClassName={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </ClientLayoutWrapper>
    </html>
  );
}
