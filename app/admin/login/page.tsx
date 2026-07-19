'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Compass, Lock, User, AlertCircle } from 'lucide-react';
import { db } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    const loadLogo = async () => {
      const storedLogo = await db.settings.get('site_logo', null);
      if (storedLogo) setLogoUrl(storedLogo);
    };
    loadLogo();
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Mock Login Credentials
    if (username === 'admin' && password === 'admin') {
      localStorage.setItem('husna_admin_logged', 'true');
      router.push('/admin');
    } else {
      setError('Invalid username or password. Use: admin / admin');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-secondary-bg flex items-center justify-center p-4">
      {/* Background Decorative Circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-gold-light/5 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-primary-bg w-full max-w-md rounded-3xl border border-gray-100 shadow-2xl p-8 relative z-10">
        
        {/* Branding header */}
        <div className="text-center mb-8">
          {logoUrl ? (
            <img src={logoUrl} alt="Logo" className="w-16 h-16 rounded-full object-cover border-2 border-gold-medium shadow-lg mx-auto mb-4" />
          ) : (
            <div className="w-16 h-16 bg-emerald-medium text-white flex items-center justify-center rounded-full font-serif font-bold text-2xl border-2 border-gold-medium shadow-lg mx-auto mb-4">
              ح
            </div>
          )}
          <h1 className="text-2xl font-serif font-black text-emerald-dark tracking-wide">
            Husna Control Panel
          </h1>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gold-dark mt-1 block">
            Admin Sign In
          </span>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg flex items-center gap-3 text-red-700 text-xs font-semibold">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-text-secondary flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-emerald-medium" />
              <span>Username</span>
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 focus:border-emerald-medium rounded-lg px-4 py-2.5 outline-none font-sans text-sm"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-sans font-bold text-text-secondary flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-emerald-medium" />
              <span>Password</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 focus:border-emerald-medium rounded-lg px-4 py-2.5 outline-none font-sans text-sm"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-emerald-medium hover:bg-emerald-dark text-white font-sans font-bold text-xs tracking-widest uppercase rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer flex justify-center items-center gap-2 mt-2"
          >
            <Compass className="w-4 h-4 text-gold-light" />
            <span>{loading ? 'Signing In...' : 'Sign In'}</span>
          </button>
        </form>

        {/* Hint footer */}
        <p className="text-[10px] text-center text-text-soft font-semibold mt-6 border-t border-gray-100 pt-4">
          Note: Use <span className="font-bold text-emerald-medium">admin</span> for username and <span className="font-bold text-emerald-medium">admin</span> for password to access the panel.
        </p>

      </div>
    </div>
  );
}
