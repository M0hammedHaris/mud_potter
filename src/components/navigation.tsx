"use client"

import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Navigation() {
    return (
        <header className="absolute top-0 w-full z-10">
            <nav className="flex items-center justify-between px-6 py-4 md:px-16">
                <div className="flex items-center gap-4" style={{ width: "auto", height: "36px" }}>
                    {/* Navigation Items */}
                    <Button 
                        variant="ghost" 
                        className="flex justify-center items-center px-4 py-1 w-[90px] h-[36px] bg-secondary rounded-[18px] text-primary text-[16px] font-semibold hover:bg-secondary/90"
                    >
                        Home
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="flex justify-center items-center px-4 py-1 w-[90px] h-[36px] bg-white/30 rounded-[18px] text-white/80 text-[15px] font-semibold hover:bg-white/40"
                    >
                        Shop
                    </Button>
                    <Button 
                        variant="ghost" 
                        className="flex justify-center items-center px-4 py-1 w-[90px] h-[36px] bg-white/30 rounded-[18px] text-white/80 text-[15px] font-semibold hover:bg-white/40"
                    >
                        About
                    </Button>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 text-2xl md:text-3xl font-bold text-white">LOGO</div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="rounded-full bg-gray/40 backdrop-blur-sm p-2 transition-all hover:bg-gray/60">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </Button>
                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full overflow-hidden bg-gray-200">
                        <Image 
                            src="/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png"
                            alt="Profile"
                            width={32}
                            height={32}
                            className="object-cover"
                        />
                    </div>
                </div>
            </nav>
        </header>
    );
}
