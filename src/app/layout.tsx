import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ScriptLoader from "@/components/script-loader";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ScriptLoader />
        {children}
      </body>
    </html>
  );
}
