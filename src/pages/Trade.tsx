import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatFAB from "../components/ChatFAB";
import BottomNav from "../components/BottomNav";
import HisaAIButton from "../components/HisaAIButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import TradingChart from "../components/trading/TradingChart";
import StockSummary from "../components/trading/StockSummary";
import OrderPanel from "../components/trading/OrderPanel";
import PositionsOrders from "../components/trading/PositionsOrders";
import AlertsPanel from "../components/trading/AlertsPanel";
import NewsFeed from "../components/trading/NewsFeed";
import WatchlistPanel from "../components/trading/WatchlistPanel";
import ResearchPanel from "../components/trading/ResearchPanel";
import { useAppStore, Stock } from "../stores/useAppStore";
import { useAutoRefresh } from "../hooks/useAutoRefresh";

const Trade: React.FC = () => {
  const navigate = useNavigate();
  const { 
    stocks, 
    selectedStock, 
    setSelectedStock, 
    placeOrder, 
    logAnalytics,
    isLoading 
  } = useAppStore();
  
  // Auto-refresh data every 5 seconds for trading page
  useAutoRefresh(5000);
  const [currentStock, setCurrentStock] = useState<Stock>(selectedStock || stocks[0] || {
    id: '',
    symbol: 'SCOM',
    name: 'Safaricom PLC',
    sector: 'Technology',
    price: 28.50,
    volume: 1000000,
    high: 29.00,
    low: 28.00,
    change: 0.50,
    changePercent: '1.79'
  });

  const handleStockChange = (stockSymbol: string) => {
    const stock = stocks.find(s => s.symbol === stockSymbol);
    if (stock) {
      setCurrentStock(stock);
      setSelectedStock(stock);
      logAnalytics('stock_selected', { symbol: stock.symbol });
    }
  };

  const handleBrokerLogin = () => {
    logAnalytics('broker_login_clicked');
    navigate("/broker-integration");
  };

  // Update selected stock when prices change
  React.useEffect(() => {
    if (stocks.length > 0 && currentStock) {
      const updatedStock = stocks.find(s => s.symbol === currentStock.symbol);
      if (updatedStock) {
        setCurrentStock(updatedStock);
      }
    }
  }, [stocks, currentStock]);

  return (
    <div className="min-h-screen flex flex-col bg-primary font-sans transition-colors">
      <HisaAIButton />
      
      <main className="flex-1 w-full max-w-7xl mx-auto flex flex-col px-2 sm:px-4 py-4">
        {/* Stock Selector and Broker Login Row */}
        <div className="mb-4 flex flex-col sm:flex-row gap-4">
          {/* Stock Selector */}
          <div className="flex-1">
            <Select value={currentStock.symbol} onValueChange={handleStockChange}>
              <SelectTrigger className="w-full bg-white/10 border-secondary/20 text-off-white">
                <SelectValue>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{currentStock.symbol}</span>
                      <span className="text-xs text-off-white/60">{currentStock.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono">KES {currentStock.price.toFixed(2)}</span>
                      <span className={`text-xs ${currentStock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {currentStock.change >= 0 ? '+' : ''}{currentStock.change.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-primary border-secondary/20">
                {stocks.map((stock) => (
                  <SelectItem key={stock.symbol} value={stock.symbol} className="text-off-white focus:bg-white/10">
                    <div className="flex items-center justify-between w-full">
                      <div className="flex flex-col items-start">
                        <span className="font-semibold">{stock.symbol}</span>
                        <span className="text-xs text-off-white/60">{stock.name}</span>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <span className="font-mono text-sm">KES {stock.price.toFixed(2)}</span>
                        <span className={`text-xs ${stock.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Broker Login Button */}
          <div className="w-full sm:w-auto">
            <Button
              onClick={handleBrokerLogin}
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-secondary/20 text-off-white px-4 py-2 h-full"
              variant="outline"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Broker Login
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1">
          {/* Left Column - Chart and Stock Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            <StockSummary stock={currentStock} />
            <TradingChart symbol={currentStock.symbol} />
          </div>

          {/* Right Column - Trading Panel */}
          <div className="space-y-4 sm:space-y-6">
            <OrderPanel stock={currentStock} />
            
            {/* Mobile Tabs for additional content */}
            <div className="lg:hidden">
              <Tabs defaultValue="positions" className="w-full">
                <TabsList className="grid w-full grid-cols-5 bg-white/10 text-xs">
                  <TabsTrigger value="positions" className="text-xs">Positions</TabsTrigger>
                  <TabsTrigger value="watchlist" className="text-xs">Watch</TabsTrigger>
                  <TabsTrigger value="research" className="text-xs">Research</TabsTrigger>
                  <TabsTrigger value="alerts" className="text-xs">Alerts</TabsTrigger>
                  <TabsTrigger value="news" className="text-xs">News</TabsTrigger>
                </TabsList>
                <TabsContent value="positions" className="mt-4">
                  <PositionsOrders />
                </TabsContent>
                <TabsContent value="watchlist" className="mt-4">
                  <WatchlistPanel />
                </TabsContent>
                <TabsContent value="research" className="mt-4">
                  <ResearchPanel stock={currentStock} />
                </TabsContent>
                <TabsContent value="alerts" className="mt-4">
                  <AlertsPanel stock={currentStock} />
                </TabsContent>
                <TabsContent value="news" className="mt-4">
                  <NewsFeed stock={currentStock} />
                </TabsContent>
              </Tabs>
            </div>

            {/* Desktop - Show all panels */}
            <div className="hidden lg:block space-y-6">
              <PositionsOrders />
              <WatchlistPanel />
              <ResearchPanel stock={currentStock} />
              <AlertsPanel stock={currentStock} />
              <NewsFeed stock={currentStock} />
            </div>
          </div>
        </div>
      </main>

      <ChatFAB />
      <BottomNav />
    </div>
  );
};

export default Trade;
