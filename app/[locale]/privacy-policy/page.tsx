import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';

export default async function PrivacyPolicyPage({
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
      <div className="container mx-auto px-4 md:px-8 max-w-3xl bg-primary-bg p-8 md:p-12 rounded-3xl border border-gray-100 shadow-sm">
        <h1 className="text-3xl font-serif font-black text-emerald-dark mb-6 border-b border-gray-150 pb-4">
          {locale === 'ur' ? 'پرائیویسی پالیسی' : 'Privacy Policy'}
        </h1>
        <div className="text-sm md:text-base text-text-secondary leading-relaxed font-light flex flex-col gap-5">
          <p>
            {locale === 'ur'
              ? 'ہم حسنیٰ ٹریول اینڈ مارکیٹنگ میں آپ کے ذاتی ڈیٹا کی حفاظت کے لیے پرعزم ہیں۔ یہ پرائیویسی پالیسی واضح کرتی ہے کہ ہم آپ کی معلومات کو کس طرح جمع اور استعمال کرتے ہیں۔'
              : 'At Husna Travel & Marketing, we prioritize the confidentiality and safety of your personal details. This policy explains how we collect and process your contact records.'}
          </p>
          <h3 className="font-serif font-bold text-emerald-dark text-lg mt-2">
            {locale === 'ur' ? '۱. معلومات کا جمع کرنا' : '1. Information We Collect'}
          </h3>
          <p>
            {locale === 'ur'
              ? 'ہم آپ کا نام، فون نمبر، ای میل، اور ترسیل کا پتہ صرف آرڈرز اور عمرہ انکوائریز کو مکمل کرنے کے لیے حاصل کرتے ہیں۔'
              : 'We only collect standard customer profile markers (name, phone, delivery address) to process products or coordinate hotel bookings.'}
          </p>
          <h3 className="font-serif font-bold text-emerald-dark text-lg mt-2">
            {locale === 'ur' ? '۲. معلومات کا تحفظ' : '2. Data Security'}
          </h3>
          <p>
            {locale === 'ur'
              ? 'آپ کی معلومات کسی تیسرے فریق کو فروخت یا شیئر نہیں کی جاتی ہیں۔ تمام ڈیٹا کو محفوظ سرورز پر محفوظ رکھا جاتا ہے۔'
              : 'Your credentials are never shared or sold to external agencies. All transaction queries are encrypted and processed safely.'}
          </p>
        </div>
      </div>
    </div>
  );
}
