import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import HeroSlider from '@/components/home/hero-slider';
import TrustCounters from '@/components/home/trust-counters';
import UmrahPackagesShowcase from '@/components/home/umrah-packages-showcase';
import MakkahMadinahExperience from '@/components/home/makkah-madinah-experience';
import IslamicProductsSection from '@/components/home/islamic-products-section';
import HerbalProductsSection from '@/components/home/herbal-products-section';
import HowItWorks from '@/components/home/how-it-works';
import WhyChooseUs from '@/components/home/why-choose-us';
import TestimonialsSlider from '@/components/home/testimonials-slider';
import FAQSection from '@/components/home/faq-section';
import ContactCTA from '@/components/home/contact-cta';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ur' }];
}

export default async function Page({
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
    <>
      <HeroSlider locale={locale} />
      <TrustCounters />
      <UmrahPackagesShowcase locale={locale} />
      <MakkahMadinahExperience locale={locale} />
      <IslamicProductsSection locale={locale} />
      <HerbalProductsSection locale={locale} />
      <HowItWorks locale={locale} />
      <WhyChooseUs locale={locale} />
      <TestimonialsSlider locale={locale} />
      <FAQSection locale={locale} />
      <ContactCTA locale={locale} />
    </>
  );
}
