
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { User, getCurrentUser } from "@/lib/auth";
import Index from "./pages/Index";
import Trade from "./pages/Trade";
import Portfolio from "./pages/Portfolio";
import News from "./pages/News";
import Community from "./pages/Community";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import BrokerIntegration from "./pages/BrokerIntegration";
import Chatbot from "./pages/Chatbot";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/ThemeProvider";
import { FinancialDataProvider } from "./contexts/FinancialDataContext";
import SplashScreen from "./components/SplashScreen";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = () => {
    // Check auth state after login
    const currentUser = getCurrentUser();
    setUser(currentUser);
  };

  useEffect(() => {
    // Check for existing session on app load
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="text-off-white">Loading...</div>
    </div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            {showSplash ? (
              <SplashScreen onComplete={handleSplashComplete} />
            ) : (
              <FinancialDataProvider>
                <Routes>
                  {/* Auth route - accessible to everyone */}
                  <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
                  
                  {/* Protected routes - only accessible to authenticated users */}
                  {user ? (
                    <>
                      <Route path="/" element={<Index />} />
                      <Route path="/trade" element={<Trade />} />
                      <Route path="/portfolio" element={<Portfolio />} />
                      <Route path="/news" element={<News />} />
                      <Route path="/community" element={<Community />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="/broker-integration" element={<BrokerIntegration />} />
                      <Route path="/chatbot" element={<Chatbot />} />
                      <Route path="*" element={<NotFound />} />
                    </>
                  ) : (
                    // Redirect all routes to auth if not authenticated
                    <Route path="*" element={<Navigate to="/auth" replace />} />
                  )}
                </Routes>
                {/* Show PWA install prompt only when user is authenticated */}
                {user && <PWAInstallPrompt />}
              </FinancialDataProvider>
            )}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
