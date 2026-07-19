'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Order } from '@/types';
import { formatPrice } from '@/lib/utils/formatting';
import { Check, Edit3, MessageCircle, ChevronDown } from 'lucide-react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const fetchOrders = async () => {
    try {
      const data = await db.orders.list();
      setOrders(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    await db.orders.updateStatus(orderId, newStatus as any);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => prev ? { ...prev, status: newStatus as any } : null);
    }
    fetchOrders();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="w-10 h-10 border-4 border-emerald-medium border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 font-sans">
      
      {/* Title */}
      <div>
        <h1 className="text-3xl font-serif font-black text-emerald-dark">E-Commerce Orders</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Review, approve, and track product customer sales shipments
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Table List (Col span 2) */}
        <div className="lg:col-span-2 bg-primary-bg rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-text-secondary">
              <thead className="bg-secondary-bg text-emerald-dark font-serif font-bold text-sm border-b border-gray-150">
                <tr>
                  <th className="py-4 px-6">Customer</th>
                  <th className="py-4 px-6">Phone</th>
                  <th className="py-4 px-6">Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody className="font-sans font-semibold">
                {orders.length > 0 ? (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      onClick={() => setSelectedOrder(order)}
                      className={`border-b border-gray-100 hover:bg-secondary-bg/50 cursor-pointer transition-colors ${
                        selectedOrder?.id === order.id ? 'bg-emerald-lighter/10' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-serif text-emerald-dark text-sm font-bold">{order.customer_name}</td>
                      <td className="py-4 px-6 font-bold">{order.phone}</td>
                      <td className="py-4 px-6 font-black text-emerald-dark">{formatPrice(order.total_amount)}</td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                          order.status === 'pending' ? 'bg-gold-lighter text-gold-dark' :
                          order.status === 'completed' ? 'bg-emerald-lighter text-emerald-dark' :
                          order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-text-secondary'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-[10px] text-text-soft">
                        {new Date(order.created_at || '').toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-text-soft font-bold">
                      No customer orders logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Order Details side panel */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm h-max">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Order Details
          </h3>

          {selectedOrder ? (
            <div className="flex flex-col gap-5 text-xs text-text-secondary font-semibold">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Customer Name</span>
                <span className="text-sm font-bold text-emerald-dark font-serif">{selectedOrder.customer_name}</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Phone</span>
                  <span>{selectedOrder.phone}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Email</span>
                  <span>{selectedOrder.email || 'N/A'}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Delivery Address</span>
                <span className="leading-relaxed">{selectedOrder.address}</span>
              </div>

              {/* Status Updater selector */}
              <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-550">
                <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Update Order Status</span>
                <select
                  value={selectedOrder.status}
                  onChange={(e) => handleStatusChange(selectedOrder.id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-xs font-sans font-bold bg-white cursor-pointer outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>

              {/* Items Summary list */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-150 mt-2">
                <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Ordered Items</span>
                <div className="flex flex-col gap-2 max-h-40 overflow-y-auto">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-secondary-bg p-2.5 rounded-lg border border-gray-100 text-[11px]">
                      <div>
                        <span className="font-bold text-emerald-dark font-serif">{item.product_name}</span>
                        <span className="block text-[9px] text-text-soft mt-0.5">Qty: {item.quantity} × {formatPrice(item.unit_price)}</span>
                      </div>
                      <span className="font-sans font-black">{formatPrice(item.total_price)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-between border-t border-gray-150 pt-4 text-sm font-bold text-emerald-dark mt-2">
                <span>Grand Total</span>
                <span className="font-sans font-black text-emerald-medium text-base">{formatPrice(selectedOrder.total_amount)}</span>
              </div>
            </div>
          ) : (
            <p className="text-xs text-text-soft py-12 text-center font-medium">Select an order from the list to view complete details and update delivery status.</p>
          )}
        </div>

      </div>
    </div>
  );
}
