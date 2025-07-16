'use client';

import { useState, useRef, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface VideoSectionProps {
  className?: string;
}

export default function VideoSection({ className = '' }: VideoSectionProps) {
  const t = useTranslations('video');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [hasError, setHasError] = useState(false);

  // 监听视频加载进度
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadStart = () => setIsLoading(true);
    const handleLoadedData = () => setIsLoading(false);
    const handleProgress = () => {
      if (video.buffered.length > 0) {
        const buffered = video.buffered.end(video.buffered.length - 1);
        const duration = video.duration;
        if (duration > 0) {
          setLoadProgress((buffered / duration) * 100);
        }
      }
    };
    const handleError = () => {
      setHasError(true);
      setIsLoading(false);
    };

    video.addEventListener('loadstart', handleLoadStart);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadstart', handleLoadStart);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const handlePlayVideo = async () => {
    if (!videoRef.current) return;
    
    setIsLoading(true);
    
    try {
      await videoRef.current.play();
      setIsPlaying(true);
      setShowControls(true);
    } catch (error) {
      console.error('视频播放失败:', error);
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePauseVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    setIsPlaying(false);
  };

  const toggleVideo = () => {
    if (isPlaying) {
      handlePauseVideo();
    } else {
      handlePlayVideo();
    }
  };

  return (
    <section className={`py-20 px-4 bg-gradient-to-br from-gray-50 via-blue-50 to-green-50 ${className}`}>
      <div className="max-w-6xl mx-auto">
        {/* 标题部分 */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-800 mb-6">
            {t('title')}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* 视频容器 - 适配竖屏视频 */}
        <div className="relative max-w-2xl mx-auto">
          <div className="relative aspect-[9/16] md:aspect-[3/4] bg-black rounded-2xl overflow-hidden shadow-2xl">
            {/* 视频元素 */}
            <video
              ref={videoRef}
              className="w-full h-full object-contain bg-black"
              poster="/bee-dog.jpg" // 使用现有图片作为视频预览图
              preload="metadata" // 只预加载元数据，节省带宽
              playsInline
              controls={showControls}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onEnded={() => setIsPlaying(false)}
            >
              {/* 多格式支持，优化加载 */}
              <source src="/beedog.mp4" type="video/mp4" />
              <source src="/beedog.webm" type="video/webm" />
              {t('notSupported')}
            </video>

            {/* 加载覆盖层 */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mb-4"></div>
                <p className="text-lg font-medium mb-2">
                  {t('loading')}
                </p>
                <div className="w-48 bg-gray-600 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-400 h-2 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <p className="text-sm text-white/80 mt-2">
                  {t('size')} • {t('dataWarning')}
                </p>
              </div>
            )}

            {/* 播放按钮覆盖层 */}
            {!showControls && !isLoading && !hasError && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <button
                  onClick={handlePlayVideo}
                  className="group bg-white/20 backdrop-blur-sm border border-white/30 rounded-full p-6 hover:bg-white/30 transition-all duration-300 transform hover:scale-110"
                >
                  <svg className="w-12 h-12 text-white group-hover:text-blue-100" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            )}

            {/* 错误状态 */}
            {hasError && (
              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white">
                <svg className="w-16 h-16 text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p className="text-lg font-medium mb-2">
                  {t('error')}
                </p>
                <p className="text-sm text-white/80 text-center max-w-md">
                  {t('errorMessage')}
                </p>
                <button
                  onClick={() => {
                    setHasError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                    }
                  }}
                  className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                >
                  {t('retry')}
                </button>
              </div>
            )}
          </div>

          {/* 视频描述和操作 */}
          <div className="mt-8 text-center">
            {/* 播放/暂停按钮 */}
            {showControls && (
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={toggleVideo}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  {isPlaying ? (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {t('pause')}
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                      </svg>
                      {t('play')}
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: t('shareTitle'),
                        text: t('shareText'),
                        url: window.location.href,
                      });
                    } else {
                      // 回退到复制链接
                      navigator.clipboard.writeText(window.location.href);
                      alert(t('linkCopied'));
                    }
                  }}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 hover:border-gray-400 text-gray-700 rounded-lg transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                  </svg>
                  {t('share')}
                </button>
              </div>
            )}

            {/* 视频信息 */}
            <div className="mt-6 text-sm text-gray-600">
              <p>
                {t('info')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 