'use client';

import { useParams } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { CheckCircle, Home, ShoppingBag, MessageSquare } from 'lucide-react';

export default function OrderSuccessPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const tc = useTranslations('Common');

  return (
    <div className="py-20 bg-secondary-bg min-h-[80vh] flex items-center justify-center">
      <div className="bg-primary-bg p-8 md:p-12 rounded-3xl border border-gray-100 shadow-lg text-center max-w-lg mx-auto flex flex-col items-center gap-6">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-lighter text-emerald-medium flex items-center justify-center rounded-full border-4 border-emerald-light/20 shadow-md">
          <CheckCircle className="w-10 h-10 text-emerald-dark" />
        </div>

        {/* Message */}
        <h1 className="text-3xl font-serif font-black text-emerald-dark tracking-wide leading-tight">
          {locale === 'ur' ? 'جزاک اللہ خیر!' : 'JazakAllah Khair!'}
        </h1>
        <p className="text-text-secondary text-sm md:text-base font-light leading-relaxed">
          {locale === 'ur'
            ? 'آپ کا آرڈر کامیابی کے ساتھ موصول ہو گیا ہے۔ ہمارا نمائندہ ترسیل کی تصدیق کے لیے جلد ہی آپ سے رابطہ کرے گا۔'
            : 'Your order has been placed successfully. A confirmation message was logged, and our delivery executive will contact you shortly to coordinate shipment.'}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mt-4">
          <Link
            href="/"
            className="flex-1 py-3 px-6 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-dark transition-all duration-300 shadow-md cursor-pointer"
          >
            <Home className="w-4 h-4 text-gold-light" />
            <span>{locale === 'ur' ? 'ہوم پیج' : 'Go Home'}</span>
          </Link>
          <Link
            href="/islamic-products"
            className="flex-1 py-3 px-6 border border-emerald-medium/30 text-emerald-medium font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 hover:bg-gold-lighter/25 transition-all duration-300 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{locale === 'ur' ? 'مزید شاپنگ کریں' : 'Continue Shopping'}</span>
          </Link>
        </div>

        {/* Support floating chat */}
        <a
          href="https://wa.me/923001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-emerald-medium hover:text-emerald-dark flex items-center gap-1.5 mt-2"
        >
          <MessageSquare className="w-4 h-4 text-[#25D366]" />
          <span>{locale === 'ur' ? 'آرڈر سے متعلق سوالات کے لیے رابطہ کریں' : 'Questions about order? Chat now'}</span>
        </a>

      </div>
    </div>
  );
}
