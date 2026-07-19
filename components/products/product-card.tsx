'use client';

import { useState } from 'react';
import { Link } from '@/lib/i18n/navigation';
import { useCart } from '@/lib/context/cart-context';
import { Product } from '@/types';
import { ShoppingCart, MessageSquare, Heart, Eye } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateProductOrderMessage } from '@/lib/whatsapp/message-generator';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  locale: string;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const { addItem } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  const priceToPay = product.sale_price !== undefined && product.sale_price !== null ? product.sale_price : product.price;
  const hasDiscount = product.sale_price !== undefined && product.sale_price !== null && product.sale_price < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.sale_price!) / product.price) * 100) : 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name_en: product.name_en,
      name_ur: product.name_ur,
      slug: product.slug,
      price: product.price,
      sale_price: product.sale_price,
      image: product.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'
    });
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductOrderMessage({
      customerName: '[Your Name]',
      phone: '[Your Phone]',
      address: '[Your Shipping Address]',
      items: [
        {
          productName: product.name_en,
          quantity: 1,
          unitPrice: priceToPay,
          totalPrice: priceToPay
        }
      ],
      totalAmount: priceToPay
    });
    window.open(generateWhatsAppLink(message), '_blank');
  };

  return (
    <div className="bg-primary-bg border border-gray-100 hover:border-gold-medium/40 rounded-2xl overflow-hidden shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg flex flex-col group relative">
      {/* Product Image Area */}
      <div className="relative aspect-square overflow-hidden bg-secondary-bg">
        <Link href={`/islamic-products/${product.slug}`}>
          <img
            src={product.images[0] || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=400&q=80'}
            alt={locale === 'ur' ? product.name_ur : product.name_en}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {hasDiscount && (
          <span className="absolute top-4 left-4 font-sans font-black text-[10px] tracking-widest bg-gold-medium text-emerald-dark px-2.5 py-1 rounded-md shadow-md uppercase">
            {discountPercent}% OFF
          </span>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white shadow-md transition-colors duration-200 text-text-secondary hover:text-red-500 cursor-pointer"
        >
          <Heart className={`w-4 h-4 transition-transform duration-300 ${isLiked ? 'fill-red-500 text-red-500 scale-110' : ''}`} />
        </button>

        {/* Action icons hover overlay */}
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <Link
            href={`/islamic-products/${product.slug}`}
            className="p-2.5 bg-primary-bg hover:bg-gold-lighter text-emerald-dark rounded-full shadow-lg border border-gray-100 transition-transform duration-300 hover:scale-105 cursor-pointer"
            title="Quick View"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          {/* Stock Tag */}
          <span className={`text-[10px] font-bold tracking-widest uppercase mb-1.5 block ${product.stock > 0 ? 'text-emerald-medium' : 'text-red-500'}`}>
            {product.stock > 0
              ? (locale === 'ur' ? 'اسٹاک میں موجود ہے' : 'In Stock')
              : (locale === 'ur' ? 'اسٹاک ختم ہو گیا ہے' : 'Out of Stock')}
          </span>

          <h3 className="font-serif font-bold text-base md:text-lg text-emerald-dark leading-tight mb-2 tracking-wide line-clamp-1">
            <Link href={`/islamic-products/${product.slug}`} className="hover:text-emerald-medium transition-colors">
              {locale === 'ur' ? product.name_ur : product.name_en}
            </Link>
          </h3>

          {/* Pricing Block */}
          <div className="flex items-baseline gap-2 mb-5">
            <span className="font-sans font-black text-lg text-emerald-dark leading-none">
              {formatPrice(priceToPay)}
            </span>
            {hasDiscount && (
              <span className="font-sans text-xs text-text-soft line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Actions */}
        <div className="flex flex-col gap-2">
          <button
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            className={`w-full py-2.5 px-4 font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-sm flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
              successMsg
                ? 'bg-gold-medium text-emerald-dark border border-gold-medium'
                : 'bg-emerald-medium hover:bg-emerald-dark text-white'
            } disabled:opacity-50`}
          >
            <ShoppingCart className="w-4 h-4" />
            <span>{successMsg ? (locale === 'ur' ? 'شامل ہو گیا!' : 'Added!') : (locale === 'ur' ? 'کارٹ میں شامل کریں' : 'Add to Cart')}</span>
          </button>
          
          <button
            onClick={handleWhatsAppOrder}
            className="w-full py-2 px-4 border border-[#25D366] text-[#25D366] hover:bg-[#25D366]/5 font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{locale === 'ur' ? 'واٹس ایپ آرڈر' : 'WhatsApp Order'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
