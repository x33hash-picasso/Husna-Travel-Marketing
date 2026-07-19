'use client';

import { useState, useEffect } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { Compass, ShieldCheck, HeartHandshake } from 'lucide-react';
import { db } from '@/lib/supabase/client';

const DEFAULT_JOURNEY = {
  makkahImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80',
  madinahImage: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=600&q=80',
  badgeEn: 'Spiritual Journey',
  badgeUr: 'روحانی جذبہ',
  titleEn: 'A Journey of Faith and Eternal Tranquility',
  titleUr: 'مقدس مقامات کی دلکش روحانی فضائیں',
  descriptionEn: 'Husna Travel is built upon the pillars of absolute trust and luxury hospitality. We design journeys that elevate your spiritual experience, allowing you to immerse completely in worship, reflection, and historical exploration without any earthly worries.',
  descriptionUr: 'ہمارا مشن آپ کو زندگی بھر کے سب سے یادگار اور مبارک سفر پر لے جانا ہے۔ مکہ مکرمہ کی پروقار فضاؤں اور مدینہ منورہ کے پرسکون گلیوں میں آپ کی آرام دہ اور پرسکون رہائش ہماری اولین ترجیح ہے۔',
  f1TitleEn: 'Fully Certified and Registered',
  f1TitleUr: 'سرکاری اور رجسٹرڈ کارپوریشن',
  f1DescEn: 'Lincensed by the Ministry of Hajj & Umrah for complete verification and compliance.',
  f1DescUr: 'وزارت مذہبی امور پاکستان سے رجسٹرڈ اور لائسنس یافتہ سفری ایجنسی۔',
  f2TitleEn: 'Exceptional Pilgrim Care',
  f2TitleUr: 'حقیقی مہمان نوازی اور خدمت',
  f2DescEn: 'From visa processing and hotels to Islamic wellness products delivered right to your doorstep.',
  f2DescUr: 'سفر، ویزا اور ہوٹل سے لے کر کتب اور حرمین کے تبرکات تک مکمل دیکھ بھال۔'
};

export default function MakkahMadinahExperience({ locale }: { locale: string }) {
  const [data, setData] = useState(DEFAULT_JOURNEY);

  useEffect(() => {
    const loadJourney = async () => {
      const dbJourney = await db.settings.get('journey_settings', null);
      if (dbJourney) {
        setData({ ...DEFAULT_JOURNEY, ...dbJourney });
      }
    };
    loadJourney();
  }, []);

  return (
    <section className="py-20 bg-secondary-bg relative overflow-hidden">
      {/* Background Decorative Graphic */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-gold-light/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Photos Showcase */}
          <div className="grid grid-cols-2 gap-4 relative">
            {/* Image 1: Makkah */}
            <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gold-medium/20 hover:-translate-y-2 transition-transform duration-500">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${data.makkahImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif font-bold text-lg text-white">
                {locale === 'ur' ? 'مکہ مکرمہ' : 'Makkah'}
              </span>
            </div>

            {/* Image 2: Madinah */}
            <div className="relative h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gold-medium/20 hover:-translate-y-2 transition-transform duration-500 mt-8 lg:mt-12">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${data.madinahImage})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-dark/60 via-transparent to-transparent" />
              <span className="absolute bottom-4 left-4 font-serif font-bold text-lg text-white">
                {locale === 'ur' ? 'مدینہ منورہ' : 'Madinah'}
              </span>
            </div>

            {/* Floating Gold Medallion Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-primary-bg rounded-full border-2 border-gold-medium shadow-2xl flex items-center justify-center pointer-events-none">
              <Compass className="w-10 h-10 text-emerald-medium animate-spin" style={{ animationDuration: '20s' }} />
            </div>
          </div>

          {/* Spiritual Storytelling Content */}
          <div className="flex flex-col gap-6">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-medium bg-emerald-lighter px-3.5 py-1 rounded-full border border-emerald-light/25 w-max">
              {locale === 'ur' ? data.badgeUr : data.badgeEn}
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark tracking-wide leading-tight">
              {locale === 'ur' ? data.titleUr : data.titleEn}
            </h2>
            <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light">
              {locale === 'ur' ? data.descriptionUr : data.descriptionEn}
            </p>

            {/* Inner Feature List */}
            <div className="flex flex-col gap-4 border-t border-gray-200/60 pt-6 mt-2">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-lighter rounded-lg border border-emerald-light/20 text-emerald-medium flex-shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-base">
                    {locale === 'ur' ? data.f1TitleUr : data.f1TitleEn}
                  </h4>
                  <p className="text-xs text-text-secondary font-light mt-0.5">
                    {locale === 'ur' ? data.f1DescUr : data.f1DescEn}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-gold-lighter text-gold-dark rounded-lg border border-gold-light/20 flex-shrink-0">
                  <HeartHandshake className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-base">
                    {locale === 'ur' ? data.f2TitleUr : data.f2TitleEn}
                  </h4>
                  <p className="text-xs text-text-secondary font-light mt-0.5">
                    {locale === 'ur' ? data.f2DescUr : data.f2DescEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 py-3 px-7 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg hover:bg-emerald-dark transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>{locale === 'ur' ? 'ہمارے متعلق مزید جانیں' : 'Read Our Philosophy'}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
