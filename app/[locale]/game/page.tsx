import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default function GamePage({ params }: { params: { locale: string } }) {
  // Enable static rendering
  setRequestLocale(params.locale);
  
  const t = useTranslations('game');
  const tInstructions = useTranslations('gameInstructions');

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Game Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800 mb-6">
              <span className="text-gradient">{t('title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t('description')}
            </p>
          </div>

          {/* Game Container */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-5xl mx-auto">
            <div className="relative w-full" style={{ paddingBottom: '59.4%' }}>
              <iframe
                src="https://www.gameflare.com/embed/save-the-dog/"
                frameBorder="0"
                scrolling="no"
                width="900"
                height="535"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg"
                title={t('title')}
                loading="lazy"
              />
            </div>
            
            {/* Game Info */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500 mb-2">
                {t('loading')}
              </p>
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-400">
                <span>Powered by</span>
                <a 
                  href="https://www.gameflare.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-gray-600 transition-colors duration-200"
                >
                  GameFlare
                </a>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-8 max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                {tInstructions('title')}
              </h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="mb-4">
                  {tInstructions('description')}
                </p>
                <div className="grid md:grid-cols-3 gap-6 mt-8 text-center">
                  <div className="p-4">
                    <div className="text-3xl mb-2">🧩</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{tInstructions('solvePuzzles')}</h3>
                    <p className="text-sm text-gray-600">{tInstructions('solvePuzzlesDesc')}</p>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl mb-2">🐕</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{tInstructions('saveAnimals')}</h3>
                    <p className="text-sm text-gray-600">{tInstructions('saveAnimalsDesc')}</p>
                  </div>
                  <div className="p-4">
                    <div className="text-3xl mb-2">🎯</div>
                    <h3 className="font-semibold text-gray-800 mb-1">{tInstructions('completeLevels')}</h3>
                    <p className="text-sm text-gray-600">{tInstructions('completeLevelsDesc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 