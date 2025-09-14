
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { getCurrentUser } from "@/lib/auth";
import { Skeleton } from "@/components/ui/skeleton";

// Critical routes loaded immediately
import Index from "./pages/Index";
import Auth from "./pages/Auth";

// Non-critical routes loaded lazily
const Trade = lazy(() => import("./pages/Trade"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const News = lazy(() => import("./pages/News"));
const Community = lazy(() => import("./pages/Community"));
const Settings = lazy(() => import("./pages/Settings"));
const BrokerIntegration = lazy(() => import("./pages/BrokerIntegration"));
const Chatbot = lazy(() => import("./pages/Chatbot"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading component
const PageLoader = () => (
  <div className="min-h-screen bg-primary flex items-center justify-center">
    <div className="space-y-4 w-full max-w-md">
      <Skeleton className="h-12 w-full bg-white/10" />
      <Skeleton className="h-32 w-full bg-white/10" />
      <Skeleton className="h-8 w-3/4 bg-white/10" />
    </div>
  </div>
);
import { ThemeProvider } from "./components/ThemeProvider";
import { useAppStore } from "./stores/useAppStore";
import SplashScreen from "./components/SplashScreen";
import PWAInstallPrompt from "./components/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { user, isAuthenticated, isAuthChecked, setUser, syncAuthState, loadPortfolioData, loadMarketData } = useAppStore();

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleLogin = async () => {
    // Sync auth state after login
    const ok = await syncAuthState();
    if (ok) {
      // Load data after successful login
      loadPortfolioData();
      loadMarketData();
    }
  };

  useEffect(() => {
    // Sync auth state on app load
    let mounted = true;
    (async () => {
      const ok = await syncAuthState();
      if (mounted && ok) {
        loadPortfolioData();
        loadMarketData();
      }
    })();
    return () => { mounted = false; };
  }, [syncAuthState, loadPortfolioData, loadMarketData]);

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>
          <Toaster />
          <BrowserRouter>
            <Routes>
              {/* Auth route - accessible to everyone */}
              <Route path="/auth" element={<Auth onLogin={handleLogin} />} />
              
              {/* Protected routes - only accessible to authenticated users */}
              {isAuthChecked && isAuthenticated ? (
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/trade" element={
                    <Suspense fallback={<PageLoader />}>
                      <Trade />
                    </Suspense>
                  } />
                  <Route path="/portfolio" element={
                    <Suspense fallback={<PageLoader />}>
                      <Portfolio />
                    </Suspense>
                  } />
                  <Route path="/news" element={
                    <Suspense fallback={<PageLoader />}>
                      <News />
                    </Suspense>
                  } />
                  <Route path="/community" element={
                    <Suspense fallback={<PageLoader />}>
                      <Community />
                    </Suspense>
                  } />
                  <Route path="/settings" element={
                    <Suspense fallback={<PageLoader />}>
                      <Settings />
                    </Suspense>
                  } />
                  <Route path="/broker-integration" element={
                    <Suspense fallback={<PageLoader />}>
                      <BrokerIntegration />
                    </Suspense>
                  } />
                  <Route path="/chatbot" element={
                    <Suspense fallback={<PageLoader />}>
                      <Chatbot />
                    </Suspense>
                  } />
                  <Route path="*" element={
                    <Suspense fallback={<PageLoader />}>
                      <NotFound />
                    </Suspense>
                  } />
                </>
              ) : (
                // If auth check completed and not authenticated, redirect all routes to auth
                isAuthChecked ? (
                  <Route path="*" element={<Navigate to="/auth" replace />} />
                ) : (
                  // If auth check not yet completed, show loader to avoid flash redirect
                  <Route path="*" element={<PageLoader />} />
                )
              )}
            </Routes>
            {/* Show PWA install prompt only when user is authenticated */}
            {isAuthenticated && <PWAInstallPrompt />}
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
