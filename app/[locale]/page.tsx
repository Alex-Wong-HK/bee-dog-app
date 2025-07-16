import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CopyButton from '@/components/CopyButton';
import SocialLinks from '@/components/SocialLinks';
import VideoSection from '@/components/VideoSection';

const SOLANA_CONTRACT_ADDRESS = '5wyk5pXfKYFCT7vJWcbwjZMyakfK5xs2kRSQb6Gobonk';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(params.locale);
  
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-bg min-h-screen flex items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight">
              <span className="text-gray-800">{t('hero.title')}</span>
              <br />
              <span className="text-gradient">{t('hero.subtitle')}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              {/* <button className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg text-lg">
                {t('hero.cta')}
              </button> */}
              <CopyButton 
                textToCopy={SOLANA_CONTRACT_ADDRESS}
                className="text-lg px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:border-gray-400 transition-all duration-300"
              >
                {t('community.contract')}
              </CopyButton>
            </div>
          </div>

          {/* Hero Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[500px] lg:h-[500px]">
              <Image
                src="/bee-dog.webp"
                alt={t('accessibility.beedog')}
                fill
                className="object-cover rounded-3xl shadow-2xl transition-all duration-300"
                priority
                sizes="(max-width: 768px) 320px, (max-width: 1024px) 384px, 500px"
              />
              {/* Respectful overlay to indicate the serious nature */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl pointer-events-none"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white text-sm bg-black/50 rounded-lg p-3 backdrop-blur-sm">
                <p className="font-medium">In memory of all animals who have suffered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-8">
            {t('story.title')}
          </h2>
          
          <div className="prose prose-lg md:prose-xl mx-auto text-gray-700 leading-relaxed">
            <p className="text-xl md:text-2xl font-medium mb-8">
              {t('story.content')}
            </p>
          </div>

          {/* Story Stats - Updated for Animal Welfare */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">💔</div>
              <div className="text-gray-600 font-medium">{t('stats.neverForgotten')}</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">🛡️</div>
              <div className="text-gray-600 font-medium">{t('stats.protectionFirst')}</div>
            </div>
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl">
              <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">❤️</div>
              <div className="text-gray-600 font-medium">{t('stats.compassionAlways')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <VideoSection />

      {/* Mission Section */}
      {/* <MissionSection /> */}

      {/* Community Section */}
    
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gradient mb-4">{t('footer.organizationName')}</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              {t('footer.organizationDescription')}
            </p>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <SocialLinks className="justify-center mb-6" />
            <p className="text-gray-500 text-sm">
              © 2024 {t('footer.organizationName')}. {t('footer.copyright')}
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 