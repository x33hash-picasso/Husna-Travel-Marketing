import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Navbar from '@/components/shared/navbar';
import Footer from '@/components/shared/footer';
import { CartProvider } from '@/lib/context/cart-context';
import '../globals.css';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'ur' }];
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'ur') {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages({ locale });
  const direction = locale === 'ur' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={direction}>
      <body className="antialiased min-h-screen flex flex-col bg-secondary-bg text-text-primary">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <CartProvider>
            <Navbar locale={locale} />
            <main className="flex-grow pt-[80px]">{children}</main>
            <Footer locale={locale} />
          </CartProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
