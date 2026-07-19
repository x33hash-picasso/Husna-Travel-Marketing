'use client';

import { Link } from '@/lib/i18n/navigation';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';

export default function Footer({ locale }: { locale: string }) {
  const currentYear = new Date().getFullYear();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      const storedLogo = await db.settings.get('site_logo', null);
      if (storedLogo) setLogoUrl(storedLogo);
    };
    loadLogo();
  }, []);

  const services = [
    { name_en: 'Economy Umrah Package', name_ur: 'اکانومی عمرہ پیکج', slug: 'economy-umrah-package' },
    { name_en: 'Premium Umrah Package', name_ur: 'پریمیم عمرہ پیکج', slug: 'premium-umrah-package' },
    { name_en: 'Executive Luxury Umrah', name_ur: 'ایگزیکٹو لگژری عمرہ', slug: 'executive-luxury-umrah' },
    { name_en: 'Family Umrah Package', name_ur: 'فیملی عمرہ پیکج', slug: 'family-umrah-package' }
  ];

  return (
    <footer className="bg-[#121E19] text-gray-300 font-sans border-t-4 border-gold-medium pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        {/* About Company */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt="Husna Travel & Marketing Logo"
                className="h-14 w-auto object-contain"
                style={{ filter: 'drop-shadow(0 2px 12px rgba(201,162,39,0.25)) brightness(1.08)' }}
              />
            ) : (
              <>
                <div className="w-11 h-11 bg-emerald-medium text-white flex items-center justify-center rounded-full font-serif font-bold text-2xl border-2 border-gold-medium shadow-md">
                  ح
                </div>
                <span className="font-serif font-bold text-xl text-white tracking-wide">
                  Husna Travel
                </span>
              </>
            )}
          </div>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            {locale === 'ur'
              ? 'پریمیم عمرہ پیکجز، کتب اور خالص دیسی مصنوعات کے لیے پاکستان کا سب سے بڑا معتبر روحانی برانڈ۔'
              : 'Pakistan’s premium Islamic service combining spiritual journeys, books, and natural wellness under one benchmark of trust.'}
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-gray-400 mt-2">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-gold-medium" />
              <span>+92 300 123 4567</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-gold-medium" />
              <span>info@husnatravel.com</span>
            </div>
            <div className="flex items-center gap-2 items-start">
              <MapPin className="w-4.5 h-4.5 text-gold-medium mt-0.5" />
              <span className="leading-snug">
                {locale === 'ur'
                  ? 'ڈی ایچ اے فیز 5، لاہور، پاکستان'
                  : 'DHA Phase 5, Lahore, Pakistan'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Links - Umrah */}
        <div>
          <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-gray-700/50 pb-2 mb-4">
            {locale === 'ur' ? 'عمرہ پیکجز' : 'Umrah Packages'}
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {services.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/umrah-packages/${p.slug}`}
                  className="hover:text-gold-light transition-colors duration-200"
                >
                  {locale === 'ur' ? p.name_ur : p.name_en}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-gray-700/50 pb-2 mb-4">
            {locale === 'ur' ? 'مصنوعات' : 'Spiritual Shop'}
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/islamic-products" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'قرآن اور کتب' : 'Quran & Books'}
              </Link>
            </li>
            <li>
              <Link href="/islamic-products" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'جائے نماز' : 'Prayer Accessories'}
              </Link>
            </li>
            <li>
              <Link href="/herbal-products" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'خالص بیری کا شہد' : 'Sidr Honey'}
              </Link>
            </li>
            <li>
              <Link href="/herbal-products" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'کلونجی کا تیل' : 'Organic Oils'}
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Policies */}
        <div>
          <h4 className="font-serif font-bold text-white text-base tracking-wide border-b border-gray-700/50 pb-2 mb-4">
            {locale === 'ur' ? 'کمپنی و پالیسیز' : 'Company Policies'}
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            <li>
              <Link href="/about" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'ہمارے بارے میں' : 'About Us'}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'رابطہ کریں' : 'Contact Us'}
              </Link>
            </li>
            <li>
              <Link href="/privacy-policy" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
              </Link>
            </li>
            <li>
              <Link href="/refund-policy" className="hover:text-gold-light transition-colors duration-200">
                {locale === 'ur' ? 'ریفنڈ پالیسی' : 'Refund Policy'}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Sub Footer */}
      <div className="container mx-auto px-4 md:px-8 border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 gap-4">
        <div>
          © {currentYear} Husna Travel & Marketing. All Rights Reserved.
        </div>
        <div className="flex items-center gap-1">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-red-500 fill-current" />
          <span>in Pakistan for your sacred travel.</span>
        </div>
      </div>
    </footer>
  );
}
