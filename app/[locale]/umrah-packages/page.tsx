import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/supabase/client';
import { Link } from '@/lib/i18n/navigation';
import { Hotel, Plane, Navigation, MessageSquare } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateUmrahInquiryMessage } from '@/lib/whatsapp/message-generator';
import { UmrahPackage } from '@/types';

export default async function UmrahPackagesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'ur') {
    notFound();
  }

  setRequestLocale(locale);

  const packages = await db.packages.list();

  const getWhatsAppInquiry = (pkg: any) => {
    const doublePrice = pkg.pricing.find((pr: any) => pr.room_type_id === 'rt-double')?.price_per_person || 
                        pkg.pricing[0]?.price_per_person || 
                        235000;

    const message = generateUmrahInquiryMessage({
      packageName: pkg.name_en,
      makkahHotel: pkg.makkah_hotel || 'Premium 4-Star',
      madinahHotel: pkg.madinah_hotel || 'Premium 4-Star',
      roomType: 'Double',
      pricePerPerson: doublePrice,
      travelers: 2,
      totalAmount: doublePrice * 2,
      travelDate: 'October 2026',
      customerName: '[Your Name]',
      phone: '[Your Phone]'
    });

    return generateWhatsAppLink(message);
  };

  return (
    <div className="py-12 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'حرمین کا سفر' : 'Sacred Pilgrimage'}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {locale === 'ur' ? 'عمرہ پیکجز' : 'Umrah Packages'}
          </h1>
          <div className="w-16 h-1 bg-gold-medium mx-auto" />
          <p className="text-text-secondary text-sm md:text-base font-light mt-4">
            {locale === 'ur'
              ? 'کعبہ اور مسجدِ نبوی کی زیارت کے لیے خالص بھروسے اور پریمیم سہولیات کے ساتھ تیار کردہ عمرہ پیکجز۔'
              : 'Choose from our luxury 5-star, executive family, and budget-friendly economy packages tailored for you.'}
          </p>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {packages.map((pkg: UmrahPackage) => {
            const startingPrice = pkg.pricing.reduce(
              (min: number, p: any) => (p.price_per_person < min ? p.price_per_person : min),
              pkg.pricing[0]?.price_per_person || 235000
            );

            return (
              <div
                key={pkg.id}
                className="bg-primary-bg border border-gray-100 hover:border-gold-medium/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl flex flex-col group"
              >
                {/* Image Area */}
                <div className="relative h-[220px] overflow-hidden bg-emerald-dark/10">
                  <div
                    className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${pkg.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80'})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                  
                  {/* Duration Badge */}
                  <span className="absolute top-4 left-4 font-sans font-bold text-xs bg-emerald-medium text-white px-3 py-1 rounded-full border border-gold-medium/30 shadow-md">
                    {pkg.duration_days} {locale === 'ur' ? 'دن' : 'Days'}
                  </span>

                  {/* Starting Price Badge */}
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="block text-[10px] uppercase font-bold tracking-wider text-gold-light">
                      {locale === 'ur' ? 'شروع قیمت' : 'Starting From'}
                    </span>
                    <span className="font-sans font-black text-xl leading-none">
                      {formatPrice(startingPrice)}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-lg md:text-xl text-emerald-dark tracking-wide mb-1 leading-snug">
                      {locale === 'ur' ? pkg.name_ur : pkg.name_en}
                    </h3>
                    <p className="text-xs text-text-secondary line-clamp-3 mb-6 font-light leading-relaxed">
                      {locale === 'ur' ? pkg.description_ur : pkg.description_en}
                    </p>

                    {/* Features Detail */}
                    <div className="flex flex-col gap-2.5 text-xs text-text-secondary border-t border-gray-100 pt-4 mb-6">
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-gold-medium" />
                        <span className="font-medium truncate">Makkah: {pkg.makkah_hotel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Hotel className="w-4 h-4 text-gold-medium" />
                        <span className="font-medium truncate">Madinah: {pkg.madinah_hotel}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Plane className="w-4 h-4 text-emerald-medium" />
                        <span className="font-medium truncate">{pkg.flight_info || 'Direct flights'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions Buttons */}
                  <div className="flex flex-col gap-2">
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href={`/umrah-packages/${pkg.slug}`}
                        target="_blank"
                        className="py-2.5 px-3 border border-emerald-medium/30 text-emerald-medium font-sans font-bold text-xs tracking-wider text-center rounded-lg hover:border-gold-medium hover:bg-gold-lighter/20 transition-all duration-200 cursor-pointer"
                      >
                        {locale === 'ur' ? 'تفصیلات دیکھیں' : 'View Details'}
                      </Link>
                      <Link
                        href={`/umrah-packages/${pkg.slug}`}
                        className="py-2.5 px-3 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider text-center rounded-lg hover:bg-emerald-dark transition-all duration-200 cursor-pointer"
                      >
                        {locale === 'ur' ? 'بک کریں' : 'Book Now'}
                      </Link>
                    </div>
                    <a
                      href={getWhatsAppInquiry(pkg)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-wide text-center rounded-lg flex items-center justify-center gap-2.5 transition-all duration-200"
                    >
                      <MessageSquare className="w-4 h-4 text-gold-light" />
                      <span>{locale === 'ur' ? 'واٹس ایپ انکوائری' : 'WhatsApp Inquiry'}</span>
                    </a>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
