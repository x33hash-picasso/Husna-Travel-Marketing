'use client';

import { useCart } from '@/lib/context/cart-context';
import { Link } from '@/lib/i18n/navigation';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Trash2, ArrowRight, ShoppingBag, MessageSquare } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateProductOrderMessage } from '@/lib/whatsapp/message-generator';

export default function CartPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const t = useTranslations('Cart');
  const tc = useTranslations('Common');
  
  const { items, removeItem, updateQuantity, cartSubtotal, cartCount } = useCart();

  const handleWhatsAppCheckout = () => {
    const formattedItems = items.map((item) => {
      const itemPrice = item.sale_price !== undefined && item.sale_price !== null ? item.sale_price : item.price;
      return {
        productName: item.name_en,
        quantity: item.quantity,
        unitPrice: itemPrice,
        totalPrice: itemPrice * item.quantity
      };
    });

    const message = generateProductOrderMessage({
      customerName: '[Your Name]',
      phone: '[Your Phone]',
      address: '[Your Shipping Address]',
      items: formattedItems,
      totalAmount: cartSubtotal
    });
    window.open(generateWhatsAppLink(message), '_blank');
  };

  return (
    <div className="py-12 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mb-10 tracking-wide">
          {t('title')}
        </h1>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Items List */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              {items.map((item) => {
                const itemPrice = item.sale_price !== undefined && item.sale_price !== null ? item.sale_price : item.price;
                return (
                  <div
                    key={item.id}
                    className="bg-primary-bg p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row gap-4 items-center justify-between transition-all duration-300 hover:border-gold-medium/30"
                  >
                    {/* Image & Title */}
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <div className="w-16 h-16 bg-secondary-bg border border-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.name_en} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <h3 className="font-serif font-bold text-base text-emerald-dark leading-snug">
                          {locale === 'ur' ? item.name_ur : item.name_en}
                        </h3>
                        <span className="font-sans font-black text-sm text-emerald-medium mt-1">
                          {formatPrice(itemPrice)}
                        </span>
                      </div>
                    </div>

                    {/* Quantity selectors & Delete */}
                    <div className="flex items-center gap-6 justify-between w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                      {/* Quantity Toggles */}
                      <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-8">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="px-2.5 hover:bg-secondary-bg font-bold cursor-pointer"
                        >
                          -
                        </button>
                        <span className="px-4 font-sans font-bold text-xs text-emerald-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="px-2.5 hover:bg-secondary-bg font-bold cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Total */}
                      <span className="font-sans font-black text-sm text-emerald-dark">
                        {formatPrice(itemPrice * item.quantity)}
                      </span>

                      {/* Delete */}
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-text-soft hover:text-red-500 rounded-full hover:bg-red-50 transition-colors cursor-pointer"
                        title={t('removeItem')}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Cart Summary */}
            <div className="bg-primary-bg p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-max">
              <div>
                <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-150 pb-4 mb-4">
                  {t('summary')}
                </h3>
                <div className="flex flex-col gap-3 text-sm font-semibold text-text-secondary mb-6">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span className="text-emerald-dark font-sans">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('shipping')}</span>
                    <span className="text-emerald-medium uppercase">{t('free')}</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-150 pt-4 text-base font-bold text-emerald-dark">
                    <span>{t('total')}</span>
                    <span className="font-sans">{formatPrice(cartSubtotal)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2.5">
                <Link
                  href="/checkout"
                  className="w-full py-3.5 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase text-center rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-dark transition-all duration-300 shadow-md cursor-pointer"
                >
                  <span>{t('proceedCheckout')}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-gold-light" />
                  <span>{locale === 'ur' ? 'واٹس ایپ پر آرڈر بھیجیں' : 'Order via WhatsApp'}</span>
                </button>
              </div>
            </div>

          </div>
        ) : (
          <div className="text-center py-20 bg-primary-bg rounded-3xl border border-gray-100 max-w-md mx-auto flex flex-col items-center gap-6">
            <div className="w-16 h-16 bg-emerald-lighter text-emerald-medium flex items-center justify-center rounded-full border border-emerald-light/20 shadow-inner">
              <ShoppingBag className="w-8 h-8 text-emerald-dark" />
            </div>
            <p className="text-text-secondary font-light text-sm">
              {t('empty')}
            </p>
            <Link
              href="/islamic-products"
              className="py-2.5 px-6 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg hover:bg-emerald-dark transition-all duration-300 shadow-md cursor-pointer"
            >
              {locale === 'ur' ? 'شاپنگ شروع کریں' : 'Shop Islamic Products'}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
