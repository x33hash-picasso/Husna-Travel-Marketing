'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2 } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
  bucket?: string;
  folder?: string;
}

export default function ImageUploader({
  images,
  onChange,
  bucket = 'product-images',
  folder = 'products'
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File): Promise<string> => {
    // 1. File type and size validations
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      throw new Error('Only JPG, PNG, and WebP images are allowed.');
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('Image size must be less than 5MB.');
    }

    // 2. If Supabase is configured, upload to storage bucket
    if (isSupabaseConfigured && supabase) {
      const fileName = `${folder}/${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
      const { data, error: uploadErr } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '31536000',
          upsert: true
        });

      if (uploadErr) {
        throw new Error(`Upload error: ${uploadErr.message}`);
      }

      // Get Public URL
      const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(fileName);
      return publicUrl;
    }

    // 3. Fallback: convert file to Base64 data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to read image file.'));
        }
      };
      reader.onerror = () => reject(new Error('File reading error.'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setError('');

    const newImages = [...images];
    try {
      for (let i = 0; i < files.length; i++) {
        const url = await processFile(files[i]);
        newImages.push(url);
      }
      onChange(newImages);
    } catch (err: any) {
      setError(err.message || 'Error uploading file.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = (indexToDelete: number) => {
    onChange(images.filter((_, idx) => idx !== indexToDelete));
  };

  return (
    <div className="flex flex-col gap-3 font-sans">
      {/* Upload Drag/Click Box */}
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 hover:border-emerald-medium rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors duration-200 bg-secondary-bg/50"
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
        />
        {uploading ? (
          <div className="flex flex-col items-center gap-2 text-emerald-medium">
            <Loader2 className="w-8 h-8 animate-spin" />
            <span className="text-xs font-bold uppercase tracking-wider">Processing images...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-text-secondary hover:text-emerald-medium">
            <Upload className="w-8 h-8 text-emerald-medium" />
            <span className="text-xs font-bold uppercase tracking-wider">Click or Drag to Upload</span>
            <span className="text-[10px] text-text-soft">JPG, PNG, WebP up to 5MB</span>
          </div>
        )}
      </div>

      {error && <span className="text-[10px] font-bold text-red-500">{error}</span>}

      {/* Images Previews List */}
      {images.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-1">
          {images.map((url, idx) => (
            <div
              key={idx}
              className="relative w-20 h-20 bg-secondary-bg border border-gray-100 rounded-lg overflow-hidden group shadow-sm"
            >
              <img src={url} alt="upload thumbnail" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => handleDelete(idx)}
                className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer shadow-md"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
