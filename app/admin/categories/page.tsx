'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Category } from '@/types';
import { Plus, Check, Trash } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [nameEn, setNameEn] = useState('');
  const [nameUr, setNameUr] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState<'product' | 'herbal' | 'umrah'>('product');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCats = async () => {
      const data = await db.categories.list();
      setCategories(data);
      setLoading(false);
    };
    fetchCats();
  }, []);

  const handleTitleChange = (val: string) => {
    setNameEn(val);
    setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn.trim() || !nameUr.trim() || !slug.trim()) return;
    
    const created = await db.categories.create({
      name_en: nameEn,
      name_ur: nameUr,
      slug,
      type,
      is_active: true
    });

    if (created) {
      setCategories((prev) => [...prev, created]);
      setNameEn('');
      setNameUr('');
      setSlug('');
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
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Categories</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Review and customize product or travel category groups
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Table list */}
        <div className="lg:col-span-2 bg-primary-bg rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          <table className="w-full text-xs text-left text-text-secondary">
            <thead className="bg-secondary-bg text-emerald-dark font-serif font-bold text-sm border-b border-gray-150">
              <tr>
                <th className="py-4 px-6">Name (English)</th>
                <th className="py-4 px-6">Name (Urdu)</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="font-sans font-semibold">
              {categories.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-100 hover:bg-secondary-bg/50">
                  <td className="py-4 px-6 text-sm text-emerald-dark font-serif font-bold">{cat.name_en}</td>
                  <td className="py-4 px-6 text-right font-bold">{cat.name_ur}</td>
                  <td className="py-4 px-6 font-bold uppercase text-[10px] text-gold-dark">{cat.type}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 bg-emerald-lighter text-emerald-dark rounded text-[10px] uppercase font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add Form */}
        <div className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm h-max">
          <h3 className="font-serif font-bold text-lg text-emerald-dark border-b border-gray-100 pb-3 mb-4">
            Add Category
          </h3>
          <form onSubmit={handleAdd} className="flex flex-col gap-4 text-xs font-semibold text-text-secondary">
            
            <div className="flex flex-col gap-1.5">
              <label>Category Name (English)</label>
              <input
                type="text"
                value={nameEn}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                placeholder="e.g. Attar Fragrances"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Category Name (Urdu)</label>
              <input
                type="text"
                value={nameUr}
                onChange={(e) => setNameUr(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-right"
                placeholder="مثال: عطر اور خوشبوئیں"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label>Category Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-2 outline-none bg-white cursor-pointer"
              >
                <option value="product">Spiritual Product</option>
                <option value="herbal">Herbal Sourced</option>
                <option value="umrah">Umrah Packages</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg shadow-md cursor-pointer flex items-center justify-center gap-1.5 mt-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Category</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
