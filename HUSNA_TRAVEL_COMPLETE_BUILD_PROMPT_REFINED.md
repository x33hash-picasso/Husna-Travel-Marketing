# COMPLETE ANTIGRAVITY BUILD PROMPT - REFINED

## PROJECT: HUSNA TRAVEL & MARKETING

Build a complete, production-ready, ultra-premium Islamic e-commerce and Umrah travel website for:

# HUSNA TRAVEL & MARKETING

**Tagline:**
> Your Sacred Journey Begins Here

**Mission:**
Combine luxury Islamic travel, Umrah packages, Islamic e-commerce, herbal products, and natural wellness—all in one seamless, trustworthy, cinematic experience.

The website must be:
- Fully functional (not a template)
- Production-ready
- Spiritually elegant
- Conversion-optimized

**Currency:** PKR (Pakistani Rupees)  
**Primary Market:** Pakistan

---

## 1. BUSINESS PURPOSE

Husna Travel & Marketing serves:

✅ Families planning Umrah journeys  
✅ Individuals seeking spiritual travel  
✅ Islamic product buyers  
✅ Herbal product customers  
✅ WhatsApp ordering customers  

**Core Services:**
- Umrah Packages (Economy, Premium, Executive, Family, Ramadan)
- Islamic Products (Quran, Prayer Mats, Tasbeeh, Gifts, Hajj accessories)
- Herbal Products (Honey, Black Seed, Oils, Natural Wellness)
- Complete admin panel for management
- WhatsApp-based ordering

---

## 2. DESIGN DIRECTION & THEME

### **LIGHT THEME - Primary Colors**

**Background:**
- Primary: `#FFFFFF` (Pure White)
- Secondary: `#F9F8F6` (Off-white/Cream)
- Tertiary: `#F0EDE6` (Light beige)

**Emerald (Islamic Green):**
- Dark: `#064E3B`
- Medium: `#047857`
- Light: `#10B981`
- Lighter: `#D1FAE5`

**Gold (Luxury):**
- Dark: `#C9A227`
- Medium: `#D4AF37`
- Light: `#F5D76E`
- Lighter: `#FEF3C7`

**Text:**
- Primary: `#1F2937` (Dark Gray)
- Secondary: `#6B7280` (Medium Gray)
- Soft: `#9CA3AF` (Light Gray)

**Accents:**
- Charcoal: `#374151`
- Sand: `#D2B48C`
- Soft Beige: `#E8DCC8`

### **Design Language:**

✅ Luxury glassmorphism (light frosted glass)  
✅ Soft, warm lighting  
✅ Gold & emerald highlights  
✅ Subtle Islamic geometric patterns  
✅ Premium typography  
✅ Large cinematic photography  
✅ Smooth scrolling & transitions  
✅ Elegant, minimalist layout  
✅ High whitespace  
✅ Soft shadows & depth  

### **DO NOT:**
❌ Dark theme  
❌ Generic e-commerce template  
❌ Crowded marketplace design  
❌ Cheap/unprofessional aesthetics  
❌ Excessive decorations  

**Inspiration:**
- Apple (minimalism, elegance)
- Tesla (cinematic storytelling)
- Linear (premium interface)
- Anthropic (trustworthy design)
- Luxury Islamic architecture
- Awwwards-winning websites

---

## 3. TECHNOLOGY STACK

**Frontend:**
- Next.js 15+ (App Router)
- TypeScript (strict mode)
- Tailwind CSS 4+
- shadcn/ui components
- React Hook Form (forms)
- Zod (validation)
- Framer Motion (animations)
- Lenis (smooth scroll)
- Lucide React (icons)
- React Three Fiber (3D)
- Three.js (3D engine)

**Backend & Database:**
- Supabase (PostgreSQL)
- Supabase Auth (authentication)
- Supabase Storage (image uploads)
- Row Level Security (RLS)

**Image Handling:**
- Next.js Image component
- Supabase Storage buckets
- File upload widget (admin panel)
- Image compression & optimization

**Utilities:**
- next-intl (internationalization)
- SWR or React Query (data fetching)
- clsx/classnames
- date-fns (date utilities)

**Best Practices:**
- Server Components where possible
- Server Actions for mutations
- Reusable, modular components
- Strict TypeScript types
- Protected routes with middleware
- SEO-friendly architecture

---

## 4. COMPLETE URL STRUCTURE

### **Public Routes - English**

```
/                                 (Redirect to /en)
/en                              (Homepage)
/en/umrah-packages               (All packages)
/en/umrah-packages/[slug]        (Package details)
/en/umrah-packages/[slug]/book   (Booking form)
/en/islamic-products             (All products)
/en/islamic-products/[slug]      (Product details)
/en/herbal-products              (All herbal products)
/en/herbal-products/[slug]       (Herbal product details)
/en/cart                          (Shopping cart)
/en/checkout                      (Checkout page)
/en/checkout/success             (Order success)
/en/about                         (About us)
/en/contact                       (Contact page)
/en/faq                           (FAQ page)
/en/privacy-policy               (Privacy policy)
/en/terms                         (Terms & conditions)
/en/refund-policy                (Refund policy)
```

### **Public Routes - Urdu (RTL)**

```
/ur                              (Homepage - Urdu)
/ur/umrah-packages               (All packages - Urdu)
/ur/umrah-packages/[slug]        (Package details - Urdu)
/ur/umrah-packages/[slug]/book   (Booking form - Urdu)
/ur/islamic-products             (All products - Urdu)
/ur/islamic-products/[slug]      (Product details - Urdu)
/ur/herbal-products              (All herbal products - Urdu)
/ur/herbal-products/[slug]       (Herbal details - Urdu)
/ur/cart                          (Shopping cart - Urdu)
/ur/checkout                      (Checkout - Urdu)
/ur/checkout/success             (Success page - Urdu)
/ur/about                         (About us - Urdu)
/ur/contact                       (Contact - Urdu)
/ur/faq                           (FAQ - Urdu)
/ur/privacy-policy               (Privacy - Urdu)
/ur/terms                         (Terms - Urdu)
/ur/refund-policy                (Refund - Urdu)
```

### **Admin Routes (Protected)**

```
/admin/login                     (Admin login)
/admin                          (Dashboard)
/admin/products                 (All products)
/admin/products/new             (Add product)
/admin/products/[id]/edit       (Edit product)
/admin/categories               (Manage categories)
/admin/umrah-packages           (All packages)
/admin/umrah-packages/new       (Add package)
/admin/umrah-packages/[id]/edit (Edit package)
/admin/room-pricing             (Room type pricing)
/admin/room-pricing/[id]/edit   (Edit room pricing)
/admin/orders                   (All orders)
/admin/orders/[id]              (Order details)
/admin/inquiries                (Customer inquiries)
/admin/inquiries/[id]           (Inquiry details)
/admin/customers                (Customer list)
/admin/testimonials             (Manage testimonials)
/admin/faqs                     (Manage FAQs)
/admin/pages                    (Page management)
/admin/media                    (Media library)
/admin/settings                 (Site settings)
/admin/users                    (Manage users)
```

---

## 5. HEADER/NAVBAR - PREMIUM DESIGN

### **Desktop Navigation (Light Theme)**

**Logo & Branding:**
- Logo image with text: "Husna Travel & Marketing"
- Height: 60px initially
- Tagline: "Your Sacred Journey Begins Here"

**Main Menu (Left to Right):**
- Home (opens on new tab/page)
- Umrah Packages (opens on new page)
- Islamic Products (opens on new page)
- Herbal Products (opens on new page)
- About Us (opens on new page)
- Contact (opens on new page)

**Right Side Controls:**
- Language Switcher: EN | اردو (with smooth transition)
- Currency Display: PKR
- Search Icon (opens search modal)
- Cart Icon (shows cart count)
- WhatsApp Icon (direct link to WhatsApp)

**Initial State (At Hero):**
- Background: Transparent/Glassmorphic (`rgba(255, 255, 255, 0.7)`)
- Backdrop blur: `blur(10px)`
- Border: Subtle bottom border (`1px solid #E5E7EB`)
- Height: 80px
- Text color: `#1F2937`
- Icons: Emerald (`#047857`)

**On Scroll (Below Hero):**
- Background: Solid white (`#FFFFFF`)
- Backdrop blur: Removed
- Border: Gold accent bottom (`2px solid #D4AF37`)
- Height: 70px (compact)
- Shadow: Soft shadow (`0 4px 6px rgba(0, 0, 0, 0.05)`)
- Sticky positioning
- Smooth transition (300ms)

**Hover Effects:**
- Menu items: Emerald color + underline animation
- Cart: Gold highlight + bounce animation
- WhatsApp: Emerald background + smooth scale

### **Mobile Navigation**

**Top Bar:**
- Logo (left)
- Cart icon with count badge (right)
- Hamburger menu (right)

**Full-Screen Mobile Menu (When Hamburger Clicked):**
- Overlay: Dark backdrop (`rgba(0, 0, 0, 0.5)`)
- Menu panel: Slide in from left (light theme)
- Background: `#FFFFFF`
- Full menu items
- Language switcher
- Close button (X icon, top right)

**Animations:**
- Slide in: 300ms ease-out
- Slide out: 300ms ease-in
- Fade overlay: 300ms

### **Link Behavior - IMPORTANT**

**ALL navigation links open on NEW page/tab:**
- Use `target="_blank"` where appropriate
- Or navigate using Next.js Link component within app
- Maintain consistent navigation behavior
- Links within the site: Standard Next.js routing
- External links: Open new tab

---

## 6. HOMEPAGE HERO SECTION - MAKKAH KAABA SLIDER

### **Full Viewport Hero**

**Height:** 100vh (or min 600px)

**Background:**
- Primary: Cinematic Kaaba/Makkah images
- Multiple high-quality photography
- Soft golden lighting (sunrise/sunset aesthetic)

### **Interactive Slider with Animation**

**Slider Features:**

✅ **Multiple Kaaba Images:**
- Kaaba at sunrise (golden light)
- Kaaba at sunset (warm tones)
- Masjid al-Haram (full view)
- Pilgrims in prayer (spiritual)
- Islamic architecture detail
- Desert landscape (spiritual background)

✅ **Auto-Play Animation:**
- Transition every 5 seconds
- Smooth crossfade (1 second transition)
- Pause on hover
- Resume when mouse leaves

✅ **Manual Controls:**
- Previous/Next buttons (emerald color)
- Dot indicators (bottom center)
- Current slide counter (1/6)

✅ **Image Animation:**
- Slow zoom effect (1-10% scale)
- Parallax on first load
- Subtle golden particle overlay
- Light rays animation (subtle)
- Text reveal animation

**Slider Navigation:**

```
Previous Button          Dot Indicators          Next Button
(Emerald emerald)       (Small circles)         (Emerald)
  ◄                  ● ○ ○ ○ ○ ○              ►
                     1/6
```

### **Hero Headline & Text**

**Overlay Position:** Center of hero

**Headline:**
```
Your Sacred Journey
Begins Here
```

**Font:** 
- Size: 48px-56px (desktop), 32px-40px (mobile)
- Weight: 700 (bold)
- Color: `#FFFFFF`
- Font-family: Premium serif or sans-serif (e.g., Playfair Display, Inter)
- Shadow: Soft text shadow for readability

**Supporting Text:**
```
Premium Umrah Packages, Islamic Products & Natural Wellness —
Curated with Trust, Care and Excellence.
```

**Font:**
- Size: 18px-20px (desktop), 14px-16px (mobile)
- Weight: 400
- Color: `#F9F8F6` (light off-white)
- Opacity: 0.95

### **Hero CTAs (Call-to-Action Buttons)**

**Primary Button:**
- Text: "Explore Umrah Packages"
- Action: Navigate to `/[locale]/umrah-packages`
- Style: Emerald background (`#047857`)
- Color: White text
- Size: 16px font, 48px height
- Hover: Gold accent, scale 1.05
- Animation: Fade in from bottom (on page load)

**Secondary Button:**
- Text: "Shop Islamic Collection"
- Action: Navigate to `/[locale]/islamic-products`
- Style: Gold border (`#D4AF37`)
- Background: Transparent
- Color: Gold text
- Hover: Gold background, white text
- Animation: Fade in from bottom (slight delay)

**WhatsApp Button:**
- Text: "Talk to Our Travel Expert"
- Icon: WhatsApp icon
- Style: Emerald background
- Action: Open WhatsApp with pre-filled message
- Fixed position: Bottom right (mobile), or floating
- Hover: Pulse animation

**Button Layout:**
- Desktop: Horizontal (side by side)
- Mobile: Vertical (stacked)
- Spacing: 20px gap
- Smooth transitions on all interactions

---

## 7. HOMEPAGE STRUCTURE (In Order)

1. **Premium Navbar** (sticky, light theme)
2. **Makkah Kaaba Hero Slider** (with animations)
3. **Trust Counters** (animated numbers)
4. **Featured Umrah Packages** (grid, 3-4 cards)
5. **Makkah & Madinah Experience** (parallax storytelling)
6. **Islamic Products Section** (grid showcase)
7. **Herbal Products Section** (grid showcase)
8. **How It Works** (4-step process)
9. **Why Choose Husna** (feature highlights)
10. **Featured Products** (carousel or grid)
11. **Testimonials** (slider, 3-4 testimonials)
12. **FAQ Section** (accordion, top 6 questions)
13. **Contact CTA** (prominent section)
14. **Footer** (complete information)

---

## 8. TRUST COUNTERS SECTION

**Section Background:** Light cream (`#F9F8F6`)

**Counter Cards:**

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│     15+     │  │   1000+     │  │    500+     │  │    100+     │
│   Years     │  │  Customers  │  │   Umrah     │  │  Premium    │
│ Experience  │  │    Happy    │  │  Journeys   │  │  Products   │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

**Animation:**
- Number counter: Count from 0 to final on page load
- Stagger effect: Each card animates after previous
- Fade-up animation: Smooth entry
- Duration: 2 seconds per counter

**Design:**
- Card style: Light background with emerald border
- Number size: 36-48px, bold
- Text size: 14-16px
- Spacing: 20px gap between cards
- Responsive: 2x2 grid on tablet, 1x4 on desktop

---

## 9. UMRAH PACKAGES SECTION

### **Section Header:**
```
Featured Umrah Packages
Curated Journeys to the Holy Cities
```

### **Package Cards:**

Each package displays:
- **Package Image** (cinematic, high quality)
- **Package Name** (English & Urdu support)
- **Duration** (e.g., "10 Days")
- **Hotels** (Makkah & Madinah hotel names)
- **Starting Price** (e.g., "From Rs. 235,000")
- **Features** (quick list, 3-4 items)

### **Package Card Sections:**

**Image Area:**
- 300px height
- Hover: Slow zoom (1.05x), darker overlay
- Islamic geometric pattern overlay (subtle)

**Content Area:**
- Padding: 20px
- Background: White
- Border: Light gold/emerald accent

**CTA Buttons:**

```
[View Details] [Book Now] [WhatsApp]
```

- View Details: Navigate to package details page (opens on new page)
- Book Now: Navigate to booking form
- WhatsApp: Open WhatsApp with pre-filled inquiry message

### **Default Umrah Packages:**

1. **Economy Umrah Package**
   - Duration: 8 Days
   - Hotels: Moderate 4-star
   - Price: From Rs. 235,000
   - Room Types: Sharing, Quad

2. **Premium Umrah Package**
   - Duration: 10 Days
   - Hotels: Premium 5-star
   - Price: From Rs. 277,500
   - Room Types: Double, Triple

3. **Executive Umrah Package**
   - Duration: 14 Days
   - Hotels: Luxury 5-star
   - Price: From Rs. 350,000
   - Room Types: Double, Single

4. **Family Umrah Package**
   - Duration: 12 Days
   - Hotels: Family-friendly 5-star
   - Price: From Rs. 295,000
   - Room Types: Family suites

### **Layout:**
- Grid: 4 cards on desktop, 2 on tablet, 1 on mobile
- Spacing: 24px gap
- Responsive gaps

---

## 10. ROOM TYPE PRICING - DYNAMIC SYSTEM

### **Default Room Types:**

```
┌─────────┬──────────────────┐
│ Room    │ Price Per Person │
├─────────┼──────────────────┤
│ Sharing │ Rs. 235,000      │
│ Quad    │ Rs. 239,000      │
│ Triple  │ Rs. 252,500      │
│ Double  │ Rs. 277,500      │
└─────────┴──────────────────┘
```

### **Package-Specific Pricing:**

Each Umrah package can override default prices:

```
Package: Premium Umrah Package

Room Type Selection:
○ Sharing  Rs. 260,000
◉ Triple   Rs. 280,000  ← Selected
○ Double   Rs. 310,000

Number of Travelers: [4] ▼

Price Calculation:
  Price per Person:    Rs. 280,000
× Number of Travelers: 4
─────────────────────────────────
  Total Amount:        Rs. 1,120,000
```

### **Pricing UI:**

- Room type buttons: Emerald background when selected
- Gold accent on selected button
- Price updates in real-time
- Total calculation updates immediately
- Display included features for room type
- Show capacity (e.g., "Sharing: 3-4 people per room")

---

## 11. ISLAMIC PRODUCTS SECTION

### **Section Header:**
```
Islamic Collection
Premium Islamic Products for Your Spiritual Journey
```

### **Product Categories:**
- Quran & Islamic Books
- Prayer Mats & Prayer Accessories
- Tasbeeh & Dhikr Items
- Attar & Islamic Fragrances
- Hijabs & Islamic Wear
- Islamic Gifts & Souvenirs
- Ramadan Products
- Hajj & Umrah Accessories
- Islamic Home Decor

### **Product Cards:**

```
┌──────────────────────┐
│   Product Image      │
│  (with zoom hover)   │
├──────────────────────┤
│ Product Name (EN)    │
│ Product Name (UR)    │
│ ★★★★★ (4.5)        │
│ Rs. 5,000           │ ← Sale Price
│ Rs. 6,500 (crossed) │ ← Original Price
│ Discount: 23%       │ ← Badge
│                      │
│ In Stock (Green)    │
│                      │
│ [Add to Cart]       │
│ [Quick View]        │
│ [WhatsApp Order]    │
│ [❤ Wishlist]       │
└──────────────────────┘
```

### **Product Grid:**
- Desktop: 4 columns
- Tablet: 2-3 columns
- Mobile: 1-2 columns
- Gap: 20px
- Responsive with proper padding

---

## 12. HERBAL PRODUCTS SECTION

### **Section Header:**
```
Natural Wellness
Premium Herbal & Organic Products
```

### **Herbal Categories:**
- Premium Honey (various types)
- Black Seed & Products
- Herbal Oils & Infusions
- Natural Wellness Products
- Traditional Healing Products
- Organic Superfoods

### **Product Display:**
Same as Islamic Products section

**Important:** Do NOT make medical claims. Use language like:
- "Traditional wellness product"
- "Natural ingredient"
- "Premium quality"
- "Organic sourced"

---

## 13. ADMIN PANEL - IMAGE UPLOAD

### **CRITICAL: Admin Image Uploader (NOT Link Pasting)**

**Admin must be able to:**

✅ **Upload images directly** (not paste links)
✅ **Visual preview** before upload
✅ **Drag & drop** support
✅ **Multiple images** for products/packages
✅ **Auto-compression** and optimization
✅ **Supabase Storage** integration
✅ **Delete old images** functionality
✅ **Image validation** (size, format, dimensions)

### **Upload Interface Design:**

```
Product Images
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[+ Add Images] [Drag & drop here]

Current Images:
┌─────┐ ┌─────┐ ┌─────┐
│ Img │ │ Img │ │ Img │
│  1  │ │  2  │ │  3  │
│  ✕  │ │  ✕  │ │  ✕  │
└─────┘ └─────┘ └─────┘
 Delete  Delete  Delete
```

### **Upload Widget Features:**

- **File Input:** Accepts JPG, PNG, WebP
- **Max Size:** 5MB per image
- **Auto-resize:** Compress to optimal size
- **Progress Bar:** Show upload progress
- **Error Handling:** Clear error messages
- **Success Message:** Confirmation after upload
- **Delete Button:** Remove image from storage
- **Sort Order:** Drag to reorder images

### **Supabase Storage Buckets:**

```
product-images/
├── product-123/
│   ├── image-1.webp
│   ├── image-2.webp
│   └── image-3.webp

package-images/
├── package-456/
│   ├── image-1.webp
│   ├── image-2.webp
│   └── image-3.webp

testimonial-images/
├── testimonial-789.webp

site-assets/
├── logo.png
├── hero-bg.webp
```

---

## 14. ADMIN PANEL - PRODUCT MANAGEMENT

### **Add/Edit Product Form:**

```
Product Name (English):      [________________]
Product Name (Urdu):         [________________]
Slug:                        [________________]

Description (English):
[_________________________________]

Description (Urdu):
[_________________________________]

Category:                    [Select Category ▼]
Price:                       [________]
Sale Price:                  [________]
SKU:                         [________]
Stock:                       [________]

Product Images:
[+ Upload Images]

[Current Images display with delete buttons]

Featured:                    [☐] Yes
Published:                   [☑] Yes

[Save Product] [Cancel]
```

---

## 15. ADMIN PANEL - UMRAH PACKAGE MANAGEMENT

### **Add/Edit Umrah Package Form:**

```
Package Name (English):      [________________]
Package Name (Urdu):         [________________]
Slug:                        [________________]

Description (English):
[_________________________________]

Description (Urdu):
[_________________________________]

Makkah Hotel:                [________________]
Madinah Hotel:               [________________]

Duration (Days):             [__]
Flight Information:          [________________]
Transport Information:       [________________]

Features:
[☑] 5-Star Hotel Accommodation
[☑] Umrah Visa Processing
[☑] Transportation
[☑] Islamic Guide

Package Images:
[+ Upload Images]

Travel Dates:
From [__/__/____] To [__/__/____]

Room Type Pricing:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Room Type    Price Per Person   Edit
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Sharing      Rs. 260,000        [Edit]
Quad         Rs. 265,000        [Edit]
Triple       Rs. 280,000        [Edit]
Double       Rs. 310,000        [Edit]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Featured:                    [☐] Yes
Published:                   [☑] Yes

[Save Package] [Cancel]
```

---

## 16. ADMIN ROOM PRICING MANAGEMENT

### **Room Type Pricing Interface:**

```
Room Type Management
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[+ Add Room Type]

Existing Room Types:
┌──────────────────────────────────────┐
│ Room Type: Sharing                   │
│ Status: Active [Edit] [Delete]       │
│                                      │
│ Package Pricing:                     │
│ ├─ Premium Umrah      Rs. 260,000   │
│ ├─ Economy Umrah      Rs. 235,000   │
│ └─ Executive Umrah    Rs. 285,000   │
└──────────────────────────────────────┘

┌──────────────────────────────────────┐
│ Room Type: Triple                    │
│ Status: Active [Edit] [Delete]       │
│                                      │
│ Package Pricing:                     │
│ ├─ Premium Umrah      Rs. 280,000   │
│ ├─ Economy Umrah      Rs. 252,500   │
│ └─ Executive Umrah    Rs. 310,000   │
└──────────────────────────────────────┘
```

### **Edit Room Type Modal:**

```
Edit Room Type Pricing for: Premium Umrah Package

Sharing:     [260000]  PKR/person
Quad:        [265000]  PKR/person
Triple:      [280000]  PKR/person
Double:      [310000]  PKR/person

[Save Pricing] [Cancel]
```

---

## 17. WHATSAPP INTEGRATION

### **WhatsApp Number (Environment Variable):**

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=923XXXXXXXXX
```

### **Umrah Inquiry Message (Auto-Generated):**

```
Assalam-o-Alaikum,

I am interested in booking an Umrah Package from 
Husna Travel & Marketing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🕋 UMRAH PACKAGE INQUIRY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📦 Package Name:
Premium Umrah Package

🏨 Hotel Information:
Makkah: Al-Marjan
Madinah: Al-Emar

🏠 Room Type:
Double

💰 Price Per Person:
Rs. 310,000

👥 Number of Travelers:
3

💵 Estimated Total Amount:
Rs. 930,000

📅 Preferred Travel Date:
15 June 2024

👤 Customer Name:
[Your Name]

📱 Phone Number:
[Your Phone]

📧 Email:
[Your Email]

📝 Additional Notes:
[Any special requirements]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please provide complete package details and 
confirm availability for the selected date.

JazakAllah Khair.

Husna Travel & Marketing
Your Sacred Journey Begins Here
```

### **Product Order Message (Auto-Generated):**

```
Assalam-o-Alaikum,

I would like to place an order through 
Husna Travel & Marketing.

━━━━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ PRODUCT ORDER
━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Customer Name:
[Your Name]

📱 Phone Number:
[Your Phone]

📦 Product Name:
Premium Quran (Leather Bound)

🔢 Quantity:
2

💰 Unit Price:
Rs. 3,500

💵 Total Amount:
Rs. 7,000

📍 Delivery Address:
[Your Address]

📝 Additional Notes:
[Special requests]

━━━━━━━━━━━━━━━━━━━━━━━━━━━

Please confirm my order and provide 
delivery timeline.

JazakAllah Khair.

Husna Travel & Marketing
Your Sacred Journey Begins Here
```

### **WhatsApp API Integration:**

```javascript
// Generate WhatsApp link
const generateWhatsAppLink = (message: string) => {
  const encoded = encodeURIComponent(message);
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  return `https://wa.me/${number}?text=${encoded}`;
};

// Usage in component
<a 
  href={generateWhatsAppLink(umrahMessage)}
  target="_blank"
  rel="noopener noreferrer"
>
  WhatsApp Inquiry
</a>
```

---

## 18. SUPABASE DATABASE SCHEMA

### **Tables to Create:**

```sql
-- Profiles/Users
CREATE TABLE profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  role VARCHAR(50) DEFAULT 'user', -- user, admin
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(255) NOT NULL,
  name_ur VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  type VARCHAR(50) NOT NULL, -- product, umrah
  image_url TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  name_en VARCHAR(255) NOT NULL,
  name_ur VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_en TEXT,
  description_ur TEXT,
  price DECIMAL(10, 2) NOT NULL,
  sale_price DECIMAL(10, 2),
  sku VARCHAR(100),
  stock INTEGER DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Product Images
CREATE TABLE product_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Umrah Packages
CREATE TABLE umrah_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(255) NOT NULL,
  name_ur VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description_en TEXT,
  description_ur TEXT,
  makkah_hotel VARCHAR(255),
  madinah_hotel VARCHAR(255),
  duration_days INTEGER,
  flight_info TEXT,
  transport_info TEXT,
  features TEXT[], -- Array of features
  featured BOOLEAN DEFAULT FALSE,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Umrah Package Images
CREATE TABLE umrah_package_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES umrah_packages(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Room Types
CREATE TABLE room_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en VARCHAR(255) NOT NULL,
  name_ur VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  capacity INTEGER, -- Number of people per room
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Package Room Pricing
CREATE TABLE package_room_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES umrah_packages(id) ON DELETE CASCADE,
  room_type_id UUID REFERENCES room_types(id) ON DELETE CASCADE,
  price_per_person DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'PKR',
  is_available BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(package_id, room_type_id)
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  address TEXT,
  total_amount DECIMAL(10, 2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'PKR',
  status VARCHAR(50) DEFAULT 'pending', -- pending, confirmed, processing, completed, cancelled
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Order Items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id),
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL
);

-- Umrah Inquiries
CREATE TABLE umrah_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID REFERENCES umrah_packages(id),
  room_type_id UUID REFERENCES room_types(id),
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  travel_date DATE,
  travelers INTEGER,
  price_per_person DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  message TEXT,
  status VARCHAR(50) DEFAULT 'new', -- new, contacted, in_progress, completed, cancelled
  created_at TIMESTAMP DEFAULT NOW()
);

-- Testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name VARCHAR(255) NOT NULL,
  city VARCHAR(255),
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image_url TEXT,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- FAQs
CREATE TABLE faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_en VARCHAR(255) NOT NULL,
  question_ur VARCHAR(255) NOT NULL,
  answer_en TEXT NOT NULL,
  answer_ur TEXT NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  sort_order INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Site Settings
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);
```

---

## 19. SUPABASE STORAGE BUCKETS

**Create these buckets:**

```
product-images/
  - Storage for all product images
  - Public read access (for displaying images)
  - Private write access (only authenticated admins)

package-images/
  - Storage for Umrah package images
  - Public read access
  - Private write access

testimonial-images/
  - Storage for customer testimonial images
  - Public read access
  - Private write access

site-assets/
  - Storage for logo, hero backgrounds, etc.
  - Public read access
  - Private write access
```

**Bucket Configuration:**

- File naming: `{resource-type}-{id}-{timestamp}.{ext}`
- Example: `product-123-1692345678.webp`
- Max file size: 5MB
- Allowed formats: JPG, PNG, WebP
- Auto-compress: Yes
- Cache control: Public, max-age=31536000 (1 year)

---

## 20. ANIMATIONS & INTERACTIONS

### **Framer Motion Animations:**

✅ Fade Up (elements slide up with fade)
✅ Blur Reveal (text blurs and reveals)
✅ Scale Pop (elements pop in with scale)
✅ Number Counter (animated counting)
✅ Parallax (on scroll and mouse move)
✅ Image Zoom (on hover)
✅ Stagger Children (sequential animations)
✅ Page Transitions (between routes)

### **Lenis Smooth Scroll:**

- Smooth scrolling across entire site
- Responsive to scroll wheel and trackpad
- Mobile-friendly
- Reduce motion support (respects prefers-reduced-motion)

### **Slider Animations (Kaaba):**

✅ Auto-play every 5 seconds
✅ Fade transition (1 second)
✅ Slow zoom on image (1-10% scale)
✅ Pause on hover
✅ Golden particle effect (overlay)
✅ Text reveal animation
✅ Dot indicators animate on change
✅ Navigation buttons scale on hover

### **Button Interactions:**

✅ Hover: Color shift + scale 1.05
✅ Active: Color change + slight inset
✅ Loading: Spinner animation
✅ Success: Checkmark animation
✅ Error: Shake animation

### **Form Animations:**

✅ Input focus: Border color change + shadow
✅ Error: Shake + red highlight
✅ Success: Checkmark + green highlight
✅ Validation feedback: Smooth transitions

---

## 21. INTERNATIONALIZATION (i18n)

### **Language Support:**

- English (LTR)
- Urdu (RTL)

### **Implementation:**

```
HTML lang and dir attributes:

English:
<html lang="en" dir="ltr">

Urdu:
<html lang="ur" dir="rtl">
```

### **Translation Coverage:**

✅ All UI text (navbar, buttons, labels)
✅ All page content (headings, descriptions)
✅ Form labels and validation messages
✅ Admin panel text
✅ Error messages
✅ Success messages
✅ SEO metadata (titles, descriptions)

### **Urdu Navigation Menu:**

```
ہوم - Home
عمرہ پیکجز - Umrah Packages
اسلامی مصنوعات - Islamic Products
ہربل مصنوعات - Herbal Products
ہمارے بارے میں - About Us
رابطہ کریں - Contact
کارٹ - Cart
واٹس ایپ - WhatsApp
```

### **RTL Layout Adjustments:**

✅ Flex direction reversed
✅ Text alignment (right-aligned in Urdu)
✅ Border/margin positioning reversed
✅ Icon positioning reversed
✅ Form layout reversed
✅ Tables reversed
✅ Modals/overlays centered appropriately

---

## 22. FOLDER & FILE STRUCTURE

```
husna-travel/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx (Homepage)
│   │   ├── umrah-packages/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── islamic-products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── herbal-products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── cart/page.tsx
│   │   ├── checkout/
│   │   │   ├── page.tsx
│   │   │   └── success/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms/page.tsx
│   │   └── refund-policy/page.tsx
│   │
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── layout.tsx
│   │   ├── page.tsx (Dashboard)
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── umrah-packages/
│   │   │   ├── page.tsx
│   │   │   ├── new/page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── room-pricing/
│   │   │   ├── page.tsx
│   │   │   └── [id]/edit/page.tsx
│   │   ├── orders/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── inquiries/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── categories/page.tsx
│   │   ├── customers/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── faqs/page.tsx
│   │   ├── media/page.tsx
│   │   ├── settings/page.tsx
│   │   └── users/page.tsx
│   │
│   ├── api/
│   │   ├── auth/[...nextauth]/route.ts
│   │   ├── products/route.ts
│   │   ├── uploads/route.ts
│   │   └── whatsapp/route.ts
│   │
│   └── layout.tsx (Root layout)
│
├── components/
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── card.tsx
│   │   ├── modal.tsx
│   │   ├── loading.tsx
│   │   └── badge.tsx
│   │
│   ├── shared/
│   │   ├── navbar.tsx
│   │   ├── footer.tsx
│   │   ├── language-switcher.tsx
│   │   └── cart-icon.tsx
│   │
│   ├── home/
│   │   ├── hero-slider.tsx
│   │   ├── trust-counters.tsx
│   │   ├── umrah-packages-showcase.tsx
│   │   ├── makkah-madinah-experience.tsx
│   │   ├── islamic-products-section.tsx
│   │   ├── herbal-products-section.tsx
│   │   ├── how-it-works.tsx
│   │   ├── why-choose-us.tsx
│   │   ├── testimonials-slider.tsx
│   │   ├── faq-section.tsx
│   │   └── contact-cta.tsx
│   │
│   ├── products/
│   │   ├── product-card.tsx
│   │   ├── product-grid.tsx
│   │   ├── product-details.tsx
│   │   └── product-image-gallery.tsx
│   │
│   ├── cart/
│   │   ├── cart-item.tsx
│   │   ├── cart-summary.tsx
│   │   └── checkout-form.tsx
│   │
│   ├── admin/
│   │   ├── sidebar.tsx
│   │   ├── dashboard-stats.tsx
│   │   ├── product-form.tsx
│   │   ├── package-form.tsx
│   │   ├── image-uploader.tsx
│   │   ├── order-table.tsx
│   │   ├── inquiry-table.tsx
│   │   └── room-pricing-manager.tsx
│   │
│   └── 3d/
│       └── kaaba-scene.tsx
│
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   ├── auth.ts
│   │   └── queries.ts
│   │
│   ├── whatsapp/
│   │   └── message-generator.ts
│   │
│   ├── validations/
│   │   ├── product.ts
│   │   ├── package.ts
│   │   ├── order.ts
│   │   └── room-pricing.ts
│   │
│   ├── utils/
│   │   ├── cn.ts (className merge)
│   │   ├── formatting.ts (price, date)
│   │   ├── storage.ts (localStorage helpers)
│   │   └── constants.ts
│   │
│   └── i18n/
│       ├── en.json
│       ├── ur.json
│       └── get-translations.ts
│
├── types/
│   ├── product.ts
│   ├── package.ts
│   ├── order.ts
│   ├── user.ts
│   └── database.ts
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero-kaaba-1.webp
│   │   ├── hero-kaaba-2.webp
│   │   ├── ... (hero images)
│   │   └── icons/
│   │
│   └── fonts/
│
├── styles/
│   ├── globals.css
│   ├── tailwind.config.ts
│   └── theme.css
│
├── middleware.ts
├── env.local (not in repo)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── README.md
```

---

## 23. ENVIRONMENT VARIABLES

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=923XXXXXXXXX

# App Settings
NEXT_PUBLIC_APP_NAME=Husna Travel & Marketing
NEXT_PUBLIC_APP_DESCRIPTION=Your Sacred Journey Begins Here
```

---

## 24. PERFORMANCE TARGETS

Target Lighthouse scores:

✅ Performance: 95+
✅ Accessibility: 95+
✅ Best Practices: 95+
✅ SEO: 95+

Optimization strategies:

- Next.js Image component for all images
- Lazy loading for below-fold content
- Code splitting and dynamic imports
- CSS-in-JS optimization
- Font optimization (font-display: swap)
- Minified CSS/JS
- WebGL optimization for 3D
- Reduced motion support
- Optimized bundle size

---

## 25. DEVELOPMENT PHASES

### **PHASE 1: Project Setup & Analysis**

- [ ] Analyze existing codebase
- [ ] Set up environment variables
- [ ] Configure Supabase project
- [ ] Create database schema
- [ ] Test Supabase connection
- [ ] Set up authentication

### **PHASE 2: Design System & Styling**

- [ ] Configure Tailwind CSS (light theme)
- [ ] Create color variables
- [ ] Create typography system
- [ ] Create component primitives (button, card, input)
- [ ] Set up shadcn/ui
- [ ] Create layout components

### **PHASE 3: Admin Features**

- [ ] Admin login page
- [ ] Protected routes & middleware
- [ ] Admin dashboard layout
- [ ] Image uploader component
- [ ] Product management (CRUD)
- [ ] Category management
- [ ] Umrah package management
- [ ] Room pricing management
- [ ] Order management
- [ ] Inquiry management
- [ ] Settings management

### **PHASE 4: Homepage**

- [ ] Navbar (sticky, light theme, navigation links)
- [ ] Makkah Kaaba slider with animations
- [ ] Trust counters (animated)
- [ ] Featured Umrah packages section
- [ ] Makkah & Madinah experience section
- [ ] Islamic products showcase
- [ ] Herbal products showcase
- [ ] How it works section
- [ ] Why choose us section
- [ ] Featured products section
- [ ] Testimonials slider
- [ ] FAQ accordion
- [ ] Contact CTA
- [ ] Footer

### **PHASE 5: Product Pages**

- [ ] Product listing page (grid, filters)
- [ ] Product detail page
- [ ] Product image gallery
- [ ] Add to cart functionality
- [ ] Wishlist feature
- [ ] WhatsApp order button

### **PHASE 6: Umrah Packages**

- [ ] Package listing page
- [ ] Package detail page
- [ ] Room type selection
- [ ] Price calculation
- [ ] Booking form
- [ ] WhatsApp inquiry generation

### **PHASE 7: Shopping & Checkout**

- [ ] Cart page (persistent)
- [ ] Cart management (add, remove, update qty)
- [ ] Checkout form
- [ ] Order confirmation
- [ ] WhatsApp order message

### **PHASE 8: Internationalization (i18n)**

- [ ] Implement next-intl
- [ ] English translations
- [ ] Urdu translations
- [ ] RTL support
- [ ] Language switcher
- [ ] Test all pages in both languages

### **PHASE 9: Testing & Optimization**

- [ ] Test all routes
- [ ] Test all forms
- [ ] Test admin functions
- [ ] Test WhatsApp integration
- [ ] Test mobile responsiveness
- [ ] Lighthouse optimization
- [ ] Fix TypeScript errors
- [ ] Fix lint errors
- [ ] Performance testing

### **PHASE 10: Deployment & Launch**

- [ ] Set up production Supabase
- [ ] Configure environment variables
- [ ] Deploy to Vercel
- [ ] Test all features in production
- [ ] Set up monitoring
- [ ] Create admin user
- [ ] Seed with sample data

---

## 26. QUALITY ASSURANCE CHECKLIST

Before final submission, verify:

### **Frontend**

- [ ] Light theme applied throughout
- [ ] All navigation links open on new page/tab
- [ ] Responsive on desktop, tablet, mobile
- [ ] All animations smooth and performant
- [ ] Images optimized and lazy-loaded
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Accessibility pass (WCAG 2.1 AA)
- [ ] SEO metadata complete
- [ ] Page titles and descriptions set

### **Admin Panel**

- [ ] Image uploader works (not link pasting)
- [ ] Image deletion works
- [ ] Product CRUD fully functional
- [ ] Package CRUD fully functional
- [ ] Room pricing management works
- [ ] Order status updates work
- [ ] Inquiry status updates work
- [ ] Protected routes working
- [ ] Authentication working

### **Shopping Features**

- [ ] Cart persists (localStorage)
- [ ] Add to cart works
- [ ] Remove from cart works
- [ ] Update quantity works
- [ ] Price calculation correct
- [ ] WhatsApp links correct
- [ ] WhatsApp messages formatted correctly
- [ ] Room type selection works
- [ ] Traveler count selection works

### **Database**

- [ ] All tables created
- [ ] Relationships correct
- [ ] Indexes set up
- [ ] RLS policies configured
- [ ] Storage buckets created
- [ ] Seed data inserted

### **Internationalization**

- [ ] English version working
- [ ] Urdu version working
- [ ] RTL layout correct
- [ ] All text translated
- [ ] Language switcher works
- [ ] URLs correct for each language

### **Performance**

- [ ] Lighthouse Performance: 95+
- [ ] Lighthouse Accessibility: 95+
- [ ] Lighthouse Best Practices: 95+
- [ ] Lighthouse SEO: 95+
- [ ] Page load < 3s
- [ ] No layout shifts (CLS < 0.1)

---

## 27. FINAL QUALITY STANDARD

The final website must:

✅ **Look Premium:** Apple-like minimalism + Islamic luxury  
✅ **Feel Spiritual:** Emotional, trustworthy, elegant  
✅ **Work Perfectly:** No errors, no bugs, production-ready  
✅ **Convert:** Clear CTAs, WhatsApp integration, smooth checkout  
✅ **Perform:** Fast, responsive, optimized  
✅ **Support Multiple Languages:** English & Urdu (RTL)  
✅ **Manage Easily:** Complete admin panel with image uploads  

---

## 28. FINAL COMMIT MESSAGE

When complete, create commit with message:

```
feat: Complete Husna Travel & Marketing build

- Light theme with emerald/gold design
- Makkah Kaaba slider with animations
- Admin image uploader (Supabase Storage)
- Complete product & package management
- WhatsApp integration for orders
- English & Urdu support (RTL)
- Responsive design (mobile, tablet, desktop)
- Lighthouse scores 95+
- Production-ready with all features
```

---

**This is the complete, refined specification. Build the full production-ready application.**

