'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function Counter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export default function TrustCounters() {
  const t = useTranslations('Counters');

  const counters = [
    { key: 'years', end: 15, suffix: '+' },
    { key: 'customers', end: 1000, suffix: '+' },
    { key: 'journeys', end: 500, suffix: '+' },
    { key: 'products', end: 100, suffix: '+' }
  ];

  return (
    <section className="bg-secondary-bg py-16 border-y border-gold-medium/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {counters.map((c) => (
            <div
              key={c.key}
              className="flex flex-col items-center justify-center p-6 text-center bg-primary-bg rounded-xl border-t-2 border-emerald-medium shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <span className="text-3xl md:text-5xl font-sans font-extrabold text-emerald-dark mb-2 tracking-tight">
                <Counter end={c.end} suffix={c.suffix} />
              </span>
              <span className="text-xs md:text-sm font-sans font-bold text-text-secondary uppercase tracking-widest">
                {t(c.key)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
