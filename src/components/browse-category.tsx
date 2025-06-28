"use client";
import Image from "next/image";
import { ViewMoreButton } from "@/components/ui/view-more-button";
import { motion, Variants } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// Define category type
type CategorySize = "large" | "small";

interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  size: CategorySize;
}

// Category data with descriptions
const categories: Category[] = [
	{
		id: "garden-decors",
		title: "Garden Decors",
		description:
			"Elevate your outdoor spaces with our handcrafted garden pottery pieces.",
		image:
			"/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
		size: "large",
	},
	{
		id: "cookware",
		title: "Cookware",
		description:
			"Durable, beautiful cookware crafted with traditional pottery techniques.",
		image:
			"/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
		size: "small",
	},
	{
		id: "sacred-crafts",
		title: "Sacred Crafts",
		description:
			"Spiritual and ceremonial pottery pieces for your sacred spaces.",
		image:
			"/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png",
		size: "small",
	},
];

export function BrowseCategory() {
	const [hoveredId, setHoveredId] = useState<string | null>(null);
	const [isVisible, setIsVisible] = useState(false);
	const sectionRef = useRef<HTMLElement>(null);

	// Container animation variants
	const containerVariants = {
		hidden: {},
		visible: {
			transition: {
				staggerChildren: 0.2,
			},
		},
	};

	// Item animation variants
	const leftItemVariants = {
		hidden: { opacity: 0, x: -50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	};

	const rightItemVariants = {
		hidden: { opacity: 0, x: 50 },
		visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
	};

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

	return (
		<section ref={sectionRef} className="py-12 md:py-16 lg:py-20 px-8 bg-[var(--background)] overflow-hidden">
			<div className="container mx-auto max-w-full">
				{/* Header: Title and View More button */}
				<div className="flex flex-col sm:flex-row justify-between items-start gap-4 sm:items-center mb-8 md:mb-10">
					<h2 className={cn(
						"text-4xl sm:text-5xl md:text-5xl font-bold text-[var(--foreground)] mb-4 sm:mb-0",
						isVisible ? "animate-fade-in-left" : "opacity-0"
					)}>
						Browse by Category
					</h2>
					<ViewMoreButton 
						href="/categories" 
						className={cn("text-lg", isVisible ? "animate-fade-in-right" : "opacity-0")}
					/>
				</div>

				{/* Separator Line */}
				<hr className={cn(
					"mb-8 md:mb-12 border-t border-[var(--border)]",
					isVisible ? "animate-fade-in delay-200" : "opacity-0"
				)} />

				{/* Categories Grid */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ margin: "-100px" }}
					className="flex flex-col lg:flex-row gap-4 lg:gap-6 w-full"
				>
					{/* Garden Decors - Large Card */}
					<motion.div 
						variants={leftItemVariants}
						className={`transition-all duration-500`}
						style={{ 
							flex: hoveredId === "garden-decors" ? "2 1 0%" : 
								  (hoveredId === "cookware" || hoveredId === "sacred-crafts") ? "1 1 0%" : "1.5 1 0%",
							transition: "flex 0.5s ease-in-out"
						}}
					>
						<CategoryCard
							category={categories[0]}
							hoveredId={hoveredId}
							setHoveredId={setHoveredId}
						/>
					</motion.div>

					{/* Right column with two cards */}
					<motion.div
						variants={rightItemVariants}
						className="flex flex-col gap-4 transition-all duration-500"
						style={{ 
							flex: (hoveredId === "cookware" || hoveredId === "sacred-crafts") ? "2 1 0%" : 
								 hoveredId === "garden-decors" ? "1 1 0%" : "1.5 1 0%",
							transition: "flex 0.5s ease-in-out"
						}}
					>
						{/* Cookware */}
						<CategoryCard
							category={categories[1]}
							hoveredId={hoveredId}
							setHoveredId={setHoveredId}
						/>

						{/* Sacred Crafts */}
						<CategoryCard
							category={categories[2]}
							hoveredId={hoveredId}
							setHoveredId={setHoveredId}
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

interface CategoryCardProps {
	category: Category;
	hoveredId: string | null;
	setHoveredId: (id: string | null) => void;
	variants?: Variants;
}

function CategoryCard({
	category,
	hoveredId,
	setHoveredId,
	variants,
}: CategoryCardProps) {
	const isHovered = hoveredId === category.id;
	const isShrinking = hoveredId !== null && hoveredId !== category.id;
	const isLarge = category.size === "large";

	return (
		<motion.div
			variants={variants}
			className={`relative rounded-lg overflow-hidden transition-all duration-500 cursor-pointer ${
				isLarge ? "h-[498px]" : "h-[240px]"
			} ${isHovered ? "z-10" : ""}`}
			onMouseEnter={() => setHoveredId(category.id)}
			onMouseLeave={() => setHoveredId(null)}
			whileHover={{ scale: 1.05 }}
			animate={{
				scale: isHovered ? 1.05 : isShrinking ? 0.95 : 1
			}}
			transition={{ duration: 0.4 }}
		>
			{/* Gradient overlay */}
			<div
				className={`absolute inset-0 bg-gradient-to-t from-overlay via-overlay/40 to-transparent z-10 transition-opacity duration-300 ${
					isHovered ? "opacity-80" : "opacity-100"
				}`}
			></div>

			{/* Image */}
			<Image
				src={category.image}
				alt={category.title}
				fill
				className={`object-cover transition-transform duration-500 ${
					isHovered ? "scale-110" : "scale-100"
				}`}
			/>

			{/* Content */}
			<div className="absolute bottom-0 left-0 w-full p-6 z-20 transition-all duration-500">
				<h3
					className={`text-3xl md:text-4xl font-bold text-white font-['Gill_Sans_MT'] transition-transform duration-500 ${
						isHovered ? "transform -translate-y-2" : ""
					}`}
				>
					{category.title}
				</h3>

				{/* Description - appears on hover */}
				<motion.div
					initial={{ opacity: 0, height: 0 }}
					animate={{
						opacity: isHovered ? 1 : 0,
						height: isHovered ? "auto" : 0,
						marginTop: isHovered ? 10 : 0,
					}}
					transition={{ duration: 0.3 }}
					className="text-white text-lg"
				>
					{category.description}
				</motion.div>
			</div>
		</motion.div>
	);
}
