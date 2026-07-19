import { useTranslations } from 'next-intl';
import { Award, Compass, ShieldCheck, HeartHandshake } from 'lucide-react';

export default function WhyChooseUs({ locale }: { locale: string }) {
  const t = useTranslations('Sections');

  const cards = [
    {
      icon: Award,
      titleEn: '100% Pure Organic Sourced',
      titleUr: '100% خالص اور نامیاتی مصنوعات',
      descEn: 'Our Sidr honey and Black Seed oils are fully tested and organic. No additives or colorings.',
      descUr: 'ہماری تمام ہربل اور دیسی مصنوعات ملاوٹ سے بالکل پاک اور لیبارٹری سے منظور شدہ ہیں۔'
    },
    {
      icon: Compass,
      titleEn: 'Super Close Hotels to Haram',
      titleUr: 'حرم شریف کے بالکل قریب ہوٹل رہائش',
      descEn: 'Stay within 50 to 150 meters in luxury front-row 5-star hotels in Makkah & Madinah.',
      descUr: 'مکہ مکرمہ اور مدینہ منورہ میں کعبہ اور گنبد خضریٰ کے سامنے فائیو سٹار ہوٹلوں میں رہائش۔'
    },
    {
      icon: ShieldCheck,
      titleEn: 'Safe & Trustworthy Booking',
      titleUr: 'محفوظ اور بااعتماد بکنگ سسٹم',
      descEn: 'Completely licensed agent. Calculate prices online and confirm via secure WhatsApp.',
      descUr: 'وزارت مذہبی امور سے منظور شدہ پیکجز۔ شفاف قیمتیں اور محفوظ واٹس ایپ آرڈر سروس۔'
    },
    {
      icon: HeartHandshake,
      titleEn: 'Dedicated Pilgrim Guides',
      titleUr: 'سفری زائرین کے لیے بہترین گائیڈز',
      descEn: 'Local Islamic experts accompany all package tours to guide you through rites and ziyarat.',
      descUr: 'حج و عمرہ کے مناسک اور زیارات کے لیے تجربہ کار اور مستند مفتیان کرام کی رہنمائی۔'
    }
  ];

  return (
    <section className="py-20 bg-primary-bg islamic-pattern">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'ہماری خوبیاں' : 'Our Quality'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {t('whyChooseUs')}
          </h2>
          <div className="w-16 h-1 bg-gold-medium mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base font-light">
            {t('whyChooseUsSub')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 p-8 bg-secondary-bg border border-gray-100 hover:border-gold-medium/30 rounded-2xl transition-all duration-300 hover:shadow-lg group"
              >
                <div className="p-4 bg-emerald-lighter text-emerald-medium rounded-xl border border-emerald-light/20 h-max w-max transition-transform group-hover:scale-105">
                  <Icon className="w-8 h-8 text-emerald-dark" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-emerald-dark mb-2">
                    {locale === 'ur' ? card.titleUr : card.titleEn}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed font-light">
                    {locale === 'ur' ? card.descUr : card.descEn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
