import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { db } from '@/lib/supabase/client';
import ProductCard from '@/components/products/product-card';
import { Category, Product } from '@/types';

export default async function IslamicProductsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en' && locale !== 'ur') {
    notFound();
  }

  setRequestLocale(locale);

  const allProducts = await db.products.list();
  const allCategories = await db.categories.list();

  // Filter categories for type 'product'
  const productCategories = allCategories.filter((cat: Category) => cat.type === 'product');
  const productCatIds = productCategories.map((cat: Category) => cat.id);

  // Filter products matching those categories
  const products = allProducts.filter((prod: Product) => 
    prod.published && prod.category_id && productCatIds.includes(prod.category_id)
  );

  return (
    <div className="py-12 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        {/* Page Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'اسلامی شاپ' : 'Spiritual Bazaar'}
          </span>
          <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {locale === 'ur' ? 'اسلامی مصنوعات' : 'Islamic Collection'}
          </h1>
          <div className="w-16 h-1 bg-gold-medium mx-auto" />
          <p className="text-text-secondary text-sm md:text-base font-light mt-4">
            {locale === 'ur'
              ? 'مقدس قرآن کریم، اعلیٰ کوالٹی کے جائے نماز، اور الکحل سے پاک عطر کی بہترین ورائٹی۔'
              : 'Premium Islamic products curated for your spiritual devotion, gifts, and daily prayers.'}
          </p>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <span className="px-4 py-2 bg-emerald-medium text-white font-sans font-bold text-xs uppercase tracking-widest rounded-full border border-emerald-medium cursor-pointer">
            {locale === 'ur' ? 'تمام مصنوعات' : 'All Products'}
          </span>
          {productCategories.map((cat: Category) => (
            <span
              key={cat.id}
              className="px-4 py-2 bg-primary-bg hover:bg-gold-lighter/25 text-text-secondary hover:text-emerald-dark font-sans font-bold text-xs uppercase tracking-widest rounded-full border border-gray-200 transition-colors cursor-pointer"
            >
              {locale === 'ur' ? cat.name_ur : cat.name_en}
            </span>
          ))}
        </div>

        {/* Product Cards Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-primary-bg rounded-2xl border border-gray-100 max-w-md mx-auto">
            <p className="text-text-secondary font-light text-sm">
              {locale === 'ur' ? 'کوئی پراڈکٹس دستیاب نہیں ہیں۔' : 'No products available at this time.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
