'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Product, Category } from '@/types';
import ProductCard from '../products/product-card';
import { useTranslations } from 'next-intl';

export default function IslamicProductsSection({ locale }: { locale: string }) {
  const t = useTranslations('Sections');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const allProducts = await db.products.list();
      const allCategories = await db.categories.list();

      // Find category IDs that are of type 'product'
      const productCatIds = allCategories
        .filter((cat: Category) => cat.type === 'product')
        .map((cat: Category) => cat.id);

      // Filter products that belong to these categories
      const filtered = allProducts.filter((prod: Product) => 
        prod.published && prod.category_id && productCatIds.includes(prod.category_id)
      );

      setProducts(filtered.slice(0, 4));
    };
    fetchProducts();
  }, []);

  if (products.length === 0) return null;

  return (
    <section className="py-20 bg-secondary-bg">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-gold-dark px-3 py-1 bg-gold-lighter/40 rounded-full border border-gold-light/20">
            {locale === 'ur' ? 'کتب و متبرکات' : 'Sacred Collection'}
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mt-4 mb-3 tracking-wide">
            {t('islamicCollection')}
          </h2>
          <div className="w-16 h-1 bg-gold-medium mx-auto mb-4" />
          <p className="text-text-secondary text-sm md:text-base font-light">
            {t('islamicCollectionSub')}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
