import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function AboutPage({
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
    <div className="py-20 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center flex flex-col items-center gap-6">
        <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
          {locale === 'ur' ? 'ہمارا تعارف' : 'Our Story'}
        </span>
        <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark tracking-wide">
          {locale === 'ur' ? 'حسنیٰ ٹریول اینڈ مارکیٹنگ' : 'About Husna Travel'}
        </h1>
        <div className="w-16 h-1 bg-gold-medium" />
        <p className="text-text-secondary text-sm md:text-base leading-relaxed font-light mt-4">
          {locale === 'ur'
            ? 'حسنیٰ ٹریول اینڈ مارکیٹنگ پاکستان کا ایک ممتاز اور معتبر ادارہ ہے جو اپنے معزز زائرین کو سستے اور پرتعیش عمرہ پیکجز فراہم کرتا ہے۔ اس کے ساتھ ساتھ ہم خالص نامیاتی شہد، کلونجی کا تیل، جائے نماز اور کتب کی فراہمی بھی یقینی بناتے ہیں۔'
            : 'Husna Travel & Marketing was founded on the benchmark of spiritual integrity and luxury hospitality. We combine premium verified Umrah packages with organic health remedies and high-quality Islamic accessories, serving customers across Pakistan with transparency.'}
        </p>
        <div className="w-full grid grid-cols-2 md:grid-cols-3 gap-6 mt-10">
          <div className="bg-primary-bg p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center">
            <span className="text-2xl font-serif font-black text-emerald-medium">15+</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mt-1">
              {locale === 'ur' ? 'سال کا تجربہ' : 'Years Experience'}
            </span>
          </div>
          <div className="bg-primary-bg p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col items-center">
            <span className="text-2xl font-serif font-black text-emerald-medium">500+</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mt-1">
              {locale === 'ur' ? 'کامیاب اسفار' : 'Umrah Journeys'}
            </span>
          </div>
          <div className="col-span-2 md:col-span-1 bg-primary-bg p-5 rounded-2xl border border-gray-150 shadow-sm flex flex-col items-center">
            <span className="text-2xl font-serif font-black text-emerald-medium">100%</span>
            <span className="text-[10px] uppercase font-bold text-text-secondary tracking-widest mt-1">
              {locale === 'ur' ? 'خالص گارنٹی' : 'Pure Sourced'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
