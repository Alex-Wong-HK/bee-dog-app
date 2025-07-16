'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { priceFeedService, ChartData } from '@/lib/priceFeed';

// Import lightweight-charts types
import type { IChartApi, Time, ISeriesApi } from 'lightweight-charts';

interface TokenChartProps {
  contractAddress: string;
  className?: string;
}

function ChartLoading() {
  const t = useTranslations();
  
  return (
    <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl border border-blue-200 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-blue-800 font-medium">{t('chart.loading')}</p>
      </div>
    </div>
  );
}



export default function TokenChart({ contractAddress, className = '' }: TokenChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null);
  const lineSeriesRef = useRef<ISeriesApi<"Line"> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [hasData, setHasData] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number>(0);
  const [priceChange24h, setPriceChange24h] = useState<number>(0);
  const [marketCap, setMarketCap] = useState<number>(0);
  
  const t = useTranslations();

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const initializeChart = useCallback(async () => {
    if (!chartContainerRef.current || !isClient) return;

    try {
      console.log('Initializing chart for contract:', contractAddress);
      setIsLoading(true);
      setHasError(false);
      setHasData(false);


      // Dynamic import of createChart
      const { createChart } = await import('lightweight-charts');
      
      const chart = createChart(chartContainerRef.current, {
        width: chartContainerRef.current.clientWidth,
        height: 400,
        layout: {
          background: { color: '#ffffff' },
          textColor: '#374151',
        },
        grid: {
          vertLines: { color: '#E5E7EB' },
          horzLines: { color: '#E5E7EB' },
        },
        crosshair: {
          mode: 1,
        },
        rightPriceScale: {
          borderColor: '#D1D5DB',
          scaleMargins: {
            top: 0.1,
            bottom: 0.1,
          },
          entireTextOnly: true,
          visible: true,
        },
        timeScale: {
          borderColor: '#D1D5DB',
          timeVisible: true,
          secondsVisible: false,
        },
        watermark: {
          visible: false, // 隐藏TradingView水印
        },
      });

      // 只添加线形图，不要K线
      const lineSeries = chart.addLineSeries({
        color: '#2563EB', // 蓝色
        lineWidth: 3, // 增加线宽
        priceLineVisible: true,
        lastValueVisible: true,
        crosshairMarkerVisible: true, // 显示十字光标标记
        priceFormat: {
          type: 'custom',
          formatter: (price: number) => {
            // 显示市值：价格 × 1B tokens
            const supply = 1000000000;
            const mc = price * supply / 1000000; // 转换为百万
            return `$${mc.toFixed(2)}M`;
          },
        },
      });

      chartRef.current = chart;
      candlestickSeriesRef.current = null; // 不再使用K线
      lineSeriesRef.current = lineSeries;

      console.log('Chart created, fetching data...');

      // Fetch historical data
      const historicalData = await priceFeedService.getHistoricalData({
        contractAddress,
        timeframe: '1m',
        limit: 100,
      });

      console.log('Historical data received:', historicalData?.length || 0, 'items');

      if (historicalData && historicalData.length > 0) {
        // 直接为线形图设置数据（只使用收盘价）
        const lineData = historicalData.map(item => ({
          time: item.time as Time,
          value: Number(item.close)
        }));
        
        console.log('Setting line chart data:', lineData.slice(0, 3));
        console.log('Data sample:', lineData[0]);
        lineSeries.setData(lineData);

        
        
        if (historicalData.length > 0) {
          const latestData = historicalData[historicalData.length - 1];
          setCurrentPrice(Number(latestData.close));
          
          
          if (historicalData.length > 1) {
            const firstPrice = Number(historicalData[0].close);
            const lastPrice = Number(latestData.close);
            const change = ((lastPrice - firstPrice) / firstPrice) * 100;
            setPriceChange24h(change);
          }
          
          // 估算市值 - 价格已经是USD
          const estimatedSupply = 1000000000; // 1000M tokens total supply
          const price = Number(latestData.close);
          const marketCapValue = price * estimatedSupply;
          console.log('MC Calculation (Historical):', { price, estimatedSupply, marketCapValue });
          setMarketCap(marketCapValue);
        }
        
        setHasData(true);
        setIsLoading(false);
        console.log('Chart data set successfully with', historicalData.length, 'points');
      } else {
        console.log('No historical data available, initializing with empty data');
        // 没有历史数据，创建一个空数据点让图表准备好接收更新
        const now = Math.floor(Date.now() / 1000) as Time;
        const emptyData = [{
          time: now,
          value: 0.001 // 临时值，会被WebSocket数据替换
        }];
        lineSeries.setData(emptyData);
        setHasData(true); 
        setIsLoading(false);
      }

      // Set up real-time updates
      const handlePriceUpdate = (data: ChartData) => {
        console.log('WebSocket data received:', data);
        
        if (lineSeriesRef.current) {
          const lineUpdate = {
            time: data.time as Time,
            value: Number(data.close),
          };
          
          // 直接更新图表（现在总是有初始数据）
          console.log('Updating chart with WebSocket data:', lineUpdate);
          lineSeriesRef.current.update(lineUpdate);
          
          // Update current price
          setCurrentPrice(Number(data.close));
          
          // Estimate market cap - 价格已经是USD
          const estimatedSupply = 1000000000; // 1000M tokens total supply
          const price = Number(data.close);
          const marketCapValue = price * estimatedSupply;
          console.log('MC Calculation (WebSocket):', { price, estimatedSupply, marketCapValue });
          setMarketCap(marketCapValue);
        }
      };

      priceFeedService.addListener(handlePriceUpdate);
      priceFeedService.connectWebSocket(contractAddress);

      // Handle window resize
      const handleResize = () => {
        if (chartRef.current && chartContainerRef.current) {
          chartRef.current.applyOptions({
            width: chartContainerRef.current.clientWidth,
          });
        }
      };

      window.addEventListener('resize', handleResize);

      // Cleanup function
      return () => {
        console.log('Cleaning up chart');
        window.removeEventListener('resize', handleResize);
        priceFeedService.removeListener(handlePriceUpdate);
        priceFeedService.disconnect();
        if (chartRef.current) {
          chartRef.current.remove();
          chartRef.current = null;
          candlestickSeriesRef.current = null;
          lineSeriesRef.current = null;
        }
      };
    } catch (error) {
      console.error('Error initializing chart:', error);
      setHasError(true);
      setIsLoading(false);
      setHasData(false);
    }
  }, [contractAddress, isClient]);

  const handleRetry = useCallback(() => {
    setHasError(false);
    setIsLoading(true);
    initializeChart();
  }, [initializeChart]);

  useEffect(() => {
    if (!isClient) return;

    console.log('TokenChart useEffect triggered, isClient:', isClient);
    
    // 不设置超时，等待真实数据

    const cleanup = initializeChart();
    
    return () => {
      if (cleanup && typeof cleanup.then === 'function') {
        cleanup.then((cleanupFn) => {
          if (cleanupFn && typeof cleanupFn === 'function') {
            cleanupFn();
          }
        });
      }
    };
  }, [initializeChart, isClient]);

  // Don't render anything on server side
  if (!isClient) {
    return <ChartLoading />;
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-800 mb-2">{t('chart.title')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">當前價格</div>
              <div className="text-lg font-bold text-blue-800">
                {currentPrice > 0 ? `$${currentPrice.toFixed(6)}` : '載入中...'}
              </div>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">市值 (MC)</div>
              <div className="text-lg font-bold text-green-800">
                {marketCap > 0 ? `$${(marketCap / 1000000).toFixed(2)}M` : '計算中...'}
              </div>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
              <div className="text-xs text-gray-600 mb-1">24小時變化</div>
              <div className={`text-lg font-bold ${priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {priceChange24h >= 0 ? '+' : ''}{priceChange24h.toFixed(2)}%
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <span>{t('chart.priceLabel')}: USD</span>
            <span>{t('chart.timeLabel')}: 1m</span>
          </div>
        </div>
        
        {isLoading && (
          <div className="w-full h-96 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-blue-200 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-blue-800 font-medium">{t('chart.loading')}</p>
            </div>
          </div>
        )}
        
        {hasError && !isLoading && (
          <div className="w-full h-96 bg-gradient-to-br from-red-50 to-orange-50 rounded-lg border border-red-200 flex items-center justify-center">
            <div className="text-center space-y-4 p-6">
              <div className="text-red-600 text-4xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-red-800">{t('chart.errorTitle')}</h3>
              <p className="text-red-700 max-w-md">{t('chart.errorMessage')}</p>
              <button
                onClick={handleRetry}
                className="px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                {t('chart.retry')}
              </button>
            </div>
          </div>
        )}
        
        {!hasData && !isLoading && !hasError && (
          <div className="w-full h-96 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-yellow-600 text-4xl mb-4">📊</div>
              <p className="text-yellow-800 font-medium">等待實時數據...</p>
              <p className="text-yellow-700 text-sm">WebSocket連接中，請稍候</p>
            </div>
          </div>
        )}
        
        <div 
          ref={chartContainerRef}
          className="w-full h-96 rounded-lg border border-gray-300 bg-white"
          style={{ minHeight: '400px' }}
        />
      </div>
    </div>
  );
} 