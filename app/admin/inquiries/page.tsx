'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { UmrahInquiry, UmrahPackage, RoomType } from '@/types';
import { formatPrice } from '@/lib/utils/formatting';
import { Mail, Phone, Calendar, Compass, User, MessageCircle } from 'lucide-react';

export default function AdminInquiriesPage() {
  const [inquiries, setInquiries] = useState<UmrahInquiry[]>([]);
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInq, setSelectedInq] = useState<UmrahInquiry | null>(null);

  const fetchInquiries = async () => {
    try {
      const data = await db.inquiries.list();
      const packagesData = await db.packages.list();
      const roomsData = await db.roomTypes.list();
      
      setInquiries(data);
      setPackages(packagesData);
      setRoomTypes(roomsData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  const handleStatusChange = async (inqId: string, newStatus: string) => {
    await db.inquiries.updateStatus(inqId, newStatus as any);
    if (selectedInq && selectedInq.id === inqId) {
      setSelectedInq((prev) => prev ? { ...prev, status: newStatus as any } : null);
    }
    fetchInquiries();
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
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Travel Booking Inquiries</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Review pilgrim traveler room selectors and customize travel dates
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Inquiries Table List */}
        <div className="lg:col-span-2 bg-primary-bg rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-text-secondary">
              <thead className="bg-secondary-bg text-emerald-dark font-serif font-bold text-sm border-b border-gray-150">
                <tr>
                  <th className="py-4 px-6">Pilgrim</th>
                  <th className="py-4 px-6">Package</th>
                  <th className="py-4 px-6">Travel Date</th>
                  <th className="py-4 px-6">Total Amount</th>
                  <th className="py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody className="font-sans font-semibold">
                {inquiries.length > 0 ? (
                  inquiries.map((inq) => {
                    const matchPkg = packages.find((p) => p.id === inq.package_id);
                    return (
                      <tr
                        key={inq.id}
                        onClick={() => setSelectedInq(inq)}
                        className={`border-b border-gray-100 hover:bg-secondary-bg/50 cursor-pointer transition-colors ${
                          selectedInq?.id === inq.id ? 'bg-emerald-lighter/10' : ''
                        }`}
                      >
                        <td className="py-4 px-6 font-serif text-emerald-dark text-sm font-bold">{inq.customer_name}</td>
                        <td className="py-4 px-6 text-emerald-medium font-bold truncate max-w-[130px]">{matchPkg ? matchPkg.name_en : 'Custom Package'}</td>
                        <td className="py-4 px-6">{inq.travel_date}</td>
                        <td className="py-4 px-6 font-black">{formatPrice(inq.total_amount)}</td>
                        <td className="py-4 px-6">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${
                            inq.status === 'new' ? 'bg-blue-100 text-blue-700' :
                            inq.status === 'contacted' ? 'bg-gold-lighter text-gold-dark' :
                            inq.status === 'completed' ? 'bg-emerald-lighter text-emerald-dark' :
                            'bg-gray-100 text-text-secondary'
                          }`}>
                            {inq.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-text-soft font-bold">
                      No travel inquiries logged yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Inquiry Detail panel */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm h-max">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Inquiry details
          </h3>

          {selectedInq ? {
            ...(() => {
              const matchedPackage = packages.find((p) => p.id === selectedInq.package_id);
              const matchedRoom = roomTypes.find((r) => r.id === selectedInq.room_type_id);
              return (
                <div className="flex flex-col gap-5 text-xs text-text-secondary font-semibold">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Pilgrim Name</span>
                    <span className="text-sm font-bold text-emerald-dark font-serif">{selectedInq.customer_name}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Phone</span>
                      <span>{selectedInq.phone}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Email</span>
                      <span>{selectedInq.email || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3.5 bg-secondary-bg border border-gray-100 rounded-xl flex flex-col gap-2">
                    <div>Package: <span className="font-bold text-emerald-dark">{matchedPackage ? matchedPackage.name_en : 'Custom Tour'}</span></div>
                    <div>Room Type: <span className="font-bold text-emerald-dark uppercase">{matchedRoom ? matchedRoom.name_en : 'Double'}</span></div>
                    <div>Travelers: <span className="font-bold text-emerald-dark">{selectedInq.travelers} Person(s)</span></div>
                    <div>Preferred Date: <span className="font-bold text-emerald-dark">{selectedInq.travel_date}</span></div>
                  </div>

                  {selectedInq.message && (
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Special Requests</span>
                      <p className="leading-relaxed bg-secondary-bg/50 p-2.5 rounded border border-gray-100 font-light">{selectedInq.message}</p>
                    </div>
                  )}

                  {/* Status selection */}
                  <div className="flex flex-col gap-1.5 pt-2 border-t border-gray-150">
                    <span className="text-[10px] text-text-soft uppercase tracking-wider font-bold">Inquiry Status</span>
                    <select
                      value={selectedInq.status}
                      onChange={(e) => handleStatusChange(selectedInq.id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 text-xs font-sans font-bold bg-white cursor-pointer outline-none"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in_progress">In Progress</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>

                  <div className="flex justify-between border-t border-gray-150 pt-4 text-sm font-bold text-emerald-dark mt-2">
                    <span>Est Grand Total</span>
                    <span className="font-sans font-black text-emerald-medium text-base">{formatPrice(selectedInq.total_amount)}</span>
                  </div>
                </div>
              );
            })()
          } : (
            <p className="text-xs text-text-soft py-12 text-center font-medium">Select a travel inquiry from the list to view pilgrim selections and update contact statuses.</p>
          )}
        </div>

      </div>
    </div>
  );
}
