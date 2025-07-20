'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import HowToBuyDialog from './HowToBuyDialog';

export default function HowToBuyButton() {
  const t = useTranslations();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  return (
    <>
      <button
        onClick={openDialog}
        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 border-2 border-pink-300"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
        {t('buttons.howToBuy')}
      </button>

      <HowToBuyDialog isOpen={isDialogOpen} onClose={closeDialog} />
    </>
  );
} 