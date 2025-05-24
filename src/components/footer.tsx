import Link from 'next/link';
import { Facebook, Instagram, XIcon, MapPin, Phone, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[var(--secondary)] text-[var(--secondary-foreground)] border-t border-[var(--border)]">
      {/* Main footer content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-6 text-[var(--foreground)]">MUDPOT</h3>
            <p className="text-[var(--muted-foreground)] text-sm mb-6">
              Handcrafted pottery and mud pots made with love and care. Each piece tells a unique story of tradition and artistry.
            </p>
            <div className="flex space-x-4 justify-center md:justify-start">
              <a href="#" aria-label="Facebook" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-[var(--muted-foreground)] hover:text-[var(--primary)] transition-colors">
                <XIcon size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Shop</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/products" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/categories/water-pots" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Water Pots
                </Link>
              </li>
              <li>
                <Link href="/categories/cooking-pots" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Cooking Pots
                </Link>
              </li>
              <li>
                <Link href="/categories/decorative" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Decorative Items
                </Link>
              </li>
              <li>
                <Link href="/categories/planters" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Planters
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/contact" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/care" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Product Care
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                  Track Order
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-[var(--foreground)] mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 justify-center md:justify-start">
                <MapPin size={18} className="text-[var(--primary)] mt-0.5 flex-shrink-0" />
                <span className="text-[var(--muted-foreground)] text-sm">
                  123 Pottery Lane, Artisan District, Bangalore, 560001
                </span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Phone size={18} className="text-[var(--primary)] flex-shrink-0" />
                <span className="text-[var(--muted-foreground)] text-sm">+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 justify-center md:justify-start">
                <Mail size={18} className="text-[var(--primary)] flex-shrink-0" />
                <span className="text-[var(--muted-foreground)] text-sm">info@mudpot.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Copyright section */}
      <div className="border-t border-[var(--border)] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
            <p className="text-[var(--muted-foreground)] text-sm">
              &copy; {new Date().getFullYear()} MudPot. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[var(--muted-foreground)] text-sm hover:text-[var(--primary)] transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
