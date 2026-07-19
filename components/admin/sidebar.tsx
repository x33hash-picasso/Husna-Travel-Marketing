'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Compass, 
  TrendingUp, 
  MessageSquare, 
  FolderTree, 
  MessageCircleCode, 
  HelpCircle, 
  Settings, 
  LogOut 
} from 'lucide-react';

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      const storedLogo = await db.settings.get('site_logo', '/images/logo.jpeg');
      setLogoUrl(storedLogo);
    };
    loadLogo();
  }, []);

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: ShoppingBag },
    { name: 'Umrah Packages', path: '/admin/umrah-packages', icon: Compass },
    { name: 'Orders', path: '/admin/orders', icon: TrendingUp },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Categories', path: '/admin/categories', icon: FolderTree },
    { name: 'Testimonials', path: '/admin/testimonials', icon: MessageCircleCode },
    { name: 'FAQs', path: '/admin/faqs', icon: HelpCircle },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    // Clear session details or mock admin login details
    localStorage.removeItem('husna_admin_logged');
    router.push('/admin/login');
  };

  return (
    <aside className="w-64 bg-[#121E19] text-gray-300 flex flex-col justify-between border-r-2 border-gold-medium/30 p-6 min-h-screen">
      
      {/* Branding Header */}
      <div>
         <div className="flex items-center gap-3 mb-8">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="h-9 w-auto object-contain max-w-[80px]" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />
          ) : (
            <div className="w-9 h-9 bg-emerald-medium text-white flex items-center justify-center rounded-full font-serif font-bold text-lg border border-gold-medium shadow-md">
              ح
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-serif font-bold text-white text-base tracking-wide">
              Husna Admin
            </span>
            <span className="text-[9px] uppercase font-bold tracking-widest text-gold-medium leading-none">
              Control Panel
            </span>
          </div>
        </div>

        {/* Sidebar Menu items */}
        <nav className="flex flex-col gap-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            // Admin prefix routing matches
            const active = pathname === item.path || (item.path !== '/admin' && pathname.startsWith(item.path));
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-sans font-semibold tracking-wide transition-all duration-200 ${
                  active
                    ? 'bg-emerald-medium text-white shadow-md border-r-4 border-gold-medium'
                    : 'hover:bg-emerald-lighter/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sign Out Button */}
      <button
        onClick={handleSignOut}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-sans font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 cursor-pointer"
      >
        <LogOut className="w-4 h-4" />
        <span>Sign Out</span>
      </button>

    </aside>
  );
}
