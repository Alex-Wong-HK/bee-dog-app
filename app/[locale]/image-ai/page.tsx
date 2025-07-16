'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ImageUpload from '@/components/ImageUpload';

interface ImageAIPageProps {
  params: { locale: string };
}

export default function ImageAIPage({ params }: ImageAIPageProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [customPrompt, setCustomPrompt] = useState(`Transform this anime character to have a swollen face from bee stings. Key changes needed:
- Puffy, swollen cheeks and face (not fat, but inflamed/swollen like allergic reaction)
- Closed mouth with a pitiful, wronged expression
- Slightly droopy or sad eyes showing distress
- Add cute cartoon bees around the character
- Keep the same art style and character design
- Face should look like it was stung by bees - puffy and inflamed(serious and exaggerated)
- Expression should be pouty and pitiful, like feeling sorry for themselves
- Maintain the black and white radial background`);
  
  // AI Generation Parameters
  const [inferenceSteps, setInferenceSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(12);
  const [strength, setStrength] = useState(0.9);
  const [showAdvancedParams, setShowAdvancedParams] = useState(false);

  const t = useTranslations('imageAI');

  // Log locale for debugging (prevents unused params warning)
  console.log('Image AI page loaded for locale:', params.locale);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setProcessedImageUrl(null);
    setError(null);
    setImageLoading(false);
  };

  const handleFileRemove = () => {
    setSelectedFile(null);
    setProcessedImageUrl(null);
    setError(null);
    setImageLoading(false);
  };

  const handleTransform = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);
    setUploadProgress(0);
    setProcessedImageUrl(null); // Reset previous result
    setImageLoading(false); // Reset image loading state

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      if (customPrompt.trim()) {
        formData.append('prompt', customPrompt.trim());
      }
      
      // Add AI generation parameters
      formData.append('inferenceSteps', inferenceSteps.toString());
      formData.append('guidanceScale', guidanceScale.toString());
      formData.append('strength', strength.toString());

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch('/api/transform-image', {
        method: 'POST',
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error occurred' }));
        let errorMessage = errorData.error || `Server error: ${response.status}`;
        
        // Provide more helpful error messages for common issues
        if (response.status === 402) {
          errorMessage = 'Replicate API credits exhausted. Please check your account billing.';
        } else if (response.status === 401) {
          errorMessage = 'Invalid Replicate API token. Please check your .env.local file.';
        } else if (response.status === 422) {
          errorMessage = 'Invalid image format or size. Please try a different image.';
        }
        
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      if (data.success && data.imageUrl) {
        // Check if it's a demo mode response
        if (data.imageUrl.startsWith('data:application/json;base64,')) {
          // Handle demo mode
          const base64String = data.imageUrl.split(',')[1];
          const demoData = JSON.parse(atob(base64String));
          
          if (demoData.effect === 'bee-sting-demo') {
            // Set the original image with demo overlay
            setProcessedImageUrl(demoData.original);
            setImageLoading(true); // Start image loading for demo too
            setError(demoData.message); // Show demo message as "error" (but not red)
            return;
          }
        }
        
        // Normal AI processed image
        setProcessedImageUrl(data.imageUrl);
        setImageLoading(true); // Start image loading state
      } else {
        throw new Error(data.error || 'Failed to process image');
      }
    } catch (err) {
      console.error('Transform error:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsProcessing(false);
      setUploadProgress(0);
    }
  };

  const handleDownload = () => {
    if (!processedImageUrl) return;

    const link = document.createElement('a');
    link.href = processedImageUrl;
    link.download = `bee-sting-effect-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      {/* Header Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-800 mb-6">
            <span className="text-gradient">{t('title')}</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            {t('description')}
          </p>
          
         
        </div>
      </section>

      {/* Upload and Processing Section */}
      <section className="pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl p-8">
            {/* Step 1: Upload */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                {t('uploadTitle')}
              </h2>
              <ImageUpload
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                selectedFile={selectedFile}
                maxSizeMB={10}
                acceptedTypes={['image/jpeg', 'image/png', 'image/webp']}
                uploadDropText={t('uploadDropText')}
                uploadSupportsText={t('uploadSupportsText')}
              />
            </div>

            {/* Step 2: Transform */}
            {selectedFile && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                  {t('transformTitle')}
                </h2>
                
                {/* Custom Prompt Input */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <label className="block text-sm font-semibold text-gray-700">
                      🎨 Transformation Prompt
                    </label>
                    <button
                      type="button"
                      onClick={() => setCustomPrompt(`Transform this anime character to have a swollen face from bee stings. Key changes needed:
                      - Puffy, swollen cheeks and face (not fat, but inflamed/swollen like allergic reaction)
                      - Closed mouth with a pitiful, wronged expression
                      - Slightly droopy or sad eyes showing distress
                      - Add cute cartoon bees around the character
                      - Keep the same art style and character design
                      - Face should look like it was stung by bees - puffy and inflamed(serious and exaggerated)
                      - Expression should be pouty and pitiful, like feeling sorry for themselves
                      - Maintain the black and white radial background`
                    )}
                      className="text-xs px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
                    >
                      🔄 Reset to Default
                    </button>
                  </div>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="Describe how you want to transform the character..."
                    className="w-full h-40 px-4 py-3 border border-gray-300 rounded-xl text-sm resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  />
                  <div className="mt-2 text-xs text-gray-500">
                    💡 Customize the prompt to control how the bee sting effect is applied to your character
                  </div>
                </div>

                {/* AI Generation Parameters */}
                <div className="mb-6">
                  <button
                    type="button"
                    onClick={() => setShowAdvancedParams(!showAdvancedParams)}
                    className="flex items-center text-sm text-gray-600 hover:text-gray-800 transition-colors mb-4"
                  >
                    <span className={`transform transition-transform mr-2 ${showAdvancedParams ? 'rotate-90' : ''}`}>
                      ▶
                    </span>
                    ⚙️ AI Generation Parameters
                  </button>
                  
                  {showAdvancedParams && (
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
                      {/* Inference Steps */}
                      <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-2">
                          🔄 Inference Steps: {inferenceSteps}
                        </label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={inferenceSteps}
                          onChange={(e) => setInferenceSteps(parseInt(e.target.value))}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-blue-600 mt-1">
                          <span>Fast (10)</span>
                          <span>Balanced (30)</span>
                          <span>High Quality (100)</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Higher values = better quality but slower generation
                        </div>
                      </div>

                      {/* Guidance Scale */}
                      <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-2">
                          🎯 Guidance Scale: {guidanceScale}
                        </label>
                        <input
                          type="range"
                          min="1"
                          max="30"
                          step="0.5"
                          value={guidanceScale}
                          onChange={(e) => setGuidanceScale(parseFloat(e.target.value))}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-blue-600 mt-1">
                          <span>Creative (1)</span>
                          <span>Balanced (12)</span>
                          <span>Precise (30)</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Higher values = follows prompt more strictly
                        </div>
                      </div>

                      {/* Strength */}
                      <div>
                        <label className="block text-sm font-semibold text-blue-700 mb-2">
                          💪 Transformation Strength: {strength}
                        </label>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.1"
                          value={strength}
                          onChange={(e) => setStrength(parseFloat(e.target.value))}
                          className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-blue-600 mt-1">
                          <span>Subtle (0.1)</span>
                          <span>Moderate (0.5)</span>
                          <span>Strong (1.0)</span>
                        </div>
                        <div className="text-xs text-blue-600 mt-1">
                          Higher values = more dramatic transformation
                        </div>
                      </div>

                      {/* Reset Parameters Button */}
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => {
                            setInferenceSteps(30);
                            setGuidanceScale(12);
                            setStrength(0.9);
                          }}
                          className="text-xs px-3 py-1 bg-blue-200 hover:bg-blue-300 rounded-lg transition-colors"
                        >
                          🔄 Reset to Defaults
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <button
                    onClick={handleTransform}
                    disabled={isProcessing || !selectedFile}
                    className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
                      isProcessing || !selectedFile
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:from-orange-600 hover:to-red-600 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>🐝 Applying bee sting effect...</span>
                      </div>
                    ) : (
                      <>🐝 {t('transformButton')}</>
                    )}
                  </button>

                  {/* Progress Bar */}
                  {isProcessing && (
                    <div className="mt-4 w-full max-w-md mx-auto">
                      <div className="bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <div className="text-center mt-3">
                        {uploadProgress < 100 ? (
                          <p className="text-sm text-gray-600">
                            🐝 Uploading image... {uploadProgress}%
                          </p>
                        ) : (
                          <div className="space-y-2">
                            <p className="text-sm text-orange-600 font-medium">
                              🧠 AI is applying bee sting swelling effects...
                            </p>
                            <p className="text-xs text-gray-500">
                              This may take 1-3 minutes. Please wait...
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Error Display / Demo Message */}
            {error && (
              <div className={`mb-8 p-4 rounded-xl ${
                error.includes('🆓 Demo mode') 
                  ? 'bg-blue-50 border border-blue-200' 
                  : 'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center space-x-2">
                  <span className={error.includes('🆓 Demo mode') ? 'text-blue-600' : 'text-red-600'}>
                    {error.includes('🆓 Demo mode') ? '🎭' : '❌'}
                  </span>
                  <div>
                    <h3 className={`font-semibold ${
                      error.includes('🆓 Demo mode') ? 'text-blue-800' : 'text-red-800'
                    }`}>
                      {error.includes('🆓 Demo mode') ? 'Free Demo Mode' : t('errorTitle')}
                    </h3>
                    <p className={error.includes('🆓 Demo mode') ? 'text-blue-700' : 'text-red-700'}>
                      {error}
                    </p>
                    {error.includes('🆓 Demo mode') && (
                      <div className="mt-2 text-xs text-blue-600">
                        💡 <strong>Upgrade options:</strong><br/>
                        • Free: Add Hugging Face API key (30k requests/month)<br/>
                        • Paid: Add Replicate API key (~$0.01-0.05 per image)
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Results */}
            {processedImageUrl && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  <span className="bg-purple-100 text-purple-600 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                  {t('resultsTitle')}
                </h2>
                
                <div className="space-y-6">
                  {/* Display Applied Settings */}
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="text-sm font-semibold text-green-800 mb-2">✅ Applied Settings</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                      <div>
                        <span className="font-medium">Effect Type:</span> Bee Sting Transformation
                      </div>
                      <div>
                        <span className="font-medium">Inference Steps:</span> {inferenceSteps}
                      </div>
                      <div>
                        <span className="font-medium">Guidance Scale:</span> {guidanceScale}
                      </div>
                      <div>
                        <span className="font-medium">Strength:</span> {strength}
                      </div>
                      {customPrompt !== `Transform this anime character to have a swollen face from bee stings. Key changes needed:
- Puffy, swollen cheeks and face (not fat, but inflamed/swollen like allergic reaction)
- Closed mouth with a pitiful, wronged expression
- Slightly droopy or sad eyes showing distress
- Add cute cartoon bees around the character
- Keep the same art style and character design
- Face should look like it was stung by bees - puffy and inflamed(serious and exaggerated)
- Expression should be pouty and pitiful, like feeling sorry for themselves
- Maintain the black and white radial background` && (
                        <div className="col-span-2">
                          <span className="font-medium">Custom Prompt:</span> 
                          <span className="text-xs block mt-1 bg-green-100 p-2 rounded">
                            {customPrompt.substring(0, 100)}{customPrompt.length > 100 ? '...' : ''}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Before and After Comparison */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">{t('originalImage')}</h3>
                      <div className="bg-gray-100 rounded-xl p-4" style={{ minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {selectedFile && (
                          <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Original"
                            className="w-full rounded-lg shadow-md"
                            style={{ 
                              maxHeight: '300px',
                              height: 'auto',
                              width: 'auto',
                              maxWidth: '100%',
                              objectFit: 'contain',
                              margin: '0 auto',
                              display: 'block'
                            }}
                          />
                        )}
                      </div>
                    </div>
                    
                                         <div>
                       <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">
                         {error?.includes('🆓 Demo mode') ? '🎭 Demo Effect Applied' : t('processedImage')}
                       </h3>
                       <div className="bg-gray-100 rounded-xl p-4 relative" style={{ minHeight: '300px' }}>
                         {imageLoading && (
                           <div className="absolute inset-4 bg-gray-100 rounded-xl flex items-center justify-center z-10">
                             <div className="text-center">
                               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
                               <p className="text-sm text-gray-600">🐝 Image Loading...</p>
                             </div>
                           </div>
                         )}
                         <img
                           src={processedImageUrl}
                           alt="Processed with bee sting effect"
                           onLoad={() => setImageLoading(false)}
                           onError={() => setImageLoading(false)}
                           className={`w-full rounded-lg shadow-md transition-opacity duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'} ${
                             error?.includes('🆓 Demo mode') 
                               ? 'filter contrast-110 saturate-110 sepia-10' 
                               : ''
                           }`}
                           style={{ 
                             maxHeight: '300px',
                             height: 'auto',
                             width: 'auto',
                             maxWidth: '100%',
                             objectFit: 'contain', 
                             margin: '0 auto', 
                             display: 'block',
                             ...(error?.includes('🆓 Demo mode') && {
                               filter: 'contrast(1.1) saturate(1.2) sepia(0.1) hue-rotate(15deg)',
                               boxShadow: '0 0 20px rgba(255, 165, 0, 0.3)'
                             })
                           }}
                         />
                         {error?.includes('🆓 Demo mode') && (
                           <div className="mt-2 text-center">
                             <div className="inline-block bg-orange-100 px-3 py-1 rounded-full text-xs text-orange-600 font-medium">
                               🐝 Demo: Basic color filters applied (not true AI swelling)
                             </div>
                           </div>
                         )}
                       </div>
                     </div>
                  </div>

                  {/* Download Button */}
                  <div className="text-center">
                    <button
                      onClick={handleDownload}
                      className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                      {t('downloadButton')}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
} 