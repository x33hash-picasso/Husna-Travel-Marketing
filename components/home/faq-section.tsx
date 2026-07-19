'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { FAQ } from '@/types';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function FAQSection({ locale }: { locale: string }) {
  const t = useTranslations('Sections');
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await db.faqs.list();
      setFaqs(data.slice(0, 6)); // Top 6 questions
    };
    fetchFaqs();
  }, []);

  const toggleIndex = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (faqs.length === 0) return null;

  return (
    <section className="py-20 bg-primary-bg islamic-pattern">
      <div className="container mx-auto px-4 md:px-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'معلومات' : 'FAQ'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {t('faq')}
          </h2>
          <div className="w-16 h-1 bg-gold-medium mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base font-light">
            {t('faqSub')}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.id}
                className="bg-secondary-bg border border-gray-150 rounded-xl overflow-hidden shadow-sm transition-all duration-300"
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleIndex(index)}
                  className="w-full text-left py-5 px-6 flex justify-between items-center gap-4 hover:bg-emerald-lighter/10 transition-colors duration-200 cursor-pointer"
                >
                  <span className={`font-serif font-bold text-base md:text-lg text-emerald-dark ${locale === 'ur' ? 'text-right flex-grow' : ''}`}>
                    {locale === 'ur' ? faq.question_ur : faq.question_en}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-gold-dark flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-emerald-medium flex-shrink-0" />
                  )}
                </button>

                {/* Accordion Content */}
                <div
                  className={`transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 border-t border-gray-150' : 'max-h-0'
                  } overflow-hidden`}
                >
                  <div className="p-6 text-sm md:text-base text-text-secondary leading-relaxed font-light">
                    {locale === 'ur' ? faq.answer_ur : faq.answer_en}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
