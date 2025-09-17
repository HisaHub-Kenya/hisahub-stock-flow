
import { Toaster } from "./components/ui/sonner";
import { TooltipProvider } from "./components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useState, useEffect, Suspense, lazy } from "react";
import { getCurrentUser } from "./lib/auth";
import { Skeleton } from "./components/ui/skeleton";

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
import { FinancialDataProvider } from './contexts/FinancialDataContext';

const queryClient = new QueryClient();

const AppRouter = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAuthChecked, authSyncError, syncAuthState, loadPortfolioData, loadMarketData } = useAppStore();

  const handleLogin = async () => {
    const ok = await syncAuthState();
    if (ok) {
      loadPortfolioData();
      loadMarketData();
      console.log('[AppRouter] login successful — navigating to /');
      try { navigate('/', { replace: true }); } catch (e) { console.warn('[AppRouter] navigation after login failed', e); }
    }
  };

  useEffect(() => {
    console.log('[AppRouter] auth state change', { isAuthenticated, isAuthChecked, userId: user?.id, authSyncError });
  }, [isAuthenticated, isAuthChecked, user?.id, authSyncError]);

  return (
    <>
      <Routes>
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />

        {isAuthChecked && !authSyncError && isAuthenticated ? (
          <>
            <Route path="/" element={<Index />} />
            <Route path="/trade" element={<Suspense fallback={<PageLoader />}><Trade /></Suspense>} />
            <Route path="/portfolio" element={<Suspense fallback={<PageLoader />}><Portfolio /></Suspense>} />
            <Route path="/news" element={<Suspense fallback={<PageLoader />}><News /></Suspense>} />
            <Route path="/community" element={<Suspense fallback={<PageLoader />}><Community /></Suspense>} />
            <Route path="/settings" element={<Suspense fallback={<PageLoader />}><Settings /></Suspense>} />
            <Route path="/broker-integration" element={<Suspense fallback={<PageLoader />}><BrokerIntegration /></Suspense>} />
            <Route path="/chatbot" element={<Suspense fallback={<PageLoader />}><Chatbot /></Suspense>} />
            <Route path="*" element={<Suspense fallback={<PageLoader />}><NotFound /></Suspense>} />
          </>
        ) : (
          isAuthChecked && !authSyncError ? (
            <Route path="*" element={<Navigate to="/auth" replace />} />
          ) : authSyncError ? (
            <Route path="*" element={
              <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center max-w-md">
                  <h2 className="text-2xl text-white mb-4">Connection Problem</h2>
                  <p className="text-gray-300 mb-6">We couldn't validate your session with the server. This may be a temporary network issue.</p>
                  <div className="flex gap-4 justify-center">
                    <button className="px-4 py-2 bg-secondary text-primary rounded" onClick={() => syncAuthState()}>Retry</button>
                    <a className="px-4 py-2 bg-white/10 text-white rounded" href="/auth">Sign in manually</a>
                  </div>
                </div>
              </div>
            } />
          ) : (
            <Route path="*" element={<PageLoader />} />
          )
        )}
      </Routes>
      {isAuthenticated && <PWAInstallPrompt />}
    </>
  );
};

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const { syncAuthState, loadPortfolioData, loadMarketData } = useAppStore();

  const handleSplashComplete = () => setShowSplash(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      console.log('[App] starting auth check');
      const ok = await syncAuthState();
      console.log('[App] auth check complete', { ok });
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
            <FinancialDataProvider>
              <AppRouter />
            </FinancialDataProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
