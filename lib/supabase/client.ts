import { createClient } from '@supabase/supabase-js';

// Environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Detect if Supabase is configured
export const isSupabaseConfigured = 
  supabaseUrl.trim() !== '' && 
  supabaseAnonKey.trim() !== '' &&
  !supabaseUrl.includes('your_supabase_url');

// Real Supabase client instance (or null if not configured)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// ==========================================
// MOCK DATA SEED
// ==========================================

const MOCK_CATEGORIES = [
  { id: 'cat-1', name_en: 'Quran & Islamic Books', name_ur: 'قرآن اور اسلامی کتب', slug: 'quran-books', type: 'product', image_url: '/images/islamic_lifestyle.jpg', is_active: true },
  { id: 'cat-2', name_en: 'Prayer Mats & Accessories', name_ur: 'جائے نماز اور لوازمات', slug: 'prayer-mats', type: 'product', image_url: '/images/islamic_lifestyle.jpg', is_active: true },
  { id: 'cat-3', name_en: 'Attar & Fragrances', name_ur: 'عطر اور خوشبوئیں', slug: 'attar-fragrances', type: 'product', image_url: '/images/Perfume.jpg', is_active: true },
  { id: 'cat-4', name_en: 'Premium Honey', name_ur: 'خالص شہد', slug: 'honey', type: 'herbal', image_url: '/images/herbal_wellness.jpg', is_active: true },
  { id: 'cat-5', name_en: 'Black Seed & Wellness', name_ur: 'کلونجی اور تندرستی', slug: 'black-seed', type: 'herbal', image_url: '/images/herbal_wellness.jpg', is_active: true }
];

const MOCK_ROOM_TYPES = [
  { id: 'rt-sharing', name_en: 'Sharing (4 Pax)', name_ur: 'شیرنگ (4 افراد)', slug: 'sharing', capacity: 4, is_active: true },
  { id: 'rt-quad', name_en: 'Quad Room', name_ur: 'کواڈ روم', slug: 'quad', capacity: 4, is_active: true },
  { id: 'rt-triple', name_en: 'Triple Room', name_ur: 'ٹریپل روم', slug: 'triple', capacity: 3, is_active: true },
  { id: 'rt-double', name_en: 'Double Room', name_ur: 'ڈبل روم', slug: 'double', capacity: 2, is_active: true }
];

const MOCK_PRODUCTS = [
  {
    id: 'prod-1',
    category_id: 'cat-1',
    name_en: 'Premium Quran (Leather Bound)',
    name_ur: 'پریمیم قرآن مجید (چرمی جلد)',
    slug: 'premium-quran-leather-bound',
    description_en: 'A beautifully crafted Quran with high-quality cream paper, leather embossed cover, and English/Urdu translation side-by-side. Ideal for gifts and daily recitation.',
    description_ur: 'شاندار چرمی جلد اور بہترین پیپر کے ساتھ تیار کردہ قرآن مجید۔ روزانہ کی تلاوت اور تحفہ دینے کے لیے بہترین۔',
    price: 4500,
    sale_price: 3500,
    sku: 'QRN-PLB-01',
    stock: 50,
    featured: true,
    published: true,
    images: ['/images/islamic_lifestyle.jpg']
  },
  {
    id: 'prod-2',
    category_id: 'cat-2',
    name_en: 'Turkish Silk Prayer Mat',
    name_ur: 'ترکش ریشمی جائے نماز',
    slug: 'turkish-silk-prayer-mat',
    description_en: 'Ultra-soft Turkish silk prayer mat featuring authentic Mihrab geometric designs. Heavy density weave provides exceptional knee support.',
    description_ur: 'خالص ترکش ریشم سے تیار کردہ جائے نماز، خوبصورت محرابی ڈیزائن اور گھٹنوں کے آرام کے لیے بہترین موٹائی۔',
    price: 6500,
    sale_price: 5000,
    sku: 'PM-TRK-02',
    stock: 35,
    featured: true,
    published: true,
    images: ['/images/islamic_lifestyle.jpg']
  },
  {
    id: 'prod-3',
    category_id: 'cat-3',
    name_en: 'Royal Amber Attar (12ml)',
    name_ur: 'رائل امبر عطر (12 ملی لیٹر)',
    slug: 'royal-amber-attar-12ml',
    description_en: 'A rich, woody premium attar extracted from real amber and sandalwood. Long-lasting alcohol-free formulation.',
    description_ur: 'خالص صندل اور امبر سے تیار کردہ دیرپا خوشبو والا پریمیم الکحل سے پاک عطر۔',
    price: 3000,
    sale_price: 2500,
    sku: 'ATR-RA-03',
    stock: 100,
    featured: true,
    published: true,
    images: ['/images/Perfume.jpg']
  },
  {
    id: 'prod-4',
    category_id: 'cat-4',
    name_en: 'Pure Sidr Honey (Kashmir)',
    name_ur: 'خالص بیری کا شہد (کشمیر)',
    slug: 'pure-sidr-honey-kashmir',
    description_en: '100% organic, raw, unpasteurized Sidr honey harvested from the valleys of Kashmir. Renowned for its rich flavor and therapeutic benefits.',
    description_ur: 'کشمیر کی وادیوں سے حاصل کردہ 100٪ خالص اور آرگینک بیری کا شہد۔ بے پناہ قدرتی شفائی خصوصیات کا حامل۔',
    price: 6500,
    sale_price: 5500,
    sku: 'HNY-SDR-04',
    stock: 40,
    featured: true,
    published: true,
    images: ['/images/herbal_wellness.jpg']
  },
  {
    id: 'prod-5',
    category_id: 'cat-5',
    name_en: 'Cold-Pressed Black Seed Oil',
    name_ur: 'کولڈ پریسڈ کلونجی کا تیل',
    slug: 'cold-pressed-black-seed-oil',
    description_en: 'Premium quality Nigella Sativa (Kalonji) oil extracted using traditional cold-press extraction to preserve all active ingredients.',
    description_ur: 'جدید اور روایتی طریقوں سے تیار کردہ 100% خالص کلونجی کا تیل، ہر بیماری سے نجات کے لیے بہترین سپلیمنٹ۔',
    price: 2200,
    sale_price: 1800,
    sku: 'OIL-BS-05',
    stock: 80,
    featured: true,
    published: true,
    images: ['/images/herbal_wellness.jpg']
  },
  {
    id: 'prod-6',
    category_id: 'cat-5',
    name_en: 'Spicy Mango Pickle (Aam ka Achaar)',
    name_ur: 'چٹپٹا آم کا اچار',
    slug: 'spicy-mango-pickle',
    description_en: 'Authentic home-made Pakistani mango pickle prepared using premium mustard oil and organic spices.',
    description_ur: 'خالص سرسوں کے تیل اور مصالحہ جات سے تیار کردہ گھر کا لذیذ آم کا اچار۔',
    price: 950,
    sale_price: 790,
    sku: 'PCL-MNG-06',
    stock: 60,
    featured: true,
    published: true,
    images: ['/images/aam_ka_achaar.jpeg']
  }
];

const MOCK_PACKAGES = [
  {
    id: 'pkg-1',
    name_en: 'Economy Umrah Package',
    name_ur: 'اکانومی عمرہ پیکج',
    slug: 'economy-umrah-package',
    description_en: 'Affordable Umrah journey designed for families and groups. Includes clean, budget-friendly 4-star hotel accommodations near Haram, complete transport, and visa assistance.',
    description_ur: 'عائلہ اور گروپس کے لیے بہترین سستا عمرہ پیکج۔ حرم شریف کے قریب مناسب 4 سٹار ہوٹل رہائش، مکمل ٹرانسپورٹ اور ویزا کی سہولت شامل ہے۔',
    makkah_hotel: 'Al-Kiswah Towers (4-Star)',
    madinah_hotel: 'Al-Saqfah Hotel (4-Star)',
    duration_days: 8,
    flight_info: 'Direct flight from Karachi/Lahore to Jeddah',
    transport_info: 'Air-conditioned luxury buses for all routes',
    features: ['Visa processing', '4-Star Hotels', 'AC Bus Transport', 'Ziyarat tours in Makkah & Madinah'],
    featured: true,
    published: true,
    images: ['/images/makkah_hero.jpg'],
    pricing: [
      { room_type_id: 'rt-sharing', price_per_person: 235000 },
      { room_type_id: 'rt-quad', price_per_person: 239000 },
      { room_type_id: 'rt-triple', price_per_person: 252500 },
      { room_type_id: 'rt-double', price_per_person: 277500 }
    ]
  },
  {
    id: 'pkg-2',
    name_en: 'Premium Umrah Package',
    name_ur: 'پریمیم عمرہ پیکج',
    slug: 'premium-umrah-package',
    description_en: 'Experience a highly comfortable pilgrimage with premium 5-star hotels just steps away from Masjid al-Haram and Masjid-an-Nabawi. High-quality support and guided tours.',
    description_ur: 'مسجدِ حرام اور مسجدِ نبوی کے بالکل قریب پریمیم 5 سٹار ہوٹلوں میں رہائش کے ساتھ ایک آرام دہ سفرِ عمرہ۔ بہترین سفری رہنمائی اور دیگر سہولیات۔',
    makkah_hotel: 'Swissôtel Makkah (5-Star)',
    madinah_hotel: 'Pullman Zamzam Madina (5-Star)',
    duration_days: 10,
    flight_info: 'Premium Airline Flights',
    transport_info: 'GMC SUV / Private Car transfer services',
    features: ['Visa processing', 'Luxury 5-Star Hotels', 'Private Car Transport', '24/7 dedicated local guide', 'Buffet breakfast included'],
    featured: true,
    published: true,
    images: ['/images/islamic_lifestyle.jpg'],
    pricing: [
      { room_type_id: 'rt-sharing', price_per_person: 260000 },
      { room_type_id: 'rt-triple', price_per_person: 280000 },
      { room_type_id: 'rt-double', price_per_person: 310000 }
    ]
  },
  {
    id: 'pkg-3',
    name_en: 'Executive Luxury Umrah',
    name_ur: 'ایگزیکٹو لگژری عمرہ',
    slug: 'executive-luxury-umrah',
    description_en: 'The ultimate luxury pilgrimage. Stay at front-row hotels facing the Kaaba and Green Dome. VIP protocol, private high-speed Haramain Train tickets, and tailored luxury services.',
    description_ur: 'کعبہ اور گنبدِ خضریٰ کے بالکل سامنے فرنٹ رو ہوٹلوں میں رہائش کے ساتھ حتمی لگژری عمرہ۔ وی آئی پی پروٹوکول اور پرائیویٹ ٹرین سروس۔',
    makkah_hotel: 'Fairmont Makkah Clock Royal Tower (5-Star VIP)',
    madinah_hotel: 'Oberoi Madinah (5-Star VIP)',
    duration_days: 14,
    flight_info: 'Business Class airfare included',
    transport_info: 'Private luxury sedan / Bullet train transfers',
    features: ['VIP Fast-track Visa', 'Kaaba View rooms', 'Haramain Bullet Train Business ticket', 'Private tours', 'All meals included'],
    featured: false,
    published: true,
    images: ['/images/makkah_hero.jpg'],
    pricing: [
      { room_type_id: 'rt-triple', price_per_person: 330000 },
      { room_type_id: 'rt-double', price_per_person: 350000 }
    ]
  },
  {
    id: 'pkg-4',
    name_en: 'Family Umrah Package',
    name_ur: 'فیملی عمرہ پیکج',
    slug: 'family-umrah-package',
    description_en: 'Specialized itinerary designed to cater to the elderly and young children. Family suite accommodations, slow-paced tours, wheelchair availability, and dedicated support.',
    description_ur: 'بزرگوں اور بچوں کی سہولت کو مدِ نظر رکھ کر ڈیزائن کیا گیا فیملی پیکج۔ آرام دہ رہائش اور وہیل چیئر کی فراہمی۔',
    makkah_hotel: 'Makkah Hotel & Towers (5-Star)',
    madinah_hotel: 'Anwar Al Madinah Mövenpick (5-Star)',
    duration_days: 12,
    flight_info: 'Direct flights with family seat arrangements',
    transport_info: 'Coaster/Private Van for family transport',
    features: ['Visa services', 'Family suites', 'Wheelchair assistance', 'Dedicated guide support', 'Buffet meals'],
    featured: false,
    published: true,
    images: ['/images/islamic_lifestyle.jpg'],
    pricing: [
      { room_type_id: 'rt-quad', price_per_person: 275000 },
      { room_type_id: 'rt-triple', price_per_person: 285000 },
      { room_type_id: 'rt-double', price_per_person: 295000 }
    ]
  }
];

const MOCK_TESTIMONIALS = [
  { id: 't-1', customer_name: 'Tariq Mahmood', city: 'Lahore', review: 'Our family booked the Premium Umrah Package. The hotels Swissôtel and Pullman Zamzam were exceptionally close to Haram. Highly recommended for spiritual travels!', rating: 5, image_url: '', published: true },
  { id: 't-2', customer_name: 'Sarah Khan', city: 'Karachi', review: 'I bought their Sidr Honey and organic Black Seed Oil. Excellent purity and packaging. Will order again, JazakAllah!', rating: 5, image_url: '', published: true },
  { id: 't-3', customer_name: 'Muhammad Rizwan', city: 'Rawalpindi', review: 'Completely professional and highly trustworthy. Excellent customer care and WhatsApp assistance. The Kaaba slider on their site represents the luxury they deliver.', rating: 5, image_url: '', published: true }
];

const MOCK_FAQS = [
  { id: 'faq-1', question_en: 'What documents are required for Umrah visa processing?', question_ur: 'عمرہ ویزہ پروسیسنگ کے لیے کون سے دستاویزات درکار ہیں؟', answer_en: 'You need a valid passport with at least 6 months validity, a copy of your CNIC, and passport-sized photographs with a white background. Additional documents may be requested based on your country of residence.', answer_ur: 'آپ کو کم از کم 6 ماہ کی میعاد کے ساتھ ایک درست پاسپورٹ، اپنے شناختی کارڈ کی کاپی اور سفید پس منظر والی پاسپورٹ سائز تصاویر کی ضرورت ہوگی۔', published: true, sort_order: 1 },
  { id: 'faq-2', question_en: 'Are flights and tickets included in the prices?', question_ur: 'کیا پروازیں اور ٹکٹ قیمتوں میں شامل ہیں؟', answer_en: 'Flights are included in our premium and VIP packages. For the economy packages, standard pricing covers land package (hotel, visa, transport), but flight booking can be added on request.', answer_ur: 'ہمارے پریمیم اور وی آئی پی پیکجز میں پروازیں شامل ہیں۔ اکانومی پیکج کے لیے ہوٹل، ویزا اور ٹرانسپورٹ شامل ہے، جبکہ فلائٹ ٹکٹ اضافی چارجز پر خریدی جا سکتی ہے۔', published: true, sort_order: 2 },
  { id: 'faq-3', question_en: 'How far are the hotels from the Haram?', question_ur: 'ہوٹل حرم شریف سے کتنے فاصلے پر ہیں؟', answer_en: 'Premium hotels are within 50 to 150 meters from the outer courtyard of Haram. Economy packages feature hotels that are 400-800 meters away, with free shutter service operating 24/7.', answer_ur: 'پریمیم ہوٹل حرم کے صحن سے 50 سے 150 میٹر کے فاصلے پر ہیں۔ اکانومی پیکجز کے ہوٹل 400 سے 800 میٹر دور ہیں جن کے لیے 24 گھنٹے مفت شٹل سروس دستیاب ہوتی ہے۔', published: true, sort_order: 3 }
];

// ==========================================
// LOCAL STORAGE STORE MANAGEMENT
// ==========================================

const getStored = (key: string, defaultValue: any) => {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(`husna_${key}`);
    return item ? JSON.parse(item) : defaultValue;
  } catch (e) {
    return defaultValue;
  }
};

const setStored = (key: string, value: any) => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`husna_${key}`, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

// Initialize LocalStorage Database if empty or needs migration
const initLocalDb = () => {
  if (typeof window === 'undefined') return;
  
  const migrationKey = 'husna_local_images_loaded_v5';
  const needsMigration = !localStorage.getItem(migrationKey);

  if (!localStorage.getItem('husna_initialized') || needsMigration) {
    // Clear old data to force fresh load of local images
    localStorage.removeItem('husna_categories');
    localStorage.removeItem('husna_room_types');
    localStorage.removeItem('husna_products');
    localStorage.removeItem('husna_packages');
    localStorage.removeItem('husna_testimonials');
    localStorage.removeItem('husna_faqs');

    // Force logo path to local image
    localStorage.setItem('husna_setting_site_logo', JSON.stringify('/images/logo.jpeg'));

    // Force journey settings path to local images
    const journey = {
      makkahImage: '/images/makkah_hero.jpg',
      madinahImage: '/images/islamic_lifestyle.jpg',
      badgeEn: 'Spiritual Journey',
      badgeUr: 'روحانی جذبہ',
      titleEn: 'A Journey of Faith and Eternal Tranquility',
      titleUr: 'مقدس مقامات کی دلکش روحانی فضائیں',
      descriptionEn: 'Husna Travel is built upon the pillars of absolute trust and luxury hospitality. We design journeys that elevate your spiritual experience, allowing you to immerse completely in worship, reflection, and historical exploration without any earthly worries.',
      descriptionUr: 'ہمارا مشن آپ کو زندگی بھر کے سب سے یادگار اور مبارک سفر پر لے جانا ہے۔ مکہ مکرمہ کی پروقار فضاؤں اور مدینہ منورہ کے پرسکون گلیوں میں آپ کی آرام دہ اور پرسکون رہائش ہماری اولین ترجیح ہے۔',
      f1TitleEn: 'Fully Certified and Registered',
      f1TitleUr: 'سرکاری اور رجسٹرڈ کارپوریشن',
      f1DescEn: 'Lincensed by the Ministry of Hajj & Umrah for complete verification and compliance.',
      f1DescUr: 'وزارت مذہبی امور پاکستان سے رجسٹرڈ اور لائسنس یافتہ سفری ایجنسی۔',
      f2TitleEn: 'Exceptional Pilgrim Care',
      f2TitleUr: 'حقیقی مہمان نوازی اور خدمت',
      f2DescEn: 'From visa processing and hotels to Islamic wellness products delivered right to your doorstep.',
      f2DescUr: 'سفر، ویزا اور ہوٹل سے لے کر کتب اور حرمین کے تبرکات تک مکمل دیکھ بھال۔'
    };
    localStorage.setItem('husna_setting_journey_settings', JSON.stringify(journey));

    // Force slides path to local images
    const slides = [
      {
        image: '/images/makkah_hero.jpg',
        titleEn: 'Your Sacred Journey',
        titleUr: 'آپ کا مقدس سفر',
        subtitleEn: 'Begins Here',
        subtitleUr: 'یہاں سے شروع ہوتا ہے'
      },
      {
        image: '/images/islamic_lifestyle.jpg',
        titleEn: 'Masjid al-Haram',
        titleUr: 'مسجد الحرام',
        subtitleEn: 'Spiritual Peace',
        subtitleUr: 'روحانی سکون اور اطمینان'
      }
    ];
    localStorage.setItem('husna_setting_hero_slides', JSON.stringify(slides));

    setStored('categories', MOCK_CATEGORIES);
    setStored('room_types', MOCK_ROOM_TYPES);
    setStored('products', MOCK_PRODUCTS);
    setStored('packages', MOCK_PACKAGES);
    setStored('testimonials', MOCK_TESTIMONIALS);
    setStored('faqs', MOCK_FAQS);
    
    if (!localStorage.getItem('husna_orders')) setStored('orders', []);
    if (!localStorage.getItem('husna_inquiries')) setStored('inquiries', []);

    localStorage.setItem('husna_initialized', 'true');
    localStorage.setItem(migrationKey, 'true');
  }
};

// Execute initialization
initLocalDb();

// Unified API Provider (combining Supabase or LocalStorage)
export const db = {
  categories: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('categories').select('*').eq('is_active', true);
        if (!error) return data;
      }
      return getStored('categories', MOCK_CATEGORIES);
    },
    create: async (item: any) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('categories').insert([item]).select();
        if (!error) return data[0];
      }
      const list = getStored('categories', MOCK_CATEGORIES);
      const newItem = { id: `cat-${Date.now()}`, ...item };
      list.push(newItem);
      setStored('categories', list);
      return newItem;
    }
  },

  roomTypes: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('room_types').select('*').eq('is_active', true);
        if (!error) return data;
      }
      return getStored('room_types', MOCK_ROOM_TYPES);
    }
  },

  products: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(image_url)');
        if (!error) {
          return data.map((p: any) => ({
            ...p,
            images: p.product_images?.map((img: any) => img.image_url) || []
          }));
        }
      }
      return getStored('products', MOCK_PRODUCTS);
    },
    get: async (slug: string) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('products')
          .select('*, product_images(image_url)')
          .eq('slug', slug)
          .single();
        if (!error && data) {
          return {
            ...data,
            images: data.product_images?.map((img: any) => img.image_url) || []
          };
        }
      }
      const list = getStored('products', MOCK_PRODUCTS);
      return list.find((p: any) => p.slug === slug) || null;
    },
    create: async (item: any) => {
      const { images, ...rawProduct } = item;
      let createdProduct: any;
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('products').insert([rawProduct]).select();
        if (!error && data) {
          createdProduct = data[0];
          if (images && images.length > 0) {
            const imgInserts = images.map((url: string, index: number) => ({
              product_id: createdProduct.id,
              image_url: url,
              sort_order: index
            }));
            await supabase.from('product_images').insert(imgInserts);
          }
          return { ...createdProduct, images };
        }
      }
      
      const list = getStored('products', MOCK_PRODUCTS);
      createdProduct = { id: `prod-${Date.now()}`, ...rawProduct, images: images || [] };
      list.push(createdProduct);
      setStored('products', list);
      return createdProduct;
    },
    update: async (id: string, updates: any) => {
      const { images, ...rawUpdates } = updates;
      if (isSupabaseConfigured && supabase) {
        await supabase.from('products').update(rawUpdates).eq('id', id);
        if (images) {
          await supabase.from('product_images').delete().eq('product_id', id);
          const imgInserts = images.map((url: string, index: number) => ({
            product_id: id,
            image_url: url,
            sort_order: index
          }));
          await supabase.from('product_images').insert(imgInserts);
        }
        return { id, ...updates };
      }
      const list = getStored('products', MOCK_PRODUCTS);
      const index = list.findIndex((p: any) => p.id === id);
      if (index !== -1) {
        list[index] = { ...list[index], ...rawUpdates, images: images || list[index].images };
        setStored('products', list);
      }
      return list[index] || null;
    },
    delete: async (id: string) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('products').delete().eq('id', id);
        return true;
      }
      const list = getStored('products', MOCK_PRODUCTS);
      const filtered = list.filter((p: any) => p.id !== id);
      setStored('products', filtered);
      return true;
    }
  },

  packages: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('umrah_packages')
          .select('*, umrah_package_images(image_url), package_room_prices(room_type_id, price_per_person)');
        if (!error) {
          return data.map((pkg: any) => ({
            ...pkg,
            images: pkg.umrah_package_images?.map((img: any) => img.image_url) || [],
            pricing: pkg.package_room_prices?.map((p: any) => ({
              room_type_id: p.room_type_id,
              price_per_person: Number(p.price_per_person)
            })) || []
          }));
        }
      }
      return getStored('packages', MOCK_PACKAGES);
    },
    get: async (slug: string) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('umrah_packages')
          .select('*, umrah_package_images(image_url), package_room_prices(room_type_id, price_per_person)')
          .eq('slug', slug)
          .single();
        if (!error && data) {
          return {
            ...data,
            images: data.umrah_package_images?.map((img: any) => img.image_url) || [],
            pricing: data.package_room_prices?.map((p: any) => ({
              room_type_id: p.room_type_id,
              price_per_person: Number(p.price_per_person)
            })) || []
          };
        }
      }
      const list = getStored('packages', MOCK_PACKAGES);
      return list.find((p: any) => p.slug === slug) || null;
    },
    create: async (item: any) => {
      const { images, pricing, ...rawPackage } = item;
      let createdPackage: any;
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('umrah_packages').insert([rawPackage]).select();
        if (!error && data) {
          createdPackage = data[0];
          if (images && images.length > 0) {
            const imgInserts = images.map((url: string, index: number) => ({
              package_id: createdPackage.id,
              image_url: url,
              sort_order: index
            }));
            await supabase.from('umrah_package_images').insert(imgInserts);
          }
          if (pricing && pricing.length > 0) {
            const pricingInserts = pricing.map((pr: any) => ({
              package_id: createdPackage.id,
              room_type_id: pr.room_type_id,
              price_per_person: pr.price_per_person
            }));
            await supabase.from('package_room_prices').insert(pricingInserts);
          }
          return { ...createdPackage, images, pricing };
        }
      }
      const list = getStored('packages', MOCK_PACKAGES);
      createdPackage = { id: `pkg-${Date.now()}`, ...rawPackage, images: images || [], pricing: pricing || [] };
      list.push(createdPackage);
      setStored('packages', list);
      return createdPackage;
    },
    update: async (id: string, updates: any) => {
      const { images, pricing, ...rawUpdates } = updates;
      if (isSupabaseConfigured && supabase) {
        await supabase.from('umrah_packages').update(rawUpdates).eq('id', id);
        if (images) {
          await supabase.from('umrah_package_images').delete().eq('package_id', id);
          const imgInserts = images.map((url: string, index: number) => ({
            package_id: id,
            image_url: url,
            sort_order: index
          }));
          await supabase.from('umrah_package_images').insert(imgInserts);
        }
        if (pricing) {
          await supabase.from('package_room_prices').delete().eq('package_id', id);
          const pricingInserts = pricing.map((pr: any) => ({
            package_id: id,
            room_type_id: pr.room_type_id,
            price_per_person: pr.price_per_person
          }));
          await supabase.from('package_room_prices').insert(pricingInserts);
        }
        return { id, ...updates };
      }
      const list = getStored('packages', MOCK_PACKAGES);
      const index = list.findIndex((pkg: any) => pkg.id === id);
      if (index !== -1) {
        list[index] = { 
          ...list[index], 
          ...rawUpdates, 
          images: images || list[index].images,
          pricing: pricing || list[index].pricing
        };
        setStored('packages', list);
      }
      return list[index] || null;
    },
    delete: async (id: string) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('umrah_packages').delete().eq('id', id);
        return true;
      }
      const list = getStored('packages', MOCK_PACKAGES);
      const filtered = list.filter((p: any) => p.id !== id);
      setStored('packages', filtered);
      return true;
    }
  },

  orders: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase
          .from('orders')
          .select('*, order_items(*)').order('created_at', { ascending: false });
        if (!error) return data;
      }
      return getStored('orders', []);
    },
    create: async (orderData: any) => {
      const { items, ...rawOrder } = orderData;
      let createdOrder: any;
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('orders').insert([rawOrder]).select();
        if (!error && data) {
          createdOrder = data[0];
          if (items && items.length > 0) {
            const itemInserts = items.map((item: any) => ({
              order_id: createdOrder.id,
              product_id: item.product_id,
              product_name: item.product_name,
              quantity: item.quantity,
              unit_price: item.unit_price,
              total_price: item.total_price
            }));
            await supabase.from('order_items').insert(itemInserts);
          }
          return { ...createdOrder, items };
        }
      }
      const orders = getStored('orders', []);
      createdOrder = { 
        id: `ord-${Date.now()}`, 
        created_at: new Date().toISOString(),
        status: 'pending',
        ...rawOrder, 
        items: items || [] 
      };
      orders.unshift(createdOrder);
      setStored('orders', orders);
      return createdOrder;
    },
    updateStatus: async (id: string, status: string) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('orders').update({ status }).eq('id', id);
        return true;
      }
      const list = getStored('orders', []);
      const index = list.findIndex((o: any) => o.id === id);
      if (index !== -1) {
        list[index].status = status;
        setStored('orders', list);
      }
      return true;
    }
  },

  inquiries: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('umrah_inquiries').select('*').order('created_at', { ascending: false });
        if (!error) return data;
      }
      return getStored('inquiries', []);
    },
    create: async (inquiry: any) => {
      let createdInquiry: any;
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('umrah_inquiries').insert([inquiry]).select();
        if (!error && data) return data[0];
      }
      const list = getStored('inquiries', []);
      createdInquiry = { 
        id: `inq-${Date.now()}`, 
        created_at: new Date().toISOString(),
        status: 'new',
        ...inquiry 
      };
      list.unshift(createdInquiry);
      setStored('inquiries', list);
      return createdInquiry;
    },
    updateStatus: async (id: string, status: string) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('umrah_inquiries').update({ status }).eq('id', id);
        return true;
      }
      const list = getStored('inquiries', []);
      const index = list.findIndex((i: any) => i.id === id);
      if (index !== -1) {
        list[index].status = status;
        setStored('inquiries', list);
      }
      return true;
    }
  },

  testimonials: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('testimonials').select('*').eq('published', true);
        if (!error) return data;
      }
      return getStored('testimonials', MOCK_TESTIMONIALS);
    },
    create: async (item: any) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('testimonials').insert([item]).select();
        if (!error) return data[0];
      }
      const list = getStored('testimonials', MOCK_TESTIMONIALS);
      const newItem = { id: `t-${Date.now()}`, published: true, created_at: new Date().toISOString(), ...item };
      list.push(newItem);
      setStored('testimonials', list);
      return newItem;
    }
  },

  faqs: {
    list: async () => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('faqs').select('*').eq('published', true).order('sort_order', { ascending: true });
        if (!error) return data;
      }
      return getStored('faqs', MOCK_FAQS);
    },
    create: async (item: any) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('faqs').insert([item]).select();
        if (!error) return data[0];
      }
      const list = getStored('faqs', MOCK_FAQS);
      const newItem = { id: `faq-${Date.now()}`, published: true, created_at: new Date().toISOString(), ...item };
      list.push(newItem);
      setStored('faqs', list);
      return newItem;
    }
  },
  settings: {
    get: async (key: string, defaultVal: any) => {
      if (isSupabaseConfigured && supabase) {
        const { data, error } = await supabase.from('site_settings').select('value').eq('key', key).single();
        if (!error && data) return data.value;
      }
      return getStored(`setting_${key}`, defaultVal);
    },
    set: async (key: string, value: any) => {
      if (isSupabaseConfigured && supabase) {
        await supabase.from('site_settings').upsert({ key, value });
        return true;
      }
      setStored(`setting_${key}`, value);
      return true;
    }
  }
};
