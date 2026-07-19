export interface Category {
  id: string;
  name_en: string;
  name_ur: string;
  slug: string;
  type: 'product' | 'herbal' | 'umrah';
  image_url?: string;
  is_active: boolean;
  created_at?: string;
}

export interface Product {
  id: string;
  category_id?: string;
  name_en: string;
  name_ur: string;
  slug: string;
  description_en?: string;
  description_ur?: string;
  price: number;
  sale_price?: number;
  sku?: string;
  stock: number;
  featured: boolean;
  published: boolean;
  images: string[];
  created_at?: string;
  updated_at?: string;
}

export interface RoomType {
  id: string;
  name_en: string;
  name_ur: string;
  slug: string;
  capacity?: number;
  is_active: boolean;
  created_at?: string;
}

export interface PackageRoomPrice {
  room_type_id: string;
  price_per_person: number;
  currency?: string;
  is_available?: boolean;
}

export interface UmrahPackage {
  id: string;
  name_en: string;
  name_ur: string;
  slug: string;
  description_en?: string;
  description_ur?: string;
  makkah_hotel?: string;
  madinah_hotel?: string;
  duration_days: number;
  flight_info?: string;
  transport_info?: string;
  features: string[];
  featured: boolean;
  published: boolean;
  images: string[];
  pricing: PackageRoomPrice[];
  created_at?: string;
  updated_at?: string;
}

export interface OrderItem {
  id?: string;
  product_id?: string;
  product_name: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

export interface Order {
  id: string;
  customer_name: string;
  phone: string;
  email?: string;
  address: string;
  total_amount: number;
  currency?: string;
  status: 'pending' | 'confirmed' | 'processing' | 'completed' | 'cancelled';
  notes?: string;
  items: OrderItem[];
  created_at?: string;
}

export interface UmrahInquiry {
  id: string;
  package_id?: string;
  room_type_id?: string;
  customer_name: string;
  phone: string;
  email?: string;
  travel_date: string;
  travelers: number;
  price_per_person: number;
  total_amount: number;
  message?: string;
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled';
  created_at?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  city?: string;
  review: string;
  rating: number;
  image_url?: string;
  published: boolean;
  created_at?: string;
}

export interface FAQ {
  id: string;
  question_en: string;
  question_ur: string;
  answer_en: string;
  answer_ur: string;
  published: boolean;
  sort_order: number;
  created_at?: string;
}
