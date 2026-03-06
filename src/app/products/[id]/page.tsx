"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

const products = [
  { id: "1", title: "Classic Mud Pot", category: "Water Pots", price: 1200, originalPrice: 1500, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png", hoverImage: "/images/ceramic-pottery-tools-still-life.png", rating: 4.8, reviews: 124, description: "A timeless classic, this handcrafted mud pot is made by skilled artisans using traditional techniques. Perfect for storing water naturally, keeping it cool and fresh. The natural clay material is eco-friendly and adds rustic charm to any space.", features: ["Handcrafted by artisans", "Natural clay material", "Keeps water cool", "Eco-friendly", "Food-safe finish"], dimensions: "Height: 30cm, Diameter: 25cm", weight: "1.2 kg", material: "Natural clay / terracotta", inStock: true },
  { id: "2", title: "Earthen Cooker", category: "Cookware", price: 1800, originalPrice: 2200, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png", hoverImage: "/images/kitchen-utensils-arrangement-top-view.png", rating: 4.7, reviews: 89, description: "Cook your favorite dishes the traditional way in this authentic earthen cooker. The porous clay material allows gentle, even heat distribution, enhancing flavors naturally. Perfect for slow-cooked curries and gravies.", features: ["Even heat distribution", "Enhances food flavor", "Slow cooking ideal", "Naturally non-stick", "Traditional design"], dimensions: "Height: 20cm, Diameter: 22cm", weight: "1.5 kg", material: "Terracotta clay", inStock: true },
  { id: "3", title: "Terracotta Vase", category: "Garden Decors", price: 950, originalPrice: 1200, image: "/images/vase.png", hoverImage: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png", rating: 4.9, reviews: 156, description: "Elevate your home décor with this elegant terracotta vase. The warm earthy tones complement both modern and traditional interiors. Perfect for fresh or dried flower arrangements.", features: ["Elegant design", "Earthy terracotta finish", "Stable base", "Multiple uses", "Handmade texture"], dimensions: "Height: 35cm, Diameter: 15cm", weight: "0.8 kg", material: "Terracotta", inStock: true },
  { id: "4", title: "Sacred Lamp", category: "Sacred Crafts", price: 650, originalPrice: 800, image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png", hoverImage: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png", rating: 4.6, reviews: 72, description: "A beautifully crafted sacred lamp made from pure clay, perfect for religious ceremonies and home worship. Its traditional design adds a spiritual ambiance to any space.", features: ["Pure clay material", "Traditional design", "Long-lasting", "Devotional use", "Handcrafted"], dimensions: "Height: 12cm, Diameter: 10cm", weight: "0.3 kg", material: "Pure clay", inStock: true },
  { id: "5", title: "Garden Planter", category: "Planters", price: 1100, originalPrice: 1400, image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png", hoverImage: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png", rating: 4.5, reviews: 48, description: "Transform your garden or balcony with this stunning clay planter. The breathable terracotta material promotes healthy root growth and natural drainage for your plants.", features: ["Breathable material", "Drainage hole included", "Weather resistant", "Promotes root health", "Natural look"], dimensions: "Height: 25cm, Diameter: 28cm", weight: "2.0 kg", material: "Terracotta", inStock: true },
  { id: "6", title: "Cooking Handi", category: "Cookware", price: 1400, originalPrice: 1700, image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png", hoverImage: "/images/kitchen-utensils-arrangement-top-view.png", rating: 4.8, reviews: 203, description: "The traditional Handi is the secret behind delicious biryanis and slow-cooked curries. Made from natural clay, it imparts a unique earthy flavor to your dishes.", features: ["Authentic Handi shape", "Clay-infused flavor", "Slow cooking perfect", "Wide mouth design", "Traditional craftsmanship"], dimensions: "Height: 18cm, Diameter: 24cm", weight: "1.8 kg", material: "Natural clay", inStock: false },
  { id: "7", title: "Water Storage Pot", category: "Water Pots", price: 2200, originalPrice: 2800, image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png", hoverImage: "/images/close-up-hands-working-pottery.png", rating: 4.9, reviews: 178, description: "A large capacity water storage pot that naturally cools and purifies water. The micro-porous structure of the clay filters water and adds beneficial minerals.", features: ["Large capacity", "Natural water cooling", "Mineral enrichment", "Wide neck opening", "Traditional flat base"], dimensions: "Height: 50cm, Diameter: 40cm", weight: "4.5 kg", material: "Natural clay", inStock: true },
  { id: "8", title: "Decorative Pot", category: "Garden Decors", price: 800, originalPrice: 1000, image: "/images/ceramic-pottery-tools-still-life.png", hoverImage: "/images/vase.png", rating: 4.4, reviews: 61, description: "Add a touch of artisanal charm to your home with this decorative clay pot. Hand-painted with traditional motifs, it is a beautiful piece of functional art.", features: ["Hand-painted motifs", "Unique artistic piece", "Decorative and functional", "Indoor/outdoor use", "One-of-a-kind"], dimensions: "Height: 22cm, Diameter: 18cm", weight: "0.9 kg", material: "Decorated clay", inStock: true },
  { id: "9", title: "Herb Planter Set", category: "Planters", price: 1600, originalPrice: 2000, image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png", hoverImage: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png", rating: 4.7, reviews: 95, description: "A set of three matching herb planters perfect for your kitchen window or herb garden. Grow fresh basil, mint, coriander, and more in these beautiful terracotta pots.", features: ["Set of 3 planters", "Perfect for herbs", "Kitchen-friendly size", "Matching design", "Natural drainage"], dimensions: "Height: 15cm, Diameter: 12cm each", weight: "0.6 kg each", material: "Terracotta", inStock: true },
];

const relatedProductCount = 3;

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find(p => p.id === id) || products[0];
  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, relatedProductCount);
  const otherProducts = products.filter(p => p.id !== product.id && p.category !== product.category).slice(0, relatedProductCount - relatedProducts.length);
  const displayRelated = [...relatedProducts, ...otherProducts].slice(0, relatedProductCount);

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Navigation />

      <div className="container mx-auto px-4 md:px-8 py-8 max-w-7xl pt-24">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-8">
          <Link href="/" className="hover:text-[var(--primary)] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[var(--primary)] transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-[var(--foreground)]">{product.title}</span>
        </nav>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
          {/* Images */}
          <div className="flex flex-col gap-4">
            <div className="relative h-[420px] md:h-[520px] rounded-2xl overflow-hidden bg-white shadow-md">
              <Image src={selectedImage} alt={product.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
              {discount > 0 && (
                <div className="absolute top-4 left-4 bg-[var(--primary)] text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discount}%
                </div>
              )}
            </div>
            {/* Thumbnail row */}
            <div className="flex gap-3">
              {[product.image, product.hoverImage].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`relative h-20 w-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImage === img ? "border-[var(--primary)] shadow-md" : "border-transparent"}`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--primary)] mb-2">{product.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-4">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-[#FFD500]" : "text-gray-200"}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--foreground)]">{product.rating}</span>
              <span className="text-sm text-[var(--muted-foreground)]">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-[var(--foreground)]">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-[var(--muted-foreground)] line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-sm font-medium">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
            </div>

            {/* Description */}
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6">{product.description}</p>

            {/* Details */}
            <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
              <div className="bg-white rounded-xl p-3 border border-[var(--border)]">
                <span className="text-[var(--muted-foreground)] block">Material</span>
                <span className="font-medium text-[var(--foreground)]">{product.material}</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[var(--border)]">
                <span className="text-[var(--muted-foreground)] block">Weight</span>
                <span className="font-medium text-[var(--foreground)]">{product.weight}</span>
              </div>
              <div className="bg-white rounded-xl p-3 border border-[var(--border)] col-span-2">
                <span className="text-[var(--muted-foreground)] block">Dimensions</span>
                <span className="font-medium text-[var(--foreground)]">{product.dimensions}</span>
              </div>
            </div>

            {/* Stock indicator */}
            <div className="flex items-center gap-2 mb-6">
              <span className={`w-2 h-2 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity & Cart */}
            {product.inStock && (
              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center border border-[var(--border)] rounded-full overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-lg font-medium hover:bg-[var(--accent)] transition-colors"
                  >−</button>
                  <span className="px-4 py-2 text-base font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-4 py-2 text-lg font-medium hover:bg-[var(--accent)] transition-colors"
                  >+</button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 min-w-[180px] bg-[var(--primary)] text-white px-6 py-3 rounded-full font-semibold hover:bg-[var(--primary)]/90 transition-all duration-300 hover:shadow-lg active:scale-95"
                >
                  {addedToCart ? "✓ Added to Cart!" : "Add to Cart"}
                </button>
              </div>
            )}

            {/* Features */}
            <div className="border-t border-[var(--border)] pt-6">
              <h3 className="font-semibold text-[var(--foreground)] mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                    <svg className="w-4 h-4 text-[var(--primary)] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {displayRelated.length > 0 && (
          <div>
            <h2 className="text-3xl font-bold font-['Gill_Sans_MT'] text-[var(--foreground)] mb-2">You May Also Like</h2>
            <hr className="border-t border-[var(--border)] mb-8" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayRelated.map(p => (
                <Link key={p.id} href={`/products/${p.id}`}>
                  <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                    <div className="relative h-56 overflow-hidden">
                      <Image src={p.image} alt={p.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold font-['Gill_Sans_MT'] text-[var(--foreground)]">{p.title}</h3>
                      <p className="text-[var(--primary)] font-bold mt-1">₹{p.price.toLocaleString()}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
