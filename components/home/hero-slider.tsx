'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { ChevronLeft, ChevronRight, MessageCircle } from 'lucide-react';
import { generateWhatsAppLink } from '@/lib/whatsapp/message-generator';

const SLIDES = [
  {
    image: '/images/makkah_hero.jpg',
    titleEn: 'Your Sacred Journey',
    titleUr: 'آپ کا مقدس سفر',
    subtitleEn: 'Begins Here',
    subtitleUr: 'یہاں سے شروع ہوتا ہے'
  },
  {
    image: '/images/islamic_lifestyle.jpg',
    titleEn: 'Masjid al-Haram',
    titleUr: 'مسجد الحرام',
    subtitleEn: 'Spiritual Peace',
    subtitleUr: 'روحانی سکون اور اطمینان'
  },
  {
    image: '/images/makkah_hero.jpg',
    titleEn: 'Masjid an-Nabawi',
    titleUr: 'مسجد نبوی شریف',
    subtitleEn: 'The Prophet\'s City',
    subtitleUr: 'مدینہ منورہ کی روشنیاں'
  },
  {
    image: '/images/islamic_lifestyle.jpg',
    titleEn: 'Sacred Pilgrimage',
    titleUr: 'مبارک عبادت',
    subtitleEn: 'Tailored With Trust',
    subtitleUr: 'بھروسے کے ساتھ ترتیب شدہ'
  }
];

import { db } from '@/lib/supabase/client';

export default function HeroSlider({ locale }: { locale: string }) {
  const t = useTranslations('Hero');
  const [slides, setSlides] = useState<any[]>(SLIDES);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const loadSlides = async () => {
      const dbSlides = await db.settings.get('hero_slides', null);
      if (dbSlides && Array.isArray(dbSlides) && dbSlides.length > 0) {
        setSlides(dbSlides);
      }
    };
    loadSlides();
  }, []);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  useEffect(() => {
    if (!isHovered) {
      startTimer();
    } else {
      stopTimer();
    }
    return () => stopTimer();
  }, [isHovered, slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
    startTimer();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
    startTimer();
  };

  const currentSlide = slides[currentIndex] || slides[0] || SLIDES[0];

  const waInquiryText = `Assalam-o-Alaikum,

I am visiting your website and want to speak with an Umrah travel expert. Please guide me.

JazakAllah Khair.`;

  return (
    <section
      className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-black flex items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slides images & backgrounds with zoom effects */}
      {slides.map((slide, index) => {
        const active = index === currentIndex;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              active ? 'opacity-70 z-10' : 'opacity-0 z-0'
            }`}
          >
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-[5000ms] ease-out ${
                active ? 'scale-105' : 'scale-100'
              }`}
              style={{ backgroundImage: `url(${slide.image})` }}
            />
          </div>
        );
      })}

      {/* Subtle Golden Particle and Radial Lighting Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60 z-20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] z-20 pointer-events-none" />

      {/* Floating Animated Light Rays Overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none opacity-30 animate-pulse bg-gradient-to-tr from-transparent via-gold-lighter/5 to-transparent duration-[10000ms]" />

      {/* Headline & Supporting Texts */}
      <div className="container mx-auto px-4 md:px-8 relative z-30 text-center flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg tracking-wide leading-tight max-w-4xl">
          <span className="block text-gold-medium font-normal text-2xl md:text-3xl lg:text-4xl mb-2 font-serif italic italic-caps">
            {locale === 'ur' ? currentSlide.titleUr : currentSlide.titleEn}
          </span>
          <span className="block animate-fade-in-up">
            {locale === 'ur' ? currentSlide.subtitleUr : currentSlide.subtitleEn}
          </span>
        </h1>
        <p className="text-base md:text-xl text-gray-200 max-w-2xl mb-8 leading-relaxed font-sans font-light drop-shadow-md">
          {t('subtitle')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link
            href="/umrah-packages"
            className="w-full sm:w-auto px-8 py-3.5 bg-emerald-medium text-white font-sans font-bold text-sm tracking-widest uppercase rounded-lg border-2 border-emerald-medium hover:border-gold-medium hover:bg-gold-medium hover:text-emerald-dark transition-all duration-300 shadow-lg text-center cursor-pointer"
          >
            {t('explorePackages')}
          </Link>
          <Link
            href="/islamic-products"
            className="w-full sm:w-auto px-8 py-3.5 bg-transparent text-gold-medium font-sans font-bold text-sm tracking-widest uppercase rounded-lg border-2 border-gold-medium hover:bg-gold-medium hover:text-emerald-dark transition-all duration-300 text-center cursor-pointer"
          >
            {t('shopIslamic')}
          </Link>
        </div>
      </div>

      {/* Manual Navigation Controls */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 md:left-8 z-35 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-dark/40 border border-gold-medium/30 text-white hover:bg-emerald-medium hover:text-emerald-dark hover:border-gold-medium transition-all duration-300 cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 md:right-8 z-35 -translate-y-1/2 w-12 h-12 flex items-center justify-center rounded-full bg-emerald-dark/40 border border-gold-medium/30 text-white hover:bg-emerald-medium hover:text-emerald-dark hover:border-gold-medium transition-all duration-300 cursor-pointer"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dot Indicators & Slide Counter */}
      <div className="absolute bottom-8 left-0 right-0 z-35 flex flex-col items-center gap-3">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                startTimer();
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentIndex
                  ? 'bg-gold-medium w-6'
                  : 'bg-white/40 hover:bg-white'
              }`}
            />
          ))}
        </div>
        <span className="font-sans text-xs text-gold-light/95 tracking-widest font-black uppercase">
          {currentIndex + 1} / {slides.length}
        </span>
      </div>

      {/* Floating WhatsApp Bubble */}
      <a
        href={generateWhatsAppLink(waInquiryText)}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-45 bg-[#25D366] hover:bg-[#128C7E] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-2 group border border-white/20"
      >
        <MessageCircle className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden font-sans font-bold text-sm tracking-wider uppercase transition-all duration-500 group-hover:max-w-xs whitespace-nowrap">
          {t('talkExpert')}
        </span>
      </a>
    </section>
  );
}
