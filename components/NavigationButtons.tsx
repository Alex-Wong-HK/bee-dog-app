'use client';

import { useTranslations } from 'next-intl';

interface NavigationButtonsProps {
  className?: string;
}

export default function NavigationButtons({ className = '' }: NavigationButtonsProps) {
  const t = useTranslations();

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 ${className}`}>
      <button 
        onClick={() => scrollToSection('community-creations')}
        className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg text-lg group"
      >
        <span className="flex items-center gap-2">
          {t('hero.cta')}
          <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </span>
      </button>
    </div>
  );
} 