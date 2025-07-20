'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface HowToBuyDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HowToBuyDialog({ isOpen, onClose }: HowToBuyDialogProps) {
  const t = useTranslations('howToBuy');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const steps = [
    {
      title: t('step1.title'),
      description: t('step1.description'),
      link: 'https://phantom.com/download',
      linkText: t('step1.linkText'),
      icon: (
        <img 
          src="/how-to-buy/step1-phantom.webp" 
          alt="Phantom Wallet" 
          className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
        />
      )
    },
    {
      title: t('step2.title'),
      description: t('step2.description'),
      icon: (
        <div className="w-16 h-16 rounded-full border-2 border-orange-200 bg-white flex items-center justify-center p-2">
          <img 
            src="/how-to-buy/step2-sol.svg" 
            alt="SOL" 
            className="w-full h-full object-contain"
          />
        </div>
      )
    },
    {
      title: t('step3.title'),
      description: t('step3.description'),
      link: 'https://letsbonk.fun/token/5wyk5pXfKYFCT7vJWcbwjZMyakfK5xs2kRSQb6Gobonk',
      linkText: t('step3.linkText'),
      icon: (
        <img 
          src="/how-to-buy/step3-beedog.jpg" 
          alt="$蜜蜂狗" 
          className="w-16 h-16 rounded-full object-cover border-2 border-orange-200"
        />
      )
    }
  ];

  return (
    <div className="fixed inset-0 bg-orange-900/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-3xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-hidden border-2 border-orange-200">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
          <h2 className="text-xl font-bold text-orange-800">{t('title')}</h2>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-orange-200 rounded-full transition-colors"
            aria-label={t('close')}
          >
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Step Indicator */}
        <div className="px-6 py-4">
          <div className="text-center">
            <span className="text-sm font-medium text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              {t('step')} {currentStep} {t('of')} {totalSteps}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
                      <div className="text-center">
              {/* Step Icon */}
              <div className="flex justify-center mb-6">
                <div className="text-orange-600">
                  {steps[currentStep - 1].icon}
                </div>
              </div>

            {/* Step Title */}
            <h3 className="text-xl font-bold text-orange-800 mb-3">
              {steps[currentStep - 1].title}
            </h3>

            {/* Step Description */}
            <p className="text-orange-700 leading-relaxed bg-white/50 rounded-xl p-4 border border-orange-200">
              {steps[currentStep - 1].description}
            </p>

            {/* Step Link */}
            {steps[currentStep - 1].link && (
              <div className="mt-4">
                <a
                  href={steps[currentStep - 1].link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-orange-400 to-yellow-400 text-white font-medium rounded-xl hover:from-orange-500 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {steps[currentStep - 1].linkText}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-orange-200 bg-gradient-to-r from-orange-100 to-yellow-100">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              currentStep === 1
                ? 'text-orange-300 cursor-not-allowed'
                : 'text-orange-700 hover:bg-orange-200 rounded-xl'
            }`}
          >
            {t('back')}
          </button>

          <div className="flex space-x-2">
            {currentStep < totalSteps ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-medium hover:from-orange-600 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('next')}
              </button>
            ) : (
              <button
                onClick={handleClose}
                className="px-6 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-xl font-medium hover:from-green-500 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {t('finish')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 