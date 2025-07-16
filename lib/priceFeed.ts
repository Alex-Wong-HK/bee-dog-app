export interface BirdeyeOHLCVData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ChartData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CoinMarketCapPriceResponse {
  d: {
    id: number;
    p: number; // price
    t: number; // timestamp
    v: number; // volume
    mc?: number; // market cap
    cp?: number; // change percentage
  };
}

export interface BirdeyePriceResponse {
  success: boolean;
  data: {
    items: Array<{
      unixTime: number;
      value: number;
      o: number;
      h: number;
      l: number;
      c: number;
      v: number;
    }>;
  };
}

export interface PriceFeedOptions {
  contractAddress: string;
  timeframe: '1m' | '5m' | '15m' | '1H' | '4H' | '1D';
  limit?: number;
}

class PriceFeedService {
  private wsConnection: WebSocket | null = null;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;
  private listeners: Array<(data: ChartData) => void> = [];

  constructor() {
    this.connectWebSocket = this.connectWebSocket.bind(this);
    this.handleWebSocketMessage = this.handleWebSocketMessage.bind(this);
    this.handleWebSocketError = this.handleWebSocketError.bind(this);
    this.handleWebSocketClose = this.handleWebSocketClose.bind(this);
  }

  async getHistoricalData(options: PriceFeedOptions): Promise<ChartData[]> {
    const { contractAddress, timeframe, limit = 100 } = options;
    
    console.log('Fetching historical data for:', contractAddress);
    
    try {
      // Try Birdeye API first as fallback for historical data
      const response = await fetch(
        `https://public-api.birdeye.so/defi/ohlcv?address=${contractAddress}&type=${timeframe}&time_from=${Date.now() - 24 * 60 * 60 * 1000}&time_to=${Date.now()}`,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Birdeye API response status:', response.status);

      if (response.ok) {
        const data: BirdeyePriceResponse = await response.json();
        console.log('Birdeye API response:', data);
        
        if (data.success && data.data?.items && data.data.items.length > 0) {
          const formattedData = data.data.items
            .map(item => ({
              time: Math.floor(item.unixTime / 1000), // Convert to seconds
              open: item.o || item.value,
              high: item.h || item.value,
              low: item.l || item.value,
              close: item.c || item.value,
            }))
            .sort((a, b) => a.time - b.time)
            .slice(-limit);
          
          console.log('Returning formatted data:', formattedData.length, 'items');
          return formattedData;
        }
      }
      
      console.log('Birdeye API failed, generating mock data');
      throw new Error('Failed to fetch historical data');
    } catch (error) {
      console.error('Error fetching historical data:', error);
      // Return mock data for demo purposes
      console.log('Generating mock data');
      return this.generateMockData();
    }
  }

  connectWebSocket(contractAddress: string): void {
    console.log('Attempting to connect WebSocket for:', contractAddress);
    
    try {
      // Use CoinMarketCap WebSocket endpoint
      const wsEndpoint = 'wss://dws.coinmarketcap.com/ws?device=ios';
      this.wsConnection = new WebSocket(wsEndpoint);
      
      this.wsConnection.addEventListener('open', () => {
        console.log('WebSocket connected to CoinMarketCap');
        this.reconnectAttempts = 0;
        
        // Subscribe to price updates for the token using CMC format
        const subscribeMessage = {
          method: "SUBSCRIPTION",
          id: 1,
          params: [
            `quote@token_agg_event@16_${contractAddress}`,
            `datahub@tokenMetric@16_${contractAddress}`
          ]
        };
        
        console.log('Sending subscription message:', subscribeMessage);
        this.wsConnection?.send(JSON.stringify(subscribeMessage));
      });

      this.wsConnection.addEventListener('message', this.handleWebSocketMessage);
      this.wsConnection.addEventListener('error', this.handleWebSocketError);
      this.wsConnection.addEventListener('close', this.handleWebSocketClose);
    } catch (error) {
      console.error('Error connecting to WebSocket:', error);
      this.scheduleReconnect(contractAddress);
    }
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    try {
      const data = JSON.parse(event.data);
      console.log('WebSocket message received:', data);
      
      // Handle CoinMarketCap message format
      if (data.d && data.d.p !== undefined) {
        const price = parseFloat(data.d.p); // Convert to number
        const timestamp = data.d.t ? Math.floor(data.d.t / 1000) : Math.floor(Date.now() / 1000);
        
        // Validate that price is a valid number
        if (isNaN(price) || price <= 0) {
          console.log('Invalid price received:', data.d.p);
          return;
        }
        
        console.log('Price update received:', price, 'at', timestamp);
        
        const chartData: ChartData = {
          time: timestamp,
          open: price,
          high: price,
          low: price,
          close: price,
        };
        
        this.notifyListeners(chartData);
      }
      // Handle subscription confirmation
      else if (data.id === 1 && data.result) {
        console.log('Successfully subscribed to CoinMarketCap data feed');
      } else {
        console.log('Unhandled WebSocket message:', data);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
  }

  private handleWebSocketError(error: Event): void {
    console.error('WebSocket error:', error);
  }

  private handleWebSocketClose(event: CloseEvent): void {
    console.log('WebSocket connection closed:', event.code, event.reason);
    this.wsConnection = null;
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect(contractAddress?: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    this.reconnectAttempts++;
    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts - 1);
    
    setTimeout(() => {
      if (contractAddress) {
        this.connectWebSocket(contractAddress);
      }
    }, delay);
  }

  addListener(callback: (data: ChartData) => void): void {
    this.listeners.push(callback);
  }

  removeListener(callback: (data: ChartData) => void): void {
    this.listeners = this.listeners.filter(listener => listener !== callback);
  }

  private notifyListeners(data: ChartData): void {
    this.listeners.forEach(listener => listener(data));
  }

  disconnect(): void {
    if (this.wsConnection) {
      this.wsConnection.close();
      this.wsConnection = null;
    }
    this.listeners = [];
    this.reconnectAttempts = 0;
  }

  private generateMockData(): ChartData[] {
    console.log('Generating mock candlestick data');
    const data: ChartData[] = [];
    const now = Date.now();
    const basePrice = 0.00154; // Mock price in USD (realistic for $1.54M market cap)
    
    for (let i = 99; i >= 0; i--) {
      const time = now - (i * 60 * 1000); // 1-minute intervals
      const variation = (Math.random() - 0.5) * 0.00015; // Adjusted for USD
      const open = basePrice + variation;
      const close = open + (Math.random() - 0.5) * 0.00008; // Adjusted for USD
      const high = Math.max(open, close) + Math.random() * 0.00003; // Adjusted for USD
      const low = Math.min(open, close) - Math.random() * 0.00003; // Adjusted for USD
      
      data.push({
        time: Math.floor(time / 1000), // Convert to seconds for TradingView
        open: Math.max(0, open), // Ensure positive values
        high: Math.max(0, high),
        low: Math.max(0, low),
        close: Math.max(0, close),
      });
    }
    
    console.log('Generated mock data with', data.length, 'items:', data.slice(0, 3));
    return data;
  }
}

export const priceFeedService = new PriceFeedService(); 