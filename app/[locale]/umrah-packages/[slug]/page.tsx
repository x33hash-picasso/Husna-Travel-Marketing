'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Link } from '@/lib/i18n/navigation';
import { db } from '@/lib/supabase/client';
import { UmrahPackage, RoomType } from '@/types';
import { ArrowLeft, Hotel, Plane, Calendar, MessageSquare, Compass, ShieldCheck, Check, Clock } from 'lucide-react';
import { formatPrice } from '@/lib/utils/formatting';
import { generateWhatsAppLink, generateUmrahInquiryMessage } from '@/lib/whatsapp/message-generator';
import confetti from 'canvas-confetti';

export default function UmrahPackageDetailPage() {
  const params = useParams();
  const locale = (params.locale as string) || 'en';
  const slug = params.slug as string;

  const [pkg, setPkg] = useState<UmrahPackage | null>(null);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  // Selector states
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [travelers, setTravelers] = useState(2);
  const [travelDate, setTravelDate] = useState('');

  // Booking Form states
  const [bookModalOpen, setBookModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      const packageData = await db.packages.get(slug);
      const roomsData = await db.roomTypes.list();
      
      if (packageData) {
        setPkg(packageData);
        setRoomTypes(roomsData);
        
        // Default select first available room type in package pricing
        if (packageData.pricing && packageData.pricing.length > 0) {
          setSelectedRoomId(packageData.pricing[0].room_type_id);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-emerald-medium border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-serif font-bold text-emerald-dark mb-4">Package Not Found</h2>
        <Link href="/umrah-packages" className="text-emerald-medium font-bold flex items-center gap-2 hover:underline">
          <ArrowLeft className="w-4 h-4" /> Go Back
        </Link>
      </div>
    );
  }

  // Find pricing for selected room
  const activePricing = pkg.pricing.find((p) => p.room_type_id === selectedRoomId);
  const pricePerPerson = activePricing ? activePricing.price_per_person : 235000;
  const totalAmount = pricePerPerson * travelers;

  const selectedRoomType = roomTypes.find((r) => r.id === selectedRoomId);
  const selectedRoomName = selectedRoomType ? (locale === 'ur' ? selectedRoomType.name_ur : selectedRoomType.name_en) : 'Double';

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) errs.fullName = locale === 'ur' ? 'نام لکھنا لازمی ہے' : 'Name is required';
    if (!phone.trim()) errs.phone = locale === 'ur' ? 'فون نمبر لکھنا لازمی ہے' : 'Phone is required';
    if (!travelDate) errs.travelDate = locale === 'ur' ? 'سفر کی تاریخ منتخب کریں' : 'Travel date is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const inquiryData = {
        package_id: pkg.id,
        room_type_id: selectedRoomId,
        customer_name: fullName,
        phone,
        email,
        travel_date: travelDate,
        travelers,
        price_per_person: pricePerPerson,
        total_amount: totalAmount,
        message,
        status: 'new'
      };

      await db.inquiries.create(inquiryData);
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookModalOpen(false);
        // Reset form
        setFullName('');
        setPhone('');
        setEmail('');
        setMessage('');
      }, 3000);

    } catch (e) {
      console.error(e);
    }
  };

  const handleWhatsAppInquiry = () => {
    if (!validate()) return;

    const messageContent = generateUmrahInquiryMessage({
      packageName: pkg.name_en,
      makkahHotel: pkg.makkah_hotel || 'Premium 4-Star',
      madinahHotel: pkg.madinah_hotel || 'Premium 4-Star',
      roomType: selectedRoomName,
      pricePerPerson,
      travelers,
      totalAmount,
      travelDate,
      customerName: fullName,
      phone,
      email,
      notes: message
    });

    window.open(generateWhatsAppLink(messageContent), '_blank');
  };

  return (
    <div className="py-12 bg-secondary-bg min-h-screen font-sans">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        {/* Back Link */}
        <Link
          href="/umrah-packages"
          className="inline-flex items-center gap-2 text-text-secondary hover:text-emerald-medium font-sans font-bold text-xs tracking-wider uppercase mb-8 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{locale === 'ur' ? 'تمام پیکجز دیکھیں' : 'Back to Packages'}</span>
        </Link>

        {/* Banner Image Showcase */}
        <div className="relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden border border-gold-medium/20 shadow-lg mb-12">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${pkg.images[0] || 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1200&q=80'})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute bottom-8 left-8 right-8 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-gold-light bg-emerald-dark/60 px-3.5 py-1 rounded-full border border-gold-medium/30">
                {pkg.duration_days} {locale === 'ur' ? 'دن کا پریمیم سفر' : 'Days Pilgrimage'}
              </span>
              <h1 className="text-3xl md:text-5xl font-serif font-black text-white mt-3 mb-2 tracking-wide">
                {locale === 'ur' ? pkg.name_ur : pkg.name_en}
              </h1>
            </div>
            <div className="bg-emerald-medium/90 border border-gold-medium/40 p-4 rounded-2xl flex flex-col items-center justify-center min-w-[160px] shadow-lg">
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-light">{locale === 'ur' ? 'شروع قیمت فی کس' : 'Starting From'}</span>
              <span className="font-sans font-black text-2xl mt-0.5 text-white">
                {formatPrice(pricePerPerson)}
              </span>
            </div>
          </div>
        </div>

        {/* Content Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Info */}
          <div className="lg:col-span-2 flex flex-col gap-8 bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-100 shadow-sm">
            {/* Description */}
            <div>
              <h3 className="font-serif font-bold text-xl text-emerald-dark mb-4 border-b border-gray-100 pb-2">
                {locale === 'ur' ? 'پیکج کی تفصیلات' : 'Package Overview'}
              </h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed font-light whitespace-pre-line">
                {locale === 'ur' ? pkg.description_ur : pkg.description_en}
              </p>
            </div>

            {/* Hotel Accommodation */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-gray-150 pt-6">
              <div className="flex gap-4 items-start bg-secondary-bg p-5 rounded-2xl border border-gray-100">
                <Hotel className="w-6 h-6 text-gold-dark mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-base">
                    {locale === 'ur' ? 'مکہ مکرمہ ہوٹل' : 'Makkah Accommodation'}
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary font-light mt-1">
                    {pkg.makkah_hotel}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start bg-secondary-bg p-5 rounded-2xl border border-gray-100">
                <Hotel className="w-6 h-6 text-gold-dark mt-1" />
                <div>
                  <h4 className="font-serif font-bold text-emerald-dark text-base">
                    {locale === 'ur' ? 'مدینہ منورہ ہوٹل' : 'Madinah Accommodation'}
                  </h4>
                  <p className="text-xs md:text-sm text-text-secondary font-light mt-1">
                    {pkg.madinah_hotel}
                  </p>
                </div>
              </div>
            </div>

            {/* Package Features List */}
            <div className="border-t border-gray-150 pt-6">
              <h3 className="font-serif font-bold text-lg text-emerald-dark mb-4">
                {locale === 'ur' ? 'شامل سہولیات' : 'What is Included'}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {pkg.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-sm text-text-secondary font-semibold">
                    <Check className="w-5 h-5 text-emerald-medium flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing Calculator Card */}
          <div className="bg-primary-bg p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between h-max relative z-10">
            <div>
              <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-150 pb-4 mb-4">
                {locale === 'ur' ? 'قیمت کا حساب لگائیں' : 'Price Calculator'}
              </h3>

              {/* Room type selection */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest">
                  {locale === 'ur' ? 'کمرے کی قسم منتخب کریں:' : 'Select Room Type:'}
                </span>
                <div className="flex flex-col gap-2">
                  {pkg.pricing.map((pr) => {
                    const roomType = roomTypes.find((r) => r.id === pr.room_type_id);
                    if (!roomType) return null;
                    const isSelected = selectedRoomId === pr.room_type_id;
                    return (
                      <button
                        key={pr.room_type_id}
                        onClick={() => setSelectedRoomId(pr.room_type_id)}
                        className={`w-full py-3 px-4 border rounded-xl flex items-center justify-between text-xs transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-medium text-white border-gold-medium font-bold shadow-md'
                            : 'bg-secondary-bg hover:bg-gold-lighter/20 border-gray-200 text-text-secondary font-medium'
                        }`}
                      >
                        <span>{locale === 'ur' ? roomType.name_ur : roomType.name_en}</span>
                        <span className={`font-sans font-black ${isSelected ? 'text-gold-light' : 'text-emerald-dark'}`}>
                          {formatPrice(pr.price_per_person)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Travelers Selection count */}
              <div className="flex flex-col gap-2 mb-6">
                <span className="text-xs font-sans font-bold text-text-secondary uppercase tracking-widest">
                  {locale === 'ur' ? 'مسافروں کی تعداد:' : 'Number of Travelers:'}
                </span>
                <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden h-10 w-max bg-secondary-bg">
                  <button
                    onClick={() => setTravelers((t) => Math.max(1, t - 1))}
                    className="px-4 text-text-secondary hover:bg-gold-lighter/10 font-bold text-lg cursor-pointer h-full"
                  >
                    -
                  </button>
                  <span className="px-6 font-sans font-bold text-sm text-emerald-dark">{travelers}</span>
                  <button
                    onClick={() => setTravelers((t) => t + 1)}
                    className="px-4 text-text-secondary hover:bg-gold-lighter/10 font-bold text-lg cursor-pointer h-full"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Live pricing receipt details */}
              <div className="flex flex-col gap-3 text-sm font-semibold border-t border-gray-150 pt-4 mb-6">
                <div className="flex justify-between">
                  <span>Price per Person</span>
                  <span className="font-sans text-emerald-dark">{formatPrice(pricePerPerson)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Total Travelers</span>
                  <span className="font-sans text-emerald-medium">{travelers} Person(s)</span>
                </div>
                <div className="flex justify-between border-t border-gray-150 pt-4 text-base font-bold text-emerald-dark">
                  <span>Estimated Total</span>
                  <span className="font-sans text-lg">{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Book Trigger Button */}
            <button
              onClick={() => setBookModalOpen(true)}
              className="w-full py-3.5 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4 text-gold-light" />
              <span>{locale === 'ur' ? 'انکوائری فارم کھولیں' : 'Open Booking Inquiry'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* Booking Form Modal Overlay */}
      {bookModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-primary-bg w-full max-w-lg rounded-3xl border-2 border-gold-medium shadow-2xl p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center border-b border-gray-100 pb-4 mb-6">
              <h3 className="font-serif font-bold text-emerald-dark text-xl md:text-2xl">
                {locale === 'ur' ? 'عمرہ بکنگ انکوائری' : 'Umrah Booking Inquiry'}
              </h3>
              <button
                onClick={() => setBookModalOpen(false)}
                className="p-1 rounded-full text-text-soft hover:bg-secondary-bg hover:text-text-primary cursor-pointer"
              >
                ✕
              </button>
            </div>

            {bookingSuccess ? (
              <div className="text-center py-10 flex flex-col items-center gap-4">
                <Check className="w-16 h-16 bg-emerald-lighter text-emerald-dark p-3 rounded-full border border-emerald-light/20" />
                <h4 className="font-serif font-bold text-lg text-emerald-dark">
                  {locale === 'ur' ? 'انکوائری کامیابی سے موصول ہوگئی!' : 'Inquiry Submitted Successfully!'}
                </h4>
                <p className="text-xs text-text-secondary font-light">
                  {locale === 'ur' ? 'ہمارا عمرہ نمائندہ جلد ہی آپ سے رابطہ کرے گا۔' : 'Thank you. A consultant will review your inquiry and contact you shortly.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                
                {/* Product/pricing review details */}
                <div className="p-4 bg-secondary-bg rounded-xl border border-gray-100 flex flex-col gap-1.5 text-xs font-semibold text-text-secondary mb-2">
                  <div>Package: <span className="font-bold text-emerald-dark">{locale === 'ur' ? pkg.name_ur : pkg.name_en}</span></div>
                  <div>Room: <span className="font-bold text-emerald-dark">{selectedRoomName}</span></div>
                  <div>Travelers: <span className="font-bold text-emerald-dark">{travelers} Person(s)</span></div>
                  <div>Total Est Amount: <span className="font-sans font-bold text-emerald-medium">{formatPrice(totalAmount)}</span></div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-bold text-text-secondary">{locale === 'ur' ? 'پورا نام:' : 'Full Name:'} *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={`border ${errors.fullName ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'} rounded-lg px-3.5 py-2 outline-none text-sm`}
                    placeholder="e.g. Tariq Mahmood"
                  />
                  {errors.fullName && <span className="text-[10px] font-bold text-red-500">{errors.fullName}</span>}
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-bold text-text-secondary">{locale === 'ur' ? 'فون نمبر:' : 'Phone Number:'} *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'} rounded-lg px-3.5 py-2 outline-none text-sm`}
                    placeholder="e.g. 03001234567"
                  />
                  {errors.phone && <span className="text-[10px] font-bold text-red-500">{errors.phone}</span>}
                </div>

                {/* Preferred Travel Date */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-bold text-text-secondary">{locale === 'ur' ? 'سفر کی ترجیحی تاریخ:' : 'Preferred Travel Date:'} *</label>
                  <input
                    type="date"
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    className={`border ${errors.travelDate ? 'border-red-500' : 'border-gray-300 focus:border-emerald-medium'} rounded-lg px-3.5 py-2 outline-none text-sm`}
                  />
                  {errors.travelDate && <span className="text-[10px] font-bold text-red-500">{errors.travelDate}</span>}
                </div>

                {/* Email (Optional) */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-bold text-text-secondary">{locale === 'ur' ? 'ای میل ایڈریس:' : 'Email Address:'}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 focus:border-emerald-medium rounded-lg px-3.5 py-2 outline-none text-sm"
                    placeholder="e.g. info@gmail.com"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-sans font-bold text-text-secondary">{locale === 'ur' ? 'اضافی نوٹس یا سوال:' : 'Special Requirements:'}</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={2}
                    className="border border-gray-300 focus:border-emerald-medium rounded-lg px-3.5 py-2 outline-none text-sm resize-none"
                    placeholder="Wheelchair support, hotel view requests..."
                  />
                </div>

                {/* Submit Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <Compass className="w-4 h-4" />
                    <span>{locale === 'ur' ? 'فارم جمع کریں' : 'Submit Form'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="w-full py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md cursor-pointer flex justify-center items-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4 text-gold-light" />
                    <span>{locale === 'ur' ? 'واٹس ایپ انکوائری' : 'WhatsApp Inquiry'}</span>
                  </button>
                </div>

              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
