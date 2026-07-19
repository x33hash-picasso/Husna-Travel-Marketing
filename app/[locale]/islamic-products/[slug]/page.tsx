'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { db } from '@/lib/supabase/client';
import { Product } from '@/types';
import { ShoppingCart, MessageSquare, ArrowLeft, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useCart } from '@/lib/context/cart-context';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateProductOrderMessage } from '@/lib/whatsapp/message-generator';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params.locale as string) || 'en';
  const slug = params.slug as string;

  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState('');
  const [cartSuccess, setCartSuccess] = useState(false);
  const [zoomStyle, setZoomStyle] = useState({ display: 'none', backgroundPosition: '0% 0%' });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      const data = await db.products.get(slug);
      if (data) {
        setProduct(data);
        setSelectedImage(data.images[0] || '');
      }
      setLoading(false);
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-medium border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold text-emerald-dark mb-4">Product Not Found</h2>
        <Link href="/islamic-products" className="text-emerald-medium font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    );
  }

  const priceToPay = product.sale_price !== undefined && product.sale_price !== null ? product.sale_price : product.price;
  const hasDiscount = product.sale_price !== undefined && product.sale_price !== null && product.sale_price < product.price;
  const discountPercent = hasDiscount ? Math.round(((product.price - product.sale_price!) / product.price) * 100) : 0;

  const handleAddToCart = () => {
    addItem(
      {
        id: product.id,
        name_en: product.name_en,
        name_ur: product.name_ur,
        slug: product.slug,
        price: product.price,
        sale_price: product.sale_price,
        image: product.images[0] || ''
      },
      quantity
    );
    setCartSuccess(true);
    setTimeout(() => setCartSuccess(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const message = generateProductOrderMessage({
      customerName: '[Your Name]',
      phone: '[Your Phone]',
      address: '[Your Shipping Address]',
      items: [
        {
          productName: product.name_en,
          quantity: quantity,
          unitPrice: priceToPay,
          totalPrice: priceToPay * quantity
        }
      ],
      totalAmount: priceToPay * quantity
    });
    window.open(generateWhatsAppLink(message), '_blank');
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      display: 'block',
      backgroundPosition: `${x}% ${y}%`
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none', backgroundPosition: '0% 0%' });
  };

  return (
    <div className="py-12 bg-secondary-bg min-h-screen">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/islamic-products"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-emerald-medium font-sans font-bold text-xs tracking-wider uppercase mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'ur' ? 'پیچھے جائیں' : 'Back to Store'}</span>
        </Link>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
          
          {/* Images Section */}
          <div className="flex flex-col gap-4">
            {/* Primary Image with Zoom */}
            <div
              className="relative aspect-square bg-secondary-bg border border-gray-100 rounded-2xl overflow-hidden cursor-zoom-in"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <img
                src={selectedImage}
                alt={locale === 'ur' ? product.name_ur : product.name_en}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 pointer-events-none bg-no-repeat bg-cover hidden lg:block"
                style={{
                  display: zoomStyle.display,
                  backgroundImage: `url(${selectedImage})`,
                  backgroundPosition: zoomStyle.backgroundPosition,
                  backgroundSize: '200%'
                }}
              />
              {hasDiscount && (
                <span className="absolute top-4 left-4 font-sans font-black text-xs tracking-widest bg-gold-medium text-emerald-dark px-3 py-1 rounded-md shadow-md uppercase">
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-2.5 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-20 h-20 bg-secondary-bg border rounded-lg overflow-hidden flex-shrink-0 cursor-pointer ${
                      selectedImage === img ? 'border-gold-medium' : 'border-gray-200'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info Details Section */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & Status */}
              <div className="flex items-center gap-3 text-xs uppercase font-extrabold tracking-widest mb-3">
                <span className="text-gold-dark">Islamic Shop</span>
                <span className="text-gray-300">|</span>
                <span className={product.stock > 0 ? 'text-emerald-medium' : 'text-red-500'}>
                  {product.stock > 0
                    ? (locale === 'ur' ? 'اسٹاک میں موجود ہے' : 'In Stock')
                    : (locale === 'ur' ? 'آؤٹ آف اسٹاک' : 'Out of Stock')}
                </span>
              </div>

              <h1 className="text-2xl md:text-4xl font-serif font-black text-emerald-dark mb-4 tracking-wide leading-tight">
                {locale === 'ur' ? product.name_ur : product.name_en}
              </h1>

              {/* Pricing Blocks */}
              <div className="flex items-baseline gap-3 border-b border-gray-100 pb-6 mb-6">
                <span className="font-sans font-black text-2xl md:text-3xl text-emerald-dark">
                  {formatPrice(priceToPay)}
                </span>
                {hasDiscount && (
                  <span className="font-sans text-sm md:text-base text-text-soft line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* Descriptions */}
              <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light mb-6 whitespace-pre-line">
                {locale === 'ur' ? product.description_ur : product.description_en}
              </p>

              {/* Metadata Details */}
              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-text-secondary border-t border-gray-150 py-4 mb-6">
                <div>SKU: <span className="font-bold text-emerald-dark uppercase">{product.sku || 'N/A'}</span></div>
                <div>Category Type: <span className="font-bold text-emerald-dark uppercase">Products</span></div>
              </div>
            </div>

            {/* Actions Blocks */}
            <div className="flex flex-col gap-4 border-t border-gray-150 pt-6">
              {/* Quantity selectors */}
              <div className="flex items-center gap-4">
                <span className="text-sm font-sans font-bold text-text-secondary">
                  {locale === 'ur' ? 'مقدار:' : 'Quantity:'}
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 hover:bg-secondary-bg text-text-secondary font-bold text-lg cursor-pointer h-full"
                  >
                    -
                  </button>
                  <span className="px-5 font-sans font-bold text-sm text-emerald-dark">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3.5 hover:bg-secondary-bg text-text-secondary font-bold text-lg cursor-pointer h-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock <= 0}
                  className={`w-full py-3.5 px-6 font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer ${
                    cartSuccess
                      ? 'bg-gold-medium text-emerald-dark border border-gold-medium'
                      : 'bg-emerald-medium hover:bg-emerald-dark text-white'
                  } disabled:opacity-50`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>
                    {cartSuccess
                      ? (locale === 'ur' ? 'شامل ہو گیا!' : 'Added to Cart!')
                      : (locale === 'ur' ? 'کارٹ میں شامل کریں' : 'Add to Cart')}
                  </span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full py-3.5 px-6 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md flex items-center justify-center gap-2.5 transition-all duration-300 cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5 text-gold-light" />
                  <span>{locale === 'ur' ? 'واٹس ایپ آرڈر' : 'Order on WhatsApp'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Guarantees banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 bg-emerald-lighter/10 p-6 rounded-2xl border border-emerald-medium/10">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-emerald-medium flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-emerald-dark text-sm">
                {locale === 'ur' ? 'ملک گیر تیز ترسیل' : 'Countrywide Express Delivery'}
              </h4>
              <p className="text-[11px] text-text-secondary leading-snug">
                {locale === 'ur' ? 'پورے پاکستان میں ۳ سے ۵ دن میں کیش آن ڈیلیوری۔' : 'Cash on delivery within 3-5 working days all over Pakistan.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-emerald-medium flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-emerald-dark text-sm">
                {locale === 'ur' ? '۱۰۰٪ آرگینک اور خالص ہونے کی ضمانت' : '100% Organic Pureness'}
              </h4>
              <p className="text-[11px] text-text-secondary leading-snug">
                {locale === 'ur' ? 'ہماری ہربل مصنوعات معیار اور صحت کی ضمانت ہیں۔' : 'No additives or preservatives. Directly sourced pure honey & oils.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <RefreshCw className="w-6 h-6 text-emerald-medium flex-shrink-0" />
            <div>
              <h4 className="font-serif font-bold text-emerald-dark text-sm">
                {locale === 'ur' ? '۷ دن کی آسان ریفنڈ پالیسی' : '7 Days Easy Returns'}
              </h4>
              <p className="text-[11px] text-text-secondary leading-snug">
                {locale === 'ur' ? 'مصنوعات کے معیار سے غیر مطمعن ہونے پر رقم کی واپسی۔' : 'Hassle-free 7-day money-back guarantee on all products.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
