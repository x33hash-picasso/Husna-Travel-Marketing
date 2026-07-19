'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { FAQ } from '@/types';
import { Plus } from 'lucide-react';

export default function AdminFaqsPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [qEn, setQEn] = useState('');
  const [qUr, setQUr] = useState('');
  const [aEn, setAEn] = useState('');
  const [aUr, setAUr] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      const data = await db.faqs.list();
      setFaqs(data);
      setLoading(false);
    };
    fetchFaqs();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!qEn.trim() || !qUr.trim() || !aEn.trim() || !aUr.trim()) return;

    const created = await db.faqs.create({
      question_en: qEn,
      question_ur: qUr,
      answer_en: aEn,
      answer_ur: aUr,
      sort_order: faqs.length + 1
    });

    if (created) {
      setFaqs((prev) => [...prev, created]);
      setQEn('');
      setQUr('');
      setAEn('');
      setAUr('');
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
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Frequently Asked Questions (FAQ)</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Review and write translated Q&A items displayed on homepage accordion
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* FAQs List */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-primary-bg p-6 rounded-2xl border border-gray-150 shadow-sm flex flex-col gap-3">
              <div className="flex flex-col gap-1 border-b border-gray-100 pb-2">
                <span className="font-serif font-bold text-sm text-emerald-dark">EN: {faq.question_en}</span>
                <span className="text-xs text-text-soft text-right font-bold">UR: {faq.question_ur}</span>
              </div>
              <div className="flex flex-col gap-1 text-[11px] text-text-secondary leading-relaxed">
                <p>EN: {faq.answer_en}</p>
                <p className="text-right font-bold mt-1">UR: {faq.answer_ur}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Add FAQ Form */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm h-max">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Add FAQ Q&A
          </h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-4 text-xs font-semibold text-text-secondary">
            
            <div className="flex flex-col gap-1.5">
              <label>Question (English)</label>
              <input
                type="text"
                value={qEn}
                onChange={(e) => setQEn(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Question (Urdu)</label>
              <input
                type="text"
                value={qUr}
                onChange={(e) => setQUr(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-right"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Answer (English)</label>
              <textarea
                value={aEn}
                onChange={(e) => setAEn(e.target.value)}
                rows={3}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Answer (Urdu)</label>
              <textarea
                value={aUr}
                onChange={(e) => setAUr(e.target.value)}
                rows={3}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none resize-none text-right"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add FAQ Item</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
