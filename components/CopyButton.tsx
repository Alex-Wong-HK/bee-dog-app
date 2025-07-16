'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface CopyButtonProps {
  textToCopy: string;
  className?: string;
  children: React.ReactNode;
}

export default function CopyButton({ textToCopy, className = '', children }: CopyButtonProps) {
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle');
  const t = useTranslations('buttons');

  const handleCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(textToCopy);
        setCopyState('copied');
      } else {
        // Fallback for older browsers or non-secure contexts
        const textArea = document.createElement('textarea');
        textArea.value = textToCopy;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (successful) {
          setCopyState('copied');
        } else {
          setCopyState('error');
        }
      }
    } catch (err) {
      console.error('Failed to copy text: ', err);
      setCopyState('error');
    }

    // Reset state after 2 seconds
    setTimeout(() => setCopyState('idle'), 2000);
  };

  const getButtonText = () => {
    switch (copyState) {
      case 'copied':
        return t('copied');
      case 'error':
        return t('copyFailed');
      default:
        return children;
    }
  };

  const getButtonClass = () => {
    const baseClass = `btn-primary focus:ring-custom transition-all duration-300 ${className}`;
    
    switch (copyState) {
      case 'copied':
        return `${baseClass} bg-green-500 hover:bg-green-600`;
      case 'error':
        return `${baseClass} bg-red-500 hover:bg-red-600`;
      default:
        return baseClass;
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={getButtonClass()}
      disabled={copyState !== 'idle'}
      aria-label={t('copyContract')}
      type="button"
    >
      <span className="flex items-center gap-2">
        {copyState === 'copied' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        )}
        {copyState === 'error' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        )}
        {copyState === 'idle' && (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        )}
        <span>{getButtonText()}</span>
      </span>
    </button>
  );
} 