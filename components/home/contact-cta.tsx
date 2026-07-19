import { Link } from '@/lib/i18n/navigation';
import { MessageSquare, PhoneCall } from 'lucide-react';

export default function ContactCTA({ locale }: { locale: string }) {
  return (
    <section className="py-20 bg-gradient-to-br from-emerald-dark to-emerald-medium text-white text-center relative overflow-hidden border-b border-gold-medium">
      {/* Abstract background overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(212,175,55,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10 max-w-3xl flex flex-col items-center">
        <span className="text-[10px] md:text-xs uppercase font-extrabold tracking-widest text-gold-light px-3 py-1 bg-white/10 rounded-full border border-white/10 mb-6">
          {locale === 'ur' ? 'سفری معلومات حاصل کریں' : 'Need Consultation?'}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-bold mb-4 drop-shadow-md leading-tight">
          {locale === 'ur'
            ? 'کیا آپ عمرہ کے اسفار کے متعلق معلومات چاہتے ہیں؟'
            : 'Ready to Plan Your Sacred Pilgrimage?'}
        </h2>
        <p className="text-gray-200 text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-light">
          {locale === 'ur'
            ? 'ہمارے سفری ماہرین چوبیس گھنٹے آپ کی خدمت کے لیے دستیاب ہیں۔ اب شراکت، رہائش، یا ویزا سے متعلق ہر قسم کی تفصیلی معلومات واٹس ایپ پر حاصل کریں۔'
            : 'Get in touch with our travel experts today. We are here to answer your questions, customize packages for your family, and assist in every step of your sacred journey.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-sm tracking-wider uppercase rounded-lg shadow-md transition-all duration-300 hover:scale-105"
          >
            <MessageSquare className="w-5 h-5 text-gold-light" />
            <span>{locale === 'ur' ? 'واٹس ایپ رابطہ' : 'Chat on WhatsApp'}</span>
          </a>
          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 bg-transparent border-2 border-gold-medium text-gold-light font-sans font-bold text-sm tracking-wider uppercase rounded-lg hover:bg-gold-medium hover:text-emerald-dark transition-all duration-300 text-center cursor-pointer"
          >
            <PhoneCall className="w-4 h-4" />
            <span>{locale === 'ur' ? 'رابطہ فارم کھولیں' : 'Contact Us Page'}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
