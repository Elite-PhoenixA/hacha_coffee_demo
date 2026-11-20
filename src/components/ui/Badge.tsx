import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'signature' | 'bestseller' | 'new' | 'season' | 'vegan' | 'cool';
  className?: string;
}

export function Badge({ children, variant = 'cool', className = '' }: BadgeProps) {
  const variantStyles = {
    signature: 'bg-sky-100/90 text-sky-800 border-sky-300/80',
    bestseller: 'bg-amber-50 text-amber-900 border-amber-300',
    new: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    season: 'bg-indigo-50 text-indigo-800 border-indigo-200',
    vegan: 'bg-teal-50 text-teal-800 border-teal-300',
    cool: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-xs tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
