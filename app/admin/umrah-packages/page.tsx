'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import { UmrahPackage, RoomType } from '@/types';
import { Plus, Edit, Trash2, Check, X, Hotel, Compass } from 'lucide-react';
import ImageUploader from '@/components/admin/image-uploader';
import { formatPrice } from '@/lib/utils/formatting';

export default function AdminPackagesPage() {
  const [packages, setPackages] = useState<UmrahPackage[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomType[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [formOpen, setFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<UmrahPackage | null>(null);

  // Form Fields
  const [nameEn, setNameEn] = useState('');
  const [nameUr, setNameUr] = useState('');
  const [slug, setSlug] = useState('');
  const [descriptionEn, setDescriptionEn] = useState('');
  const [descriptionUr, setDescriptionUr] = useState('');
  const [makkahHotel, setMakkahHotel] = useState('');
  const [madinahHotel, setMadinahHotel] = useState('');
  const [durationDays, setDurationDays] = useState('');
  const [flightInfo, setFlightInfo] = useState('');
  const [transportInfo, setTransportInfo] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(true);
  const [images, setImages] = useState<string[]>([]);
  
  // Package-Specific Room Pricing inputs state
  // Key: RoomType ID, Value: pricing string (PKR)
  const [roomPrices, setRoomPrices] = useState<Record<string, string>>({});

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newFeatureText, setNewFeatureText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pkgs = await db.packages.list();
        const rooms = await db.roomTypes.list();
        setPackages(pkgs);
        setRoomTypes(rooms);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const openAddForm = () => {
    setEditingPackage(null);
    setNameEn('');
    setNameUr('');
    setSlug('');
    setDescriptionEn('');
    setDescriptionUr('');
    setMakkahHotel('');
    setMadinahHotel('');
    setDurationDays('');
    setFlightInfo('');
    setTransportInfo('');
    setFeatures([]);
    setFeatured(false);
    setPublished(true);
    setImages([]);
    
    // Clear room prices input
    const initialPrices: Record<string, string> = {};
    roomTypes.forEach((rt) => {
      initialPrices[rt.id] = '';
    });
    setRoomPrices(initialPrices);
    setErrors({});
    setFormOpen(true);
  };

  const openEditForm = (pkg: UmrahPackage) => {
    setEditingPackage(pkg);
    setNameEn(pkg.name_en);
    setNameUr(pkg.name_ur);
    setSlug(pkg.slug);
    setDescriptionEn(pkg.description_en || '');
    setDescriptionUr(pkg.description_ur || '');
    setMakkahHotel(pkg.makkah_hotel || '');
    setMadinahHotel(pkg.madinah_hotel || '');
    setDurationDays(pkg.duration_days.toString());
    setFlightInfo(pkg.flight_info || '');
    setTransportInfo(pkg.transport_info || '');
    setFeatures(pkg.features || []);
    setFeatured(pkg.featured);
    setPublished(pkg.published);
    setImages(pkg.images || []);

    // Load existing pricing mappings
    const activePrices: Record<string, string> = {};
    roomTypes.forEach((rt) => {
      const match = pkg.pricing?.find((p) => p.room_type_id === rt.id);
      activePrices[rt.id] = match ? match.price_per_person.toString() : '';
    });
    setRoomPrices(activePrices);
    setErrors({});
    setFormOpen(true);
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!nameEn.trim()) errs.nameEn = 'Package Name (English) is required';
    if (!nameUr.trim()) errs.nameUr = 'Package Name (Urdu) is required';
    if (!slug.trim()) errs.slug = 'Slug is required';
    if (!durationDays || isNaN(Number(durationDays))) errs.durationDays = 'Valid duration is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePriceChange = (roomId: string, val: string) => {
    setRoomPrices((prev) => ({
      ...prev,
      [roomId]: val
    }));
  };

  const handleAddFeature = () => {
    if (!newFeatureText.trim()) return;
    setFeatures((prev) => [...prev, newFeatureText.trim()]);
    setNewFeatureText('');
  };

  const handleRemoveFeature = (idxToRemove: number) => {
    setFeatures((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Compile pricing arrays matching supabase row schemas
    const pricingList = Object.keys(roomPrices)
      .filter((roomId) => roomPrices[roomId].trim() !== '' && !isNaN(Number(roomPrices[roomId])))
      .map((roomId) => ({
        room_type_id: roomId,
        price_per_person: Number(roomPrices[roomId])
      }));

    const rawData = {
      name_en: nameEn,
      name_ur: nameUr,
      slug,
      description_en: descriptionEn,
      description_ur: descriptionUr,
      makkah_hotel: makkahHotel,
      madinah_hotel: madinahHotel,
      duration_days: Number(durationDays),
      flight_info: flightInfo,
      transport_info: transportInfo,
      features,
      featured,
      published,
      images,
      pricing: pricingList
    };

    try {
      if (editingPackage) {
        // Edit Mode
        const updated = await db.packages.update(editingPackage.id, rawData);
        if (updated) {
          setPackages((prev) => prev.map((p) => (p.id === editingPackage.id ? { ...p, ...updated } : p)));
        }
      } else {
        // Add Mode
        const created = await db.packages.create(rawData);
        if (created) {
          setPackages((prev) => [...prev, created]);
        }
      }
      setFormOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this Umrah package?')) {
      await db.packages.delete(id);
      setPackages((prev) => prev.filter((p) => p.id !== id));
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
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-black text-emerald-dark">Umrah Packages</h1>
          <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
            Configure premium luxury or economy package schedules and pricing matrices
          </p>
        </div>
        {!formOpen && (
          <button
            onClick={openAddForm}
            className="px-5 py-3 bg-emerald-medium text-white font-sans font-bold text-xs tracking-wider uppercase rounded-lg flex items-center gap-2 hover:bg-emerald-dark transition-all duration-300 shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Package</span>
          </button>
        )}
      </div>

      {/* Package Form Drawer */}
      {formOpen && (
        <div className="bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-150 shadow-md">
          <h3 className="font-serif font-bold text-xl text-emerald-dark border-b border-gray-150 pb-3 mb-6">
            {editingPackage ? 'Edit Umrah Package' : 'Add New Umrah Package'}
          </h3>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            {/* Direct Image Uploading */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-text-secondary uppercase">Package Cover / Image gallery</span>
              <ImageUploader images={images} onChange={setImages} bucket="package-images" folder="packages" />
            </div>

            {/* Names Input Block */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Package Name (English) *</label>
                <input
                  type="text"
                  value={nameEn}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className={`border ${errors.nameEn ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                  placeholder="e.g. Economy Umrah Package"
                />
                {errors.nameEn && <span className="text-[10px] text-red-500 font-bold">{errors.nameEn}</span>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Package Name (Urdu) *</label>
                <input
                  type="text"
                  value={nameUr}
                  onChange={(e) => setNameUr(e.target.value)}
                  className={`border ${errors.nameUr ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm text-right`}
                  placeholder="مثال: اکانومی عمرہ پیکج"
                />
                {errors.nameUr && <span className="text-[10px] text-red-500 font-bold">{errors.nameUr}</span>}
              </div>
            </div>

            {/* Slug & Duration */}
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
                <label className="text-xs font-bold text-text-secondary">Duration (Days) *</label>
                <input
                  type="text"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                  className={`border ${errors.durationDays ? 'border-red-500' : 'border-gray-300'} rounded-lg px-4 py-2.5 outline-none text-sm`}
                  placeholder="e.g. 10"
                />
                {errors.durationDays && <span className="text-[10px] text-red-500 font-bold">{errors.durationDays}</span>}
              </div>
            </div>

            {/* Accommodation Hotels */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary font-serif">Makkah Hotel Name</label>
                <input
                  type="text"
                  value={makkahHotel}
                  onChange={(e) => setMakkahHotel(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                  placeholder="e.g. Swissôtel Makkah"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary font-serif">Madinah Hotel Name</label>
                <input
                  type="text"
                  value={madinahHotel}
                  onChange={(e) => setMadinahHotel(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                  placeholder="e.g. Pullman Zamzam Madina"
                />
              </div>
            </div>

            {/* Flight & Transport */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Flight Info</label>
                <input
                  type="text"
                  value={flightInfo}
                  onChange={(e) => setFlightInfo(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                  placeholder="e.g. Direct flights from Lahore/Karachi"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-text-secondary">Transport Info</label>
                <input
                  type="text"
                  value={transportInfo}
                  onChange={(e) => setTransportInfo(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                  placeholder="e.g. AC bus transport on all routes"
                />
              </div>
            </div>

            {/* DYNAMIC ROOM PRICING MATRIX */}
            <div className="p-5 bg-secondary-bg border border-gray-150 rounded-2xl flex flex-col gap-4">
              <h4 className="text-xs uppercase font-extrabold tracking-widest text-emerald-dark border-b border-gray-150 pb-2">
                Room Type Pricing Matrix (PKR / Person)
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {roomTypes.map((rt) => (
                  <div key={rt.id} className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-bold text-text-secondary truncate">{rt.name_en}</label>
                    <input
                      type="text"
                      value={roomPrices[rt.id] || ''}
                      onChange={(e) => handlePriceChange(rt.id, e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-sm bg-white font-sans font-bold"
                      placeholder="e.g. 260000"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Feature List bullet adder */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-text-secondary uppercase">Included Features List</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeatureText}
                  onChange={(e) => setNewFeatureText(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm"
                  placeholder="e.g. Hajj/Umrah Visa Processing"
                />
                <button
                  type="button"
                  onClick={handleAddFeature}
                  className="px-5 py-2.5 bg-emerald-medium text-white font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-emerald-dark transition-colors cursor-pointer"
                >
                  Add
                </button>
              </div>

              {features.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {features.map((f, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-emerald-lighter border border-emerald-light/25 text-emerald-dark font-sans text-xs font-semibold rounded-lg flex items-center gap-2"
                    >
                      <span>{f}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(idx)}
                        className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>
              )}
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

            {/* Toggles */}
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

            {/* Actions */}
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
                {editingPackage ? 'Save Package' : 'Create Package'}
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Packages List Data Table */}
      {!formOpen && (
        <div className="bg-primary-bg rounded-3xl border border-gray-150 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-text-secondary">
              <thead className="bg-secondary-bg text-emerald-dark font-serif font-bold text-sm border-b border-gray-150">
                <tr>
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Package Name</th>
                  <th className="py-4 px-6">Makkah Hotel</th>
                  <th className="py-4 px-6">Madinah Hotel</th>
                  <th className="py-4 px-6">Duration</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="font-sans font-semibold">
                {packages.length > 0 ? (
                  packages.map((pkg) => (
                    <tr key={pkg.id} className="border-b border-gray-100 hover:bg-secondary-bg/50">
                      {/* Image */}
                      <td className="py-4 px-6">
                        <div className="w-12 h-12 bg-secondary-bg rounded-lg border overflow-hidden">
                          <img src={pkg.images[0]} alt="pkg" className="w-full h-full object-cover" />
                        </div>
                      </td>
                      {/* Name */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-serif text-emerald-dark text-sm font-bold">{pkg.name_en}</span>
                          <span className="text-[10px] text-text-soft">{pkg.name_ur}</span>
                        </div>
                      </td>
                      {/* Hotels */}
                      <td className="py-4 px-6 font-medium">{pkg.makkah_hotel || 'N/A'}</td>
                      <td className="py-4 px-6 font-medium">{pkg.madinah_hotel || 'N/A'}</td>
                      {/* Duration */}
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-0.5 bg-emerald-lighter text-emerald-dark rounded font-bold text-[10px]">
                          {pkg.duration_days} Days
                        </span>
                      </td>
                      {/* CRUD Actions */}
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openEditForm(pkg)}
                            className="p-2 text-emerald-medium hover:bg-emerald-lighter/30 rounded-lg transition-colors cursor-pointer"
                            title="Edit Package"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(pkg.id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Package"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-text-soft font-bold">
                      No packages found. Add one to get started!
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
