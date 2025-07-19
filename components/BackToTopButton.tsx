'use client';

import { useTranslations } from 'next-intl';

interface BackToTopButtonProps {
  className?: string;
}

export default function BackToTopButton({ className = '' }: BackToTopButtonProps) {
  const t = useTranslations();

  const scrollToTop = () => {
    document.getElementById('hero')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <button 
      onClick={scrollToTop}
      className={`mt-8 px-6 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl hover:bg-white/30 transition-all duration-300 group ${className}`}
    >
      <span className="flex items-center gap-2 text-gray-800 font-medium">
        <svg className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
        </svg>
        {t('navigation.backToTop')}
      </span>
    </button>
  );
} 