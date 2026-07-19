import { useTranslations } from 'next-intl';
import { Search, Calculator, CheckSquare, Compass } from 'lucide-react';

export default function HowItWorks({ locale }: { locale: string }) {
  const t = useTranslations('Sections');

  const steps = [
    {
      icon: Search,
      titleEn: '1. Select Package or Product',
      titleUr: '1. پیکج یا پروڈکٹ منتخب کریں',
      descEn: 'Explore our hand-crafted, premium Umrah packages, Islamic collection, and organic honey.',
      descUr: 'ہمارے پریمیم عمرہ پیکجز، کتب اور خالص دیسی شہد و کلونجی کی مصنوعات دیکھیں۔'
    },
    {
      icon: Calculator,
      titleEn: '2. Customize & Calculate',
      titleUr: '2. کمرہ اور قیمت کا تعین کریں',
      descEn: 'Choose sharing, double, or triple rooms and see updated person/traveler prices instantly.',
      descUr: 'اپنی پسند کے کمرے کا انتخاب کریں اور کل مسافروں کی قیمت فوری دیکھیں۔'
    },
    {
      icon: CheckSquare,
      titleEn: '3. Order via WhatsApp',
      titleUr: '3. واٹس ایپ پر آرڈر بھیجیں',
      descEn: 'Submit your tailored selections directly to our team via auto-generated structured text.',
      descUr: 'تیار کردہ آرڈر یا بکنگ فارم براہ راست ہمارے ماہرین کو واٹس ایپ پر بھیجیں۔'
    },
    {
      icon: Compass,
      titleEn: '4. Sacred Fulfillment',
      titleUr: '4. پرسکون ترسیل و روانگی',
      descEn: 'Receive premium quality parcel at home or begin your sacred pilgrimage to Makkah & Madinah.',
      descUr: 'خالص مصنوعات اپنے گھر پر وصول کریں یا کعبہ اور مسجد نبوی کے سفر پر روانہ ہوں۔'
    }
  ];

  return (
    <section className="py-20 bg-secondary-bg">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'آسان مراحل' : 'Simple Guide'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {t('howItWorks')}
          </h2>
          <div className="w-16 h-1 bg-gold-medium mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base font-light">
            {t('howItWorksSub')}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gold-medium/20 -translate-y-12 z-0 pointer-events-none" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="bg-primary-bg border border-gray-100 hover:border-gold-medium/40 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col items-center text-center relative z-10 hover:-translate-y-1"
              >
                {/* Number Circle */}
                <div className="w-14 h-14 bg-emerald-medium text-white flex items-center justify-center rounded-full border-4 border-gold-lighter shadow-md mb-6 transition-transform hover:scale-105 duration-300">
                  <Icon className="w-6 h-6 text-gold-light" />
                </div>

                <h3 className="font-serif font-bold text-lg text-emerald-dark mb-3">
                  {locale === 'ur' ? step.titleUr : step.titleEn}
                </h3>
                <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-light">
                  {locale === 'ur' ? step.descUr : step.descEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
