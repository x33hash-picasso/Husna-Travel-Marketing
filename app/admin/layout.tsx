'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // Exclude login screen from authentication check
    if (pathname === '/admin/login') {
      setAuthorized(true);
      return;
    }

    const checkAuth = () => {
      const logged = localStorage.getItem('husna_admin_logged');
      if (logged !== 'true') {
        router.push('/admin/login');
      } else {
        setAuthorized(true);
      }
    };
    checkAuth();
  }, [pathname, router]);

  if (!authorized) {
    return (
      <html lang="en">
        <body className="antialiased bg-secondary-bg flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-emerald-medium border-t-transparent rounded-full animate-spin" />
        </body>
      </html>
    );
  }

  // Login page layout (no sidebar)
  if (pathname === '/admin/login') {
    return (
      <html lang="en">
        <body className="antialiased bg-secondary-bg">
          {children}
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-secondary-bg flex">
        {/* Admin Sidebar Navigation */}
        <AdminSidebar />

        {/* Admin Content Area */}
        <main className="flex-1 p-8 md:p-12 overflow-y-auto max-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
