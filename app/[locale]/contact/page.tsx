import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

export default async function ContactPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'ur') {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <div className="py-20 bg-secondary-bg min-h-screen font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'رابطہ فارم' : 'Contact Us'}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {locale === 'ur' ? 'ہم سے رابطہ کریں' : 'Get in Touch'}
          </h1>
          <div className="w-16 h-1 bg-gold-medium mx-auto" />
          <p className="text-text-secondary text-sm md:text-base font-light mt-4">
            {locale === 'ur'
              ? 'کسی بھی سوال، بکنگ، یا آرڈر کی معلومات کے لیے درج ذیل معلومات کے ذریعے ہم سے رابطہ کریں۔'
              : 'Have any questions about package customisation or product deliveries? Reach out to us.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
          {/* Contact Details */}
          <div className="flex flex-col gap-6 bg-primary-bg p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-emerald-dark mb-2">
              {locale === 'ur' ? 'رابطہ کی تفصیلات' : 'Contact Information'}
            </h3>

            <div className="flex flex-col gap-4 text-xs font-semibold text-text-secondary mt-2">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-lighter rounded-lg border border-emerald-light/20 text-emerald-medium">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-sm">
                    {locale === 'ur' ? 'فون نمبر' : 'Phone Numbers'}
                  </h4>
                  <p className="font-sans font-light mt-0.5">+92 300 123 4567</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-lighter rounded-lg border border-emerald-light/20 text-emerald-medium">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-sm">
                    {locale === 'ur' ? 'ای میل ایڈریس' : 'Email Address'}
                  </h4>
                  <p className="font-sans font-light mt-0.5">info@husnatravel.com</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="p-3 bg-emerald-lighter rounded-lg border border-emerald-light/20 text-emerald-medium">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-sm">
                    {locale === 'ur' ? 'دفتر کا پتہ' : 'Office Location'}
                  </h4>
                  <p className="font-sans font-light mt-0.5">DHA Phase 5, Lahore, Pakistan</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Direct action */}
          <div className="bg-primary-bg p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] flex items-center justify-center rounded-full border border-[#25D366]/20">
              <MessageSquare className="w-8 h-8" />
            </div>
            <h3 className="font-serif font-bold text-xl text-emerald-dark">
              {locale === 'ur' ? 'واٹس ایپ پر چوبیس گھنٹے سپورٹ' : '24/7 WhatsApp Support'}
            </h3>
            <p className="text-text-secondary text-sm font-light leading-relaxed">
              {locale === 'ur'
                ? 'ہمارے سفری زائرین اور کسٹمرز کے لیے براہ راست واٹس ایپ چیٹ کی سہولت موجود ہے۔ فوری مدد حاصل کریں۔'
                : 'For instant support, traveler booking advice, or parcel tracking updates, chat directly with us on WhatsApp.'}
            </p>
            <a
              href="https://wa.me/923001234567"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-gold-light" />
              <span>{locale === 'ur' ? 'واٹس ایپ چیٹ کھولیں' : 'Chat on WhatsApp'}</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
