import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import CopyButton from '@/components/CopyButton';
import SocialLinks from '@/components/SocialLinks';
import ImageSlider from '@/components/ImageSlider';
import ScrollSnap from '@/components/ScrollSnap';
import HowToBuyButton from '@/components/HowToBuyButton';
import HeroVideo from '@/components/HeroVideo';

const SOLANA_CONTRACT_ADDRESS = '5wyk5pXfKYFCT7vJWcbwjZMyakfK5xs2kRSQb6Gobonk';

export default function HomePage({ params }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(params.locale);
  
  const t = useTranslations();

  return (
    <main className="min-h-screen">
      <ScrollSnap sections={['hero', 'community-creations', 'story']} />
      {/* Hero Section */}
      <section id="hero" className="hero-bg min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center mb-12">
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
            
            {/* Contract Address Display */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6 space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                  {t('community.contractAddress')}
                </span>
              </div>
              
              <div className="space-y-3">
                <div className="text-center lg:text-left">
                  <code className="text-sm md:text-base font-mono text-gray-800 break-all">
                    {SOLANA_CONTRACT_ADDRESS}
                  </code>
                </div>
                <div className="flex justify-center lg:justify-start">
                  <CopyButton 
                    textToCopy={SOLANA_CONTRACT_ADDRESS}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                  >
                    {t('buttons.copyContract')}
                  </CopyButton>
                </div>
              </div>
            </div>

            {/* How to Buy Button */}

            

          </div>

          {/* Hero Video */}
          <HeroVideo />
        </div>
        <div className="flex justify-center pt-4">
              <HowToBuyButton />
        </div>
      </section>

      {/* Section 2: Community Creations (Image Slider) */}
      <section id="community-creations" className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-blue-50 to-green-50 section-animate">
        <div className="w-full max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-16">
            {t('communityCreations.title')}
          </h2>
          
          <ImageSlider 
            images={[
              '/slider/image1.jpg',
              '/slider/image2.jpg',
              '/slider/image3.jpg',
              '/slider/image4.jpg',
              '/slider/image5.jpg',
              '/slider/image6.jpg',
              '/slider/image7.jpg',
              '/slider/image8.jpg',
              '/slider/image9.jpg',
              '/slider/image10.jpg',
            ]}
            autoPlay={true}
            autoPlayInterval={4000}
            className="mb-8"
          />
        </div>
      </section>

            {/* Section 3: Story + Footer */}
      <section id="story" className="min-h-screen flex flex-col bg-white section-animate">
        {/* Story Content */}
        <div className="flex-1 flex items-center justify-center px-4 py-12">
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
        </div>

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
      </section>
    </main>
  );
} 