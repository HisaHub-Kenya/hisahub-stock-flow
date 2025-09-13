
import { useAppStore } from '../stores/useAppStore';
import { toast } from 'sonner';

export const useTrading = () => {
  const { 
    user, 
    stocks, 
    holdings, 
    portfolioData, 
    placeOrder: storePlaceOrder,
    logAnalytics 
  } = useAppStore();

  const buyStock = async (symbol: string, quantity: number, orderType: 'market' | 'limit' = 'market') => {
    if (!user) {
      toast.error("Please log in to place orders");
      return false;
    }

    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) {
      toast.error("Stock not found");
      return false;
    }

    const total = quantity * stock.price;
    if (portfolioData.cashBalance < total) {
      toast.error(`Insufficient funds. You need KES ${total.toLocaleString()} but only have KES ${portfolioData.cashBalance.toLocaleString()}`);
      return false;
    }

    logAnalytics('buy_stock_attempted', { symbol, quantity, orderType, total });
    return await storePlaceOrder({
      symbol,
      quantity,
      order_type: orderType,
      side: 'buy'
    });
  };

  const sellStock = async (symbol: string, quantity: number, orderType: 'market' | 'limit' = 'market') => {
    if (!user) {
      toast.error("Please log in to place orders");
      return false;
    }

    const holding = holdings.find(h => h.symbol === symbol);
    if (!holding || holding.quantity < quantity) {
      toast.error(`Insufficient shares. You only have ${holding?.quantity || 0} shares of ${symbol}`);
      return false;
    }

    logAnalytics('sell_stock_attempted', { symbol, quantity, orderType });
    return await storePlaceOrder({
      symbol,
      quantity,
      order_type: orderType,
      side: 'sell'
    });
  };

  return {
    buyStock,
    sellStock,
    accountBalance: portfolioData.cashBalance,
    holdings: holdings,
    totalValue: portfolioData.totalValue,
    totalPnL: portfolioData.totalPnL
  };
};
