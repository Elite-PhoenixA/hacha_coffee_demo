import React from 'react';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-3xl mb-12 sm:mb-16 ${align === 'center' ? 'mx-auto text-center' : 'text-left'}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest mb-3.5 bg-sky-50 text-sky-800 border border-sky-200/70 shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2
        className={`text-3xl sm:text-4xl lg:text-5xl font-serif font-light tracking-tight leading-tight ${
          light ? 'text-white' : 'text-slate-900'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base sm:text-lg font-normal leading-relaxed ${
            light ? 'text-slate-200' : 'text-slate-600'
          }`}
        >
          {subtitle}
        </p>
      )}
      <div className={`mt-5 flex items-center gap-2 ${align === 'center' ? 'justify-center' : 'justify-start'}`}>
        <span className="h-0.5 w-12 bg-sky-400/80 rounded-full"></span>
        <span className="h-1.5 w-1.5 rounded-full bg-sky-500"></span>
        <span className="h-0.5 w-6 bg-sky-200 rounded-full"></span>
      </div>
    </div>
  );
}
