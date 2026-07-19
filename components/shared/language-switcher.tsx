'use client';

import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { useTransition } from 'react';

export default function LanguageSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const toggleLanguage = () => {
    const nextLocale = currentLocale === 'en' ? 'ur' : 'en';
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <button
      onClick={toggleLanguage}
      disabled={isPending}
      className="px-3 py-1.5 border border-gold-medium/40 hover:border-gold-medium text-emerald-medium font-medium rounded-md text-sm transition-all duration-300 hover:bg-gold-lighter/20 disabled:opacity-50 cursor-pointer font-sans"
    >
      {currentLocale === 'en' ? 'اردو' : 'English'}
    </button>
  );
}
