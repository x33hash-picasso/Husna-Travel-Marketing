'use client';

import { useState } from 'react';
import { useCart } from '@/lib/context/cart-context';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { db } from '@/lib/supabase/client';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateProductOrderMessage } from '@/lib/whatsapp/message-generator';
import confetti from 'canvas-confetti';
import { ShoppingBag, MessageSquare, CreditCard } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const t = useTranslations('Checkout');
  const tc = useTranslations('Common');

  const { items, cartSubtotal, clearCart } = useCart();
  const [loading, setLoading] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [notes, setNotes] = useState('');

  // Validations
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = t('validation.nameRequired');
    if (!phone.trim()) errs.phone = t('validation.phoneRequired');
    if (!address.trim()) errs.address = t('validation.addressRequired');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const orderItems = items.map((item) => {
        const itemPrice = item.sale_price !== undefined && item.sale_price !== null ? item.sale_price : item.price;
        return {
          product_id: item.id,
          product_name: item.name_en,
          quantity: item.quantity,
          unit_price: itemPrice,
          total_price: itemPrice * item.quantity
        };
      });

      const orderData = {
        customer_name: fullName,
        phone,
        email,
        address,
        total_amount: cartSubtotal,
        notes,
        items: orderItems
      };

      // Save order in database (real Supabase or local mock storage fallback)
      await db.orders.create(orderData);

      // Trigger Confetti Celebration!
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });

      clearCart();
      router.push(`/${locale}/checkout/success`);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrderDirect = () => {
    if (!validate()) return;

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
      customerName: fullName,
      phone,
      address,
      items: formattedItems,
      totalAmount: cartSubtotal,
      notes
    });

    window.open(generateWhatsAppLink(message), '_blank');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <h2 className="text-xl font-serif font-bold text-emerald-dark mb-4">Your cart is empty</h2>
        <button
          onClick={() => router.push(`/${locale}/islamic-products`)}
          className="py-2.5 px-6 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg hover:bg-emerald-dark transition-all duration-300 cursor-pointer"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h1 className="text-3xl md:text-5xl font-serif font-black text-emerald-dark mb-10 tracking-wide">
          {t('title')}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Billing Form */}
          <div className="lg:col-span-2 bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-emerald-dark border-b border-gray-150 pb-4 mb-6">
              {t('billingDetails')}
            </h3>

            <form onSubmit={handlePlaceOrder} className="flex flex-col gap-5">
              
              {/* Full Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-bold text-text-secondary">
                  {t('fullName')} *
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className={`border ${
                    errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'
                  } rounded-lg px-4 py-2.5 outline-none font-sans text-sm`}
                  placeholder="e.g. Tariq Mahmood"
                />
                {errors.fullName && <span className="text-[10px] font-bold text-red-500">{errors.fullName}</span>}
              </div>

              {/* Phone & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans font-bold text-text-secondary">
                    {t('phoneNumber')} *
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'
                    } rounded-lg px-4 py-2.5 outline-none font-sans text-sm`}
                    placeholder="e.g. 03001234567"
                  />
                  {errors.phone && <span className="text-[10px] font-bold text-red-500">{errors.phone}</span>}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-sans font-bold text-text-secondary">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 focus:border-emerald-medium rounded-lg px-4 py-2.5 outline-none font-sans text-sm"
                    placeholder="e.g. info@gmail.com"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-bold text-text-secondary">
                  {t('shippingAddress')} *
                </label>
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className={`border ${
                    errors.address ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'
                  } rounded-lg px-4 py-2.5 outline-none font-sans text-sm resize-none`}
                  placeholder="e.g. House 123, Street 4, DHA Phase 5, Lahore"
                />
                {errors.address && <span className="text-[10px] font-bold text-red-500">{errors.address}</span>}
              </div>

              {/* Additional Notes */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-sans font-bold text-text-secondary">
                  {t('notes')}
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={2}
                  className="border border-gray-300 focus:border-emerald-medium rounded-lg px-4 py-2.5 outline-none font-sans text-sm resize-none"
                  placeholder="Any delivery instructions..."
                />
              </div>

              {/* Submit Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer disabled:opacity-50"
                >
                  <CreditCard className="w-4 h-4 text-gold-light" />
                  <span>{loading ? tc('sending') : t('placeOrder')}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppOrderDirect}
                  className="w-full py-3.5 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 text-gold-light" />
                  <span>{t('placeOrderUrdu') || 'Order via WhatsApp'}</span>
                </button>
              </div>

            </form>
          </div>

          {/* Checkout Items Summary */}
          <div className="bg-primary-bg p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-max">
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-150 pb-4 mb-4">
                {t('orderSummary')}
              </h3>

              <div className="flex flex-col gap-4 max-h-60 overflow-y-auto mb-6">
                {items.map((item) => {
                  const itemPrice = item.sale_price !== undefined && item.sale_price !== null ? item.sale_price : item.price;
                  return (
                    <div key={item.id} className="flex justify-between items-center gap-4 text-xs font-semibold text-text-secondary pb-3 border-b border-gray-50">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 bg-emerald-lighter text-emerald-dark rounded flex items-center justify-center font-sans font-bold">
                          {item.quantity}
                        </span>
                        <span className="truncate max-w-[150px]">{locale === 'ur' ? item.name_ur : item.name_en}</span>
                      </div>
                      <span className="font-sans font-bold text-emerald-dark">{formatPrice(itemPrice * item.quantity)}</span>
                    </div>
                  );
                })}
              </div>

              {/* Total Calculation block */}
              <div className="flex flex-col gap-2.5 text-sm font-semibold border-t border-gray-150 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-emerald-dark font-sans">{formatPrice(cartSubtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-emerald-medium uppercase">Free</span>
                </div>
                <div className="flex justify-between border-t border-gray-150 pt-4 text-base font-bold text-emerald-dark">
                  <span>Total</span>
                  <span className="font-sans">{formatPrice(cartSubtotal)}</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
