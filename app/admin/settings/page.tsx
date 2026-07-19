'use client';

import { useState, useEffect } from 'react';
import { db } from '@/lib/supabase/client';
import ImageUploader from '@/components/admin/image-uploader';
import { Save, Plus, Trash2, ArrowUp, ArrowDown, Settings, Sliders } from 'lucide-react';

const DEFAULT_SLIDES = [
  {
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=1920&q=80',
    titleEn: 'Your Sacred Journey',
    titleUr: 'آپ کا مقدس سفر',
    subtitleEn: 'Begins Here',
    subtitleUr: 'یہاں سے شروع ہوتا ہے'
  },
  {
    image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=1920&q=80',
    titleEn: 'Masjid al-Haram',
    titleUr: 'مسجد الحرام',
    subtitleEn: 'Spiritual Peace',
    subtitleUr: 'روحانی سکون اور اطمینان'
  }
];

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<'general' | 'slider'>('general');
  
  // General settings state
  const [waNumber, setWaNumber] = useState('923001234567');
  const [email, setEmail] = useState('info@husnatravel.com');
  const [address, setAddress] = useState('DHA Phase 5, Lahore, Pakistan');
  const [logoUrl, setLogoUrl] = useState('');

  // Slider state
  const [slides, setSlides] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const storedWa = localStorage.getItem('husna_settings_wa') || '923001234567';
        const storedEmail = localStorage.getItem('husna_settings_email') || 'info@husnatravel.com';
        const storedAddress = localStorage.getItem('husna_settings_address') || 'DHA Phase 5, Lahore, Pakistan';
        
        setWaNumber(storedWa);
        setEmail(storedEmail);
        setAddress(storedAddress);

        const dbLogo = await db.settings.get('site_logo', '');
        setLogoUrl(dbLogo);

        const dbSlides = await db.settings.get('hero_slides', DEFAULT_SLIDES);
        setSlides(dbSlides);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSaveGeneral = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    localStorage.setItem('husna_settings_wa', waNumber);
    localStorage.setItem('husna_settings_email', email);
    localStorage.setItem('husna_settings_address', address);
    await db.settings.set('site_logo', logoUrl);
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleSaveSlider = async () => {
    setLoading(true);
    await db.settings.set('hero_slides', slides);
    setSaved(true);
    setLoading(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const updateSlideField = (index: number, field: string, value: any) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], [field]: value };
    setSlides(updated);
  };

  const updateSlideImage = (index: number, imgUrls: string[]) => {
    const updated = [...slides];
    updated[index] = { ...updated[index], image: imgUrls[0] || '' };
    setSlides(updated);
  };

  const addSlide = () => {
    const newSlide = {
      image: 'https://images.unsplash.com/photo-1591604021695-0c69b7c05981?auto=format&fit=crop&w=1920&q=80',
      titleEn: 'New Journey Slide',
      titleUr: 'نیا سفر سلائیڈ',
      subtitleEn: 'Sacred Vibe',
      subtitleUr: 'مقدس سفر'
    };
    setSlides([...slides, newSlide]);
  };

  const removeSlide = (index: number) => {
    const updated = slides.filter((_, i) => i !== index);
    setSlides(updated);
  };

  const moveSlide = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === slides.length - 1) return;

    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIdx];
    updated[targetIdx] = temp;
    setSlides(updated);
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
        <h1 className="text-3xl font-serif font-black text-emerald-dark">Configuration Settings</h1>
        <p className="text-xs font-semibold text-text-soft uppercase tracking-widest mt-1">
          Customize contact information and dynamic homepage sliders
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 gap-4">
        <button
          onClick={() => setActiveTab('general')}
          className={`pb-3 px-2 text-xs uppercase font-extrabold tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'general' ? 'border-b-2 border-emerald-medium text-emerald-dark' : 'text-text-soft hover:text-text-secondary'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>General Contact Details</span>
        </button>
        <button
          onClick={() => setActiveTab('slider')}
          className={`pb-3 px-2 text-xs uppercase font-extrabold tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'slider' ? 'border-b-2 border-emerald-medium text-emerald-dark' : 'text-text-soft hover:text-text-secondary'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Homepage Hero Slider</span>
        </button>
      </div>

      {saved && (
        <div className="bg-emerald-lighter border border-emerald-medium/20 text-emerald-dark px-4 py-3 rounded-xl text-xs font-bold font-sans shadow-sm transition-all duration-300">
          ✓ Setting options saved successfully! Changes are updated on the homepage.
        </div>
      )}

      {/* TAB CONTENT: General */}
      {activeTab === 'general' && (
        <div className="bg-primary-bg p-6 md:p-8 rounded-3xl border border-gray-150 shadow-sm max-w-xl">
          <form onSubmit={handleSaveGeneral} className="flex flex-col gap-5 text-xs text-text-secondary font-semibold">
            <div className="flex flex-col gap-2 mb-4 pb-4 border-b border-gray-100">
              <label className="text-xs font-bold text-text-secondary uppercase">Site Brand Logo</label>
              <ImageUploader
                images={logoUrl ? [logoUrl] : []}
                onChange={(urls) => setLogoUrl(urls[0] || '')}
                folder="settings"
              />
              <span className="text-[10px] text-text-soft font-normal mt-1 leading-relaxed">
                Upload a custom logo image (PNG/WebP recommended with transparent background). If left empty, a styled typographic logo is displayed.
              </span>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase">WhatsApp Contact Number (No spaces)</label>
              <input
                type="text"
                value={waNumber}
                onChange={(e) => setWaNumber(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm font-sans font-bold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase">Business Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm font-sans font-bold"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-text-secondary uppercase">Office Physical Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows={3}
                className="border border-gray-300 rounded-lg px-4 py-2.5 outline-none text-sm font-sans font-bold resize-none"
              />
            </div>

            <div className="flex justify-end mt-4 border-t border-gray-100 pt-4">
              <button
                type="submit"
                className="px-6 py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Save General Settings</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB CONTENT: Hero Slider */}
      {activeTab === 'slider' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-serif font-bold text-lg text-emerald-dark">Hero Slider Images & Text Overlays</h3>
            <button
              onClick={addSlide}
              className="px-4 py-2 bg-emerald-medium hover:bg-emerald-dark text-white text-xs font-bold font-sans uppercase tracking-wider rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Slide</span>
            </button>
          </div>

          <div className="flex flex-col gap-6">
            {slides.map((slide, index) => (
              <div key={index} className="bg-primary-bg p-6 rounded-3xl border border-gray-150 shadow-sm flex flex-col md:flex-row gap-6 relative">
                
                {/* Rearrange/delete handles */}
                <div className="absolute right-4 top-4 flex gap-1 items-center z-10">
                  <button
                    disabled={index === 0}
                    onClick={() => moveSlide(index, 'up')}
                    className="p-1.5 hover:bg-secondary-bg rounded border text-text-secondary disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    disabled={index === slides.length - 1}
                    onClick={() => moveSlide(index, 'down')}
                    className="p-1.5 hover:bg-secondary-bg rounded border text-text-secondary disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => removeSlide(index)}
                    className="p-1.5 hover:bg-red-50 hover:text-red-600 rounded border border-red-100 text-red-500 cursor-pointer ml-2"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Left: Image Uploader preview */}
                <div className="w-full md:w-1/3 flex flex-col gap-2">
                  <label className="text-[10px] font-bold text-text-soft uppercase tracking-wider">Slide Image Cover</label>
                  <ImageUploader
                    images={slide.image ? [slide.image] : []}
                    onChange={(urls) => updateSlideImage(index, urls)}
                    folder="slides"
                  />
                </div>

                {/* Right: Inputs */}
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold text-text-secondary pt-6 md:pt-0">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-text-soft uppercase tracking-wider">Title (English)</label>
                    <input
                      type="text"
                      value={slide.titleEn || ''}
                      onChange={(e) => updateSlideField(index, 'titleEn', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-text-soft uppercase tracking-wider text-right">عنوان (اردو)</label>
                    <input
                      type="text"
                      value={slide.titleUr || ''}
                      onChange={(e) => updateSlideField(index, 'titleUr', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-right"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-text-soft uppercase tracking-wider">Subtitle (English)</label>
                    <input
                      type="text"
                      value={slide.subtitleEn || ''}
                      onChange={(e) => updateSlideField(index, 'subtitleEn', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold text-text-soft uppercase tracking-wider text-right">ذیلی عنوان (اردو)</label>
                    <input
                      type="text"
                      value={slide.subtitleUr || ''}
                      onChange={(e) => updateSlideField(index, 'subtitleUr', e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 outline-none text-right"
                    />
                  </div>
                </div>

              </div>
            ))}

            {slides.length === 0 && (
              <p className="text-center py-12 border border-dashed rounded-3xl text-text-soft font-bold">No slider images configured. Click "Add Slide" to begin.</p>
            )}

            {/* Save Button */}
            <div className="flex justify-end border-t border-gray-150 pt-6">
              <button
                onClick={handleSaveSlider}
                className="px-6 py-3 bg-emerald-medium hover:bg-emerald-dark text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-md flex items-center gap-1.5 font-sans"
              >
                <Save className="w-4 h-4" />
                <span>Save Slider Configuration</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
