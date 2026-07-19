'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { Product, Category } from '@/types';
import { Plus, Edit, Trash2, Check, X, ShieldAlert } from 'lucide-react';
import ImageUploader from '@/components/admin/image-uploader';
import { formatPrice } from '@/lib/utils/formatting';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Form toggles
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form states
  const [nameEn, setNameEn] = useState('');
  const [nameUr, setNameUr] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionUr, setDescriptionUr] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [price, setPrice] = useState('');
  const [salePrice, setSalePrice] = useState('');
  const [sku, setSku] = useState('');
  const [stock, setStock] = useState('');
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const prodData = await db.products.list();
        const catData = await db.categories.list();
        setProducts(prodData);
        // Exclude umrah travel categories from product editor
        setCategories(catData.filter((cat: Category) => cat.type !== 'umrah'));
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openAddForm = () => {
    setEditingProduct(null);
    setNameEn('');
    setNameUr('');
    setSlug('');
    setDescriptionEn('');
    setDescriptionUr('');
    setCategoryId('');
    setPrice('');
    setSalePrice('');
    setSku('');
    setStock('');
    setFeatured(false);
    setPublished(true);
    setImages([]);
    setErrors({});
    setFormOpen(true);
  };

  const openEditForm = (product: Product) => {
    setEditingProduct(product);
    setNameEn(product.name_en);
    setNameUr(product.name_ur);
    setSlug(product.slug);
    setDescriptionEn(product.description_en || '');
    setDescriptionUr(product.description_ur || '');
    setCategoryId(product.category_id || '');
    setPrice(product.price.toString());
    setSalePrice(product.sale_price?.toString() || '');
    setSku(product.sku || '');
    setStock(product.stock.toString());
    setFeatured(product.featured);
    setPublished(product.published);
    setImages(product.images || []);
    setErrors({});
    setFormOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nameEn.trim()) errs.nameEn = 'Name (English) is required';
    if (!nameUr.trim()) errs.nameUr = 'Name (Urdu) is required';
    if (!slug.trim()) errs.slug = 'Slug is required';
    if (!categoryId) errs.categoryId = 'Category is required';
    if (!price || isNaN(Number(price))) errs.price = 'Valid price is required';
    if (!stock || isNaN(Number(stock))) errs.stock = 'Valid stock is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const rawData = {
      name_en: nameEn,
      name_ur: nameUr,
      slug,
      description_en: descriptionEn,
      description_ur: descriptionUr,
      category_id: categoryId,
      price: Number(price),
      sale_price: salePrice ? Number(salePrice) : null,
      sku,
      stock: Number(stock),
      featured,
      published,
      images
    };

    try {
      if (editingProduct) {
        // Edit Mode
        const updated = await db.products.update(editingProduct.id, rawData);
        if (updated) {
          setProducts((prev) => prev.map((p) => (p.id === editingProduct.id ? { ...p, ...updated } : p)));
        }
      } else {
        // Add Mode
        const created = await db.products.create(rawData);
        if (created) {
          setProducts((prev) => [...prev, created]);
        }
      }
      setFormOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      await db.products.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleTitleChange = (val: string) => {
    setNameEn(val);
    setSlug(val.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
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
      
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-emerald-dark">Products</h1>
          <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
            Manage Islamic Books, Attars, Prayer accessories and Wellness honey
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={openAddForm}
            className="px-5 py-3 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center gap-2 hover:bg-emerald-dark transition-all duration-300 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </button>
        )}
      </div>

      {/* CRUD Product Form Drawer */}
      {formOpen && (
        <div className="bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-150 shadow-md">
          <h3 className="font-serif font-bold text-xl text-emerald-dark border-b border-gray-150 pb-3 mb-6">
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Direct Image Uploading widget */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-text-secondary uppercase">Product Images</span>
              <ImageUploader images={images} onChange={setImages} folder="products" />
            </div>

            {/* Names Input Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Product Name (English) *</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`border ${errors.nameEn ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                  placeholder="e.g. Premium Quran (Leather Bound)"
                />
                {errors.nameEn && <span className="text-[10px] text-red-500 font-bold">{errors.nameEn}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Product Name (Urdu) *</label>
                <input
                  type="text"
                  value={nameUr}
                  onChange={(e) => setNameUr(e.target.value)}
                  className={`border ${errors.nameUr ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm text-right`}
                  placeholder="مثال: پریمیم قرآن مجید"
                />
                {errors.nameUr && <span className="text-[10px] text-red-500 font-bold">{errors.nameUr}</span>}
              </div>
            </div>

            {/* Slug & Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Slug *</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={`border ${errors.slug ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                />
                {errors.slug && <span className="text-[10px] text-red-500 font-bold">{errors.slug}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Category *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className={`border ${errors.categoryId ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm bg-white`}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat: Category) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name_en} ({cat.type.toUpperCase()})
                    </option>
                  ))}
                </select>
                {errors.categoryId && <span className="text-[10px] text-red-500 font-bold">{errors.categoryId}</span>}
              </div>
            </div>

            {/* Price & SKU & Stock */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Regular Price (PKR) *</label>
                <input
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className={`border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Sale Price (PKR)</label>
                <input
                  type="text"
                  value={salePrice}
                  onChange={(e) => setSalePrice(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">SKU Code</label>
                <input
                  type="text"
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Stock Quantity *</label>
                <input
                  type="text"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className={`border ${errors.stock ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                />
              </div>
            </div>

            {/* Description (English & Urdu) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Description (English)</label>
                <textarea
                  value={descriptionEn}
                  onChange={(e) => setDescriptionEn(e.target.value)}
                  rows={4}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm resize-none"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Description (Urdu)</label>
                <textarea
                  value={descriptionUr}
                  onChange={(e) => setDescriptionUr(e.target.value)}
                  rows={4}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm resize-none text-right"
                />
              </div>
            </div>

            {/* Toggles (Featured & Published) */}
            <div className="flex gap-8 items-center py-2">
              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase text-text-secondary">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-medium border-gray-300"
                />
                <span>Featured Showcase</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer font-bold text-xs uppercase text-text-secondary">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-medium border-gray-300"
                />
                <span>Published Online</span>
              </label>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 justify-end border-t border-gray-150 pt-4">
              <button
                type="button"
                onClick={() => setFormOpen(false)}
                className="px-5 py-3 border border-gray-300 text-text-secondary font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-secondary-bg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md"
              >
                {editingProduct ? 'Save Product' : 'Create Product'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Products Data Table */}
      {!formOpen && (
        <div className="bg-primary-bg rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-text-secondary">
              <thead className="bg-secondary-bg text-emerald-dark font-serif font-bold text-sm border-b border-gray-150">
                <tr>
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Product Details</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Regular Price</th>
                  <th className="py-4 px-6">Sale Price</th>
                  <th className="py-4 px-6">Stock</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="font-sans font-semibold">
                {products.length > 0 ? (
                  products.map((prod: Product) => {
                    const cat = categories.find((c: Category) => c.id === prod.category_id);
                    return (
                      <tr key={prod.id} className="border-b border-gray-100 hover:bg-secondary-bg/50">
                        {/* Image */}
                        <td className="py-4 px-6">
                          <div className="w-12 h-12 bg-secondary-bg rounded-lg border overflow-hidden">
                            <img src={prod.images[0]} alt="prod" className="w-full h-full object-cover" />
                          </div>
                        </td>
                        {/* Details */}
                        <td className="py-4 px-6">
                          <div className="flex flex-col gap-0.5">
                            <span className="font-serif text-emerald-dark text-sm font-bold">{prod.name_en}</span>
                            <span className="text-[10px] text-text-soft">{prod.name_ur}</span>
                            <span className="text-[9px] uppercase font-bold tracking-widest text-gold-dark mt-0.5">{prod.sku || 'No SKU'}</span>
                          </div>
                        </td>
                        {/* Category */}
                        <td className="py-4 px-6 text-text-secondary font-bold uppercase text-[10px]">{cat ? cat.name_en : 'N/A'}</td>
                        {/* Prices */}
                        <td className="py-4 px-6 font-black">{formatPrice(prod.price)}</td>
                        <td className="py-4 px-6 text-emerald-medium font-black">{prod.sale_price ? formatPrice(prod.sale_price) : '-'}</td>
                        {/* Stock */}
                        <td className="py-4 px-6">
                          <span className={`px-2.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                            prod.stock > 0 ? 'bg-emerald-lighter text-emerald-dark' : 'bg-red-100 text-red-700'
                          }`}>
                            {prod.stock} Qty
                          </span>
                        </td>
                        {/* Actions CRUD */}
                        <td className="py-4 px-6 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => openEditForm(prod)}
                              className="p-2 text-emerald-medium hover:bg-emerald-lighter/30 rounded-lg transition-colors cursor-pointer"
                              title="Edit Product"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(prod.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                              title="Delete Product"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-text-soft font-bold">
                      No products found. Add one to get started!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
