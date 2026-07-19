'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Testimonial } from '@/types';
import { Star, Quote } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function TestimonialsSlider({ locale }: { locale: string }) {
  const t = useTranslations('Sections');
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      const data = await db.testimonials.list();
      setTestimonials(data);
    };
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-20 bg-secondary-bg">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'کسٹمرز کی رائے' : 'Testimonials'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {t('testimonials')}
          </h2>
          <div className="w-16 h-1 bg-gold-medium mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base font-light">
            {t('testimonialsSub')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-primary-bg p-8 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-gold-medium/30 transition-all duration-300 hover:-translate-y-1.5"
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-medium/10 group-hover:text-gold-medium/20 transition-colors" />
              
              {/* Stars Rating */}
              <div className="flex gap-1.5 mb-5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < test.rating
                        ? 'text-gold-medium fill-gold-medium'
                        : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed italic mb-6">
                "{test.review}"
              </p>

              {/* Customer Details */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-medium text-white font-bold flex items-center justify-center rounded-full border border-gold-medium shadow-sm uppercase font-serif">
                  {test.customer_name.charAt(0)}
                </div>
                <div className="flex flex-col">
                  <span className="font-serif font-bold text-sm text-emerald-dark">
                    {test.customer_name}
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-text-soft">
                    {test.city || 'Pakistan'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
