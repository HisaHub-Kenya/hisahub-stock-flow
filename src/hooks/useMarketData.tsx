
import { useState, useEffect } from 'react';
import { apiHelpers } from '@/lib/api';

export const useMarketData = () => {
  const [stocks, setStocks] = useState([]);
  const [marketIndices, setMarketIndices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMarketData();
    
    // Set up polling for real-time updates (every 30 seconds)
    const interval = setInterval(() => {
      fetchMarketData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchMarketData = async () => {
    await Promise.all([fetchStockPrices(), fetchMarketIndices()]);
    setLoading(false);
  };

  const fetchStockPrices = async () => {
    try {
      const data = await apiHelpers.getStocks();
      if (data) {
        setStocks(data);
      }
    } catch (error) {
      console.error('Error fetching stock prices:', error);
    }
  };

  const fetchMarketIndices = async () => {
    try {
      const data = await apiHelpers.getMarketIndices();
      if (data) {
        setMarketIndices(data);
      }
    } catch (error) {
      console.error('Error fetching market indices:', error);
    }
  };

  const updateMarketData = async () => {
    try {
      await fetchMarketData();
    } catch (error) {
      console.error('Error updating market data:', error);
    }
  };

  return {
    stocks,
    marketIndices,
    loading,
    updateMarketData,
    refetch: fetchMarketData
  };
};
