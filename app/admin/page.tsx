'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Order, UmrahInquiry, Product, UmrahPackage } from '@/types';
import { formatPrice } from '@/lib/utils/formatting';
import { LayoutDashboard, ShoppingBag, Compass, DollarSign, MessageSquare, Clock } from 'lucide-react';

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<UmrahInquiry[]>([]);
  const [productsCount, setProductsCount] = useState(0);
  const [packagesCount, setPackagesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const ordersData = await db.orders.list();
        const inquiriesData = await db.inquiries.list();
        const productsData = await db.products.list();
        const packagesData = await db.packages.list();

        setOrders(ordersData);
        setInquiries(inquiriesData);
        setProductsCount(productsData.length);
        setPackagesCount(packagesData.length);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-emerald-medium border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Statistics summaries
  const totalSales = orders
    .filter((o) => o.status === 'completed' || o.status === 'confirmed' || o.status === 'processing')
    .reduce((sum, o) => sum + o.total_amount, 0);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const newInquiries = inquiries.filter((i) => i.status === 'new').length;

  const stats = [
    { name: 'Total Sales Volume', value: formatPrice(totalSales), icon: DollarSign, color: 'text-emerald-dark bg-emerald-lighter border-emerald-light/20' },
    { name: 'Pending Orders', value: pendingOrders, icon: ShoppingBag, color: 'text-gold-dark bg-gold-lighter border-gold-light/20' },
    { name: 'Active Umrah Packages', value: packagesCount, icon: Compass, color: 'text-indigo-600 bg-indigo-50 border-indigo-100' },
    { name: 'New Travel Inquiries', value: newInquiries, icon: MessageSquare, color: 'text-sky-600 bg-sky-50 border-sky-100' },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Dashboard</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Husna Travel & Marketing Control Overview
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="bg-primary-bg p-6 rounded-2xl border border-gray-150 shadow-sm flex items-center justify-between transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-text-secondary">{s.name}</span>
                <span className="text-2xl font-sans font-black text-emerald-dark">{s.value}</span>
              </div>
              <div className={`p-4 rounded-xl border ${s.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Grid: Recent Orders & Recent Inquiries */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* Recent Orders */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Recent E-Commerce Orders
          </h3>
          {orders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-text-secondary">
                <thead>
                  <tr className="border-b border-gray-150 text-emerald-dark font-serif font-bold text-sm">
                    <th className="py-2">Customer</th>
                    <th className="py-2">Amount</th>
                    <th className="py-2">Status</th>
                    <th className="py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="font-sans font-semibold">
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id} className="border-b border-gray-50 hover:bg-secondary-bg/50">
                      <td className="py-3 font-serif text-emerald-dark font-bold">{o.customer_name}</td>
                      <td className="py-3 font-black">{formatPrice(o.total_amount)}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          o.status === 'pending' ? 'bg-gold-lighter text-gold-dark' :
                          o.status === 'completed' ? 'bg-emerald-lighter text-emerald-dark' :
                          'bg-gray-100 text-text-secondary'
                        }`}>
                          {o.status}
                        </span>
                      </td>
                      <td className="py-3 text-[10px] text-text-soft">
                        {new Date(o.created_at || '').toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-text-soft font-medium py-6 text-center">No orders logged yet.</p>
          )}
        </div>

        {/* Recent Inquiries */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Recent Travel Inquiries
          </h3>
          {inquiries.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left text-text-secondary">
                <thead>
                  <tr className="border-b border-gray-150 text-emerald-dark font-serif font-bold text-sm">
                    <th className="py-2">Customer</th>
                    <th className="py-2">Travel Date</th>
                    <th className="py-2">Room Type</th>
                    <th className="py-2">Total Est</th>
                  </tr>
                </thead>
                <tbody className="font-sans font-semibold">
                  {inquiries.slice(0, 5).map((i) => (
                    <tr key={i.id} className="border-b border-gray-50 hover:bg-secondary-bg/50">
                      <td className="py-3 font-serif text-emerald-dark font-bold">{i.customer_name}</td>
                      <td className="py-3">{i.travel_date}</td>
                      <td className="py-3 uppercase text-[10px] font-extrabold">{i.room_type_id?.split('-')[1] || 'Double'}</td>
                      <td className="py-3 font-black text-emerald-medium">{formatPrice(i.total_amount)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-xs text-text-soft font-medium py-6 text-center">No travel inquiries logged yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
