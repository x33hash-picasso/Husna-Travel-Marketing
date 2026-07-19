'use client';

import { useState, useEffect } from 'react';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Menu, X, ShoppingCart, Search, MessageSquare, Globe } from 'lucide-react';
import LanguageSwitcher from './language-switcher';
import { useCart } from '@/lib/context/cart-context';
import { db } from '@/lib/supabase/client';

export default function Navbar({ locale }: { locale: string }) {
  const t = useTranslations('Navbar');
  const pathname = usePathname();
  const { cartCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      const storedLogo = await db.settings.get('site_logo', null);
      if (storedLogo) setLogoUrl(storedLogo);
    };
    loadLogo();
  }, []);

  // Handle scroll event to trigger header animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { key: 'home', path: '/' },
    { key: 'umrahPackages', path: '/umrah-packages' },
    { key: 'islamicProducts', path: '/islamic-products' },
    { key: 'herbalProducts', path: '/herbal-products' },
    { key: 'aboutUs', path: '/about' },
    { key: 'contact', path: '/contact' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-primary-bg shadow-md border-b-2 border-gold-medium h-[70px]'
            : 'glass-nav border-b border-gray-200/50 h-[80px]'
        } flex items-center`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo & Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            {logoUrl ? (
              <img src={logoUrl} alt="Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            ) : (
              <div className="w-10 h-10 bg-emerald-medium text-white flex items-center justify-center rounded-full font-serif font-bold text-xl border border-gold-medium shadow-md transition-transform group-hover:scale-105">
                ح
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg md:text-xl text-emerald-dark tracking-wide leading-tight group-hover:text-emerald-medium transition-colors">
                Husna Travel
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark mt-[-2px]">
                {locale === 'ur' ? 'اور مارکیٹنگ' : '& Marketing'}
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => {
              const active = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path));
              return (
                <Link
                  key={item.key}
                  href={item.path}
                  className={`relative font-sans text-sm font-semibold tracking-wide py-2 transition-all duration-300 ${
                    active
                      ? 'text-emerald-medium'
                      : 'text-text-primary hover:text-emerald-medium'
                  }`}
                >
                  {t(item.key)}
                  <span
                    className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gold-medium transform origin-left transition-transform duration-300 ${
                      active ? 'scale-x-100' : 'scale-x-0 hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Currency Display */}
            <span className="text-xs font-bold px-2.5 py-1 bg-emerald-lighter text-emerald-dark rounded-full border border-emerald-light/25 uppercase">
              PKR
            </span>

            {/* Language Switcher */}
            <LanguageSwitcher currentLocale={locale} />

            {/* Search Icon */}
            <button
              onClick={() => setSearchOpen(true)}
              className="text-text-secondary hover:text-emerald-medium transition-all duration-300 p-2 cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Icon */}
            <Link
              href="/cart"
              className="relative p-2 text-text-secondary hover:text-gold-dark hover:scale-110 transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 transition-transform group-hover:bounce" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-medium text-emerald-dark font-sans text-xs font-black rounded-full flex items-center justify-center border-2 border-primary-bg shadow-sm">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* WhatsApp Floating Action Link */}
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-emerald-medium hover:bg-emerald-dark text-white rounded-full font-semibold text-sm shadow-md transition-all duration-300 hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-gold-light" />
              <span>{t('whatsapp')}</span>
            </a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="lg:hidden flex items-center gap-3">
            <Link href="/cart" className="relative p-2 text-text-secondary">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-gold-medium text-emerald-dark font-sans text-[10px] font-bold rounded-full flex items-center justify-center border border-primary-bg">
                  {cartCount}
                </span>
              )}
            </Link>
            
            <LanguageSwitcher currentLocale={locale} />

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-text-primary hover:text-emerald-medium cursor-pointer"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Panel */}
          <div
            className={`fixed top-0 bottom-0 ${
              locale === 'ur' ? 'left-0 border-r' : 'right-0 border-l'
            } w-[280px] bg-primary-bg shadow-2xl z-50 flex flex-col justify-between p-6 transition-all duration-300 border-gold-medium/20`}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <span className="font-serif font-bold text-emerald-dark text-lg">
                  Husna Menu
                </span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-secondary-bg rounded-full cursor-pointer text-text-primary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Items */}
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.key}
                    href={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-sans font-semibold text-text-primary hover:text-emerald-medium py-2 border-b border-gray-100 flex justify-between items-center"
                  >
                    <span>{t(item.key)}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Panel */}
            <div className="flex flex-col gap-4 border-t border-gray-100 pt-6">
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>Currency: PKR</span>
                <span className="font-bold text-emerald-medium">Pakistan</span>
              </div>
              <a
                href="https://wa.me/923001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 bg-emerald-medium text-white font-semibold rounded-lg hover:bg-emerald-dark transition-all duration-300 shadow-md"
              >
                <MessageSquare className="w-4 h-4 text-gold-light" />
                <span>WhatsApp Expert</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Simple Search Modal Overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-primary-bg w-full max-w-lg rounded-2xl border-2 border-gold-medium shadow-2xl p-6 relative">
            <button
              onClick={() => setSearchOpen(false)}
              className="absolute top-4 right-4 text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="font-serif font-bold text-emerald-dark text-xl mb-4">
              {locale === 'ur' ? 'تلاش کریں' : 'Search Husna'}
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder={locale === 'ur' ? 'پیکجز، کتب، یا شہد تلاش کریں...' : 'Search packages, books, honey...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow border border-gray-300 focus:border-emerald-medium rounded-lg px-4 py-2.5 outline-none font-sans text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setSearchOpen(false);
                    // Standard routing to package or products with query
                  }
                }}
              />
              <button
                onClick={() => setSearchOpen(false)}
                className="bg-emerald-medium hover:bg-emerald-dark text-white px-5 rounded-lg font-semibold text-sm cursor-pointer"
              >
                {locale === 'ur' ? 'تلاش' : 'Search'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
