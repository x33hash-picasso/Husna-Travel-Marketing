'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Testimonial } from '@/types';
import { Star, Plus } from 'lucide-react';

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState('5');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      const data = await db.testimonials.list();
      setTestimonials(data);
      setLoading(false);
    };
    fetchTests();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !review.trim()) return;

    const created = await db.testimonials.create({
      customer_name: name,
      city,
      review,
      rating: Number(rating)
    });

    if (created) {
      setTestimonials((prev) => [...prev, created]);
      setName('');
      setCity('');
      setReview('');
    }
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
      <div>
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Testimonials</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Review and approve pilgrim traveler remarks
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Testimonials List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {testimonials.map((test) => (
            <div key={test.id} className="bg-primary-bg p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-base text-emerald-dark">{test.customer_name}</span>
                  <span className="text-[10px] text-text-soft uppercase font-bold tracking-wider">({test.city || 'Pakistan'})</span>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3.5 h-3.5 ${i < test.rating ? 'text-gold-medium fill-gold-medium' : 'text-gray-200'}`} />
                  ))}
                </div>
              </div>
              <p className="text-text-secondary text-xs md:text-sm italic font-light">"{test.review}"</p>
            </div>
          ))}
        </div>

        {/* Add Testimonial Form */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm h-max">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Add Testimonial
          </h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-4 text-xs font-semibold text-text-secondary">
            
            <div className="flex flex-col gap-1.5">
              <label>Customer Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="e.g. Sarah Khan"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>City Location</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="e.g. Lahore"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Rating Stars</label>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none bg-white cursor-pointer"
              >
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Review details</label>
              <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                rows={3}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none"
                placeholder="Write the comment details..."
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
