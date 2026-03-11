// Centralized data store for products, categories, and deals
// In a production app this would be a database; here we use in-memory state

export interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  originalPrice: number;
  image: string;
  hoverImage: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  dimensions: string;
  weight: string;
  material: string;
  inStock: boolean;
  isBestSeller?: boolean;
  isTrending?: boolean;
}

export interface Category {
  id: string;
  title: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  linkUrl: string;
  linkLabel: string;
  expiresAt: string; // ISO date string
}

// --- Products ---
export const products: Product[] = [
  {
    id: "1",
    title: "Classic Mud Pot",
    category: "Water Pots",
    price: 1200,
    originalPrice: 1500,
    image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png",
    hoverImage: "/images/ceramic-pottery-tools-still-life.png",
    rating: 4.8,
    reviews: 124,
    description:
      "A timeless classic, this handcrafted mud pot is made by skilled artisans using traditional techniques. Perfect for storing water naturally, keeping it cool and fresh. The natural clay material is eco-friendly and adds rustic charm to any space.",
    features: [
      "Handcrafted by artisans",
      "Natural clay material",
      "Keeps water cool",
      "Eco-friendly",
      "Food-safe finish",
    ],
    dimensions: "Height: 30cm, Diameter: 25cm",
    weight: "1.2 kg",
    material: "Natural clay / terracotta",
    inStock: true,
    isBestSeller: true,
    isTrending: false,
  },
  {
    id: "2",
    title: "Earthen Cooker",
    category: "Cookware",
    price: 1800,
    originalPrice: 2200,
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_highquality_image_of_0.png",
    hoverImage: "/images/kitchen-utensils-arrangement-top-view.png",
    rating: 4.7,
    reviews: 89,
    description:
      "Cook your favorite dishes the traditional way in this authentic earthen cooker. The porous clay material allows gentle, even heat distribution, enhancing flavors naturally. Perfect for slow-cooked curries and gravies.",
    features: [
      "Even heat distribution",
      "Enhances food flavor",
      "Slow cooking ideal",
      "Naturally non-stick",
      "Traditional design",
    ],
    dimensions: "Height: 20cm, Diameter: 22cm",
    weight: "1.5 kg",
    material: "Terracotta clay",
    inStock: true,
    isBestSeller: true,
    isTrending: false,
  },
  {
    id: "3",
    title: "Terracotta Vase",
    category: "Garden Decors",
    price: 950,
    originalPrice: 1200,
    image: "/images/vase.png",
    hoverImage: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
    rating: 4.9,
    reviews: 156,
    description:
      "Elevate your home décor with this elegant terracotta vase. The warm earthy tones complement both modern and traditional interiors. Perfect for fresh or dried flower arrangements.",
    features: [
      "Elegant design",
      "Earthy terracotta finish",
      "Stable base",
      "Multiple uses",
      "Handmade texture",
    ],
    dimensions: "Height: 35cm, Diameter: 15cm",
    weight: "0.8 kg",
    material: "Terracotta",
    inStock: true,
    isBestSeller: true,
    isTrending: true,
  },
  {
    id: "4",
    title: "Sacred Lamp",
    category: "Sacred Crafts",
    price: 650,
    originalPrice: 800,
    image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png",
    hoverImage: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png",
    rating: 4.6,
    reviews: 72,
    description:
      "A beautifully crafted sacred lamp made from pure clay, perfect for religious ceremonies and home worship. Its traditional design adds a spiritual ambiance to any space.",
    features: [
      "Pure clay material",
      "Traditional design",
      "Long-lasting",
      "Devotional use",
      "Handcrafted",
    ],
    dimensions: "Height: 12cm, Diameter: 10cm",
    weight: "0.3 kg",
    material: "Pure clay",
    inStock: true,
    isBestSeller: false,
    isTrending: true,
  },
  {
    id: "5",
    title: "Garden Planter",
    category: "Planters",
    price: 1100,
    originalPrice: 1400,
    image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
    hoverImage: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
    rating: 4.5,
    reviews: 48,
    description:
      "Transform your garden or balcony with this stunning clay planter. The breathable terracotta material promotes healthy root growth and natural drainage for your plants.",
    features: [
      "Breathable material",
      "Drainage hole included",
      "Weather resistant",
      "Promotes root health",
      "Natural look",
    ],
    dimensions: "Height: 25cm, Diameter: 28cm",
    weight: "2.0 kg",
    material: "Terracotta",
    inStock: true,
    isBestSeller: false,
    isTrending: true,
  },
  {
    id: "6",
    title: "Cooking Handi",
    category: "Cookware",
    price: 1400,
    originalPrice: 1700,
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
    hoverImage: "/images/kitchen-utensils-arrangement-top-view.png",
    rating: 4.8,
    reviews: 203,
    description:
      "The traditional Handi is the secret behind delicious biryanis and slow-cooked curries. Made from natural clay, it imparts a unique earthy flavor to your dishes.",
    features: [
      "Authentic Handi shape",
      "Clay-infused flavor",
      "Slow cooking perfect",
      "Wide mouth design",
      "Traditional craftsmanship",
    ],
    dimensions: "Height: 18cm, Diameter: 24cm",
    weight: "1.8 kg",
    material: "Natural clay",
    inStock: false,
    isBestSeller: false,
    isTrending: false,
  },
  {
    id: "7",
    title: "Water Storage Pot",
    category: "Water Pots",
    price: 2200,
    originalPrice: 2800,
    image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_2.png",
    hoverImage: "/images/close-up-hands-working-pottery.png",
    rating: 4.9,
    reviews: 178,
    description:
      "A large capacity water storage pot that naturally cools and purifies water. The micro-porous structure of the clay filters water and adds beneficial minerals.",
    features: [
      "Large capacity",
      "Natural water cooling",
      "Mineral enrichment",
      "Wide neck opening",
      "Traditional flat base",
    ],
    dimensions: "Height: 50cm, Diameter: 40cm",
    weight: "4.5 kg",
    material: "Natural clay",
    inStock: true,
    isBestSeller: false,
    isTrending: false,
  },
  {
    id: "8",
    title: "Decorative Pot",
    category: "Garden Decors",
    price: 800,
    originalPrice: 1000,
    image: "/images/ceramic-pottery-tools-still-life.png",
    hoverImage: "/images/vase.png",
    rating: 4.4,
    reviews: 61,
    description:
      "Add a touch of artisanal charm to your home with this decorative clay pot. Hand-painted with traditional motifs, it is a beautiful piece of functional art.",
    features: [
      "Hand-painted motifs",
      "Unique artistic piece",
      "Decorative and functional",
      "Indoor/outdoor use",
      "One-of-a-kind",
    ],
    dimensions: "Height: 22cm, Diameter: 18cm",
    weight: "0.9 kg",
    material: "Decorated clay",
    inStock: true,
    isBestSeller: false,
    isTrending: false,
  },
  {
    id: "9",
    title: "Herb Planter Set",
    category: "Planters",
    price: 1600,
    originalPrice: 2000,
    image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
    hoverImage: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
    rating: 4.7,
    reviews: 95,
    description:
      "A set of three matching herb planters perfect for your kitchen window or herb garden. Grow fresh basil, mint, coriander, and more in these beautiful terracotta pots.",
    features: [
      "Set of 3 planters",
      "Perfect for herbs",
      "Kitchen-friendly size",
      "Matching design",
      "Natural drainage",
    ],
    dimensions: "Height: 15cm, Diameter: 12cm each",
    weight: "0.6 kg each",
    material: "Terracotta",
    inStock: true,
    isBestSeller: false,
    isTrending: false,
  },
];

// --- Categories ---
export const categories: Category[] = [
  {
    id: "water-pots",
    title: "Water Pots",
    description: "Natural clay pots that keep water cool and fresh.",
    image: "/images/Leonardo_Phoenix_10_I_want_a_highly_detailed_and_colorful_illu_0.png",
    itemCount: 12,
  },
  {
    id: "cookware",
    title: "Cookware",
    description: "Durable, beautiful cookware crafted with traditional pottery techniques.",
    image: "/images/Leonardo_Phoenix_10_A_beautifully_styled_product_image_featuri_1.png",
    itemCount: 8,
  },
  {
    id: "garden-decors",
    title: "Garden Decors",
    description: "Elevate your outdoor spaces with our handcrafted garden pottery pieces.",
    image: "/images/Leonardo_Phoenix_10_A_peaceful_whimsical_garden_scene_featurin_3.png",
    itemCount: 15,
  },
  {
    id: "sacred-crafts",
    title: "Sacred Crafts",
    description: "Spiritual and ceremonial pottery pieces for your sacred spaces.",
    image: "/images/Flux_Dev_A_serene_and_mystical_scene_showcasing_various_sacred_3.png",
    itemCount: 6,
  },
  {
    id: "planters",
    title: "Planters",
    description: "Beautiful terracotta planters for healthy plant growth.",
    image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
    itemCount: 10,
  },
  {
    id: "decorative-items",
    title: "Decorative Items",
    description: "Artistic pottery to beautify your home and workspace.",
    image: "/images/ceramic-pottery-tools-still-life.png",
    itemCount: 18,
  },
];

// --- Deals ---
// In-memory mutable store so the admin panel can update deals
let dealsStore: Deal[] = [
  {
    id: "deal-1",
    title: "Garden Pottery",
    description: "Beautifully crafted pottery for your garden. Up to 20% off this month!",
    image: "/images/Leonardo_Phoenix_10_A_serene_inviting_garden_scene_featuring_a_3.png",
    linkUrl: "/shop?category=Garden+Decors",
    linkLabel: "Shop Now",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "deal-2",
    title: "Still Life Pottery",
    description: "Artistic pottery for your home decor at special prices.",
    image: "/images/Leonardo_Phoenix_10_I_want_a_visually_appealing_still_life_ima_2 (1).png",
    linkUrl: "/shop?category=Decorative+Items",
    linkLabel: "Shop Now",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "deal-3",
    title: "Deals Of The Month",
    description:
      "Exclusive discounts on our most popular pottery pieces. Handcrafted with love, these limited-time offers won't last long!",
    image: "/images/ceramic-pottery-tools-still-life.png",
    linkUrl: "/shop",
    linkLabel: "Shop Now",
    expiresAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export function getDeals(): Deal[] {
  return dealsStore;
}

export function getDealById(id: string): Deal | undefined {
  return dealsStore.find((d) => d.id === id);
}

export function updateDeal(id: string, data: Partial<Omit<Deal, "id">>): Deal | null {
  const idx = dealsStore.findIndex((d) => d.id === id);
  if (idx === -1) return null;
  dealsStore[idx] = { ...dealsStore[idx], ...data };
  return dealsStore[idx];
}

export function updateAllDeals(deals: Deal[]): void {
  dealsStore = deals;
}

// --- Admin credentials ---
export const ADMIN_USERNAME = "admin";
export const ADMIN_PASSWORD = "admin";
export const ADMIN_SESSION_COOKIE = "mud_potter_admin_session";
export const ADMIN_SESSION_VALUE = "authenticated";
